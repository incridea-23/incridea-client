// @ts-nocheck
import { FC, useEffect, useState } from "react";
import Spinner from "@/src/components/spinner";
import { useQuery } from "@apollo/client";
import {
  CompletedEventsDocument,
  CompletedEventsQuery,
  Query,
  QueryCompletedEventsSuccess,
} from "@/src/generated/generated";
import ViewTeamModal from "./ViewTeamModal";
import SearchBox from "@/src/components/searchbox";
import { CSVLink } from "react-csv";
import { idToPid, idToTeamId } from "@/src/utils/id";

const ValedictoryTab: FC = () => {
  const {
    data: eventsData,
    loading: eventsLoading,
    fetchMore: eventsFetchMore,
  } = useQuery(CompletedEventsDocument);
  // console.log("eventsData", eventsData);
  const [query, setQuery] = useState("");
  const [csvData, setCsvData] = useState([]);
  const [csvData1, setCsvData1] = useState([]);

  const headers1 = [
    { label: "Event Name", key: "eventName" },
    { label: "Winner", key: "winner" },
    { label: "Runner Up", key: "runnerUp" },
    { label: "Second Runner Up", key: "secondRunnerUp" },
  ];
  const headers2 = [
    { label: "Team Id", key: "teamId" },
    { label: "Team Name", key: "teamName" },
    { label: "Event Name", key: "eventName" },
    { label: "Member PID", key: "pid" },
    { label: "Name", key: "name" },
    { label: "Phone No", key: "phoneno" },
    { label: "College", key: "college" },
    { label: "Email", key: "email" },
  ];
  useEffect(() => {
    const processData = () => {
      eventsData?.completedEvents.data.map((event) => {
        const temp = {
          eventName: event.name,
        };
        event.winner?.map((eventData) => {
          if (eventData.type === "WINNER") {
            temp.winner = eventData.team.name;
          }
          if (eventData.type === "RUNNER_UP") {
            temp.runnerUp = eventData.team.name;
          }
          if (eventData.type === "SECOND_RUNNER_UP") {
            temp.secondRunnerUp = eventData.team.name;
          }
        });
        setCsvData1((prev) => [...prev, temp]);
      });

      eventsData?.completedEvents.data.map((event) => {
        const temp = {};
        temp.eventName = event.name;
        event.winner.map((eventData) => {
          temp.teamId = idToTeamId(eventData.team.id);
          temp.teamName = eventData.team.name;
          eventData.team.members.map((data) => {
            const tempp = {};
            tempp.name = data.user.name;
            tempp.phoneno = data.user.phoneNumber;
            tempp.college = data.user.college?.name;
            tempp.email = data.user.email;
            tempp.pid = idToPid(data.user.id);
            tempp.teamId = temp.teamId;
            tempp.teamName = temp.teamName;
            tempp.eventName = temp.eventName;
            setCsvData((prev) => [...prev, tempp]);
          });
        });
      });
    };
    processData();
  }, [eventsData]);
  return (
    <>
      <div className="mt-5 flex gap-1 md:gap-0.5 flex-col justify-center basis-2/3">
        <div className="flex gap-3 items-center  ml-2">
          <h1 className="text-2xl">Events</h1>
          <div className="flex justify-evenly ml-auto gap-2">
            <button className="bg-green-500 p-2 rounded-lg">
              <CSVLink
                data={csvData1}
                headers={headers1}
                filename={"event-results.csv"}
              >
                Download Event Results
              </CSVLink>
            </button>
            <button className="bg-green-500 p-2 rounded-lg">
              <CSVLink
                data={csvData}
                headers={headers2}
                filename={"team-details.csv"}
              >
                Download Team Details
              </CSVLink>
            </button>
          </div>
        </div>
        <SearchBox
          placeholder="Search by event name"
          className="my-2 ml-2"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <div className="hidden md:flex ml-2 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg bg-clip-padding rounded-t-lg p-1 items-center justify-between gap-2.5 text-lg font-bold h-20">
          <h1 className="basis-1/4 py-2.5 text-start pl-2">Event Name</h1>
          <h1 className="basis-1/4 py-2.5 text-center pr-5">Winner</h1>
          <h1 className="basis-1/4 py-2.5 text-center pr-5">Runner Up</h1>
          <h1 className="basis-1/4 py-2.5 text-center pr-5">
            Second Runner Up
          </h1>
        </div>
        {eventsLoading && (
          <div className="flex mt-10 justify-center items-center">
            <Spinner className="text-gray-300" />
          </div>
        )}
        <div className="md:max-h-80 max-h-80 md:h-[300px] overflow-y-auto text-center w-full">
          {eventsData?.completedEvents.__typename ===
          "QueryCompletedEventsSuccess"
            ? eventsData.completedEvents.data.map(
                (event, i) =>
                  event.name.toLowerCase().includes(query.toLowerCase()) && (
                    <div
                      key={event?.id}
                      className={`bg-white/10 md:rounded-none rounded-lg md:p-4 ml-2 p-3 flex flex-col md:flex-row md:items-center items-start mb-3 md:my-0`}
                    >
                      <h1 className="basis-1/4 flex justify-start py-0.5 text-start text-lg">
                        {event?.name}
                      </h1>
                      <h1 className="basis-1/4 py-0.5 text-lg flex md:text-center md:justify-center md:pl-5 mt-2 md:mt-0">
                        {event.winner?.map((eventData, i) =>
                          eventData.type === "WINNER" ? (
                            <ViewTeamModal
                              key={eventData.team.id}
                              teamId={eventData.team.id}
                              modalTitle={event.name}
                              modalResult={eventData.type}
                              teamName={eventData.team.name}
                              eventType={event.eventType}
                            />
                          ) : (
                            ""
                          )
                        )}
                      </h1>
                      <h1 className="basis-1/4 py-0.5 text-lg flex md:text-center md:justify-center md:pl-5 mt-2 md:mt-0">
                        {event.winner?.map((eventData, i) =>
                          eventData.type === "RUNNER_UP" ? (
                            <ViewTeamModal
                              key={eventData.team.id}
                              teamId={eventData.team.id}
                              modalTitle={event.name}
                              modalResult={eventData.type}
                              teamName={eventData.team.name}
                              eventType={event.eventType}
                            />
                          ) : (
                            ""
                          )
                        )}
                      </h1>
                      <h1 className="basis-1/4 py-0.5 text-lg flex md:text-center md:justify-center md:pl-5 mt-2 md:mt-0">
                        {event.winner?.map((eventData, i) =>
                          eventData.type === "SECOND_RUNNER_UP" ? (
                            <ViewTeamModal
                              key={eventData.team.id}
                              teamId={eventData.team.id}
                              modalTitle={event.name}
                              modalResult={eventData.type}
                              teamName={eventData.team.name}
                              eventType={event.eventType}
                            />
                          ) : (
                            ""
                          )
                        )}
                      </h1>
                    </div>
                  )
              )
            : ""}
        </div>
      </div>
    </>
  );
};

export default ValedictoryTab;

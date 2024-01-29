// @ts-nocheck
import Spinner from "@/src/components/spinner";
import { useAuth } from "@/src/hooks/useAuth";
import { useRouter } from "next/router";

import { useQuery } from "@apollo/client";
import Dashboard from "@/src/components/layout/dashboard";
import { Tab } from "@headlessui/react";
import {
  EventByIdDocument,
  EventByIdQuery,
  GetScoreSheetJuryDocument,
  QueryGetScoreSheetJuryViewSuccess,
} from "@/src/generated/generated";
import { StatusBadge } from "..";
import { NextPage, NextPageContext } from "next";
import { useState } from "react";
import { CSVLink } from "react-csv";

const Jury: NextPage<{ slug: string }> = (props) => {
  const { user, loading, error } = useAuth();
  const router = useRouter();
  console.log(props.slug, props.slug.split("-")[-1]);
  const {
    data: event,
    loading: eventLoading,
    error: eventError,
  } = useQuery(EventByIdDocument, {
    variables: {
      id: props.slug.split("-").pop() as string,
    },
  });
  if (loading || eventLoading)
    return (
      <div className="h-screen w-screen flex justify-center">
        <Spinner />
      </div>
    );
  if (!user) {
    router.push("/login");
    return <div>Redirecting...</div>;
  }
  if (user.role !== "JURY") {
    router.push("/profile");
    return <div>Redirecting...</div>;
  }
  if (!event) return <div>Event not found</div>;
  return (
    <Dashboard>
      <RoundTabs eventId={event.eventById.id} rounds={event.eventById.rounds} />
    </Dashboard>
  );
};

export default Jury;

const RoundTabs = ({
  rounds,
  eventId,
}: {
  rounds: EventByIdQuery["eventById"]["rounds"];
  eventId: string;
}) => {
  const getCompletedRounds = (
    rounds: EventByIdQuery["eventById"]["rounds"]
  ) => {
    let completedRounds = 0;
    rounds.forEach((round) => {
      if (round.completed === true) completedRounds++;
    });
    return completedRounds;
  };
  const getRoundStatus = (
    round: EventByIdQuery["eventById"]["rounds"][0],
    totalRounds: number
  ) => {
    if (round.completed) return "COMPLETED";
    if (
      new Date(
        rounds.find((r) => r.roundNo === round.roundNo)?.date
      ).getTime() > new Date().getTime()
    )
      return "YET_TO_START";
    return "ONGOING";
  };
  return (
    <Tab.Group
      as={"div"}
      className="sm:rounded-xl mt-5 overflow-hidden border-0 border-gray-900/40"
    >
      <Tab.List className="w-full overflow-x-auto flex  backdrop-blur-md bg-gray-400/20 ">
        {rounds.map((round) => (
          <Tab
            key={`${round.roundNo}-${eventId}`}
            className="focus:outline-none"
          >
            {({ selected }) => (
              <button
                className={` sm:px-5 transition-colors whitespace-nowrap sm:py-4 sm:text-lg text-base p-3 font-semibold ${
                  selected
                    ? "bg-gray-900 shadow-lg shadow-black text-white"
                    : "bg-transparent hover:bg-gray-800/60 text-white"
                }`}
              >
                <span>Round {round.roundNo} </span>
                <StatusBadge
                  status={getRoundStatus(round, rounds.length)}
                />{" "}
              </button>
            )}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels>
        {rounds.map((round) => (
          <Tab.Panel key={`${round.roundNo}-${eventId}`}>
            <RoundTable eventId={eventId} roundNo={round.roundNo} />
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};

const RoundTable = ({
  eventId,
  roundNo,
}: {
  eventId: string;
  roundNo: number;
}) => {
  const {
    data: round,
    loading: roundLoading,
    error: roundError,
  } = useQuery(GetScoreSheetJuryDocument, {
    variables: {
      eventId: eventId,
      roundNo: roundNo,
    },
  });
  /*
   data {
        judges {
          criteria {
            criteriaId
            score
          }
          judgeId
          judgeName
        }
        teamId
        teamName
        teamScore
      }
    }
   */

  if (roundLoading) return <Spinner />;
  if (!round) return <div>Something went wrong</div>;
  if (roundError || round.getScoreSheetJuryView["__typename"] === "Error")
    return <div>Something went wrong</div>;
  if (round.getScoreSheetJuryView.data.length === 0)
    return <div>Nothing to show</div>;
  return (
    <JudgeTable
      judges={round.getScoreSheetJuryView.data[0].judges}
      teams={round.getScoreSheetJuryView.data}
    />
  );
};

const JudgeTable = ({
  judges,
  teams,
}: {
  judges: QueryGetScoreSheetJuryViewSuccess["data"][0]["judges"];
  teams: QueryGetScoreSheetJuryViewSuccess["data"];
}) => {
  const [csvData, setCsvData] = useState([]);
  const [judgeName, setJudgeName] = useState(null);
  const process = (judgeId: any) => {
    const judgesData: any = [];
    const teamData: any = [];
    let data = [];
    teams.map((team) => {
      let judges: any = team.judges;
      teamData.push(team?.teamName);
      let temp = judges?.filter((judge: any) => judge?.judgeId === judgeId);
      judgesData.push(temp);
    });
    data.push({ JudgeName: judgesData[0][0]?.judgeName });

    teamData.map((team: any, index: any) => {
      let obj = {};
      let sum = 0;
      obj["teamNames"] = team;
      judgesData[index][0]?.criteria?.map((data: any) => {
        obj[data.criteriaName] = data.score;
        sum += data.score;
      });
      obj["judgeTotal"] = sum;
      data.push(obj);
    });
    return data;
  };

  return (
    <Tab.Group>
      <Tab.List className="w-full items-center gap-5 p-2 flex bg-gray-300/20 text-white">
        <span className="font-semibold text-xl ml-3">Judges </span>
        {judges.map((judge) => (
          <Tab
            key={judge.judgeId}
            className="flex w-fit items-center gap-2 p-2 outline-none"
          >
            {({ selected }) => (
              <button
                onClick={() => {
                  setCsvData(process(judge?.judgeId));
                  setJudgeName(judge?.judgeName);
                }}
                className={`font-semibold hover:bg-gray-700/90 shadow-md py-2 px-4 ${
                  selected ? "bg-gray-700" : "bg-gray-600"
                }`}
              >
                {judge.judgeName}
              </button>
            )}
          </Tab>
        ))}
        {judgeName ? (
          <button className="bg-green-500 p-2 rounded-sm ml-auto mr-5">
            <CSVLink data={csvData}>
              Download Score sheet by {judgeName}
            </CSVLink>
          </button>
        ) : (
          <p className="ml-auto mr-5 font-semibold bg-gray-800 shadow-md p-3">
            Click a judge for download option
          </p>
        )}
      </Tab.List>
      <Tab.Panels>
        {judges.map((judge) => (
          <Tab.Panel key={judge.judgeName}>
            <div className="hidden md:flex bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg bg-clip-padding  p-1 items-center justify-between gap-2.5 text-xl font-bold h-16">
              <div className="basis-1/3 py-2.5 text-center pl-2">Team Name</div>
              {judge.criteria.map((criteria) => (
                <div
                  key={criteria.criteriaId}
                  className="basis-1/3 py-2.5 text-center pl-2"
                >
                  {criteria.criteriaName}
                </div>
              ))}
              <div className="basis-1/3 py-2.5 text-center pl-2">
                Judge Total
              </div>
              <div className="basis-1/3 py-2.5 text-center pr-2">
                Grand Total
              </div>
            </div>
            {teams.map((team) => (
              <div
                key={team.teamId}
                className="bg-white/10 md:rounded-none rounded-lg md:p-4  p-3 flex flex-col md:flex-row md:items-center items-start md:justify-evenly w-full md:text-center mb-3 md:my-0"
              >
                <div className="basis-1/3 py-0.5 text-center text-lg">
                  {team.teamName}
                </div>
                {team.judges
                  .find((j) => j.judgeId === judge.judgeId)
                  ?.criteria.map((criteria) => (
                    <div
                      key={criteria.criteriaId}
                      className="basis-1/3  py-0.5 text-center text-lg"
                    >
                      {criteria.score}
                    </div>
                  ))}
                <div className="basis-1/3  py-0.5 text-center text-lg">
                  {team.judges
                    .find((j) => j.judgeId === judge.judgeId)
                    ?.criteria.reduce((acc, curr) => acc + curr.score, 0)}
                </div>
                <div className="basis-1/3 py-0.5 text-center text-lg">
                  {team.teamScore}
                </div>
              </div>
            ))}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};

export const getServerSideProps = async (context: NextPageContext) => {
  const { slug } = context.query;
  return { props: { slug: slug } };
};

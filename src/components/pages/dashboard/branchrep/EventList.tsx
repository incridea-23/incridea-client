import Badge from "@/src/components/badge";
import Spinner from "@/src/components/spinner";
import { EventsByBranchRepDocument } from "@/src/generated/generated";
import { useQuery } from "@apollo/client";
import { FC } from "react";
import AddEventModal from "./AddEventModal";
import AddOrganizerModal from "./AddOrganizerModal";
import DeleteEvent from "./DeleteEvent";
import ViewEventModal from "../organizer/ViewEventModal";

const EventList: FC<{
  branchRepId: string;
}> = ({ branchRepId }) => {
  // Get Events Query
  const {
    data: events,
    loading: eventsLoading,
    refetch: eventsRefetch,
  } = useQuery(EventsByBranchRepDocument, {
    variables: {
      branchRepId: branchRepId as string,
    },
  });

  // Get Branch Name
  const branch = events?.eventsByBranchRep.find((event) => event.branch.name)
    ?.branch.name;

  return (
    <>
      <div className="flex gap-3 flex-col md:flex-row md:justify-between md:items-center">
        <div className="flex gap-3 items-center">
          <h1 className="text-2xl ">Registered Events</h1>
          {branch && <Badge color={"success"}>{branch}</Badge>}
        </div>
        <AddEventModal eventsRefetch={eventsRefetch} />
      </div>
      <div className="mt-5 flex gap-3 md:gap-0.5 flex-col">
        {/* Event Header */}
        <div className="hidden md:flex bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg bg-clip-padding rounded-t-lg p-2 items-center justify-between gap-5 text-2xl font-bold">
          <h1 className="basis-1/5 py-2.5 text-start pl-4">Event Name</h1>
          <h1 className="basis-1/5 py-2.5 text-center">Type</h1>
          <h1 className="basis-1/5 py-2.5 text-center">Status</h1>
          <h1 className="basis-1/5 py-2.5 text-center">Preview</h1>
          <h1 className="basis-1/5 py-2.5 text-center">Edit Organizers</h1>
          <h1 className="basis-1/5 py-2.5 text-end pr-5">Delete</h1>
        </div>

        {eventsLoading && (
          <div className="flex mt-10 justify-center items-center">
            <Spinner className="text-gray-300" />
          </div>
        )}

        {/* Events list */}
        {events?.eventsByBranchRep.map((event, i) => (
          <div
            key={event.id}
            className={`bg-white/10 ${
              i === events.eventsByBranchRep.length - 1 && "md:rounded-b-lg"
            } md:rounded-none rounded-lg md:p-5 p-3 flex flex-col md:flex-row md:items-center items-start justify-between md:gap-5 gap-3`}>
            <h1 className="text-xl overflow-x-auto text-start inline-flex flex-wrap gap-2 font-bold md:basis-1/5">
              {event.name}{" "}
              <span className="block text-lg font-light md:hidden">
                ({event.eventType})
              </span>
            </h1>
            <h1 className="hidden md:block text-lg text-center md:basis-1/5">
              {event.eventType}
            </h1>
            <div className="text-center md:basis-1/5">
              <h1
                className={`
         border rounded-full px-3 leading-7 text-center mx-auto w-fit
        ${
          event.published
            ? "border-green-500 text-green-500"
            : "border-red-500 text-red-500"
        }`}>
                {event.published ? "Published" : "Pending"}
              </h1>
            </div>
            <ViewEventModal event={event} />
            <div className="md:basis-1/5 text-center">
              <AddOrganizerModal
                eventId={event.id}
                organizers={event.organizers}
                eventsRefetch={eventsRefetch}
                eventName={event.name}
              />
            </div>
            <div className="md:basis-1/5 text-end ">
              <DeleteEvent eventId={event.id} published={event.published} />
            </div>
          </div>
        ))}
        {events?.eventsByBranchRep.length === 0 && (
          <div className="text-center bg-white/10 rounded-md md:rounded-t-none p-10 text-xl text-gray-300 italic">
            no events found
          </div>
        )}
      </div>
    </>
  );
};

export default EventList;

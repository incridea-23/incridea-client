import Button from '@/src/components/button';
import Spinner from '@/src/components/spinner';
import { EventsByBranchRepDocument } from '@/src/generated/generated';
import { useQuery } from '@apollo/client';
import { FC } from 'react';
import { BiTrash } from 'react-icons/bi';
import AddEventModal from './AddEventModal';
import AddOrganizerModal from './AddOrganizerModal';
import DeleteEvent from './DeleteEvent';

const EventList: FC<{
  branchRepId: string;
}> = ({ branchRepId }) => {
  /* Queries */
  // 1. Get events of Branch Rep
  const {
    data: events,
    loading: eventsLoading,
    refetch: eventsRefetch,
  } = useQuery(EventsByBranchRepDocument, {
    variables: {
      branchRepId: branchRepId as string,
    },
  });
  return (
    <>
      <AddEventModal eventsRefetch={eventsRefetch} />
      <div className="mt-5 flex flex-col gap-2">
        {/* Event Header */}
        <div className="hidden md:flex bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg bg-clip-padding rounded-lg p-2 items-center justify-between gap-5 text-2xl font-bold">
          <h1 className="basis-1/5 text-start pl-4">Event Name</h1>
          <h1 className="basis-1/5 text-center">Type</h1>
          <h1 className="basis-1/5 text-center">Status</h1>
          <h1 className="basis-1/5 text-center">Edit Organizers</h1>
          <h1 className="basis-1/5 text-end pr-5">Delete</h1>
        </div>

        {/* Events list */}
        {eventsLoading && (
          <div className="flex justify-center items-center">
            <Spinner />
          </div>
        )}
        {events?.eventsByBranchRep.map((event) => (
          <div
            key={event.id}
            className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg bg-clip-padding rounded-lg md:p-5 p-3 flex flex-col md:flex-row md:items-center items-start justify-between md:gap-5 gap-3"
          >
            <h1 className="text-xl overflow-x-auto text-start inline-flex flex-wrap gap-2 font-bold md:basis-1/5">
              {event.name}{' '}
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
            ? 'border-green-500 text-green-500'
            : 'border-red-500 text-red-500'
        }`}
              >
                {event.published ? 'Published' : 'Pending'}
              </h1>
            </div>
            <div className="md:basis-1/5 text-center">
              <AddOrganizerModal
                eventId={event.id}
                organizers={event.organizers}
                eventsRefetch={eventsRefetch}
                eventName={event.name}
              />
            </div>
            <div className="md:basis-1/5 text-end ">
              <DeleteEvent 
              eventId={event.id}
              eventsRefetch={eventsRefetch}
              published={event.published}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default EventList;

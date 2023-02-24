import {
  EventsByBranchRepDocument,
  CreateEventDocument,
  DeleteEventDocument,
} from '@/src/generated/generated';
import { useAuth } from '@/src/hooks/useAuth';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Modal from '@/src/components/modal';
import { NextPage } from 'next';

const BranchRep: NextPage = () => {
  // Get User Data
  const { user, loading, error } = useAuth();

  // Modal State and Handlers
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(
    null
  );

  // Get events of Branch Rep
  const {
    data: events,
    loading: eventsLoading,
    error: eventsError,
    refetch: eventsRefetch,
  } = useQuery(EventsByBranchRepDocument, {
    variables: {
      branchRepId: user?.id as string,
    },
  });

  /* Mutations */
  // 1. Add Event
  const [
    createEventMutation,
    {
      data: createEventData,
      loading: createEventLoading,
      error: createEventError,
    },
  ] = useMutation(CreateEventDocument);

  // 2. Delete Event
  const [
    deleteEventMutation,
    {
      data: deleteEventData,
      loading: deleteEventLoading,
      error: deleteEventError,
    },
  ] = useMutation(DeleteEventDocument);

  /* Handlers */
  // 1. Add Event Handler
  const handleAddEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      0: { value: string };
    };
    const name = target[0].value;

    createEventMutation({
      variables: {
        name,
      },
    }).then(() => {
      eventsRefetch();
      handleClose();
    });
  };

  // 2. Delete Event Handler
  const handleDeleteEvent = (id: number) => {
    deleteEventMutation({
      variables: {
        id: id,
      },
    }).then(() => {
      eventsRefetch();
      handleClose();
    });
  };

  // 3. Modal Handlers
  const handleOpen = (content: React.ReactNode) => {
    setModalContent(content);
    setIsOpen(true);
  };

  const handleClose = () => {
    setModalContent(null);
    setIsOpen(false);
  };

  // Get branch name
  const branch = events?.eventsByBranchRep.find((event) => event.branch.name)
    ?.branch.name;

  // Redirect to profile if not branch rep
  const router = useRouter();
  if (loading) return <div>Loading...</div>;
  if (!user || user.role !== 'BRANCH_REP') router.push('/profile');

  return (
    <div className="h-screen w-screen bg-gradient-to-t from-black  to-blue-900 text-gray-100 p-10">
      {/* Welcome Header */}
      <div className="text-center ">
        <h1 className="text-4xl ">Hello {user?.name}!</h1>
      </div>
      <div>
        <div className="flex items-center justify-center gap-2">
          <h1 className="text-2xl underline">Registered Events</h1>
          {branch && <a className="text-xs border rounded-lg px-2">{branch}</a>}
        </div>
      </div>

      {/* Events */}
      <div className="mt-5 flex flex-col gap-5">
        {/* Event Header */}
        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg bg-clip-padding rounded-lg p-2 flex items-center justify-between gap-5 text-2xl font-bold">
          <h1>Event Name</h1>
          <h1>Fees</h1>
          <h1>Status</h1>
          <h1>Add Organizers</h1>
          <h1>Delete</h1>
        </div>

        {/* Status Updates */}
        {eventsLoading && <div>Loading...</div>}
        {eventsError && <div>Error</div>}
        {events?.eventsByBranchRep.length === 0 && (
          <div className="text-center">
            <h1>No Events Registered</h1>
          </div>
        )}

        {/* Events list */}
        {events?.eventsByBranchRep.map((event) => (
          <div
            key={event.id}
            className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg bg-clip-padding rounded-lg p-5 flex items-center justify-between gap-5"
          >
            <h1 className="text-xl">{event.name}</h1>
            <h1 className="text-xl">{event.fees}</h1>
            <h1
              className={`
              text-lg border rounded-lg px-2    w-fit
              ${event.published ? 'text-green-500' : 'text-red-500'}`}
            >
              {event.published ? 'Published' : 'Pending'}
            </h1>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleOpen('Add Organizers')}
            >
              Add Organizers
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleDeleteEvent(parseInt(event.id))}
            >
              {deleteEventLoading ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        ))}
      </div>

      {/* Add Event */}
      <div className="flex items-center justify-center mt-5">
        <button
          onClick={() => handleOpen('Add Event')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Event
        </button>
      </div>

      {/* Modal component 
      1. Add Event
      2. Add Organizers */}
      <Modal isOpen={isOpen} onClose={handleClose}>
        {/* Add Event */}
        {modalContent === 'Add Event' && (
          <div>
            <h1>Add Event</h1>
            {createEventLoading && <div>Loading...</div>}
            {!createEventLoading && (
              <form
                onSubmit={(e) => {
                  handleAddEvent(e);
                }}
                className="flex gap-5"
              >
                <input
                  type="text"
                  placeholder="Event Name"
                  className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                />
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Add Event
                </button>
              </form>
            )}
          </div>
        )}

        {/* Add Organizers */}
        {modalContent === 'Add Organizers' && (
          <div>
            <h1>Add Organizers</h1>
            {/* Add form or content for Add Organizers modal here */}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default BranchRep;

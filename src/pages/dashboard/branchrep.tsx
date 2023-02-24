import {
  EventsByBranchRepDocument,
  CreateEventDocument,
  DeleteEventDocument,
} from '@/src/generated/generated';
import { useAuth } from '@/src/hooks/useAuth';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';

function BranchRep() {
  const { user, loading, error } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(
    null
  );

  const handleOpen = (content: React.ReactNode) => {
    setModalContent(content);
    setIsOpen(true);
  };
  const handleClose = () => {
    setModalContent(null);
    setIsOpen(false);
  };

  // get events of branch rep
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

  // add event
  const [
    createEventMutation,
    {
      data: createEventData,
      loading: createEventLoading,
      error: createEventError,
    },
  ] = useMutation(CreateEventDocument);

  // delete event
  const [
    deleteEventMutation,
    {
      data: deleteEventData,
      loading: deleteEventLoading,
      error: deleteEventError,
    },
  ] = useMutation(DeleteEventDocument);

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

  const router = useRouter();

  // find branch name
  const branch = events?.eventsByBranchRep.find((event) => event.branch.name)
    ?.branch.name;

  if (loading) return <div>Loading...</div>;

  if (!user || user.role !== 'BRANCH_REP') router.push('/profile');

  return (
    <div className="h-screen w-screen bg-gradient-to-t from-black  to-blue-900 text-gray-100">
      <div className="text-center ">
        <h1 className="text-4xl ">Hello {user?.name}</h1>
      </div>
      <div>
        <h1 className="text-2xl">Registered Events</h1>
        {branch && <a className="border">{branch}</a>}
      </div>
      <div className="flex gap-5">
        {eventsLoading && <div>Loading...</div>}
        {events?.eventsByBranchRep.map((event) => (
          <div key={event.id}>
            <h1>{event.name}</h1>
            <h1>{event.fees}</h1>
            <h1
              className={`${
                event.published ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {event.published ? 'Published' : 'Pending'}
            </h1>
            <div className="flex gap-5">
              <button onClick={() => handleOpen('Add Organizers')}>
                Add Organizers
              </button>
              <button onClick={() => handleDeleteEvent(parseInt(event.id))}>
                {deleteEventLoading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        ))}
      </div>
      <div>
        <button onClick={() => handleOpen('Add Event')}>Add Event</button>
      </div>
      <Modal isOpen={isOpen} onClose={handleClose}>
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

        {modalContent === 'Add Organizers' && (
          <div>
            <h1>Add Organizers</h1>
            {/* Add form or content for Add Organizers modal here */}
          </div>
        )}
      </Modal>
    </div>
  );
}

const Modal: FunctionComponent<{
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}> = ({ isOpen, onClose, children }) => {
  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  if (!isOpen) return null;

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-70 z-50"
      onClick={handleClose}
    >
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-white text-black z-50 p-10">
        <div className="flex justify-end">
          <button onClick={onClose}>X</button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default BranchRep;

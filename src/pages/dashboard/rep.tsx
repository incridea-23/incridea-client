import {
  EventsByBranchRepDocument,
  CreateEventDocument,
  DeleteEventDocument,
  SearchUsersDocument,
  AddOrganizerDocument,
  RemoveOrganizerDocument,
  EventType,
} from '@/src/generated/generated';
import { useAuth } from '@/src/hooks/useAuth';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useState, useRef, useEffect, useCallback } from 'react';
import Modal from '@/src/components/modal';
import { NextPage } from 'next';
import Spinner from '@/src/components/spinner';
import Button from '@/src/components/button';
import SearchBox from '@/src/components/searchbox';
import { BiTrash } from 'react-icons/bi';
import { AiOutlinePlus } from 'react-icons/ai';
import TextInput from '@/src/components/input';
import toast, { Toaster } from 'react-hot-toast';
import Dashboard from '@/src/components/layout/dashboard';
import Badge from '@/src/components/badge';
import AddEventModal from '@/src/components/pages/dashboard/branchrep/AddEventModal';
import EventList from '@/src/components/pages/dashboard/branchrep/EventList';

const BranchRep: NextPage = () => {
  const router = useRouter();
  const { user, loading, error } = useAuth();

  // Modal State and Handlers
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<string | null>(null);

  //Controlled Inputs
  const [eventName, setEventName] = useState('');
  const [eventType, setEventType] = useState<EventType>(EventType.Individual);

  /* Queries */
  // 1. Get events of Branch Rep
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

  // Currently selected event | set when 'Add Organizer' or 'Delete Event' is clicked. Helps in getting event id for mutation.
  const [currentEvent, setCurrentEvent] = useState<{
    id: number;
    name?: string;
  }>();

  // 2. Search Users
  // Currently searched user
  const [name, setName] = useState<string>('');

  const {
    data: searchUsersData,
    loading: searchUsersLoading,
    error: searchUsersError,
    fetchMore: searchUsersFetchMore,
  } = useQuery(SearchUsersDocument, {
    variables: {
      first: 10,
      contains: name,
    },
  });

  /* Infinite Scroll Logic */
  // Get pageInfo for infinite scroll
  const { endCursor, hasNextPage } = searchUsersData?.users.pageInfo || {};

  // Create a ref for the last item in the list
  const lastItemRef = useRef<HTMLDivElement>(null);

  // State to check if we're fetching more data
  const [isFetching, setIsFetching] = useState(false);

  /** Custom toast function to notify users while mutation is in progress
   * @param {Promise} promise - Promise returned by mutation
   * @param {string} loadingText - (optional) Text to be displayed while loading. Error text is inferred from this.
   */
  const createToast = (promise: Promise<any>, loadingText?: string) => {
    const errorText = loadingText?.toLowerCase().replace('...', '');
    return toast.promise(
      promise,
      {
        loading: loadingText || 'Loading...',
        success: 'All done!',
        error: `Error ${errorText} 🫤`,
      },
      {
        position: 'bottom-center',
      }
    );
  };

  /* Intersection Observer callback function 
   (memoize the handleObserver to avoid triggering unnecessary re-renders, 
   function will only be recreated if any of its dependencies change, and not on every render) */
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage) {
        setIsFetching(true);
        searchUsersFetchMore({
          variables: { after: endCursor },
          updateQuery: (prevResult, { fetchMoreResult }) => {
            fetchMoreResult.users.edges = [
              ...prevResult.users.edges,
              ...fetchMoreResult.users.edges,
            ];
            setIsFetching(false);
            return fetchMoreResult;
          },
        });
      }
    },
    [endCursor, hasNextPage, searchUsersFetchMore]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, { threshold: 1 });

    if (lastItemRef.current) {
      observer.observe(lastItemRef.current);
    }

    let currentRef = lastItemRef.current;

    // Observe changes to the lastItemRef.current value and update the observer accordingly, because initial value will be null
    const updateObserver = () => {
      if (currentRef !== lastItemRef.current) {
        if (currentRef) {
          observer.unobserve(currentRef);
        }

        if (lastItemRef.current) {
          observer.observe(lastItemRef.current);
          currentRef = lastItemRef.current;
        }
      }
    };

    const timeoutId = setInterval(updateObserver, 1000);

    // Return cleanup function that clears the intrval and disconnects observer.
    return () => {
      clearInterval(timeoutId);
      observer.disconnect();
    };
  }, [handleObserver, lastItemRef]);

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

  // 3. Add Organizer
  const [
    addOrganizerMutation,
    {
      data: addOrganizerData,
      loading: addOrganizerLoading,
      error: addOrganizerError,
    },
  ] = useMutation(AddOrganizerDocument);

  // 4. Remove Organizer
  const [
    removeOrganizerMutation,
    {
      data: removeOrganizerData,
      loading: removeOrganizerLoading,
      error: removeOrganizerError,
    },
  ] = useMutation(RemoveOrganizerDocument);

  /* Handlers */
  // 1. Add Event Handler
  const handleAddEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let promise = createEventMutation({
      variables: {
        eventType: eventType,
        name: eventName,
      },
    }).then((res) => {
      if (res.data?.createEvent.__typename === 'MutationCreateEventSuccess') {
        handleClose();
        return eventsRefetch();
      }
    });
    createToast(promise, 'Adding event...');
  };

  // 2. Delete Event Handler
  const handleDeleteEvent = (id: number) => {
    let promise = deleteEventMutation({
      variables: {
        id: id,
      },
    }).then((res) => {
      if (res.data?.deleteEvent.__typename === 'MutationDeleteEventSuccess') {
        handleClose();
        return eventsRefetch();
      }
    });
    createToast(promise, 'Deleting event...');
  };

  // 3. Modal Handlers
  const handleOpen = (content: string) => {
    setModalContent(content);
    setIsOpen(true);
  };
  const handleClose = () => {
    setModalContent(null);
    setIsOpen(false);
  };

  // 4. Add Organizer Handler
  const handleAddOrganizer = (id: number, organizerId: string) => {
    let promise = addOrganizerMutation({
      variables: {
        eventId: id.toString(),
        userId: organizerId,
      },
    }).then((res) => {
      if (res.data?.addOrganizer.__typename === 'MutationAddOrganizerSuccess') {
        return eventsRefetch();
      }
    });
    createToast(promise, 'Adding organizer...');
  };

  // 5. Remove Organizer Handler
  const handleRemoveOrganizer = (id: number, organizerId: string) => {
    let promise = removeOrganizerMutation({
      variables: {
        eventId: id.toString(),
        userId: organizerId,
      },
    }).then((res) => {
      if (
        res.data?.removeOrganizer.__typename ===
        'MutationRemoveOrganizerSuccess'
      ) {
        return eventsRefetch();
      }
    });
    createToast(promise, 'Removing organizer...');
  };

  // Get branch name
  const branch = events?.eventsByBranchRep.find((event) => event.branch.name)
    ?.branch.name;

  if (loading)
    return (
      <div className="h-screen w-screen flex justify-center">
        <Spinner />
      </div>
    );

  if (!user) {
    router.push('/auth/login');
    return <div>Redirecting...</div>;
  }

  if (user && user.role !== 'BRANCH_REP') router.push('/profile');

  return (
    <Dashboard>
      <Toaster />
      {/* Welcome Header */}
      <div className="text-xl flex justify-between">
        <div>
          <h1 className="text-4xl mb-3">
            Hello <span className="font-semibold">{user?.name}</span>!
          </h1>
          <div className="flex gap-3 items-center">
            <h1 className="text-2xl ">Registered Events</h1>
            {branch && <Badge color={'success'}>{branch}</Badge>}
          </div>
        </div>
      </div>
      <div className="mt-3">
        <EventList branchRepId={user.id} />
      </div>
    </Dashboard>
  );
};

export default BranchRep;

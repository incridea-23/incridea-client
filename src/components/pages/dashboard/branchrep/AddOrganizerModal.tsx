import Button from '@/src/components/button';
import {
  EventsByBranchRepQuery,
  SearchUsersDocument,
} from '@/src/generated/generated';
import { useQuery } from '@apollo/client';
import { FC, useState, useRef, useEffect, useCallback } from 'react';
import SearchBox from '@/src/components/searchbox';
import Spinner from '@/src/components/spinner';
import RemoveOrganizerButton from './RemoveOrganizerButton';
import Modal from '@/src/components/modal';
import AddOrganizerButton from './AddOrganizerButton';

const AddOrganizerModal: FC<{
  eventId: string;
  organizers: EventsByBranchRepQuery['eventsByBranchRep'][0]['organizers'];
  eventsRefetch: () => Promise<any>;
  eventName: string;
}> = ({ eventId, organizers, eventsRefetch, eventName }) => {
  const [showModal, setShowModal] = useState(false);

  function handleCloseModal() {
    setShowModal(false);
  }


  // Search Users Query
  // Currently searched user
  const [name, setName] = useState<string>('');

  const {
    data: searchUsersData,
    loading: searchUsersLoading,
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

  return (
    <>
      <Button
        className="mx-auto"
        onClick={() => {
          setShowModal(true);
        }}
      >
        Edit Organizers
        <span className="font-light">
          {organizers.length > 0 && <span>({organizers.length})</span>}
        </span>
      </Button>
      <Modal
        showModal={showModal}
        onClose={handleCloseModal}
        size="medium"
        title="Edit Organizers"
      >
        <div
          className={`flex flex-col md:flex-row gap-3 p-3`}
        >
          <div className="basis-5/12  rounded-lg p-3">
            <div key={eventId}>
              <h1 className="font-semibold text-xl mb-3">{eventName}</h1>
              {organizers.length === 0 && (
                <div className="h-64 flex items-center justify-center text-gray-400">
                  <h1 className="">No organizers added</h1>
                </div>
              )}
              <div className="md:max-h-80 max-h-64 overflow-y-auto pt-1">
                {organizers.map((organizer) => (
                  <div
                    key={organizer.user.id}
                    className="flex mb-3 justify-between items-center gap-5"
                  >
                    <h1>{organizer.user.name}</h1>
                    <RemoveOrganizerButton
                      organizerId={organizer.user.id}
                      eventId={eventId}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* List of queried users */}
          <div className="basis-7/12 bg-gray-700 rounded-lg p-3">
            <SearchBox
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <div className="mt-3 md:max-h-72 max-h-64 md:h-72 overflow-y-auto">
              {searchUsersLoading && <Spinner size={'small'} />}
              {searchUsersData?.users?.edges.map((user, index) => (
                <div
                  key={index}
                  className="border border-gray-500  rounded-lg mb-2 mr-2 md:p-2 p-1 px-2 flex justify-between items-center"
                  ref={
                    index === searchUsersData.users.edges.length - 1
                      ? lastItemRef
                      : null
                  }
                >
                  <div>
                    <h1 className="md:text-xl text-lg">{user?.node.name}</h1>
                    <h1 className="text-sm font-thin">{user?.node.email}</h1>
                  </div>
                  <AddOrganizerButton
                    eventId={eventId}
                    userId={user?.node.id as string}
                  />
                </div>
              ))}
              {isFetching && <Spinner size={'small'} />}
              {!hasNextPage && !searchUsersLoading && (
                <p className="my-5 text-gray-400 text-center">
                  no more users to show
                </p>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddOrganizerModal;

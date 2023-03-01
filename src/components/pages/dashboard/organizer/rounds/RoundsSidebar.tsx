import {
  CreateRoundDocument,
  DeleteRoundDocument,
  EventByOrganizerQuery,
  SearchUsersDocument,
} from '@/src/generated/generated';
import { Tab } from '@headlessui/react';
import { useMutation, useQuery } from '@apollo/client';
import { BiLoaderAlt } from 'react-icons/bi';
import { AiOutlinePlus } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { FC, useEffect, useState, useRef, useCallback } from 'react';
import Button from '@/src/components/button';
import Spinner from '@/src/components/spinner';
import SearchBox from '@/src/components/searchbox';

const RoundsSidebar: FC<{
  rounds: EventByOrganizerQuery['eventByOrganizer'][0]['rounds'];
  eventId: string;
}> = ({ rounds, eventId }) => {
  const [createRound, { data, loading, error }] = useMutation(
    CreateRoundDocument,
    {
      refetchQueries: ['EventByOrganizer'],
      variables: {
        eventId: eventId,
      },
    }
  );

  const [deleteRound, { data: data2, loading: loading2, error: error2 }] =
    useMutation(DeleteRoundDocument, {
      refetchQueries: ['EventByOrganizer'],
      variables: {
        eventId: eventId,
      },
    });

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

  const { endCursor, hasNextPage } = searchUsersData?.users.pageInfo || {};

  const lastItemRef = useRef<HTMLDivElement>(null);

  const [isFetching, setIsFetching] = useState(false);

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

    return () => {
      clearInterval(timeoutId);
      observer.disconnect();
    };
  }, [handleObserver, lastItemRef]);

  return (
    <div className="flex flex-col gap-5 px-2 pb-2">
      <Tab.Group>
        <Tab.List className="flex flex-row overflow-x-auto items-center gap-2 backdrop-blur-md rounded-2xl border p-3  w-full  border-gray-600 bg-gray-900/30">
          {rounds.map((round) => (
            <Tab key={round.roundNo} className="focus:outline-none md:w-full">
              {({ selected }) => (
                <button
                  className={` px-3 whitespace-nowrap py-2 rounded-lg  w-full ${
                    selected
                      ? 'bg-blue-900/40 text-white'
                      : 'bg-gray-600/40 text-gray-300'
                  }`}
                >
                  Round {round.roundNo}
                </button>
              )}
            </Tab>
          ))}
          <div className="flex gap-2 items-end justify-center  text-xs">
            <button
              className="bg-blue-500/50 text-white p-3 w-fit rounded-xl inline-flex gap-1 items-center"
              disabled={loading2 || loading}
              onClick={() => {
                createRound();
              }}
            >
              {loading ? (
                <>
                  <BiLoaderAlt className="animate-spin text-xl" />
                  Adding...{' '}
                </>
              ) : (
                <>
                  <AiOutlinePlus className=" text-xl" /> Add
                </>
              )}
            </button>
            <button
              className="bg-red-500 text-white p-3 w-fit rounded-xl inline-flex gap-1 items-center"
              disabled={loading2 || loading}
              onClick={() => {
                deleteRound();
              }}
            >
              {loading2 ? (
                <>
                  <BiLoaderAlt className="animate-spin text-xl" />
                  Deleting...
                </>
              ) : (
                <>
                  <MdDelete className=" text-xl" />
                  Delete
                </>
              )}
            </button>
          </div>
        </Tab.List>

        <Tab.List className="flex flex-row">
          <div className="w-1/2 p-3 mx-2 basis-7/12 bg-gray-700 rounded-lg">
            <h1 className="text-xl font-bold">Judges</h1>
          </div>
          <div className="basis-7/12 bg-gray-700 rounded-lg p-3 w-1/2">
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
                  <Button
                    intent={'secondary'}
                    size="small"
                    className="flex gap-1 items-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200"
                    // onClick={() =>
                    //   handleAddOrganizer(
                    //     currentEvent?.id as number,
                    //     user?.node.id as string
                    //   )
                    // }
                  >
                    Add
                    <AiOutlinePlus />
                  </Button>
                </div>
              ))}
              {isFetching && <Spinner size={'small'} />}
              {!hasNextPage && !searchUsersLoading && (
                <p className="my-5 text-gray-400 text-center">
                  No more users to show
                </p>
              )}
            </div>
          </div>
        </Tab.List>
      </Tab.Group>
    </div>
  );
};

export default RoundsSidebar;

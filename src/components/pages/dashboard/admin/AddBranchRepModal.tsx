import { BranchesQuery } from '@/src/generated/generated';
import { useQuery } from '@apollo/client';
import { FC,useState,useEffect,useRef,useCallback } from 'react';
import { SearchUsersDocument } from '@/src/generated/generated';
import Spinner from '@/src/components/spinner';
import SearchBox from '@/src/components/searchbox';
import AddBranchRepButton from './AddBranchRepButton';
import RemoveBranchRepButton from './RemoveBranchRepButton';
import Badge from '@/src/components/badge';

const AddBranchRep: FC<{
    branchId: string;
    branchName: string;
    branchReps: BranchesQuery['getBranches'][0]['branchReps'];
}
> = ({ branchId, branchName, branchReps }) => {

    // Search Users Query
  // Currently searched user
const [name, setName] = useState<string>("");

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
        <div
          className={`flex flex-col md:flex-row gap-3 p-3`}
        >
          <div className="basis-5/12  rounded-lg p-3">
            <div key={branchId}>
              <h1 className="font-semibold text-xl mb-3">
                <Badge
                  color="success"
                  className="md:text-lg"
                >
                  {branchName}
                </Badge>
              </h1>
              {branchReps.length === 0 && (
                <div className="h-64 flex items-center justify-center text-gray-400">
                  <h1 className="">No Branch Representatives added</h1>
                </div>
              )}
              <div className="overflow-y-auto rounded-lg bg-gray-700 p-3">
                {branchReps.map((branchRep) => (
                  <div
                    key={branchRep.userId}
                    className="flex mb-3 justify-between items-center gap-5  border border-gray-500 rounded-lg p-2 py-1"
                  >
                    <div>
                      <h1 className="text-base">
                        {branchRep.user.id}
                      </h1>
                      <h1 className="text-base">
                        {branchRep.user.name}
                      </h1>
                      <h1 className="md:text-sm text-xs font-thin">
                        {branchRep.user.email}
                      </h1>
                    </div>
                    <div className="flex justify-center items-center">
                      <RemoveBranchRepButton
                        branchId={branchId as string}
                        userId={branchRep.userId as string}
                      />
                    </div>
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
                  <AddBranchRepButton
                    branchId={branchId as string}
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
      )
}


export default AddBranchRep;
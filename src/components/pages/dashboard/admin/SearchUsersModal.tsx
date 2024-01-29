import { useQuery } from "@apollo/client";
import { useState, useEffect, useRef, useCallback } from "react";
import { SearchUsersDocument } from "@/src/generated/generated";
import Modal from "@/src/components/modal";
import Spinner from "@/src/components/spinner";
import { RiUserSearchFill } from "react-icons/ri";
import Button from "@/src/components/button";
import SearchBox from "@/src/components/searchbox";
import Badge from "@/src/components/badge";


const SearchUsers = () => {

    const [showModal, setShowModal] = useState(false);
    
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

return (<>
    <Button
        intent={'info'}
        className='flex gap-2 items-center justify-center'
        size={'medium'}
        onClick={() => setShowModal(true)}
    >
        <RiUserSearchFill />Users
    </Button>
    <Modal
        title="Search Users"
        showModal={showModal}
        onClose={() => setShowModal(false)}
    >
        {/* List of queried users */}
        <div className="basis-7/12 bg-gray-700 rounded-lg p-3">
            <SearchBox
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <div className="hidden md:flex mt-2 mr-4 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg bg-clip-padding rounded-t-lg p-1 items-center justify-between gap-2.5 text-base font-bold h-10">
                <h1 className="basis-1/3 py-2.5 text-start pl-2">PID</h1>
                <h1 className="basis-1/3 py-2.5 text-center pr-5">User Name</h1>
                <h1 className="basis-1/3 py-2.5 text-end pr-5">Role</h1>
            </div>
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
                    <div className="flex flex-row w-full justify-center items-center">
                        <h1 className="md:text-xl text-sm text-start basis-1/4">{user?.node.id}</h1>
                        <h1 className="flex justify-start md:justify-center items-center  md:text-xl text-lg text-center basis-2/4">{user?.node.name}</h1>
                        <h1 className="md:text-xl text-lg text-end basis-1/4">
                            <Badge
                                color={user?.node.role === 'ADMIN' ? 'success' : user?.node.role==='USER' ? 'danger' : user?.node.role==='PARTICIPANT' ? 'success' : user?.node.role==='BRANCHREP' ? 'info': user?.node.role === "ORGANIZER" ? 'info' : user?.node.role === 'JUDGE' ? 'info' : 'danger'}
                            >
                                {user?.node.role}
                            </Badge>
                        </h1>
                    </div>
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
    </Modal>
</>
)
}

export default SearchUsers;
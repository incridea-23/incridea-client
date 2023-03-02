import Button from '@/src/components/button';
import Spinner from '@/src/components/spinner';
import createToast from '@/src/components/toast';
import {
  OrganizerMarkAttendanceDocument,
  TeamsByRoundDocument,
} from '@/src/generated/generated';
import { useMutation, useQuery } from '@apollo/client/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import ViewTeamModal from './ViewTeamModal';

function Teams({
  roundNo,
  eventId,
  contains,
}: {
  roundNo: number;
  eventId: string;
  contains?: string;
}) {
  const { data, loading, error, fetchMore } = useQuery(TeamsByRoundDocument, {
    variables: {
      roundNo,
      eventId,
      first: 10,
      contains,
    },
  });

  const [markAttendance, { loading: AttendanceLoading }] = useMutation(
    OrganizerMarkAttendanceDocument,
    {
      refetchQueries: ['TeamsByRound'],
      awaitRefetchQueries: true,
    }
  );

  const { endCursor, hasNextPage } = data?.teamsByRound.pageInfo || {};
  const lastItemRef = useRef<HTMLDivElement>(null);
  const [isFetching, setIsFetching] = useState(false);
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage) {
        setIsFetching(true);
        fetchMore({
          variables: { after: endCursor },
          updateQuery: (prevResult, { fetchMoreResult }) => {
            fetchMoreResult.teamsByRound.edges = [
              ...prevResult.teamsByRound.edges,
              ...fetchMoreResult.teamsByRound.edges,
            ];
            setIsFetching(false);
            return fetchMoreResult;
          },
        });
      }
    },
    [endCursor, hasNextPage, fetchMore]
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

  if (loading) return <Spinner />;
  if (!data || data.teamsByRound.edges.length === 0)
    return (
      <p className="my-3 text-gray-400/70 italic text-center">no teams here</p>
    );
  return (
    <div>
      {data.teamsByRound.edges.map((team, index) => (
        <div
          className="bg-gray-600/40 p-3 mb-2 items-center rounded-lg flex justify-between flex-wrap gap-2"
          key={team?.node.id}
          ref={
            index === data.teamsByRound.edges.length - 1 ? lastItemRef : null
          }
        >
          <h2 className="text-xl font-semibold"> {team?.node.name}</h2>
          <div className="flex flex-col md:flex-row gap-2">
            <Button
              onClick={() => {
                let promise = markAttendance({
                  variables: {
                    teamId: team?.node.id as string,
                    attended: !team?.node.attended,
                  },
                });
                createToast(promise, 'Updating Attendance');
              }}
              disabled={AttendanceLoading}
              intent={team?.node.attended ? 'danger' : 'primary'}
            >
              {team?.node.attended ? 'Unmark Attendance' : 'Mark Present'}
            </Button>
            <ViewTeamModal
              teamName={team?.node.name || ''}
              teamMembers={team?.node.members}
            />
          </div>
        </div>
      ))}
      {isFetching && <Spinner />}
      {!hasNextPage && !loading && (
        <p className="my-3 mt-5 text-gray-400/70 italic text-center">
          no more teams/users to show
        </p>
      )}
    </div>
  );
}

export default Teams;

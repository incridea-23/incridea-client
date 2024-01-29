import Badge from '@/src/components/badge';
import Spinner from '@/src/components/spinner';
import { TeamsByRoundDocument } from '@/src/generated/generated';
import { useQuery } from '@apollo/client/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import DeleteTeamModal from './DeleteTeamModal';
import MarkAttendanceButton from './MarkAttendanceButton';
import ViewTeamModal from './ViewTeamModal';
import { idToTeamId } from '@/src/utils/id';

function Teams({
  eventType,
  roundNo,
  eventId,
  contains,
}: {
  eventType: string;
  roundNo: number;
  eventId: string;
  contains?: string;
}) {
  const { data, loading, error, fetchMore } = useQuery(TeamsByRoundDocument, {
    variables: {
      roundNo,
      eventId,
      first: 20,
      contains,
    },
  });

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

  const teamOrParticipant =
    eventType === 'INDIVIDUAL' || eventType === 'INDIVIDUAL_MULTIPLE_ENTRY'
      ? 'Participant'
      : 'Team';

  if (loading) return <Spinner />;
  if (!data || data.teamsByRound.edges.length === 0)
    return (
      <p className="my-3 text-gray-400/70 italic text-center">no teams here</p>
    );

  return (
    <div>
      {data.teamsByRound.edges.map((team, index) => (
        <div
          className="bg-gray-600/40 p-3 mb-2 items-center rounded-lg flex justify-start text-start md:text-center md:justify-between flex-wrap gap-2 flex-col md:flex-row flex-wrap "
          key={team?.node.id}
          ref={
            index === data.teamsByRound.edges.length - 1 ? lastItemRef : null
          }
        >
          <h2 className="text-base md:text-xl font-semibold flex gap-2 flex-col md:flex-row justify-center items-center">
            <Badge color={'info'}>{idToTeamId(team?.node.id!)}</Badge>
            {team?.node.name}
          </h2>
          <div className="flex md:flex-row gap-2">

            {/* Mark Attendance */}
            <MarkAttendanceButton
              attended={team?.node.attended as boolean}
              teamId={team?.node.id as string}
            />

            {/* View Team */}
            <ViewTeamModal
              teamId={team?.node.id as string}
              teamName={team?.node.name || ''}
            />

            {/* Delete Team or Participant */}
            <DeleteTeamModal
              attended={team?.node.attended as boolean}
              teamId={team?.node.id as string}
              teamOrParticipant={teamOrParticipant}
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

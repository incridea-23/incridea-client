import Spinner from '@/src/components/spinner';
import { EventType, TeamsByRoundDocument } from '@/src/generated/generated';
import { idToTeamId } from '@/src/utils/id';
import { useQuery } from '@apollo/client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

type Props = {
  eventId: string;
  roundNo: number;
  eventType: string;
};

const TeamList = ({ eventId, roundNo, eventType }: Props) => {
  const [query, setQuery] = React.useState('');

  const { data, loading, error, fetchMore } = useQuery(TeamsByRoundDocument, {
    variables: {
      roundNo,
      eventId,
      first: 20,
      contains: query,
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

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-3 shadow-sm mb-1 rounded-t-lg top-0 sticky bg-[#35436F]">
        <div className=" relative">
          <input
            type={'text'}
            placeholder="Search by name or PID"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={`bg-white/20 w-full  h-10 px-4 pr-16 rounded-lg text-sm placeholder:text-white/60 focus:outline-none focus:ring-2 ring-white/40`}
          />
          <AiOutlineSearch
            size={'1.4rem'}
            className="absolute right-3 top-2.5 text-white/60"
          />
        </div>
      </div>

      <div className="flex px-3 pb-3 flex-col gap-2 mt-3">
        {loading && <Spinner />}
        {(!loading && !data) ||
          (data?.teamsByRound.edges.length === 0 && (
            <p className="my-3 mt-5 text-gray-400/70 italic text-center">
              No {teamOrParticipant}s found.
            </p>
          ))}
        {data?.teamsByRound.edges.map((team, index) => (
          <div
            key={team?.node.id}
            ref={
              index === data.teamsByRound.edges.length - 1 ? lastItemRef : null
            }
            className="flex items-center p-2 px-5 bg-white/10 rounded-lg hover:bg-white/20"
          >
            <div className="flex flex-row gap-5">
              <div className="text-white/80">{team?.node.name}</div>
              <div className="text-white/60">{idToTeamId(team?.node.id!)}</div>
            </div>
          </div>
        ))}
        {isFetching && <Spinner />}
        {!(data?.teamsByRound.edges.length === 0) &&!hasNextPage && !loading && (
          <p className="my-3 mt-5 text-gray-400/70 italic text-center">
            no more teams/users to show
          </p>
        )}
      </div>
    </div>
  );
};

export default TeamList;

import Button from '@/src/components/button';
import Spinner from '@/src/components/spinner';
import {
  JudgeGetTeamsByRoundDocument,
  PromoteToNextRoundDocument,
} from '@/src/generated/generated';
import { idToTeamId } from '@/src/utils/id';
import { useMutation, useSubscription } from '@apollo/client';
import React, { useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

type Props = {
  eventId: string;
  roundNo: number;
  eventType: string;
  selectedTeam: string | null;
  setSelectedTeam: React.Dispatch<React.SetStateAction<string | null>>;
};

const TeamList = ({
  eventId,
  roundNo,
  eventType,
  selectedTeam,
  setSelectedTeam,
}: Props) => {
  const [query, setQuery] = React.useState('');

  const { data, loading, error } = useSubscription(
    JudgeGetTeamsByRoundDocument,
    {
      variables: {
        roundId: roundNo,
        eventId: Number(eventId),
      },
    }
  );

  // as soon as data is available, select the first team
  useEffect(() => {
    if (data?.judgeGetTeamsByRound && data.judgeGetTeamsByRound.length > 0) {
      setSelectedTeam(data?.judgeGetTeamsByRound.map((t) => t.id)[0]!);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.judgeGetTeamsByRound]);

  const [
    promote,
    { data: promoteData, loading: promoteLoading, error: promoteError },
  ] = useMutation(PromoteToNextRoundDocument, {
    refetchQueries: ['TeamsByRound'],
    awaitRefetchQueries: true,
  });

  const teamOrParticipant =
    eventType === 'INDIVIDUAL' || eventType === 'INDIVIDUAL_MULTIPLE_ENTRY'
      ? 'Participant'
      : 'Team';

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-3 shadow-sm mb-1 rounded-t-lg top-0 sticky bg-[#35436F] flex justify-between">
        <div className="relative w-full mr-5">
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
        <Button intent={'success'} noScaleOnHover>
          Select
        </Button>
      </div>

      <div className="flex px-3 pb-3 flex-col gap-2 mt-3">
        {loading && <Spinner />}
        {(!loading && !data) ||
          (data?.judgeGetTeamsByRound.length === 0 && (
            <p className="my-3 mt-5 text-gray-400/70 italic text-center">
              No {teamOrParticipant}s found.
            </p>
          ))}
        {data?.judgeGetTeamsByRound.map((team, index) => (
          <div
            key={team?.id}
            onClick={() => {
              setSelectedTeam(team?.id!);
            }}
            className={`flex items-center p-2 px-5 bg-white/10 rounded-lg ${
              selectedTeam === team?.id
                ? 'bg-white/50'
                : 'hover:bg-white/20 transition-colors duration-300'
            }`}
          >
            <div className="flex flex-row gap-5">
              <div
                className={`${
                  selectedTeam === team?.id ? 'text-black/80' : 'text-white/80'
                }`}
              >
                {team?.name}
              </div>
              <div
                className={`${
                  selectedTeam === team?.id ? 'text-black/60' : 'text-white/60'
                }`}
              >
                {idToTeamId(team?.id!)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamList;

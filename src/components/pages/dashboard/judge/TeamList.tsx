import Button from '@/src/components/button';
import Spinner from '@/src/components/spinner';
import createToast from '@/src/components/toast';
import {
  JudgeGetTeamsByRoundSubscription,
  PromoteToNextRoundDocument,
} from '@/src/generated/generated';
import { idToTeamId } from '@/src/utils/id';
import { useMutation } from '@apollo/client';
import React, { useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

type Props = {
  data: JudgeGetTeamsByRoundSubscription | undefined;
  loading: boolean;
  roundNo: number;
  eventType: string;
  selectedTeam: string | null;
  setSelectedTeam: React.Dispatch<React.SetStateAction<string | null>>;
  selectionMode: boolean;
  setSelectionMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const TeamList = ({
  data,
  loading,
  roundNo,
  eventType,
  selectedTeam,
  setSelectedTeam,
  selectionMode,
  setSelectionMode,
}: Props) => {
  const [query, setQuery] = React.useState('');
  const [promote, { loading: promoteLoading }] = useMutation(
    PromoteToNextRoundDocument
  );

  const teamOrParticipant =
    eventType === 'INDIVIDUAL' || eventType === 'INDIVIDUAL_MULTIPLE_ENTRY'
      ? 'Participant'
      : 'Team';

  const handlePromote = (teamId: string) => {
    const promise = promote({
      variables: {
        teamId,
        roundNo: roundNo.toString(),
        selected: true,
      },
    });
    createToast(promise, 'Promoting team to next round...');
  };

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
        <Button
          onClick={() => {
            setSelectionMode(!selectionMode);
          }}
          intent={'success'}
          noScaleOnHover
        >
          {selectionMode ? 'Done' : 'Select'}
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
        {data?.judgeGetTeamsByRound
          .filter(
            (team) =>
              team.roundNo === roundNo &&
              (idToTeamId(team.id)
                .toLowerCase()
                .includes(query.toLowerCase()) ||
                team.name.toLowerCase().includes(query.toLowerCase()))
          )
          .map((team) => (
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
              <div className="flex flex-row gap-5 w-full">
                <div
                  className={`basis-1/3 ${
                    selectedTeam === team?.id
                      ? 'text-black/80'
                      : 'text-white/80'
                  }`}
                >
                  {team?.name}
                </div>
                <div
                  className={`basis-1/3 ${
                    selectedTeam === team?.id
                      ? 'text-black/60'
                      : 'text-white/60'
                  }`}
                >
                  {idToTeamId(team?.id!)}
                </div>
                {selectionMode && (
                  <input
                    disabled={promoteLoading}
                    type="checkbox"
                    className="h-5 w-5 text-white/80 basis-1/3"
                    onChange={() => handlePromote(team?.id!)}
                  />
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TeamList;

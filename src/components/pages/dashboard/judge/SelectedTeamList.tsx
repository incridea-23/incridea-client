import Button from '@/src/components/button';
import createToast from '@/src/components/toast';
import {
  JudgeGetTeamsByRoundSubscription,
  PromoteToNextRoundDocument,
} from '@/src/generated/generated';
import { idToTeamId } from '@/src/utils/id';
import { useMutation } from '@apollo/client';
import { AiOutlineClose } from 'react-icons/ai';

const SelectedTeamList = ({
  teams,
  roundNo,
}: {
  teams: JudgeGetTeamsByRoundSubscription;
  roundNo: number;
}) => {
  const [promote, { loading: promoteLoading }] = useMutation(
    PromoteToNextRoundDocument
  );

  const handlePromote = (teamId: string) => {
    const promise = promote({
      variables: {
        teamId,
        roundNo: roundNo.toString(),
        selected: false,
      },
      refetchQueries: ['GetTotalScores'],
      awaitRefetchQueries: true,
    });
    createToast(promise, 'Removing team...');
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="px-4 shadow-sm py-3 mb-2 rounded-t-lg bg-[#35436F] sticky top-0">
        <h1 className="text-2xl font-semibold">Selected Teams</h1>
      </div>
      {!(
        teams.judgeGetTeamsByRound.filter((team) => team.roundNo > roundNo)
          .length === 0
      ) && (
        <p>
          <span className="ml-5 text-white/60">
            These teams are selected to Round {roundNo + 1}
          </span>
        </p>
      )}
      <div className="flex px-3 pb-3 flex-col gap-2 mt-3">
        <div className={`flex items-center p-2 px-5 bg-white/10 rounded-lg`}>
          <div className="flex flex-row gap-5 w-full">
            <div className={`basis-1/3 text-white/80`}>Team Name</div>
            <div className={`basis-1/3 text-white/80`}>Team ID</div>
            <div className={`basis-1/3 text-white/80`}>Remove</div>
          </div>
        </div>
        {teams.judgeGetTeamsByRound.filter((team) => team.roundNo > roundNo)
          .length === 0 && (
          <p className="my-3 mt-5 text-gray-400/70 italic text-center">
            No participants are selected to next round.
          </p>
        )}
        {teams.judgeGetTeamsByRound
          .filter((team) => team.roundNo > roundNo)
          .map((team, index) => (
            <div
              key={index}
              className="flex items-center p-2 px-5 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-300"
            >
              <div className="flex flex-row gap-5 w-full">
                <div className="text-white/80 basis-1/3">{team?.name}</div>
                <div className="text-white/60 basis-1/3">
                  {idToTeamId(team?.id!)}
                </div>
                <div className='basis-1/3'>
                  <Button
                    onClick={() => {
                      handlePromote(team?.id!);
                    }}
                  >
                    <AiOutlineClose />
                  </Button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SelectedTeamList;

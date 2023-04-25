import Badge from '@/src/components/badge';
import Button from '@/src/components/button';
import Modal from '@/src/components/modal';
import Spinner from '@/src/components/spinner';
import createToast from '@/src/components/toast';
import {
  CompleteRoundDocument,
  JudgeGetTeamsByRoundSubscription,
  WinnersByEventQuery,
} from '@/src/generated/generated';
import { idToPid, idToTeamId } from '@/src/utils/id';
import { useMutation } from '@apollo/client';
import { useState } from 'react';

const ConfirmRoundModal = ({
  roundNo,
  winners,
  winnersLoading,
  eventId,
  finalRound,
  selectedTeams,
  solo,
}: {
  roundNo: number;
  winners: WinnersByEventQuery | undefined;
  winnersLoading: boolean;
  eventId: string;
  finalRound: boolean;
  selectedTeams: JudgeGetTeamsByRoundSubscription;
  solo: boolean;
}) => {
  const [showModal, setShowModal] = useState(false);

  function handleCloseModal() {
    setShowModal(false);
  }

  const [completeRound, { loading: completeLoading }] = useMutation(
    CompleteRoundDocument,
    {
      refetchQueries: ['RoundByJudge'],
      awaitRefetchQueries: true,
    }
  );

  const handleComplete = () => {
    const promise = completeRound({
      variables: {
        roundNo,
        eventId,
      },
    }).then((data) => {
      if (
        data.data?.completeRound.__typename === 'MutationCompleteRoundSuccess'
      ) {
        setShowModal(false);
      }
    });
    createToast(promise, 'Confirming winners...');
  };

  const disabled =
    winners?.winnersByEvent.__typename === 'QueryWinnersByEventSuccess' &&
    winners?.winnersByEvent.data.some((winner) => winner.type === 'WINNER') &&
    winners?.winnersByEvent.data.some(
      (winner) => winner.type === 'RUNNER_UP'
    ) &&
    winners?.winnersByEvent.data.some(
      (winner) => winner.type === 'SECOND_RUNNER_UP'
    );

  return (
    <>
      <Button
        onClick={() => {
          setShowModal(true);
        }}
        disabled={finalRound ? !disabled : false}
        intent={'success'}
        className="w-fit"
        noScaleOnHover
      >
        Confirm {finalRound ? 'Winners' : solo ? 'Participants' : 'Teams'}
      </Button>
      <Modal
        title={`Confirm ${
          finalRound ? 'Winners' : solo ? 'Participants' : 'Teams'
        }`}
        showModal={showModal}
        onClose={handleCloseModal}
        size="medium"
      >
        <div className="p-5">
          <p>
            Are you sure you want to confirm the{' '}
            {finalRound ? 'Winners' : solo ? 'Participants' : 'Teams'}?
            <br />
            Note that this action cannot be undone.
          </p>
          {/* Non final round - Confirming participant selection for next round */}
          {!finalRound &&
            selectedTeams.judgeGetTeamsByRound.filter(
              (team) => team.roundNo > roundNo
            ).length === 0 && (
              <p className="text-lg text-white/60">
                No {solo ? 'Participants' : 'Teams'} to confirm.
              </p>
            )}

          {!finalRound && (
            <div className="flex flex-wrap gap-5 my-4">
              {selectedTeams.judgeGetTeamsByRound
                .filter((team) => team.roundNo > roundNo)
                .map((team) => {
                  return (
                    <div
                      className="flex flex-col gap-2 justify-start items-center p-3 bg-gray-600 rounded-lg w-fit flex-1"
                      key={team.id}
                      style={{
                        minWidth: '200px',
                      }}
                    >
                      {!solo && (
                        <h1 className="text-xl font-semibold">{team.name}</h1>
                      )}
                      <p className="text-lg text-white/60">
                        {solo
                          ? idToPid(team.leaderId?.toString()!)
                          : idToTeamId(team.id)}
                      </p>
                    </div>
                  );
                })}
            </div>
          )}

          {!finalRound &&
            selectedTeams.judgeGetTeamsByRound.filter(
              (team) => team.roundNo > roundNo
            ).length !== 0 && (
              <Button
                onClick={() => {
                  handleComplete();
                }}
                disabled={completeLoading}
                intent={'success'}
                noScaleOnHover
              >
                {completeLoading ? (
                  <Spinner intent={'white'} />
                ) : (
                  `Confirm ${solo ? 'Participants' : 'Teams'}`
                )}
              </Button>
            )}

          {/* Final round - Confirming winners */}
          {finalRound && winnersLoading && <Spinner />}
          {finalRound && (
            <div className="flex flex-wrap gap-5 my-2">
              {winners?.winnersByEvent.__typename ===
                'QueryWinnersByEventSuccess' &&
                winners.winnersByEvent.data.map((winner) => {
                  return (
                    <div
                      className="flex flex-col gap-2 justify-start items-center p-3 bg-gray-600 rounded-lg w-fit my-2 flex-1"
                      key={winner.id}
                      style={{
                        minWidth: '200px',
                      }}
                    >
                      <h1 className="text-xl font-semibold">
                        {winner.team.name}
                      </h1>
                      <p className="text-lg text-white/60">
                        {solo
                          ? idToPid(winner.team.leaderId?.toString()!)
                          : idToTeamId(winner.team.id)}
                      </p>
                      <Badge className="text-xs">
                        {winner.type.replaceAll('_', ' ')}
                      </Badge>
                    </div>
                  );
                })}
            </div>
          )}

          {finalRound &&
            winners?.winnersByEvent.__typename ===
              'QueryWinnersByEventSuccess' && (
              <Button
                onClick={() => {
                  handleComplete();
                }}
                disabled={completeLoading}
                intent={'success'}
                noScaleOnHover
              >
                {completeLoading ? <Spinner intent={'white'} /> : 'Confirm Winners'}
              </Button>
            )}
        </div>
      </Modal>
    </>
  );
};

export default ConfirmRoundModal;

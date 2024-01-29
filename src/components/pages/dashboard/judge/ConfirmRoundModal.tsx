import Badge from '@/src/components/badge';
import Button from '@/src/components/button';
import Modal from '@/src/components/modal';
import Spinner from '@/src/components/spinner';
import createToast from '@/src/components/toast';
import {
  CompleteRoundDocument,
  GetTotalScoresDocument,
  JudgeGetTeamsByRoundSubscription,
  WinnersByEventQuery,
} from '@/src/generated/generated';
import { idToPid, idToTeamId } from '@/src/utils/id';
import { useMutation, useQuery } from '@apollo/client';
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

  const { data: scores, loading: scoresLoading } = useQuery(
    GetTotalScoresDocument,
    {
      variables: {
        eventId: eventId!,
        roundNo: roundNo!,
      },
      skip: !eventId || !roundNo,
    }
  );

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

          {!finalRound && (
            <div className="hidden md:flex flex-row justify-evenly p-2 bg-gray-600 rounded-lg mb-2 w-full mt-2">
              <span
                className={`text-lg font-bold ${
                  solo ? 'basis-1/3' : 'basis-1/4'
                } text-center`}
              >
                Sl. No.
              </span>
              <span
                className={`text-lg font-bold ${
                  solo ? 'basis-1/3' : 'basis-1/4'
                } text-center`}
              >
                {solo ? 'PID' : 'Team ID'}
              </span>
              {!solo && (
                <span
                  className={`text-lg font-bold ${
                    solo ? 'basis-1/3' : 'basis-1/4'
                  } text-center`}
                >
                  Team Name
                </span>
              )}
              <span
                className={`text-lg font-bold ${
                  solo ? 'basis-1/3' : 'basis-1/4'
                } text-center`}
              >
                Total Score
              </span>
            </div>
          )}

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
            <div className="flex flex-wrap gap-2 my-4 w-full">
              {selectedTeams.judgeGetTeamsByRound
                .filter((team) => team.roundNo > roundNo)
                .map((team, index) => {
                  return (
                    <div
                      className="flex gap-2 justify-center text-center items-center p-3 bg-gray-600 rounded-lg w-full"
                      key={team.id}
                    >
                      <div
                        className={`${
                          solo ? 'basis-1/3' : 'basis-1/4'
                        } text-lg text-white/60`}
                      >
                        <Badge className="text-xs">{index + 1}</Badge>
                      </div>

                      {!solo && (
                        <h1
                          className={`${
                            solo ? 'basis-1/3' : 'basis-1/4'
                          } text-lg text-white/60`}
                        >
                          {team.name}
                        </h1>
                      )}

                      <p
                        className={`${
                          solo ? 'basis-1/3' : 'basis-1/4'
                        } text-lg text-white/60`}
                      >
                        {solo
                          ? idToPid(team.leaderId?.toString()!)
                          : idToTeamId(team.id)}
                      </p>

                      <p
                        className={`${
                          solo ? 'basis-1/3' : 'basis-1/4'
                        } text-lg text-white/60`}
                      >
                        {scoresLoading && <Spinner intent={'white'} />}
                        {scores?.getTotalScores.__typename ===
                          'QueryGetTotalScoresSuccess' &&
                          scores?.getTotalScores.data.find(
                            (score) => score.teamId === Number(team.id)
                          )?.totalScore}
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
            <div className="hidden md:flex flex-row justify-evenly p-2 bg-gray-600 rounded-lg mb-2 w-full mt-2">
              <span className={`text-lg font-bold  text-center`}>Sl. No.</span>
              <span className={`text-lg font-bold  text-center`}>
                {solo ? 'PID' : 'Team ID'}
              </span>
              <span className={`text-lg font-bold  text-center`}>Position</span>
              <span className={`text-lg font-bold  text-center`}>
                Total Score
              </span>
            </div>
          )}
          {finalRound && (
            <div className="flex flex-wrap gap-5 my-2 w-full">
              {winners?.winnersByEvent.__typename ===
                'QueryWinnersByEventSuccess' &&
                winners.winnersByEvent.data.map((winner, index) => {
                  return (
                    <div
                      className="flex gap-2 justify-center items-center p-3 bg-gray-600 rounded-lg w-full my-2 text-center"
                      key={winner.id}
                    >
                      <div className="text-lg text-white/60 basis-1/4">
                        <Badge className="text-xs">{index + 1}</Badge>
                      </div>
                      <p className="text-lg text-white/60 basis-1/4">
                        {solo
                          ? idToPid(winner.team.leaderId?.toString()!)
                          : idToTeamId(winner.team.id)}
                      </p>
                      <div className="basis-1/4">
                        <Badge className="text-xs">
                          {winner.type.replaceAll('_', ' ')}
                        </Badge>
                      </div>
                      <p className="text-lg text-white/60 basis-1/4">
                        {scoresLoading && <Spinner intent={'white'} />}
                        {scores?.getTotalScores.__typename ===
                          'QueryGetTotalScoresSuccess' &&
                          scores.getTotalScores.data.find(
                            (score) => score.teamId === Number(winner.team.id)
                          )?.totalScore}
                      </p>
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
                {completeLoading ? (
                  <Spinner intent={'white'} />
                ) : (
                  'Confirm Winners'
                )}
              </Button>
            )}
        </div>
      </Modal>
    </>
  );
};

export default ConfirmRoundModal;

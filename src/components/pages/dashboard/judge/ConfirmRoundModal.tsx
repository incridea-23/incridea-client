import Button from '@/src/components/button';
import Modal from '@/src/components/modal';
import Spinner from '@/src/components/spinner';
import createToast from '@/src/components/toast';
import {
  CompleteRoundDocument,
  WinnersByEventQuery,
} from '@/src/generated/generated';
import { idToTeamId } from '@/src/utils/id';
import { useMutation } from '@apollo/client';
import { useState } from 'react';

const ConfirmRoundModal = ({
  roundNo,
  winners,
  winnersLoading,
  eventId,
}: {
  roundNo: number;
  winners: WinnersByEventQuery | undefined;
  winnersLoading: boolean;
  eventId: string;
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
    });
    createToast(promise, 'Confirming winners...');
  };

  const disabled =
    winners?.winnersByEvent.__typename === 'QueryWinnersByEventSuccess' &&
    (winners?.winnersByEvent.data.filter((winner) => winner.type === 'WINNER')
      .length === 0 ||
      winners?.winnersByEvent.data.filter((winner) => winner.type === 'RUNNER')
        .length === 0 ||
      winners?.winnersByEvent.data.filter(
        (winner) => winner.type === 'SECOND_RUNNER'
      ).length === 0);

  return (
    <>
      <Button
        onClick={() => {
          setShowModal(true);
        }}
        disabled={disabled}
        intent={'success'}
        className="w-fit"
      >
        Confirm Winners
      </Button>
      <Modal
        title={`Confirm Winners?`}
        showModal={showModal}
        onClose={handleCloseModal}
        size="medium"
      >
        <div className="p-5">
          <p>
            Are you sure you want to confirm the winners for round {roundNo}?
            <br />
            Note that this action cannot be undone.
          </p>
          {winnersLoading && <Spinner />}
          {winners?.winnersByEvent.__typename ===
            'QueryWinnersByEventSuccess' &&
            winners.winnersByEvent.data.map((winner) => {
              return (
                <div
                  className="flex flex-col justify-start items-center"
                  key={winner.id}
                >
                  <h1 className="text-xl font-semibold">{winner.team.name}</h1>
                  <p className="text-lg text-white/60">
                    {idToTeamId(winner.team.id)}
                  </p>
                </div>
              );
            })}
          {winners?.winnersByEvent.__typename ===
            'QueryWinnersByEventSuccess' && (
            <Button
              onClick={() => {
                handleComplete();
              }}
              disabled={completeLoading}
              intent={'success'}
            >
              {completeLoading ? <Spinner /> : 'Confirm Winners'}
            </Button>
          )}
        </div>
      </Modal>
    </>
  );
};

export default ConfirmRoundModal;

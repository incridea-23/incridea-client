import Button from '@/src/components/button';
import Modal from '@/src/components/modal';
import Spinner from '@/src/components/spinner';
import createToast from '@/src/components/toast';
import { ConfirmTeamDocument } from '@/src/generated/generated';
import { useMutation } from '@apollo/client';
import React, { FC, useState } from 'react';
import { toast } from 'react-hot-toast';

const ConfirmTeamModal: FC<{
  teamId: string;
  canConfirm?: boolean;
  needMore?: number;
}> = ({ teamId, canConfirm, needMore }) => {
  const [showModal, setShowModal] = useState(false);

  const [confirmTeam, { loading: confirmTeamLoading }] = useMutation(
    ConfirmTeamDocument,
    {
      refetchQueries: ['RegisterdEvents'],
      awaitRefetchQueries: true,
    }
  );

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirm = (teamId: string) => {
    setShowModal(false);
    let promise = confirmTeam({
      variables: {
        teamId,
      },
    }).then((res) => {
      if (res?.data?.confirmTeam.__typename !== 'MutationConfirmTeamSuccess') {
        return Promise.reject('Error confirming team');
      }
    });
    createToast(promise, 'Confirming');
  };

  return (
    <>
      <Button
        size={'small'}
        className="mt-3 w-fit"
        onClick={() => {
          setShowModal(true);
        }}
        intent={'primary'}
        fullWidth
      >
        {'Confirm'}
      </Button>
      <Modal
        title={`Are you sure you want to confirm the team?`}
        showModal={showModal}
        onClose={handleCloseModal}
        size={'small'}
      >
        <div className="text-sm text-center p-5 bodyFont">
          You won&apos;t be able to make changes to your team after confirming.
        </div>
        <div className="flex justify-center gap-3 my-5">
          <Button
            size={'small'}
            onClick={() => {
              canConfirm
                ? handleConfirm(teamId as string)
                : toast.error(
                    `You need ${needMore} more members to confirm your team.`,
                    {
                      position: 'bottom-center',
                    }
                  );
            }}
            disabled={confirmTeamLoading}
          >
            {confirmTeamLoading ? (
              <Spinner intent={'white'} size={'small'} />
            ) : (
              'Confirm'
            )}
          </Button>
          <Button
            size={'small'}
            intent={'ghost'}
            onClick={() => handleCloseModal()}
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ConfirmTeamModal;

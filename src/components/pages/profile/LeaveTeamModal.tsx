import Button from '@/src/components/button';
import Modal from '@/src/components/modal';
import Spinner from '@/src/components/spinner';
import createToast from '@/src/components/toast';
import { LeaveTeamDocument } from '@/src/generated/generated';
import { useMutation } from '@apollo/client';
import React, { FC, useState } from 'react';

const LeaveTeamModal: FC<{
  teamId: string;
}> = ({ teamId }) => {
  const [showModal, setShowModal] = useState(false);

  const [leaveTeam, { loading }] = useMutation(
    LeaveTeamDocument,
    {
      refetchQueries: ['RegisterdEvents'],
      awaitRefetchQueries: true,
    }
  );

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleLeave = (teamId: string) => {
    setShowModal(false);
    let promise = leaveTeam({
      variables: {
        teamId,
      },
    }).then((res) => {
      if (res?.data?.leaveTeam.__typename !== 'MutationLeaveTeamSuccess') {
        console.log(res.data?.leaveTeam.message);
        return Promise.reject(res.data?.leaveTeam.message);
      }
    });
    createToast(promise, 'Leaving...');
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
        Leave Team
      </Button>
      <Modal
        title={`Are you sure you want to confirm the team?`}
        showModal={showModal}
        onClose={handleCloseModal}
        size={'small'}
      >
        <div className="text-sm text-center p-5">
          Are you sure you want to leave the team?
        </div>
        <div className="flex justify-center gap-3 my-5">
          <Button
            size={'small'}
            onClick={() => {
              handleLeave(teamId as string);
            }}
            disabled={loading}
          >
            {loading ? (
              <Spinner intent={'white'} size={'small'} />
            ) : (
              'Leave'
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

export default LeaveTeamModal;

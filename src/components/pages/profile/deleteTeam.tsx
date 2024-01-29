import Button from '@/src/components/button';
import Modal from '@/src/components/modal';
import Spinner from '@/src/components/spinner';
import createToast from '@/src/components/toast';
import { DeleteTeamDocument } from '@/src/generated/generated';
import { useMutation } from '@apollo/client';
import React, { FC, useState } from 'react';
import { BiTrashAlt } from 'react-icons/bi';
import { FaSignOutAlt } from 'react-icons/fa';

const DeleteTeamModal: FC<{
  teamId: string;
  solo?: boolean;
}> = ({ teamId, solo }) => {
  const [showModal, setShowModal] = useState(false);

  const [deleteTeam, { loading: deleteTeamLoading }] = useMutation(
    DeleteTeamDocument,
    {
      refetchQueries: ['RegisterdEvents', 'MyTeam'],
      awaitRefetchQueries: true,
    }
  );

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDelete = (teamId: string) => {
    setShowModal(false);
    let promise = deleteTeam({
      variables: {
        teamId: teamId,
      },
    }).then((res) => {
      if (res?.data?.deleteTeam.__typename !== 'MutationDeleteTeamSuccess') {
        return Promise.reject('Error, something went wrong!');
      }
    });
    createToast(promise, solo ? 'Unregistering from event' : 'Deleting team');
  };

  return (
    <>
      <div className="flex justify-end">
        <Button
          onClick={() => {
            setShowModal(true);
          }}
          disabled={deleteTeamLoading}
          size={(solo && 'small') || 'medium'}
        >
          {!solo && 'Delete Team'}
          {solo ? <FaSignOutAlt /> : <BiTrashAlt />}
        </Button>
      </div>
      <Modal
        title={`${
          solo
            ? 'Are you sure you want to unregister from the event?'
            : 'Are you sure you want to delete the team?'
        }`}
        showModal={showModal}
        onClose={handleCloseModal}
        size={'small'}
      >
        <div className="text-sm text-center bodyFont">This action cannot be undone.</div>
        <div className="flex justify-center gap-3 my-5">
          <Button
            size={'small'}
            onClick={() => {
              handleDelete(teamId as string);
            }}
            disabled={deleteTeamLoading}
          >
            {deleteTeamLoading ? (
              <Spinner intent={'white'} size={'small'} />
            ) : solo ? (
              'Unregister'
            ) : (
              'Delete'
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

export default DeleteTeamModal;

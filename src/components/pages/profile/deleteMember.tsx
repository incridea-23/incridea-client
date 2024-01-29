import Button from '@/src/components/button';
import Modal from '@/src/components/modal';
import Spinner from '@/src/components/spinner';
import createToast from '@/src/components/toast';
import { RemoveTeamMemberDocument } from '@/src/generated/generated';
import { useMutation } from '@apollo/client';
import React, { FC, useState } from 'react';
import { BiTrashAlt } from 'react-icons/bi';

const DeleteTeamMember: FC<{
  teamId: string;
  userId: string;
  name: string;
  editable?: boolean;
}> = ({ teamId, userId, name, editable }) => {
  const [showModal, setShowModal] = useState(false);

  const [deleteTeamMember, { loading: deleteMemberLoading }] = useMutation(
    RemoveTeamMemberDocument,
    {
      refetchQueries: ['RegisterdEvents'],
      awaitRefetchQueries: true,
    }
  );

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDelete = (teamId: string) => {
    setShowModal(false);
    let promise = deleteTeamMember({
      variables: {
        teamId,
        userId,
      },
    }).then((res) => {
      if (
        res?.data?.removeTeamMember.__typename !==
        'MutationRemoveTeamMemberSuccess'
      ) {
        return Promise.reject('Error removing member');
      }
    });
    createToast(promise, 'Removing');
  };

  return (
    <>
      <div className="w-full flex justify-center">
        <Button
          size={'small'}
          onClick={() => {
            setShowModal(true);
          }}
          disabled={deleteMemberLoading || !editable}
        >
          <BiTrashAlt />
        </Button>
      </div>
      <Modal
        title={`Are you sure you want to remove ${name}?`}
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
            disabled={deleteMemberLoading}
          >
            {deleteMemberLoading ? (
              <Spinner intent={'white'} size={'small'} />
            ) : (
              'Remove'
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

export default DeleteTeamMember;

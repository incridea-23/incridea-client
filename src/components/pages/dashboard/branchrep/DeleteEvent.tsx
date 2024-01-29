import createToast from '@/src/components/toast';
import { DeleteEventDocument } from '@/src/generated/generated';
import { useMutation } from '@apollo/client';
import { FC, useState } from 'react';
import Button from '@/src/components/button';
import { BiTrash } from 'react-icons/bi';
import Modal from '@/src/components/modal';

const DeleteEvent: FC<{
  eventId: string;
  published: boolean;
}> = ({  eventId, published }) => {
  // Delete Event Mutation
  const [deleteEventMutation, { loading: deleteEventLoading }] =
    useMutation(DeleteEventDocument, {
      refetchQueries: ['EventsByBranchRep'],
      awaitRefetchQueries: true,
    });

  const [showModal, setShowModal] = useState(false);

  function handleCloseModal() {
    setShowModal(false);
  }

  // Delete Event Handler
  const handleDeleteEvent = () => {
    handleCloseModal();
    let promise = deleteEventMutation({
      variables: {
        id: parseInt(eventId),
      },
    }).then((res) => {
      if (res.data?.deleteEvent.__typename !== 'MutationDeleteEventSuccess') {
        return Promise.reject('Error deleting event');
      }
    });
    createToast(promise, 'Deleting event...');
  };

  return (
    <>
      <Button
        intent={'danger'}
        className="ml-auto "
        disabled={published || deleteEventLoading}
        onClick={() => setShowModal(true)}
      >
        Delete <BiTrash />
      </Button>
      <Modal
        title="Are you sure you want to delete this event?"
        size="small"
        onClose={handleCloseModal}
        showModal={showModal}
      >
        <div className="flex justify-center gap-3 my-5">
          <Button
            intent={'danger'}
            onClick={handleDeleteEvent}
            disabled={deleteEventLoading}
          >
            Delete
          </Button>
          <Button intent={'secondary'} onClick={() => handleCloseModal()}>
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default DeleteEvent;

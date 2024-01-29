import Button from '@/src/components/button';
import Modal from '@/src/components/modal';
import createToast from '@/src/components/toast';
import { Criteria, DeleteCriteriaDocument } from '@/src/generated/generated';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { BiTrashAlt } from 'react-icons/bi';

const DeleteCriteriaModal = ({
  criterias,
  eventId,
  roundNo,
}: {
  criterias: Criteria[] | null | undefined;
  eventId: string;
  roundNo: number;
}) => {
  const [showModal, setShowModal] = useState(false);

  function handleCloseModal() {
    setShowModal(false);
  }

  const [deleteCriteria, { loading: deleteCriteriaLoading }] = useMutation(
    DeleteCriteriaDocument,
    {
      refetchQueries: ['RoundByJudge'],
      awaitRefetchQueries: true,
    }
  );

  const handleDeleteCriteria = (id: string) => {
    let promise = deleteCriteria({
      variables: {
        eventId: eventId,
        roundNo: roundNo,
        criteriaId: id,
      },
    });
    createToast(promise, 'Deleting criteria...');
  };

  return (
    <div>
      <Button
        onClick={() => {
          setShowModal(true);
        }}
        noScaleOnHover
      >
        Delete <span className="hidden md:block">Criteria</span>
      </Button>
      <Modal
        title={`Delete Criterias`}
        showModal={showModal}
        onClose={handleCloseModal}
        size="medium"
      >
        <div className="p-5 flex flex-wrap gap-5">
          {criterias?.length === 0 && (
            <p className="text-white/60">No criterias to delete</p>
          )}
          {criterias?.map((criteria, index) => (
            <div
              key={index}
              className="flex grow gap-3 p-5 rounded-md bg-white/10 flex-col items-center justify-between mt-2 w-[250px]"
            >
              <div className="flex gap-1.5 items-center">
                <p className="text-white/90 font-semibold mr-2">
                  {criteria.name}
                </p>
                <Button
                  onClick={() => handleDeleteCriteria(criteria.id)}
                  disabled={deleteCriteriaLoading}
                  title="Delete Criteria"
                  intent={'ghost'}
                  className="hover:bg-red-600/30 px-1"
                  size={'small'}
                >
                  <BiTrashAlt size={'1rem'} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default DeleteCriteriaModal;

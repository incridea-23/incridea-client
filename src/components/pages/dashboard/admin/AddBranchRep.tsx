import { FC } from 'react';
import { IoAdd } from 'react-icons/io5';
import { useState } from 'react';
import Button from '@/src/components/button';
import { BranchesQuery } from '@/src/generated/generated';
import Modal from '@/src/components/modal';
import AddBranchRepModal from './AddBranchRepModal';

const AddBranchRep: FC<{
    branchId: string;
    branchName: string;
    branchReps: BranchesQuery['getBranches'][0]['branchReps'];
}
> = ({ branchId, branchName, branchReps }) => {
    const [showModal, setShowModal] = useState(false);

  function handleCloseModal() {
    setShowModal(false);
  }

    return (
      <div className="flex items-center justify-center">
        <Button intent="success"
        size="medium"
        className="flex gap-1 items-center disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={ () => setShowModal(true) }
        >
          <IoAdd />  Add
        </Button>
        <Modal
          showModal={showModal}
          onClose={handleCloseModal}
          size="medium"
          title="Add Branch Representative"
        >
          <AddBranchRepModal 
            branchId={branchId}
            branchName={branchName}
            branchReps={branchReps}
          />
        </Modal>
      </div>
      )
    }

export default AddBranchRep;
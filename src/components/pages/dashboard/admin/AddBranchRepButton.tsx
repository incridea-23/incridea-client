import { FC } from 'react';
import { IoAdd } from 'react-icons/io5';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import Button from '@/src/components/button';
import { BooleanLiteral } from 'typescript';
import Modal from '@/src/components/modal';

const AddBranchRep: FC<{
    branchId: string;
    branchName: string;
}
> = ({ branchId, branchName }) => {
    const [showModal, setShowModal] = useState(false);

  function handleCloseModal() {
    setShowModal(false);
  }

    return (
        <div className="flex items-center justify-center">
      <Button intent="danger"
      size="medium"
      className="flex gap-1 items-center disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={ () => setShowModal(true) }
      >
        <IoAdd />  Add Branch Rep
      </Button>
      <Modal
        showModal={showModal}
        onClose={handleCloseModal}
        size="medium"
        title="Add Branch Representative"
      >
        
      </Modal>
      </div>
      )
    }

export default AddBranchRep;
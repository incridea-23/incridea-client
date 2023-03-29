import Button from '@/src/components/button';
import Modal from '@/src/components/modal';
import { FC, useState } from 'react';
import { BiPlus } from 'react-icons/bi';

const AddTeamMember: FC = () => {

    const [showModal, setShowModal] = useState(false);

    return  <>
    <Button
        intent="success"
        size="medium"
        className="w-full md:w-fit whitespace-nowrap rounded-lg"
    >
        <BiPlus />Add
    </Button>
    <Modal
        title="Add Team Member"
        showModal={true}
        onClose={() => {}}
        size="medium"
    >
    </Modal>
    </>
};

export default AddTeamMember;
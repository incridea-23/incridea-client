import { FC,useState } from 'react';
import Button from '@/src/components/button';
import { AiOutlineEye } from 'react-icons/ai';
import Modal from '@/src/components/modal';
import TeamModal from "./TeamModal";


const VieweventModal: FC<{
    teamId:string,  
    modalTitle:string,
    modalResult:string,
    teamName:string
    }> = ( { teamId,modalTitle,modalResult,teamName } ) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
        <Button onClick={() => setShowModal(true)} intent="secondary">
            <AiOutlineEye />{teamName}
        </Button>
        <Modal
            showModal={showModal}
            onClose={() => setShowModal(false)}
            title={modalTitle+"-"+modalResult}
        >
            <TeamModal
                teamId={teamId}
            />
        </Modal>
        </>
    );
};

export default VieweventModal;

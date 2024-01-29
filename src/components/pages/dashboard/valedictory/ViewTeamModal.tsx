import { FC,useState } from 'react';
import Button from '@/src/components/button';
import { AiOutlineEye } from 'react-icons/ai';
import Modal from '@/src/components/modal';
import TeamModal from "./TeamModal";
import { idToPid } from '@/src/utils/id';


const VieweventModal: FC<{
    teamId:string,  
    modalTitle:string,
    modalResult:string,
    teamName:string,
    eventType: string
    }> = ( { teamId,modalTitle,modalResult,teamName, eventType } ) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
        <Button onClick={() => setShowModal(true)} intent="secondary">
            <AiOutlineEye />{eventType === "INDIVIDUAL" || eventType === "INDIVIDUAL_MULTIPLE_ENTRY"  ? idToPid(teamName) : teamName}
        </Button>
        <Modal
            showModal={showModal}
            onClose={() => setShowModal(false)}
            title={modalResult.replaceAll("_"," ") + " - " + modalTitle}
        >
            <TeamModal
                teamId={teamId}
            />
        </Modal>
        </>
    );
};

export default VieweventModal;

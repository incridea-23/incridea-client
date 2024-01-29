import Button from '@/src/components/button';
import {FC, useState} from 'react';
import { EventsQuery } from '@/src/generated/generated';
import Modal from '@/src/components/modal';
import { idToPid, idToTeamId } from '@/src/utils/id';
import ViewTeamModal from './ViewTeamModal';


const TeamModal: FC<
{
    Team: EventsQuery['events']['edges'][0];
}>
= (Team ) => {

    const team = Team?.Team?.node.teams;
    const [showModal, setShowModal] = useState(false);

    return <>
        <Button
        onClick={() => setShowModal(true)}
        intent='secondary'
        >
            Teams
        </Button>
        <Modal
            showModal={showModal}
            onClose={() => setShowModal(false)}
            title={`Teams`}
        >
            <div className='flex flex-col m-3 justify-center'>
                <div className='hidden md:flex flex-row justify-center p-2 bg-gray-600 rounded-lg mb-2'>
                    {
                    Team?.Team?.node.eventType === "INDIVIDUAL" || Team?.Team?.node.eventType === "INDIVIDUAL_MULTIPLE_ENTRY" ? 
                        <span className="flex text-lg font-bold basis-1/4 text-center justify-center">PID</span>
                        :
                        <span className="flex text-lg font-bold basis-1/4 text-center justify-center">Team ID</span>
                    }
                    <span className="flex text-lg font-bold basis-1/4 text-center justify-center">Team Name</span>
                    <span className="flex text-lg font-bold basis-1/4 text-center justify-center">Team Status</span>
                    <span className="flex text-lg font-bold basis-1/4 text-center justify-center">Team Details</span>
                </div>
                <div className='md:h-64 md:max-h-72 h-96 overflow-y-auto'>
                    {
                    team?.map((team) => (
                        <div
                            key={team.id}
                            className="flex md:flex-row flex-col border md:text-lg text-base border-gray-600 rounded-lg mb-2 p-2 md:justify-center justify-start"
                        >
                            {
                                Team?.Team?.node.eventType === "INDIVIDUAL" || Team?.Team?.node.eventType === "INDIVIDUAL_MULTIPLE_ENTRY" ?
                                <span className="md:text-lg font-bold w-full md:w-1/4 mb-2 md:mb-0 justify-center text-center">
                                    {idToPid(team?.members.map((member) => member?.user?.id)[0])}
                                </span>
                                :
                                <span className="md:text-lg font-bold w-full md:w-1/4 mb-2 md:mb-0 justify-center text-center">
                                    {idToTeamId(team?.id)}
                                </span>
                            } 
                            <span className="md:text-lg font-bold w-full md:w-1/4 mb-2 md:mb-0 justify-center text-center">
                                {team?.name}
                            </span>
                            <span className={`md:text-lg font-bold justify-center text-center w-full md:w-1/4  mb-2 md:mb-0 ${team.confirmed ? "text-green-500": "text-red-500"}`}>
                                {team?.confirmed ? "Confirmed" : "Not Confirmed"}
                            </span>
                            <span className="md:text-lg font-bold w-full md:w-1/4 flex justify-center text-center">
                                <ViewTeamModal 
                                    members={team.members} 
                                />
                            </span>
                        </div>
                    ))
                    }
                </div>
            </div>
        </Modal>  
    </>;
}

export default TeamModal;


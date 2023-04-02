import Button from '@/src/components/button';
import Modal from '@/src/components/modal';
import React, { FC, useState } from 'react';
import { BiEditAlt } from 'react-icons/bi';
import DeleteTeamMember from './deleteMember';
import AddMemberModal from './addMember';
import { Team } from './userTeams';
import DeleteTeamModal from './deleteTeam';
import { titleFont } from '@/src/utils/fonts';

const EditTeamModal: FC<{
  team: Team;
  userId: string;
}> = ({ team, userId }) => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Button onClick={() => setShowModal(true)} size={'small'}>
        <BiEditAlt />
      </Button>
      <Modal
        title={`Edit ${team.name}`}
        showModal={showModal}
        onClose={handleCloseModal}
        size={'medium'}
      >
        <div className="w-full p-5">
          <div className={`${titleFont.className} text-2xl flex items-center gap-2`}>
            <div>{team.name}</div>
            {!team.confirmed && team.leaderId == userId && (
              <DeleteTeamModal teamId={team.id} />
            )}
          </div>
          <div className="text-sm">
            <p>Team ID: T23-0{team.id}</p>
            <p>
              Confirmation Status:{' '}
              {team.confirmed ? 'Confirmed' : 'Unconfirmed'}
            </p>
            <p>Team Members: {team.members.length}</p>
          </div>

          <hr className="border-gray-300 border-1 my-5" />

          <div className="flex items-center space-x-2">
            <div className="font-bold">Crewmates</div>
            {!team.confirmed &&
              team.members.length < team.event.maxTeamSize && (
                <AddMemberModal team={team} />
              )}
          </div>
          {team?.members?.map((member: any) => (
            <div className="flex gap-2 items-center my-2" key={member.user.id}>
              <h1>{member.user.name}</h1>{' '}
              {!team.confirmed && team.leaderId == userId && (
                <DeleteTeamMember
                  teamId={team.id}
                  userId={member.user.id}
                  name={member.user.name}
                  editable={!(member.user.id == userId)}
                />
              )}
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
};

export default EditTeamModal;

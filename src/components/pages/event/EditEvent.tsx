import { idToTeamId } from '@/src/utils/id';
import Button from '@/src/components/button';
import Modal from '@/src/components/modal';
import React, { FC, useState } from 'react';
import { BiEditAlt } from 'react-icons/bi';

import Badge from '../../badge';
import { QueryMyTeamSuccess } from '@/src/generated/generated';
import DeleteTeamMember from '../profile/deleteMember';
import DeleteTeamModal from '../profile/deleteTeam';
import AddMemberModal from './AddMemberModal';

const EditTeamModal: FC<{
  team: QueryMyTeamSuccess['data'];
  userId: string;
}> = ({ team, userId }) => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Button
        onClick={() => setShowModal(true)}
        intent={'primary'}
        size={'small'}
      >
        <BiEditAlt />
      </Button>
      <Modal
        title={`${team.name}`}
        showModal={showModal}
        onClose={handleCloseModal}
        size={'medium'}
      >
        <div className="w-full p-5">
          <div className="text-center">
            <h1 className={`titleFont text-2xl mb-5`}>{idToTeamId(team.id)}</h1>
          </div>

          <div className="hidden md:flex bg-white/20 backdrop-filter backdrop-blur-lg bg-clip-padding rounded-t-lg p-1 items-center justify-between font-bold bodyFont">
            <h1 className="py-1 w-full text-center">Member</h1>
            <h1 className="py-1 w-full text-center">Role</h1>
            <h1 className="py-1 w-full text-center">Remove</h1>
          </div>

          {team?.members?.map((member: any, index) => (
            <div
              className={`flex gap-2 items-center mt-0.5 justify-between bg-white/20 backdrop-filter backdrop-blur-lg p-2 rounded-sm bodyFont ${
                index === team.members.length - 1 ? 'rounded-b-lg' : ''
                }`}
              key={member.user.id}
            >
              <h1 className="w-full text-center">{member.user.name}</h1>{' '}
              <div className="w-full text-center">
                <Badge
                  color={member.user.id == team.leaderId ? 'success' : 'info'}
                >
                  {member.user.id == team.leaderId ? 'Leader' : 'Member'}
                </Badge>
              </div>
              {!team.confirmed && team.leaderId?.toString() == userId && (
                <DeleteTeamMember
                  teamId={team.id}
                  userId={member.user.id}
                  name={member.user.name}
                  editable={!(member.user.id == userId)}
                />
              )}
            </div>
          ))}
          <div className="flex justify-center">
            {!team.confirmed &&
              team.members.length < team.event.maxTeamSize && (
                <AddMemberModal team={team} />
              )}
          </div>
        </div>
        {!team.confirmed &&
          team.leaderId &&
          team.leaderId.toString() == userId && (
            <div className="p-5">
              <DeleteTeamModal teamId={team.id} />
            </div>
          )}
      </Modal>
    </>
  );
};

export default EditTeamModal;

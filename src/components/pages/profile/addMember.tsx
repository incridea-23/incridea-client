import Button from '../../button';
import { BiShareAlt } from 'react-icons/bi';
import { toast } from 'react-hot-toast';
import { FC, useState } from 'react';
import { Team } from './userTeams';
import Modal from '../../modal';
import { idToTeamId } from '@/src/utils/id';

const AddMemberModal: FC<{
  team: Team;
}> = ({ team }) => {
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <Button
        size={'small'}
        onClick={() => {
          setShowModal(true);
        }}
        className='h-5'
      >
        +
      </Button>
      <Modal
        title={`There's still room for ${
          team.event.maxTeamSize - team.members.length
        } more crewmates!`}
        showModal={showModal}
        onClose={handleCloseModal}
        size={'small'}
      >
        <div className="p-5 text-center flex flex-col justify-center">
          <p className="text-xs">
            Share this code with your friends to add them to your team!
          </p>
          <Button
            size={'small'}
            onClick={async () => {
              await navigator.clipboard.writeText(
                'Join my team for ' +
                  team.event.name +
                  " event at Incridea 2023! Here's the code: " +
                  idToTeamId(team.id)
              );
              toast.success('Copied to clipboard!');
            }}
            className="mt-2"
          >
            Share <BiShareAlt />
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default AddMemberModal;

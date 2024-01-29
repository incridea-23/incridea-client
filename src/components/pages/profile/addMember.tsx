import Button from '../../button';
import { toast } from 'react-hot-toast';
import { FC, useState } from 'react';
import { Team } from './userTeams';
import Modal from '../../modal';
import { AiOutlineCopy, AiOutlineUserAdd } from 'react-icons/ai';
import { BsWhatsapp } from 'react-icons/bs';
import Link from 'next/link';
import { generateEventUrl } from '@/src/utils/url';
import { idToTeamId } from '@/src/utils/id';

const AddMemberModal: FC<{
  team: Team;
}> = ({ team }) => {
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const url = `Join my team for ${
    team.event.name
  } event at Incridea 2023! Here's the link: https://incridea.in${generateEventUrl(
    team.event.name,
    team.event.id
  )}?jointeam=${idToTeamId(team.id)}`;

  const copyUrl = async () => {
    await navigator.clipboard.writeText(url);
    toast.success('Copied to clipboard!',{
      position: 'bottom-center',
    });
  };

  return (
    <>
      <Button
        onClick={() => {
          setShowModal(true);
        }}
        className="mt-5"
      >
        <AiOutlineUserAdd size={20} /> Add More
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
          <p className="text-xs bodyFont">
            Share this link with your friends to add them to your team!
          </p>
          <div className="flex items-center justify-evenly mt-2">
            <input
              type="url"
              className="bg-white bg-opacity-20 rounded-lg text-sm p-2 bodyFont"
              value={url}
            />
            <AiOutlineCopy
              onClick={copyUrl}
              size={20}
              className="cursor-pointer hover:text-gray-400"
            />
          </div>

          <div className="flex items-center py-2 bodyFont">
            <div className="flex-grow h-px bg-gray-600"></div>
            <span className="flex-shrink text-sm px-4 italic font-light">
              or
            </span>
            <div className="flex-grow h-px bg-gray-600"></div>
          </div>

          <Link
            href={`https://wa.me/?text=${encodeURIComponent(url)}`}
            className="flex items-center justify-center gap-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg p-2 cursor-pointer text-sm bodyFont"
          >
            <BsWhatsapp /> Share on WhatsApp
          </Link>
        </div>
      </Modal>
    </>
  );
};

export default AddMemberModal;

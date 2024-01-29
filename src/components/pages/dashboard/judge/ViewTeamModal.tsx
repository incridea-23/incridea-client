import Button from '@/src/components/button';
import Modal from '@/src/components/modal';
import { idToPid } from '@/src/utils/id';
import { useState } from 'react';
import { AiFillEye } from 'react-icons/ai';

const ViewTeamModal = ({
  teamName,
  members,
}: {
  teamName: string;
  members: {
    __typename?: 'TeamMember' | undefined;
    user: {
      __typename?: 'User' | undefined;
      id: string;
    };
  }[];
}) => {
  const [showModal, setShowModal] = useState(false);

  function handleCloseModal() {
    setShowModal(false);
  }
  return (
    <>
      <Button onClick={() => setShowModal(true)} size={'small'}>
        <AiFillEye className="text-white/60" />
      </Button>
      <Modal
        title={`${teamName} Details`}
        showModal={showModal}
        onClose={handleCloseModal}
        size="small"
      >
        <div className="flex flex-wrap gap-2 py-3 px-5 justify-center">
          {members.map((member) => {
            return (
              <div
                key={member.user.id}
                className="flex items-center justify-between bg-gray-600 rounded-lg w-fit p-3 flex-1"
                style={{ minWidth: '200px' }}
              >
                <div className="flex items-center">
                  <p className="ml-2 text-sm font-medium">
                    {idToPid(member.user.id)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Modal>
    </>
  );
};

export default ViewTeamModal;

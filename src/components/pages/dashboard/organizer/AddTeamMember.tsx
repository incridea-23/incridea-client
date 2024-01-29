import Button from '@/src/components/button';
import Modal from '@/src/components/modal';
import { FC, useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import { MdOutlineDeleteOutline, MdOutlineQrCodeScanner } from 'react-icons/md';
import { QRCodeScanner } from './QRCodeScanner';
import { useMutation } from '@apollo/client';
import Spinner from '@/src/components/spinner';
import { idToPid, pidToId } from '@/src/utils/id';
import createToast from '@/src/components/toast';
import {
  OrganizerAddTeamMemberDocument,
  OrganizerDeleteTeamMemberDocument,
  TeamDetailsDocument,
} from '@/src/generated/generated';
import { useQuery } from '@apollo/client';

const AddTeamMember: FC<{
  teamId: string;
  teamName: string;
}> = ({ teamId, teamName }) => {
  const [showModal, setShowModal] = useState(false);
  const [scanModalOpen, setScanModalOpen] = useState(false);
  const [userId, setUserId] = useState<string>('');

  const [organizerAddParticipantToTeam, { data, loading, error }] = useMutation(
    OrganizerAddTeamMemberDocument,
    {
      refetchQueries: ['TeamDetails'],
    }
  );
  const {
    data: teamData,
    error: teamError,
    loading: teamLoading,
  } = useQuery(TeamDetailsDocument, {
    variables: {
      id: teamId,
    },
  });
  const [organizerDeleteTeamMember, _] = useMutation(
    OrganizerDeleteTeamMemberDocument,
    {
      refetchQueries: ['TeamDetails'],
    }
  );
  const removeHandler = (userId: string) => {
    let promise = organizerDeleteTeamMember({
      variables: {
        teamId,
        userId,
      },
    }).then((res) => {
      if (
        res.data?.organizerDeleteTeamMember.__typename ===
        'MutationOrganizerDeleteTeamMemberSuccess'
      ) {
        setUserId('');
      } else {
        if (res.data) {
          createToast(Promise.reject(promise), res.data.organizerDeleteTeamMember.message);
        } else {
          throw new Error('Error removing member from team');
        }
      }
    });
    createToast(promise, 'Removing Participant...');
  };
  const addHandler = () => {
    if (!userId) return;
    let promise = organizerAddParticipantToTeam({
      variables: {
        teamId,
        userId: userId.startsWith('INC23-') ? pidToId(userId) : userId,
      },
    }).then((res) => {
      if (
        res.data?.organizerAddTeamMember.__typename ===
        'MutationOrganizerAddTeamMemberSuccess'
      ) {
        setUserId('');
      } else {
        if (res.data) {
          console.log(res.data);
          createToast(Promise.reject(promise), res.data.organizerAddTeamMember.message);
          throw new Error('Error adding member to team');
        }
      }
    }).catch((error) => {
      throw new Error(`Error: ${error.message}`); 
    }); 
    createToast(promise, 'Adding Participant...');
  };

  return (
    <>
      <Button
        intent="success"
        size="medium"
        className="w-full md:w-fit whitespace-nowrap rounded-lg"
        onClick={() => setShowModal(true)}
      >
        <BiPlus />
        Add
      </Button>
      <Modal
        showModal={showModal}
        onClose={() => setShowModal(false)}
        title={'Add Participant'}
      >
        <div className="flex md:flex-row flex-wrap md:p-6 p-5 gap-10">
          <div className="w-full md:w-fit space-y-5">
            <div className="space-y-2">
              {/* scan user */}
              <label
                htmlFor="ParticipantID"
                className="block text-sm font-medium text-gray-300"
              >
                Scan Participant ID
              </label>
              <Button
                intent={'primary'}
                className=" w-full"
                outline
                size={'large'}
                onClick={() => setScanModalOpen(true)}
              >
                Scan{' '}
                <MdOutlineQrCodeScanner className="inline-block text-2xl" />
              </Button>
              <Modal
                title="Scan Participant ID"
                showModal={scanModalOpen}
                onClose={() => setScanModalOpen(false)}
              >
                <div className="p-5">
                  <QRCodeScanner intent="addToTeam" teamId={teamId} />
                </div>
              </Modal>
            </div>
            <div className="w-full text-center ">OR</div>
            <div className="space-y-2">
              <label
                htmlFor="ParticipantID"
                className="block text-sm font-medium text-gray-300"
              >
                Enter Participant ID
              </label>
              <input
                type="text"
                className=" border w-full    rounded-lg   block p-2.5 bg-gray-600 border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 ring-gray-500"
                placeholder="INC23-0069"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </div>
            <Button
              intent={'info'}
              outline
              size={'large'}
              onClick={addHandler}
              className="w-full  whitespace-nowrap rounded-lg"
            >
              Add Participant
            </Button>
          </div>
          <div className="space-y-6 w-full md:w-fit ">
            <p>Members of Team {teamName}</p>

            <div>
              {teamData &&
              teamData.teamDetails.__typename === 'QueryTeamDetailsSuccess' ? (
                <div className="space-y-2 w-auto">
                  {teamData.teamDetails.data.members.map((member) => (
                    <div
                      key={member.user.id}
                      className="bg-white  bg-opacity-10  rounded-lg md:p-3 p-2 flex  items-center md:items-start justify-between md:gap-5 gap-3"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="text-lg  text-green-500 font-mono flex basis-1/4">
                          {idToPid(member.user.id)}
                        </div>
                        <div className="flex flex-col">
                          <p className="text-white font-medium flex basis-1/4">
                            {member.user.name}
                          </p>
                          <p
                            className="text-gray-400 text-xs md:text-sm flex basis-1/2 md:w-[14vw] w-20 "
                            style={{ wordBreak: 'break-word' }}
                          >
                            {member.user.email}
                          </p>
                        </div>
                      </div>
                      <Button
                        intent={'danger'}
                        onClick={() => removeHandler(member.user.id)}
                        outline
                        className=" text-xl"
                      >
                        <MdOutlineDeleteOutline className="text-2xl" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <Spinner />
              )}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddTeamMember;

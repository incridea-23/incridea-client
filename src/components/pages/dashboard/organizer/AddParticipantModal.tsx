import { useState } from 'react';
import { OrganizerRegisterSoloDocument } from '@/src/generated/generated';
import { useMutation } from '@apollo/client';
import Modal from '@/src/components/modal';
import createToast from '@/src/components/toast';
import Button from '@/src/components/button';
import ScanParticipantModal from './ScanParticipantModal';
import { pidToId } from '@/src/utils/id';

export default function AddParticipantModal({ eventId }: { eventId: string }) {
  const [organizerRegisterSolo, _] = useMutation(
    OrganizerRegisterSoloDocument,
    {
      refetchQueries: ['TeamsByRound'],
    }
  );
  const [userId, setUserId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const addHandler = () => {
    if (!userId) return;
    let promise = organizerRegisterSolo({
      variables: {
        eventId,
        userId: userId.startsWith('INC23-') ? pidToId(userId) : userId,
      },
    }).then((res) => {
      if (
        res.data?.organizerRegisterSolo.__typename ===
        'MutationOrganizerRegisterSoloSuccess'
      ) {
        setUserId('');
      } else {
        if (res.errors) {
          throw new Error(res.errors[0].message);
        } else {
          throw new Error('Error adding member to team');
        }
      }
    });
    createToast(promise, 'Adding Participant...');
  };

  return (
    <>
      <Button
        intent={'ghost'}
        outline
        size={'large'}
        className="w-full md:w-fit whitespace-nowrap rounded-lg"
        onClick={() => setIsOpen(true)}
      >
        Add Participant
      </Button>

      <Modal
        showModal={isOpen}
        onClose={() => setIsOpen(false)}
        title={'Add Participant'}
      >
        <div className="w-full  md:w-fit space-y-5 md:p-6 p-5 mx-auto">
          <div className="space-y-2">
            {/* scan user */}
            <label
              htmlFor="ParticipantID"
              className="block text-sm font-medium text-gray-300"
            >
              Scan Participant ID
            </label>
            <ScanParticipantModal eventId={eventId} />
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
      </Modal>
    </>
  );
}

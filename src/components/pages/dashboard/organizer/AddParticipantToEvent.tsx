import { OrganizerRegisterSoloDocument } from '@/src/generated/generated';
import { useMutation } from '@apollo/client';
import { FC } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import Button from '@/src/components/button';

const AddParticipantToEvent: FC<{
  userId: string;
  eventId: string;
}> = ({ userId, eventId }) => {
  const [register, { loading }] = useMutation(OrganizerRegisterSoloDocument, {
    refetchQueries: ['TeamsByRound'],
    awaitRefetchQueries: true,
  });

  return (
    <div>
      <Toaster />
      <Button
        onClick={() => {
          register({
            variables: {
              eventId,
              userId,
            },
          }).then((res) => {
            if (res.data?.organizerRegisterSolo.__typename === 'Error') {
              toast.error('Not a valid PID');
            }
            if (
              res.data?.organizerRegisterSolo.__typename ===
              'MutationOrganizerRegisterSoloSuccess'
            ) {
              toast.success('Registered!');
            }
          });
        }}
        disabled={loading}
        intent={'primary'}
        className="mt-2"
      >
        Add Participant
      </Button>
    </div>
  );
};

export default AddParticipantToEvent;

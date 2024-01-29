import { OrganizerAddTeamMemberDocument } from '@/src/generated/generated';
import { useMutation } from '@apollo/client';
import { FC } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import Button from '@/src/components/button';
import { pidToId } from '@/src/utils/id';

const ScanParticipantToTeam: FC<{
  teamId: string;
  userId: string;
}> = ({ teamId, userId }) => {
  const [add, { loading }] = useMutation(OrganizerAddTeamMemberDocument, {
    refetchQueries: ['TeamDetails'],
    awaitRefetchQueries: true,
  });
  return (
    <div>
      <Toaster />
      <Button
        onClick={() => {
          add({
            variables: {
              teamId,
              userId: pidToId(userId),
            },
          }).then((res) => {
            if (res.data?.organizerAddTeamMember.__typename === 'Error') {
              console.log(res.data.organizerAddTeamMember.message);
              toast.error('Not a valid PID');
            }
            if (
              res.data?.organizerAddTeamMember.__typename ===
              'MutationOrganizerAddTeamMemberSuccess'
            ) {
              toast.success('Added!',{
                position: 'bottom-center',
              });
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

export default ScanParticipantToTeam;

import { FC } from 'react';
import { useMutation } from '@apollo/client';
import { OrganizerMarkAttendanceDocument } from '@/src/generated/generated';
import Button from '@/src/components/button';
import { toast, Toaster } from 'react-hot-toast';

const MarkAttendance: FC<{
  teamId: string;
}> = ({ teamId }) => {
  const [markAttendance, { loading: AttendanceLoading }] = useMutation(
    OrganizerMarkAttendanceDocument,
    {
      refetchQueries: ['TeamsByRound'],
      awaitRefetchQueries: true,
    }
  );
  return (
    <div>
      <Toaster />
      <Button
        onClick={() => {
          markAttendance({
            variables: {
              teamId: teamId,
              attended: true,
            },
          }).then((res) => {
            if (res.data?.organizerMarkAttendance.__typename === 'Error') {
              toast.error('Not a valid team ID');
            }
            if (
              res.data?.organizerMarkAttendance.__typename ===
              'MutationOrganizerMarkAttendanceSuccess'
            ) {
              toast.success('Attendance marked');
            }
          });
        }}
        disabled={AttendanceLoading}
        intent={'primary'}
        className="mt-2"
      >
        Mark Present
      </Button>
    </div>
  );
};

export default MarkAttendance;

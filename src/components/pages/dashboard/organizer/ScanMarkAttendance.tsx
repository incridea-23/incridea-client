import { FC } from 'react';
import { useMutation } from '@apollo/client';
import {
  OrganizerMarkAttendanceDocument,
  OrganizerMarkAttendanceSoloDocument,
} from '@/src/generated/generated';
import Button from '@/src/components/button';
import { toast, Toaster } from 'react-hot-toast';

const MarkAttendance: FC<{
  result: string;
  eventType: string;
  eventId?: string;
}> = ({ result, eventType, eventId }) => {
  const [markAttendanceTeam, { loading: TeamAttendanceLoading }] = useMutation(
    OrganizerMarkAttendanceDocument,
    {
      refetchQueries: ['TeamsByRound'],
      awaitRefetchQueries: true,
    }
  );

  const [markAttendanceSolo, { loading: SoloAttendanceLoading }] = useMutation(
    OrganizerMarkAttendanceSoloDocument,
    {
      refetchQueries: ['TeamsByRound'],
      awaitRefetchQueries: true,
    }
  );

  const handleMarkAttendance = () => {
    let promise: Promise<any>;
    if (eventType === 'INDIVIDUAL' || eventType === 'INDIVIDUAL_MULTIPLE_ENTRY') {
      promise = markAttendanceSolo({
        variables: {
          userId: result,
          eventId: eventId as string,
          attended: true,
        },
      }).then((res) => {
        if (
          res.data?.organizerMarkAttendanceSolo.__typename ===
          'MutationOrganizerMarkAttendanceSoloSuccess'
        ) {
          toast.success('Attendance marked successfully');
        } else {
          toast.error('Attendance could not be marked');
        }
      });
    } else if (eventType === 'TEAM' || eventType === 'TEAM_MULTIPLE_ENTRY') {
      promise = markAttendanceTeam({
        variables: {
          teamId: result,
          attended: true,
        },
      }).then((res) => {
        if (
          res.data?.organizerMarkAttendance.__typename ===
          'MutationOrganizerMarkAttendanceSuccess'
        ) {
          toast.success('Attendance marked successfully');
        } else {
          toast.error('Attendance could not be marked');
          console.log(res.data?.organizerMarkAttendance);
        }
      });
    }
  };

  return (
    <div>
      <Toaster />
      <Button
        onClick={handleMarkAttendance}
        disabled={TeamAttendanceLoading || SoloAttendanceLoading}
        intent={'primary'}
        className="mt-2"
      >
        Mark Present
      </Button>
    </div>
  );
};

export default MarkAttendance;

import { FC } from 'react';
import { useMutation } from '@apollo/client';
import {
  OrganizerMarkAttendanceDocument,
  OrganizerMarkAttendanceSoloDocument,
} from '@/src/generated/generated';
import Button from '@/src/components/button';
import createToast from '@/src/components/toast';

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
    if (
      eventType === 'INDIVIDUAL' ||
      eventType === 'INDIVIDUAL_MULTIPLE_ENTRY'
    ) {
      promise = markAttendanceSolo({
        variables: {
          userId: result,
          eventId: eventId as string,
          attended: true,
        },
      });
      createToast(promise, 'Marking attendance...');
    } else if (eventType === 'TEAM' || eventType === 'TEAM_MULTIPLE_ENTRY') {
      promise = markAttendanceTeam({
        variables: {
          teamId: result,
          attended: true,
        },
      });
      createToast(promise, 'Marking attendance...');
    }
  };

  return (
    <div>
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

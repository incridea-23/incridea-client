import Button from '@/src/components/button';
import createToast from '@/src/components/toast';
import { OrganizerMarkAttendanceDocument } from '@/src/generated/generated';
import { useMutation } from '@apollo/client';
import React from 'react';
import { ImCheckmark, ImCross } from 'react-icons/im';

type Props = {
  teamId: string;
  attended: boolean;
};

const MarkAttendanceButton = ({ teamId, attended }: Props) => {
  const [markAttendance, { loading: AttendanceLoading }] = useMutation(
    OrganizerMarkAttendanceDocument,
    {
      refetchQueries: ['TeamsByRound'],
      awaitRefetchQueries: true,
    }
  );

  const handleMarkAttendance = () => {
    let promise = markAttendance({
      variables: {
        teamId: teamId,
        attended: !attended,
      },
    }).then((res) => {
      if (res.data?.organizerMarkAttendance.__typename === 'Error') {
        throw new Error(res.data.organizerMarkAttendance.message);
      }
    });
    createToast(promise, 'Updating attendance...');
  };

  return (
    <Button
      onClick={handleMarkAttendance}
      disabled={AttendanceLoading}
      intent={attended ? 'danger' : 'success'}
      className='w-6 h-auto md:w-auto'
    >
      {attended ? <ImCross /> : <ImCheckmark />}
    </Button>
  );
};

export default MarkAttendanceButton;

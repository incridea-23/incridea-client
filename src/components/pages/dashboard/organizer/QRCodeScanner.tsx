import { useZxing } from 'react-zxing';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { OrganizerMarkAttendanceDocument } from '@/src/generated/generated';
import Button from '@/src/components/button';
import { toast, Toaster } from 'react-hot-toast';

export const QRCodeScanner: React.FC = ({}) => {
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { ref } = useZxing({
    onResult: (result) => {
      setResult(result.getText());
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const [markAttendance, { loading: AttendanceLoading }] = useMutation(
    OrganizerMarkAttendanceDocument,
    {
      refetchQueries: ['TeamsByRound'],
      awaitRefetchQueries: true,
    }
  );

  return (
    <div className="flex flex-col items-center">
      <Toaster />
      <video className="w-full border border-gray-500 rounded-lg" ref={ref} />
      <div className="mt-4">
        {result && (
          <div className="flex flex-col items-center">
            <p className="text-xl text-green-500">
              <span className="font-bold">Team ID:</span> {result}
            </p>
            <Button
              onClick={() => {
                markAttendance({
                  variables: {
                    teamId: result,
                    attended: true,
                  },
                }).then((res) => {
                  if (
                    res.data?.organizerMarkAttendance.__typename === 'Error'
                  ) {
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
        )}
        {error && (
          <p className="text-xl text-red-500">
            {error && !result && 'No QR Code in sight'}
          </p>
        )}
      </div>
    </div>
  );
};

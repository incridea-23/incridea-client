import { useZxing } from 'react-zxing';
import { useState } from 'react';
import MarkAttendance from './MarkAttendance';

export const QRCodeScanner: React.FC<{
  intent: 'attendance' | 'addToTeam' | 'addToEvent';
}> = ({ intent }) => {
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

  return (
    <div className="flex flex-col items-center">
      <video className="w-full border border-gray-500 rounded-lg" ref={ref} />
      <div className="mt-4">
        {result && (
          <div className="flex flex-col items-center">
            <p className="text-xl text-green-500">
              <span className="font-bold">Team ID:</span> {result}
            </p>
            {intent === 'attendance' && <MarkAttendance teamId={result} />}
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

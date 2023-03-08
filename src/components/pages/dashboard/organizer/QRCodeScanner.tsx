import { useZxing } from 'react-zxing';
import { useState } from 'react';
import MarkAttendance from './ScanMarkAttendance';
import AddParticipantToEvent from './AddParticipantToEvent';
import ScanParticipantToTeam from './ScanParticipantToTeam';
import Badge from '@/src/components/badge';

export const QRCodeScanner: React.FC<{
  intent: 'attendance' | 'addToTeam' | 'addToEvent';
  eventId?: string;
  teamId?: string;
  eventType?: string;
}> = ({ intent, eventId, teamId, eventType }) => {
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
            <Badge color={'info'}>Scanned ID: {result}</Badge>
            {intent === 'attendance' && (
              <MarkAttendance
                eventId={eventId}
                eventType={eventType || ''}
                result={result}
              />
            )}
            {intent === 'addToEvent' && (
              <AddParticipantToEvent eventId={eventId || ''} userId={result} />
            )}
            {intent === 'addToTeam' && (
              <ScanParticipantToTeam teamId={teamId || ''} userId={result} />
            )}
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

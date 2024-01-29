import { useZxing } from 'react-zxing';
import { useState } from 'react';
import MarkAttendance from './ScanMarkAttendance';
import AddParticipantToEvent from './AddParticipantToEvent';
import ScanParticipantToTeam from './ScanParticipantToTeam';
import Badge from '@/src/components/badge';
import Pronite from '@/src/components/pronite';

export const QRCodeScanner: React.FC<{
  intent: 'attendance' | 'addToTeam' | 'addToEvent' | 'pronite';
  eventId?: string;
  teamId?: string;
  eventType?: string;
  pId?: string;
}> = ({ intent, eventId, teamId, eventType, pId }) => {
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

  const stopCamera = () => {
    const stream = ref.current?.srcObject as MediaStream;
    const tracks = stream?.getTracks();
    tracks?.forEach((track) => {
      track.stop();
    });
  };

  const startCamera = () => {
    // start the camera again
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'environment' } })
      .then((stream) => {
        const video = ref.current;
        if (video) {
          video.srcObject = stream;
        }
      });
  };

  const clearScanResults = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="flex flex-col items-center relative">
      <video className="w-full rounded-lg border border-gray-400" ref={ref} />
      {!result && (
        <div className="text-sm text-gray-400 mt-2 text-center">
          <span className="text-green-500">Note:</span> Detection is retried
          every 300ms. If you are not seeing the detection, try moving the
          camera closer to the QR code.
        </div>
      )}
      <div className="mt-4">
        {result && (
          <div className="flex flex-col items-center">
            <Badge color={'info'}>Scanned ID: {result}</Badge>
            <div className="mt-2">
              {intent === 'attendance' && (
                <MarkAttendance
                  eventId={eventId}
                  eventType={eventType || ''}
                  result={result}
                />
              )}
              {intent === 'addToEvent' && (
                <AddParticipantToEvent
                  eventId={eventId || ''}
                  userId={result}
                />
              )}
              {intent === 'addToTeam' && (
                <ScanParticipantToTeam teamId={teamId || ''} userId={result} />
              )}
              {intent === 'pronite' && (
                <Pronite
                  pId={result}
                  stopCamera={stopCamera}
                  startCamera={startCamera}
                  clearScanResults={clearScanResults}
                />
              )}
            </div>
          </div>
        )}
        {error && !result && (
          <Badge color={'danger'}>No QR Code in sight</Badge>
        )}
      </div>
    </div>
  );
};

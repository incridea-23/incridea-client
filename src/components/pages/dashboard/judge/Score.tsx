import Spinner from '@/src/components/spinner';
import createToast from '@/src/components/toast';
import { AddScoreDocument, GetScoreDocument } from '@/src/generated/generated';
import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const Score = ({
  teamId,
  criteriaId,
  roundNo,
  type,
}: // onUpdateScore,
{
  teamId: string;
  criteriaId: string;
  roundNo: number;
  type: string;
  // onUpdateScore: (newScore: number) => void;
}) => {
  const { data, loading, error } = useQuery(GetScoreDocument, {
    variables: {
      criteriaId: criteriaId,
      teamId: teamId,
      roundNo,
    },
    skip: !roundNo || !teamId || !criteriaId,
  });

  const [score, setScore] = useState<string>('0');
  // as soon as data is loaded, set score
  useEffect(() => {
    if (data?.getScore?.__typename === 'QueryGetScoreSuccess') {
      setScore(data.getScore.data.score);
      // onUpdateScore(Number(data.getScore.data.score));
    } else {
      setScore('0');
      // onUpdateScore(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.getScore]);

  const [updateScore, { loading: updateScoreLoading }] = useMutation(
    AddScoreDocument,
    {
      refetchQueries: ['GetScore', 'GetTotalScores'],
      awaitRefetchQueries: true,
    }
  );

  const handleUpdateScore = () => {
    // check if score is really changed before updating
    if (
      data?.getScore.__typename === 'QueryGetScoreSuccess' &&
      data.getScore.data.score === score
    ) {
      return;
    }
    let promise = updateScore({
      variables: {
        criteriaId: Number(criteriaId),
        teamId: Number(teamId),
        // if input is empty, set score to 0
        score: score ? score : '0',
      },
    }).then((res) => {
      if (res.data?.addScore.__typename === 'Error') {
        toast.error(res.data.addScore.message, {
          position: 'bottom-center',
        });
      } else {
        // onUpdateScore(Number(score));
      }
    });
    createToast(promise, 'Updating score...');
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    if (loading) return;

    // Clear previous timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Set a new timeout
    timeoutId = setTimeout(() => {
      handleUpdateScore();
    }, 500);

    // Cleanup function to clear the timeout
    return () => {
      clearTimeout(timeoutId!);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score]);

  return (
    <div className="flex items-center text-lg gap-2">
      {loading ? (
        <Spinner />
      ) : type === 'TIME' ? (
        <TimeInput
          disabled={loading || updateScoreLoading}
          value={formatTime(Number(score))}
          onChange={(newTime) => setScore(newTime.toString())}
        />
      ) : (
        <input
          max={type==="NUMBER"? 10 : undefined}
          min={type==="NUMBER"? 0 : undefined}
          value={score}
          onChange={(e) => setScore(e.target.value)}
          type={type.toLowerCase()}
          className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
          w-16 bg-white/10 min-h-[24px] rounded-lg text-center text-white/90 focus:ring-2 ring-white/50 outline-none"
          //first few classes to hide default input type=number buttons
        />
      )}
    </div>
  );
};

export default Score;

type Props = {
  value: string;
  onChange: (milliseconds: number) => void;
  disabled?: boolean;
};

function TimeInput({ value, onChange, disabled }: Props) {
  const [inputValue, setInputValue] = useState<string>(
    formatTime(Number(value))
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const milliseconds = parseTime(inputValue);
    setInputValue(inputValue);
    onChange(milliseconds);
  };

  return (
    <input
      type="text"
      value={Number(inputValue) === 0 ? '' : inputValue}
      onChange={handleInputChange}
      placeholder="MM:SS:MS."
      className="bg-black/20 w-28 p-2 rounded-lg text-center text-white/90 focus:ring-2 ring-white/50 outline-none"
    />
  );
}

function parseTime(timeString: string): number {
  const timeParts = timeString.split(':').map(Number);
  let totalMilliseconds = 0;
  if (timeParts.length === 1) {
    totalMilliseconds = timeParts[0];
  } else if (timeParts.length === 2) {
    totalMilliseconds = timeParts[0] * 1000 + timeParts[1];
  } else if (timeParts.length === 3) {
    totalMilliseconds =
      timeParts[0] * 60000 + timeParts[1] * 1000 + timeParts[2];
  } else if (timeParts.length === 4) {
    totalMilliseconds =
      timeParts[0] * 3600000 +
      timeParts[1] * 60000 +
      timeParts[2] * 1000 +
      timeParts[3];
  }
  return totalMilliseconds;
}

function formatTime(milliseconds: number): string {
  const hours = Math.floor(milliseconds / 3600000);
  const minutes = Math.floor((milliseconds % 3600000) / 60000);
  const seconds = Math.floor((milliseconds % 60000) / 1000);
  const millisecondsLeft = milliseconds % 1000;
  let timeString = '';
  if (hours > 0) {
    timeString += `${hours}:`;
  }
  if (hours > 0 || minutes > 0) {
    timeString += `${minutes.toString().padStart(2, '0')}:`;
  }
  timeString += `${seconds.toString().padStart(2, '0')}.${millisecondsLeft
    .toString()
    .padStart(3, '0')}`;
  return timeString;
}

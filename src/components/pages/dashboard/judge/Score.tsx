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
  // onUpdateScore,
}: {
  teamId: string;
  criteriaId: string;
  roundNo: number;
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
      refetchQueries: ['GetScore','GetTotalScores'],
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
        toast.error(res.data.addScore.message);
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
    }, 2000);

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
      ) : (
        <input
          disabled={loading || updateScoreLoading}
          value={score}
          onChange={(e) => setScore(e.target.value)}
          type="number"
          className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
					 				w-16 bg-white/10 min-h-[24px] rounded-lg text-center text-white/90 focus:ring-2 ring-white/50 outline-none"
          //first few classes to hide default input type=number buttons
        />
      )}
    </div>
  );
};

export default Score;

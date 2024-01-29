import Spinner from "@/src/components/spinner";
import createToast from "@/src/components/toast";
import { AddScoreDocument, GetScoreDocument } from "@/src/generated/generated";
import { formatTime, parseTime } from "@/src/utils/time";
import { useMutation, useQuery } from "@apollo/client";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const Score = ({
  teamId,
  criteriaId,
  roundNo,
  type,
}: {
  teamId: string;
  criteriaId: string;
  roundNo: number;
  type: string;
}) => {
  const [score, setScore] = useState<string>("0");
  const { data, loading, error } = useQuery(GetScoreDocument, {
    variables: {
      criteriaId: criteriaId,
      teamId: teamId,
      roundNo,
    },
    skip: !roundNo || !teamId || !criteriaId,
  });

  // as soon as data is loaded, set score

  useEffect(() => {
    console.log(data);
    if (data?.getScore?.__typename === "QueryGetScoreSuccess") {
      setScore(data.getScore.data.score);
    } else {
      setScore("0");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const [updateScore, { loading: updateScoreLoading, error: updateError }] =
    useMutation(AddScoreDocument, {
      refetchQueries: ["GetScore", "GetTotalScores"],
      awaitRefetchQueries: true,
      variables: {
        criteriaId: Number(criteriaId),
        teamId: Number(teamId),
        score: score ? score : "0",
      },
    });
  console.log(error, updateError);
  const handleUpdateScore = () => {
    // check if score is really changed before updating
    if (
      data?.getScore.__typename === "QueryGetScoreSuccess" &&
      data.getScore.data.score === score
    ) {
      return;
    }
    let promise = updateScore().then((res) => {
      if (res.data?.addScore.__typename === "Error") {
        toast.error(res.data.addScore.message, {
          position: "bottom-center",
        });
      }
    });
    createToast(promise, "Updating score...");
  };

  // Auto save score after 500ms
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
      ) : type === "TIME" ? (
        <TimePicker
          milliseconds={Number(score)}
          onChange={(newTime) => setScore(newTime.toString())}
        />
      ) : (
        <input
          max={type === "NUMBER" ? 10 : undefined}
          min={type === "NUMBER" ? 0 : undefined}
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

interface TimePickerProps {
  milliseconds: number;
  onChange: (newTime: number) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({ milliseconds, onChange }) => {
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [millis, setMillis] = useState<number>(0);

  useEffect(() => {
    setHours(Math.floor(milliseconds / 3600000));
    setMinutes(Math.floor((milliseconds % 3600000) / 60000));
    setSeconds(Math.floor(((milliseconds % 3600000) % 60000) / 1000));
    setMillis(Math.floor(((milliseconds % 3600000) % 60000) % 1000));
  }, [milliseconds]);

  const handleHoursChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setHours(value);
    console.log(value, minutes, seconds, millis);
    const timeInMs =
      (isNaN(value) ? 0 : value) * 3600000 +
      (isNaN(minutes) ? 0 : minutes) * 60000 +
      (isNaN(seconds) ? 0 : seconds) * 1000 +
      (isNaN(millis) ? 0 : millis);
    console.log(timeInMs);
    onChange(timeInMs);
  };

  const handleMinutesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setMinutes(value);
    const timeInMs =
      (isNaN(hours) ? 0 : hours) * 3600000 +
      (isNaN(value) ? 0 : value) * 60000 +
      (isNaN(seconds) ? 0 : seconds) * 1000 +
      (isNaN(millis) ? 0 : millis);
    onChange(timeInMs);
  };

  const handleSecondsChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setSeconds(value);
    const timeInMs =
      (isNaN(hours) ? 0 : hours) * 3600000 +
      (isNaN(minutes) ? 0 : minutes) * 60000 +
      (isNaN(value) ? 0 : value) * 1000 +
      (isNaN(millis) ? 0 : millis);
    onChange(timeInMs);
  };

  const handleMillisChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setMillis(value);
    const timeInMs =
      (isNaN(hours) ? 0 : hours) * 3600000 +
      (isNaN(minutes) ? 0 : minutes) * 60000 +
      (isNaN(seconds) ? 0 : seconds) * 1000 +
      (isNaN(value) ? 0 : value);
    onChange(timeInMs);
  };

  return (
    <div className="flex flex-col items-center space-x-4">
      <label className="text-gray-100">Hours:</label>
      <input
        className="border bg-black/10 border-gray-400 rounded-md w-16 px-2 py-1"
        type="number"
        value={hours}
        onChange={handleHoursChange}
      />
      <label className="text-gray-100">Min:</label>
      <input
        className="border bg-black/10 border-gray-400 rounded-md w-16 px-2 py-1"
        type="number"
        value={minutes}
        onChange={handleMinutesChange}
      />
      <label className="text-gray-100">Sec:</label>
      <input
        className="border bg-black/10 border-gray-400 rounded-md w-16 px-2 py-1"
        type="number"
        value={seconds}
        onChange={handleSecondsChange}
      />
      <label className="text-gray-100">Ms:</label>
      <input
        className="border bg-black/10 border-gray-400 rounded-md w-16 px-2 py-1"
        type="number"
        value={millis}
        onChange={handleMillisChange}
      />
    </div>
  );
};

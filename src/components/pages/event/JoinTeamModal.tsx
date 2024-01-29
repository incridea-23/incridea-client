import { JoinTeamDocument } from '@/src/generated/generated';
import { teamIdToId } from '@/src/utils/id';
import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import createToast from '../../toast';
import { useRouter } from 'next/router';
import Button from '../../button';
import Modal from '../../modal';

const JoinTeamModal = () => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [joinTeam, { loading, error: mutationError }] = useMutation(
    JoinTeamDocument,
    {
      refetchQueries: ['MyTeam'],
    }
  );
  const handleJoinTeam = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const promise = joinTeam({
      variables: {
        teamId: teamIdToId(teamId),
      },
    }).then((res) => {
      if (res.data?.joinTeam.__typename === 'Error') {
        setError(res.data.joinTeam.message);
      } else {
        setError('');
        setOpen(false);
      }
    });
    await createToast(promise, 'Joining Team');
  };
  const [teamId, setTeamId] = useState('');
  const router = useRouter();
  const { jointeam } = router.query;

  useEffect(() => {
    if (jointeam) {
      setTeamId(jointeam as string);
      setOpen(true);
    }
  }, [jointeam]);

  return (
    <>
      <Button
        className="w-full"
        disabled={loading}
        onClick={() => setOpen(true)}
        intent={'ghost'}
      >
        Join Team
      </Button>
      <Modal
        onClose={() => setOpen(false)}
        showModal={open}
        size="small"
        title="Join Team"
        rounded="md"
      >
        <form
          onSubmit={handleJoinTeam}
          className="gap-3 md:px-6 md:pb-6 px-5 pb-5  w-full  flex flex-col "
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="teamName" className="text-gray-300 font-semibod">
              Team Id
            </label>
            <input
              type="text"
              value={teamId}
              onChange={(e) => setTeamId(e.target.value)}
              name="teamName"
              id="teamName"
              placeholder="T23-10902"
              required
              className="w-full bg-gray-800 rounded-sm px-2 py-1 focus:outline-none focus:ring ring-gray-500"
            />
          </div>
          <Button disabled={loading} type="submit" intent="success">
            Join Team
          </Button>
          {error && (
            <p className="text-red-800 bg-red-200 px-3 py-1 rounded-sm font-semibold">
              {error}
            </p>
          )}
        </form>
      </Modal>
    </>
  );
};

export default JoinTeamModal;

import { CreateTeamDocument, Event } from '@/src/generated/generated';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import createToast from '../../toast';
import Button from '../../button';
import Modal from '../../modal';

const CreateTeamModal = ({ eventId }: { eventId: Event['id'] }) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [createTeam, { loading, error: mutationError }] = useMutation(
    CreateTeamDocument,
    {
      refetchQueries: ['MyTeam'],
    }
  );

  const [name, setName] = useState('');
  const handleCreateTeam = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const promise = createTeam({
      variables: {
        eventId: eventId,
        name: name,
      },
      refetchQueries: ['MyTeam'],
    }).then((res) => {
      if (res.data?.createTeam.__typename === 'Error') {
        setError(res.data.createTeam.message);
      } else setOpen(false);
    });
    await createToast(promise, 'Creating Team');
  };

  return (
    <>
      <Button
        className="w-full"
        onClick={() => setOpen(true)}
        intent={'primary'}
      >
        Create Team
      </Button>
      <Modal
        onClose={() => {
          setOpen(false);
          setError('');
        }}
        showModal={open}
        size="small"
        title="Create Team"
        rounded="md"
      >
        <form
          onSubmit={handleCreateTeam}
          className="gap-3 md:px-6 md:pb-6 px-5 pb-5  w-full  flex flex-col "
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="teamName" className="text-gray-300 font-semibod">
              Team Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="teamName"
              id="teamName"
              required
              className="w-full bg-gray-800 rounded-sm px-2 py-1 focus:outline-none focus:ring ring-gray-500"
            />
          </div>
          <Button type="submit" intent="success">
            Create Team
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

export default CreateTeamModal;

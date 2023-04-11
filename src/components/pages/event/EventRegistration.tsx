import { useAuth } from '@/src/hooks/useAuth';
import Link from 'next/link';
import React, { useState } from 'react';
import Button from '../../button';
import {
  CreateTeamDocument,
  Event,
  JoinTeamDocument,
  MyTeamDocument,
  QueryMyTeamSuccess,
  RegisterSoloEventDocument,
} from '@/src/generated/generated';
import Modal from '../../modal';
import { useMutation, useQuery } from '@apollo/client';
import createToast from '../../toast';
import { teamIdToId } from '@/src/utils/id';
import { makeTeamPayment } from '@/src/utils/razorpay';
import Spinner from '../../spinner';
import TeamCard from './TeamCard';

function EventRegistration({
  eventId,
  type,
  fees,
}: {
  eventId: Event['id'];
  type: Event['eventType'];
  fees: Event['fees'];
}) {
  const { loading, user, status } = useAuth();
  if (loading) return null;
  return (
    <>
      {!user ? (
        <Link href={'/login'}>
          <Button intent={'primary'}>Login to Register</Button>
        </Link>
      ) : (
        <EventRegistrationButton
          userId={user.id}
          registered={user.role !== 'USER'}
          eventId={eventId}
          type={type}
          fees={fees}
          name={user.name}
          email={user.email}
        />
      )}
    </>
  );
}

export default EventRegistration;

function EventRegistrationButton({
  eventId,
  type,
  fees,
  userId,
  registered,
  name,
  email,
}: {
  eventId: Event['id'];
  type: Event['eventType'];
  fees: Event['fees'];
  userId: string;
  registered: boolean;
  name: string;
  email: string;
}) {
  const { loading, data, error } = useQuery(MyTeamDocument, {
    variables: {
      eventId: eventId,
    },
  });
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [registerSoloEvent, { loading: regLoading, data: regData }] =
    useMutation(RegisterSoloEventDocument, {
      refetchQueries: ['MyTeam'],
    });

  const handleSoloRegister = async () => {
    let promise = registerSoloEvent({
      variables: {
        eventId: eventId,
      },
    }).then((res) => {
      if (
        res.data?.registerSoloEvent.__typename ===
        'MutationRegisterSoloEventSuccess'
      ) {
        if (fees !== 0) {
          makeTeamPayment(
            res.data?.registerSoloEvent.data.id,
            name,
            email,
            setSdkLoaded
          );
        }
      }
    });
    createToast(promise, 'Registering...');
  };
  if (loading)
    return (
      <div className="w-full h-20 flex justify-center items-center">
        <Spinner intent={'white'} />
      </div>
    );

  if (!registered) {
    return (
      <div className="w-full h-20 flex justify-center items-center flex-col space-y-2">
        <p className="text-white">You need to register to join events!</p>
        <Link href={'/register'}>
          <Button intent={'primary'}>Register Now</Button>
        </Link>
      </div>
    );
  } else if (
    data?.myTeam.__typename === 'QueryMyTeamSuccess' &&
    data.myTeam.data
  ) {
    return (
      <TeamCard
        userId={userId}
        name={name}
        email={email}
        team={data.myTeam.data as QueryMyTeamSuccess['data']}
      />
    );
  } else {
    if (type === 'INDIVIDUAL' || type === 'INDIVIDUAL_MULTIPLE_ENTRY') {
      if (fees === 0) {
        return (
          <Button onClick={handleSoloRegister} fullWidth intent={'primary'}>
            Register Now
          </Button>
        );
      } else {
        return (
          <Button
            disabled={regLoading || sdkLoaded}
            onClick={handleSoloRegister}
            fullWidth
            intent={'primary'}
          >
            Pay ₹{fees} and Register
          </Button>
        );
      }
    } else {
      return (
        <div className="w-full space-y-2">
          <CreateTeamModal eventId={eventId} />
          <JoinTeamModal />
        </div>
      );
    }
  }
}

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
  return (
    <>
      <Button
        className="w-full"
        disabled={loading}
        onClick={() => setOpen(true)}
        intent={'primary'}
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

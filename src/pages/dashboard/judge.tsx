import Dashboard from '@/src/components/layout/dashboard';
import Criterias from '@/src/components/pages/dashboard/judge/Criterias';
import SelectedTeamList from '@/src/components/pages/dashboard/judge/SelectedTeamList';
import TeamList from '@/src/components/pages/dashboard/judge/TeamList';
import Spinner from '@/src/components/spinner';
import {
  JudgeGetTeamsByRoundDocument,
  RoundByJudgeDocument,
  WinnersByEventDocument,
} from '@/src/generated/generated';
import { useAuth } from '@/src/hooks/useAuth';
import { useQuery, useSubscription } from '@apollo/client';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';

type Props = {};

const Judge: NextPage = (props: Props) => {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [selectionMode, setSelectionMode] = useState<boolean>(false);
  const {
    data,
    loading: EventLoading,
  } = useQuery(RoundByJudgeDocument, {
    skip: !user || loading,
  });

  const roundNo =
    data?.roundByJudge.__typename === 'QueryRoundByJudgeSuccess'
      ? data.roundByJudge.data.roundNo
      : null;
  const eventId =
    data?.roundByJudge.__typename === 'QueryRoundByJudgeSuccess'
      ? data.roundByJudge.data.eventId
      : null;

  const { data: TeamsData, loading: TeamsLoading } = useSubscription(
    JudgeGetTeamsByRoundDocument,
    {
      variables: {
        roundId: roundNo!,
        eventId: Number(eventId!),
      },
      skip:
        !user ||
        loading ||
        !(data?.roundByJudge.__typename === 'QueryRoundByJudgeSuccess'),
    }
  );

  const { data: winners, loading: winnersLoading } = useQuery(
    WinnersByEventDocument,
    {
      variables: {
        eventId: eventId!,
      },
      skip:
        !eventId ||
        !(
          data?.roundByJudge.__typename === 'QueryRoundByJudgeSuccess' &&
          data?.roundByJudge.data.roundNo ===
            data.roundByJudge.data.event.rounds.length
        ),
    }
  );

  const isCompleted =
    (data?.roundByJudge.__typename === 'QueryRoundByJudgeSuccess' &&
      data.roundByJudge.data.event.rounds.find(
        (round) => roundNo === round.roundNo
      )?.completed) ||
    false;

  if (loading)
    return (
      <div className="h-screen w-screen flex justify-center">
        <Spinner />
      </div>
    );

  if (!user) {
    router.push('/login');
    return <div>Redirecting...</div>;
  }

  if (user.role !== 'JUDGE') {
    router.push('/profile');
    return <div>Redirecting...</div>;
  }

  return (
    <Dashboard>
      <Toaster />
      <div
        className={isCompleted ? 'pointer-events-none opacity-30 relative' : ''}
      >
        <div className="relative px-4 sm:px-10 py-4 flex flex-wrap justify-between items-center">
          <h1 className="text-2xl sm:text-3xl mb-3">
            Hello <span className="font-semibold">{user?.name}</span>!
          </h1>
          <h1 className="text-2xl sm:text-3xl mb-3">
            {data?.roundByJudge.__typename === 'QueryRoundByJudgeSuccess' && (
              <span>
                Round {data.roundByJudge.data.roundNo} of{' '}
                {data.roundByJudge.data.event.name}
              </span>
            )}
          </h1>
        </div>
        {isCompleted && (
          <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center">
            <h1 className="text-3xl font-semibold text-white">
              Thank you for judging this event!
            </h1>
          </div>
        )}
        <div className="flex flex-wrap w-full justify-center sm:flex-nowrap min-h-[80vh] gap-3 px-8 sm:px-0 mb-10">
          <div className="w-full sm:w-auto sm:basis-1/2 shrink-0 grow-0 bg-black/20 rounded-lg ">
            {EventLoading ? (
              <Spinner />
            ) : (
              <>
                {data?.roundByJudge.__typename ===
                  'QueryRoundByJudgeSuccess' && (
                  <TeamList
                    data={TeamsData}
                    loading={TeamsLoading}
                    selectionMode={selectionMode}
                    setSelectionMode={setSelectionMode}
                    selectedTeam={selectedTeam}
                    setSelectedTeam={setSelectedTeam}
                    roundNo={data.roundByJudge.data.roundNo}
                    eventType={data.roundByJudge.data.event.eventType}
                    eventId={data.roundByJudge.data.eventId}
                    finalRound={
                      data.roundByJudge.data.roundNo ===
                      data.roundByJudge.data.event.rounds.length
                    }
                    winners={winners}
                  />
                )}
              </>
            )}
          </div>
          <div className="w-full sm:w-auto sm:basis-1/2 shrink-0 grow-0 bg-black/20 rounded-lg ">
            {EventLoading ? (
              <Spinner />
            ) : (
              <>
                {selectionMode ? (
                  <>
                    {data?.roundByJudge.__typename ===
                      'QueryRoundByJudgeSuccess' &&
                      TeamsData && (
                        <SelectedTeamList
                          eventId={data.roundByJudge.data.eventId}
                          teams={TeamsData}
                          roundNo={data.roundByJudge.data.roundNo}
                          finalRound={
                            data.roundByJudge.data.roundNo ===
                            data.roundByJudge.data.event.rounds.length
                          }
                          winners={winners}
                          winnersLoading={winnersLoading}
                          eventType={data.roundByJudge.data.event.eventType}
                        />
                      )}
                  </>
                ) : selectedTeam ? (
                  <>
                    {data?.roundByJudge.__typename ===
                      'QueryRoundByJudgeSuccess' && (
                      <Criterias
                        selectedTeam={selectedTeam}
                        eventId={data?.roundByJudge.data.eventId}
                        roundNo={data?.roundByJudge.data.roundNo}
                        criterias={data.roundByJudge.data.criteria}
                      />
                    )}
                  </>
                ) : (
                  <div className="flex justify-center items-center h-full">
                    <h1 className="text-2xl font-semibold">
                      Choose a team to start judging.
                    </h1>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default Judge;

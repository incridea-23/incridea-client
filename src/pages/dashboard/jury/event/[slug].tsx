import Spinner from "@/src/components/spinner";
import { useAuth } from "@/src/hooks/useAuth";
import { useRouter } from "next/router";

import { useQuery } from "@apollo/client";
import Dashboard from "@/src/components/layout/dashboard";
import { Tab } from "@headlessui/react";
import {
  EventByIdDocument,
  EventByIdQuery,
  GetScoreSheetJuryDocument,
  QueryGetScoreSheetJuryViewSuccess,
} from "@/src/generated/generated";
import { StatusBadge } from "..";
import { NextPage, NextPageContext } from "next";

const Jury: NextPage<{ slug: string }> = (props) => {
  const { user, loading, error } = useAuth();
  const router = useRouter();
  console.log(props.slug, props.slug.split("-")[-1]);
  const {
    data: event,
    loading: eventLoading,
    error: eventError,
  } = useQuery(EventByIdDocument, {
    variables: {
      id: props.slug.split("-").pop() as string,
    },
  });
  if (loading || eventLoading)
    return (
      <div className="h-screen w-screen flex justify-center">
        <Spinner />
      </div>
    );
  if (!user) {
    router.push("/login");
    return <div>Redirecting...</div>;
  }
  if (user.role !== "JURY") {
    router.push("/profile");
    return <div>Redirecting...</div>;
  }
  if (!event) return <div>Event not found</div>;
  return (
    <Dashboard>
      <RoundTabs eventId={event.eventById.id} rounds={event.eventById.rounds} />
    </Dashboard>
  );
};

export default Jury;

const RoundTabs = ({
  rounds,
  eventId,
}: {
  rounds: EventByIdQuery["eventById"]["rounds"];
  eventId: string;
}) => {
  const getCompletedRounds = (
    rounds: EventByIdQuery["eventById"]["rounds"]
  ) => {
    let completedRounds = 0;
    rounds.forEach((round) => {
      if (round.completed === true) completedRounds++;
    });
    return completedRounds;
  };
  const getRoundStatus = (
    round: EventByIdQuery["eventById"]["rounds"][0],
    totalRounds: number
  ) => {
    if (round.completed) return "COMPLETED";
    if (
      new Date(
        rounds.find((r) => r.roundNo === round.roundNo)?.date
      ).getTime() > new Date().getTime()
    )
      return "YET_TO_START";
    return "ONGOING";
  };
  return (
    <Tab.Group>
      <Tab.List className="w-full items-end gap-5 p-2 flex bg-black/20">
        {rounds.map((round) => (
          <Tab
            key={`${round.roundNo}-${eventId}`}
            className="flex w-fit items-center gap-2 p-2 bg-black/40">
            Round {round.roundNo}{" "}
            <StatusBadge status={getRoundStatus(round, rounds.length)} />{" "}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels>
        {rounds.map((round) => (
          <Tab.Panel key={`${round.roundNo}-${eventId}`}>
            <RoundTable eventId={eventId} roundNo={round.roundNo} />
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};

const RoundTable = ({
  eventId,
  roundNo,
}: {
  eventId: string;
  roundNo: number;
}) => {
  const {
    data: round,
    loading: roundLoading,
    error: roundError,
  } = useQuery(GetScoreSheetJuryDocument, {
    variables: {
      eventId: eventId,
      roundNo: roundNo,
    },
  });
  /*
   data {
        judges {
          criteria {
            criteriaId
            score
          }
          judgeId
          judgeName
        }
        teamId
        teamName
        teamScore
      }
    }
   */
  if (roundLoading) return <Spinner />;
  if (!round) return <div>Something went wrong</div>;
  if (roundError || round.getScoreSheetJuryView["__typename"] === "Error")
    return <div>Something went wrong</div>;
  if (round.getScoreSheetJuryView.data.length === 0)
    return <div>Nothing to show</div>;
  return (
    <JudgeTable
      judges={round.getScoreSheetJuryView.data[0].judges}
      teams={round.getScoreSheetJuryView.data}
    />
  );
};

const JudgeTable = ({
  judges,
  teams,
}: {
  judges: QueryGetScoreSheetJuryViewSuccess["data"][0]["judges"];
  teams: QueryGetScoreSheetJuryViewSuccess["data"];
}) => {
  return (
    <Tab.Group>
      <Tab.List className="w-full items-end gap-5 p-2 flex bg-black/20">
        {judges.map((judge) => (
          <Tab
            key={judge.judgeId}
            className="flex w-fit items-center gap-2 p-2 bg-black/40">
            {judge.judgeName}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels>
        {judges.map((judge) => (
          <Tab.Panel key={judge.judgeName}>
            <div className="flex justify-evenly gap-5 text-3xl font-semibold">
              <div className="">Team Name</div>
              {judge.criteria.map((criteria) => (
                <div key={criteria.criteriaId} className="">
                  {criteria.criteriaName}
                </div>
              ))}
              <div className="">Judge Total</div>
              <div className="">Judge Total</div>
            </div>
            {teams.map((team) => (
              <div
                key={team.teamId}
                className="flex justify-evenly gap-5 text-3xl font-semibold">
                <div className="">{team.teamName}</div>
                {team.judges
                  .find((j) => j.judgeId === judge.judgeId)
                  ?.criteria.map((criteria) => (
                    <div key={criteria.criteriaId} className="">
                      {criteria.score}
                    </div>
                  ))}
                <div className="">
                  {team.judges
                    .find((j) => j.judgeId === judge.judgeId)
                    ?.criteria.reduce((acc, curr) => acc + curr.score, 0)}
                </div>
                <div className="">{team.teamScore}</div>
              </div>
            ))}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};

export const getServerSideProps = async (context: NextPageContext) => {
  const { slug } = context.query;
  return { props: { slug: slug } };
};

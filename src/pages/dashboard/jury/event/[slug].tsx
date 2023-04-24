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
             <div className="hidden md:flex mt-3 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg bg-clip-padding rounded-t-lg p-1 items-center justify-between gap-2.5 text-xl font-bold h-16">
                <div className="basis-1/3 py-2.5 text-center pl-2">Team Name</div>
                {judge.criteria.map((criteria) => (
                <div key={criteria.criteriaId} className="basis-1/3 py-2.5 text-center pl-2">
                  {criteria.criteriaName}
                </div>
                ))}
                <div className="basis-1/3 py-2.5 text-center pl-2">Judge Total</div>
                <div className="basis-1/3 py-2.5 text-center pr-2">Grand Total</div>
              </div>
            {teams.map((team) => (
              <div
                key={team.teamId}
                className="bg-white/10 md:rounded-none rounded-lg md:p-4  p-3 flex flex-col md:flex-row md:items-center items-start md:justify-evenly w-full md:text-center mb-3 md:my-0">
                <div className="basis-1/3 py-0.5 text-center text-lg">{team.teamName}</div>
                {team.judges
                  .find((j) => j.judgeId === judge.judgeId)
                  ?.criteria.map((criteria) => (
                    <div key={criteria.criteriaId} className="basis-1/3  py-0.5 text-center text-lg">
                      {criteria.score}
                    </div>
                  ))}
                <div className="basis-1/3  py-0.5 text-center text-lg">
                  {team.judges
                    .find((j) => j.judgeId === judge.judgeId)
                    ?.criteria.reduce((acc, curr) => acc + curr.score, 0)}
                </div>
                <div className="basis-1/3 py-0.5 text-center text-lg">{team.teamScore}</div>
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

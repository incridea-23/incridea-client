import Spinner from "@/src/components/spinner";
import { useAuth } from "@/src/hooks/useAuth";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Dashboard from "@/src/components/layout/dashboard";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@apollo/client";
import {
  PublishedEventsDocument,
  PublishedEventsQuery,
} from "@/src/generated/generated";
import Events from "../../events";
import Link from "next/link";

function Jury() {
  const { user, loading, error } = useAuth();
  const router = useRouter();
  const {
    data: Events,
    loading: EventLoading,
    error: EventError,
  } = useQuery(PublishedEventsDocument);

  if (loading || EventLoading)
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
  return (
    <Dashboard>
      <Toaster />
      <div className="relative top-14 md:top-0 p-2 flex justify-between items-center">
        <h1 className="text-3xl mb-3">
          Hello <span className="font-semibold">{user?.name}</span>!
        </h1>
      </div>
      <div className="grid  grid-cols-1 mx-auto gap-10 md:grid-cols-2 max-w-7xl xl:grid-cols-3">
        {Events &&
          Events.publishedEvents.map((Event) => {
            return <EventCard key={Event.id} event={Event} />;
          })}
      </div>
    </Dashboard>
  );
}

export default Jury;

const EventCard = ({
  event,
}: {
  event: PublishedEventsQuery["publishedEvents"][0];
}) => {
  const getCompletedRounds = () => {
    let completedRounds = 0;
    event.rounds.forEach((round) => {
      if (round.completed === true) completedRounds++;
    });
    return completedRounds;
  };
  const totalRounds = event.rounds.length;
  const getRoundStatus = () => {
    if (getCompletedRounds() === totalRounds) return "COMPLETED";
    if (
      new Date(event.rounds.find((r) => r.roundNo === 1)?.date).getTime() >
      new Date().getTime()
    )
      return "YET_TO_START";
    return "ONGOING";
  };
  return (
    <Link
      href={`/dashboard/jury/event/${event.name
        .toLowerCase()
        .replaceAll(" ", "-")}-${event.id}`}
      key={event.id}
      className="bg-black/20 backdrop-blur-sm flex flex-col cursor-pointer rounded-sm  max-w-xl w-full p-5 hover:scale-[1.03] transition-transform duration-300">
      <div className="">
        <h1>{event.name}</h1>
        <div className="py-2 flex justify-between">
          <div className="p-2 bg-black/40 rounded-md">
            <div className="flex items-center justify-center">
              <span className="text-md pr-2">Rounds</span>
              <span className="text-xl font-semibold">
                {getCompletedRounds()}
              </span>
              <span className="text-xl">/</span>
              <span className="text-xl font-semibold">{totalRounds}</span>
            </div>
          </div>
          <StatusBadge status={getRoundStatus()} />
        </div>
      </div>
    </Link>
  );
};

export const StatusBadge = ({ status }: { status: string }) => {
  if (status === "COMPLETED")
    return (
      <div className="border-2 h-fit rounded-full text-green-400 border-green-400 px-2 py-1">
        Completed
      </div>
    );
  if (status === "ONGOING")
    return (
      <div className="border-2 h-fit rounded-full text-yellow-400 border-yellow-400 px-2 py-1">
        OnGoing
      </div>
    );
  if (status === "YET_TO_START")
    return (
      <div className="border-2 h-fit rounded-full text-red-500 border-red-500 px-2 py-1">
        yet to start
      </div>
    );
  return null;
};

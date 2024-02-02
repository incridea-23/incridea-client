// import { RegisterdEventsDocument } from '@/src/generated/generated';

import { useQuery } from "@apollo/client";
import Link from "next/link";
import Button from "../../button";
import Spinner from "../../spinner";
import EventCard from "./eventCard";
import UserTeams from "./userTeams";
import { FC } from "react";
import { RegisterdEventsDocument } from "@/src/generated/generated";

const UserEvents: FC<{
  userId: string;
  name: string;
  email: string;
}> = ({ userId, name, email }) => {
  const { data: events, loading, error } = useQuery(RegisterdEventsDocument);

  return (
    <section className="h-[50dvh]">
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <Spinner size={"medium"} intent={"white"} />
        </div>
      ) : events?.registeredEvents.__typename ===
          "QueryRegisteredEventsSuccess" &&
        events.registeredEvents.data.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-5 h-full">
          <p className="text-white/80 text-lg">
            Register for an event to see it here gamer!
          </p>
          <Link href="/events" className="text-white">
            <Button>Explore Quests</Button>
          </Link>
        </div>
      ) : null}

      {!loading &&
        !error &&
        events?.registeredEvents.__typename ===
          "QueryRegisteredEventsSuccess" &&
        events.registeredEvents.data.length !== 0 && (
          <>
            <div className="space-y-5 ">
              <div className="titleFont text-center w-full rounded-t-xl text-white text-2xl py-2 bg-white/10">
                My Quests
              </div>
              <div className="max-w-[95%] mx-auto space-y-4 pb-8">
                <h3 className="text-white px-3 z-1 md:text-center lg:text-left">
                  You have entered{" "}
                  <span className="text-fuchsia-500">
                    {events.registeredEvents.data.length}
                  </span>{" "}
                  quest{events.registeredEvents.data.length > 1 && "s"}
                </h3>
                <div className="grid  xl:grid-cols-2 grid-cols-1 gap-8 items-center justify-center">
                  {events?.registeredEvents.__typename ===
                    "QueryRegisteredEventsSuccess" &&
                    events?.registeredEvents.data?.map((event) => (
                      <EventCard
                        key={event.id}
                        teams={event.teams}
                        event={event}
                        userId={userId}
                        name={name}
                        email={email}
                      />
                    ))}
                </div>
              </div>
            </div>
          </>
        )}
    </section>
  );
};

export default UserEvents;

import { useQuery } from "@apollo/client";
import Link from "next/link";
import Spinner from "../../spinner";
import EventCard from "./eventCard";
import { FC } from "react";
import { RegisterdEventsDocument } from "@/src/generated/generated";
import { MdOutlineExplore } from "react-icons/md";
import { FaExternalLinkAlt } from "react-icons/fa";
import AttemptQuizModal from "./AttemptQuizModal";
const UserEvents: FC<{
  userId: string;
}> = ({ userId }) => {
  const { data: events, loading, error } = useQuery(RegisterdEventsDocument);

  return (
    <section className="h-full border border-primary-200/80 rounded-xl bg-primary-500">
      <div className="titleFont text-center text-white text-5xl py-5">
        My Quests
      </div>

      <div className="flex justify-center items-center mt-2 ">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Spinner size={"medium"} intent={"white"} />
          </div>
        ) : events?.registeredEvents.__typename ===
            "QueryRegisteredEventsSuccess" &&
          events.registeredEvents.data.length === 0 ? (
          <div
            data-scroll
            className={`h-full flex flex-col p-10 rounded-xl gap-5 justify-center items-center text-center text-white text-xl`}
          >
            <MdOutlineExplore size={50} />
            <p className="text-white/80 text-base md:text-xl">
              Register for an event to see it here!
            </p>
            <Link href="/events" className="text-white">
              <button className="mt-1 px-5 text-sm md:text-lg text-white capitalize shrink-0 w-full py-2 flex gap-2 items-center justify-center rounded-full bg-gradient-to-tr from-secondary-800 to-secondary-600 hover:brightness-125 hover:scale-[1.02] transition-all duration-300">
                <FaExternalLinkAlt size={16} />
                Explore Quests
              </button>
            </Link>
          </div>
        ) : null}

        {!loading &&
          !error &&
          events?.registeredEvents.__typename ===
            "QueryRegisteredEventsSuccess" &&
          events.registeredEvents.data.length !== 0 && (
            <div className="space-y-2 h-[80dvh]">
              <div className="mx-auto w-full space-y-4 px-5 bg-primary-500">
                <div className="text-white  z-1 text-center font-bold w-full flex justify-center mb-5">
                  <p className="border rounded-full w-fit px-3 py-1 border-primary-200/80">
                    You have entered{" "}
                    <span className="text-secondary-500">
                      {events.registeredEvents.data.length}
                    </span>{" "}
                    quest{events.registeredEvents.data.length > 1 && "s"}!
                  </p>
                </div>

                <div className="pb-5 flex flex-wrap justify-center items-stretch gap-5">
                  {events?.registeredEvents.__typename ===
                    "QueryRegisteredEventsSuccess" &&
                    events?.registeredEvents.data?.map((event, i) => {
                      console.log(event);
                      return (
                        <>
                          <EventCard
                            key={i}
                            teams={event.teams}
                            event={event}
                            userId={userId}
                          />
                          {event.rounds.find(
                            (round) =>
                              round.Quiz?.id && round.Quiz.allowAttempts
                          ) && (
                            <div>
                              {/* href={`/quiz?eventId=${event.id}&teamId=${ */}
                              {/* //     event.teams.find(
                            //       (team) =>
                            //         team.members.findIndex(
                            //           (member) => member.user.id === userId
                            //         ) !== -1
                            //     )?.id
                            //   }`}
                            // >Attempt Quiz */}
                              <AttemptQuizModal
                                eventId={Number(event.id)}
                                roundNo={
                                  event.rounds.find(
                                    (round) => round.Quiz?.allowAttempts == true
                                  )?.roundNo || -1
                                }
                                teamId={
                                  event.teams.find(
                                    (team) =>
                                      team.members.findIndex(
                                        (member) => member.user.id === userId
                                      ) !== -1
                                  )?.id || ""
                                }
                              />
                            </div>
                          )}
                        </>
                      );
                    })}
                </div>
              </div>
            </div>
          )}
      </div>
    </section>
  );
};

export default UserEvents;

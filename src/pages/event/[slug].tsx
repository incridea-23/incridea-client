import EventDetails from "@/src/components/pages/event/EventDetails";
import EventRegistration from "@/src/components/pages/event/EventRegistration";
import {
  Event,
  EventByIdDocument,
  PublishedEventsSlugDocument,
} from "@/src/generated/generated";
import { client } from "@/src/lib/apollo";
import styles from "./eventSlug.module.css";

import Image from "next/image";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
import { BsFillTelephoneFill } from "react-icons/bs";
import {
  IoCashOutline,
  IoInformationOutline,
  IoLocationOutline,
  IoPeopleOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import { BiTimeFive } from "react-icons/bi";
import { BsFillCalendar2WeekFill } from "react-icons/bs";

function event({ event, error }: { event: Event; error: String }) {
  const getEventAttributes = () => {
    let teamSizeText = "",
      eventTypeText = "";
    if (event.minTeamSize === event.maxTeamSize) {
      if (event.minTeamSize !== 1)
        teamSizeText += `${event.minTeamSize} members per team`;
      if (event.minTeamSize === 0) teamSizeText = "";
    } else {
      teamSizeText = ` ${event.minTeamSize} - ${event.maxTeamSize} members per team`;
    }

    if (event.eventType.includes("MULTIPLE")) {
      eventTypeText =
        event.eventType.split("_")[0][0] +
        event.eventType.split("_")[0].slice(1).toLowerCase() +
        " Event (Multiple Entry)";
    } else
      eventTypeText =
        event.eventType[0] + event.eventType.slice(1).toLowerCase() + " Event";

    eventTypeText = eventTypeText.replaceAll("Individual", "Solo");

    return [
      {
        name: "Venue",
        text: event.venue,
        Icon: IoLocationOutline,
      },
      {
        name: "Event Type",
        text: eventTypeText,
        Icon: IoPersonOutline,
      },
      {
        name: "Fees",
        text: event.fees,
        Icon: IoCashOutline,
      },
      {
        name: "Team Size",
        text: teamSizeText,
        Icon: IoPeopleOutline,
      },
      {
        name: eventTypeText ? "Maximum Participants" : "Maximum Teams", //eventTypeText would be empty for solo events
        text: event.maxTeams,
        Icon: IoInformationOutline,
      },
    ];
  };

  return (
    <div className={`relative`}>
      <Image
        alt="events-bg"
        src="/assets/eventSlug/cover.svg"
        height={1920}
        width={1080}
        priority
        className={`w-screen h-screen object-cover object-center top-0 left-0 absolute`}
      />
      <Toaster/>
      {event ? (
        <section className={`brightness-75 flex lg:flex-row flex-col gap-5 max-w-7xl mx-auto text-amber-900 h-screen overflow-y-scroll no-scrollbar lg:overflow-y-hidden`}>
          <div className={`overflow-x-visible lg:h-full lg:overflow-y-scroll lg:no-scrollbar px-3 pt-20 lg:pb-8`}>
            <div className={`${styles.main}`}>
              <div className={`${styles.parchment}`} />
              <div className={`${styles.contain}`}>
                <div className={` grow-0 space-y-4 sm:space-y-10 rounded-md ${styles.mapicon}`}>
                  {event.image && (
                    <Image
                      src={event.image as string}
                      className={`relative w-full sm:rounded-md rounded-t-md z-10`}
                      alt={event.name}
                      width={1000}
                      height={1000}
                    />
                  )}
                  <h1
                    className={`font-VikingHell capitalize text-2xl sm:text-4xl px-4 pb-0 sm:p-0 font-bold`}
                  >
                    {event.name}
                  </h1>
                  <div className={`px-4 pb-4 sm:p-0`}>
                    <EventDetails details={event.description as string} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`lg:h-full lg:overflow-y-scroll lg:no-scrollbar px-3 lg:pt-20 pb-8 w-auto shrink-0 flex flex-col gap-5 items-center rounded-md`}>
            <div className={`${styles.main}`}>
              <div className={`${styles.parchment}`} />
              <div className={`${styles.contain}`}>
                <div className={`space-y-1.5 order-2 w-full ${styles.mapicon}`}>
                <hr className="w-48 h-1 mx-auto my-4 bg-amber-800 border-0 rounded "/>
                  <h2 className={`font-VikingHell mb-2 text-2xl`}>Details</h2>
                  <div className={`flex flex-wrap mt-2 gap-1.5 w-full bodyFont`}>
                    {getEventAttributes().map((attr) =>
                      attr.text ? (
                        <div
                          key={attr.name}
                          className={`w-full flex flex-wrap break-words text-semibold px-3 py-2 text-amber-900 font-medium bg-white/20 shrink-0 text-sm rounded-sm grow gap-1 items-center`}
                        >
                          {<attr.Icon />}
                          <p>
                            {attr.name} {": "}
                          </p>
                          <p className={`leading-4`}>{attr.text}</p>
                        </div>
                      ) : (
                        <></>
                      )
                    )}
                  </div>
                  <div className={`text-sm`}>
                    <div className={`grid grid-cols-1 gap-1.5`}>
                      {event.rounds.map((round) => (
                        <div
                          key={round.roundNo}
                          className={`py-2 text-amber-900 rounded-sm bg-white/20 space-y-2 px-3 items-center bodyFont`}
                        >
                          <div className={` font-semibold `}>
                            Round {round.roundNo}
                          </div>
                          <div className={`space-y-2`}>
                            <p className={`flex gap-2 items-center`} suppressHydrationWarning>
                              <BsFillCalendar2WeekFill />
                              {round.date &&
                                new Date(round.date).toLocaleDateString(
                                  "en-IN",
                                  {
                                    day: "numeric",
                                    month: "short",
                                  }
                                )}
                            </p>
                            <p className={`flex gap-2 items-center`} suppressHydrationWarning>
                              <BiTimeFive />
                              {round.date &&
                                new Date(round.date).toLocaleTimeString(
                                  "en-IN",
                                  {
                                    hour: "numeric",
                                    minute: "numeric",
                                    hour12: true,
                                  }
                                )}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className={`w-full flex justify-center order-1`}>
                  {event.name.toLowerCase() !== "lazzerena" ? (
                    <EventRegistration
                      fees={event.fees}
                      eventId={event.id}
                      type={event.eventType}
                    />
                  ) : (
                    <div className={`bg-black/20 px-3 p-2.5 font-semibold italic text-white/60 rounded-sm `}>
                      On-spot registrations only
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className={`${styles.main}`}>
              <div className={`${styles.parchment}`} />
              <div className={`${styles.contain}`}>
                <div className={`w-full order-3`}>
                  <h2 className={`font-VikingHell mb-2 text-2xl`}>
                    Organizers
                  </h2>
                  <div className={`space-y-1.5 w-full bodyFont`}>
                    {event.organizers.map((organizer) => (
                      <div
                        key={organizer.user.id}
                        className={`text-amber-900 w-full p-2.5 rounded-sm bg-gray-300/20 px-3  text-md   `}
                      >
                        <h3 className={`text-lg font-semibold mb-2`}>
                          {organizer.user.name}
                        </h3>
                        <div className={`flex gap-1 flex-col`}>
                          {organizer.user.email && (
                            <Link
                              href={`mailto:${organizer.user.email}`}
                              className={`text-sm inline-flex overflow-x-auto items-center gap-2`}
                            >
                              <MdOutlineMailOutline className={`text-lg`} />{" "}
                              {organizer.user.email}
                            </Link>
                          )}
                          {organizer.user.phoneNumber && (
                            <Link
                              href={`tel:${organizer.user.phoneNumber}`}
                              className={`text-sm inline-flex items-center gap-2`}
                            >
                              <BsFillTelephoneFill className={`text-lg`} />{" "}
                              {organizer.user.phoneNumber}
                            </Link>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <svg className={`invisible pointer-events-none h-0`}>
              <filter id="wavy2">
                <feTurbulence
                  x="0"
                  y="0"
                  baseFrequency="0.02"
                  numOctaves="5"
                  seed="1"
                />
                <feDisplacementMap in="SourceGraphic" scale="20" />
              </filter>
            </svg>
          </div>
        </section>
      ) : (
        <div className={`flex flex-col p-10 text-white justify-center gap-5 items-center h-screen`}>
          <h1 className={`text-3xl font-semibold `}>Oops!</h1>
          <div className={`text-center`}>
            <p>Looks like you&apos;ve glitched out and got lost in the pixels!</p>
            <p>
              Click{" "}
              <Link className={`underline`} href={"/events"}>
                here
              </Link>{" "}
              to head back to the events page
            </p>
          </div>
          <p className={`px-4 py-2 rounded-md bg-red-200 text-red-800`}>
            <b>Error message:</b> {error}
          </p>
        </div>
      )}
    </div>
  );
}

export default event;

// ISR
export async function getStaticProps({ params }: { params: Params }) {
  try {
    const { data: event } = await client.query({
      query: EventByIdDocument,
      variables: {
        id: params.slug.split("-").pop() as string,
      },
    });
    return {
      props: {
        event: event.eventById,
      },
      revalidate: 60,
    };
  } catch (error: any) {
    return {
      props: {
        error: error?.message || "Could not find event",
        event: null,
      },
    };
  }
}

export async function getStaticPaths() {
  // Get the paths we want to pre-render based on posts
  const { data: events } = await client.query({
    query: PublishedEventsSlugDocument,
  });
  const paths = events.publishedEvents.map((event) => ({
    params: {
      slug: `${event.name.toLocaleLowerCase().split(" ").join("-")}-${
        event.id
      }`,
    },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: 'blocking' } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" };
}

type Params = {
  slug: string;
};

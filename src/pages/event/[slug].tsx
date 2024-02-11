import EventDetails from "@/src/components/pages/event/EventDetails";
import EventRegistration from "@/src/components/pages/event/EventRegistration";
import {
  Event,
  EventByIdDocument,
  PublishedEventsSlugDocument,
} from "@/src/generated/generated";
import { client } from "@/src/lib/apollo";
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
    <div className={`relative flex justify-center items-center`}>
      <Image
        alt="events-bg"
        src="/assets/eventSlug/cover.svg"
        height={1920}
        width={1080}
        priority
        className={`w-screen h-screen object-cover object-center top-0 left-0 absolute`}
      />
      <Toaster />
      {event ? (
        <section
          className={`flex lg:flex-row flex-col gap-5 max-w-7xl mx-auto text-white h-screen overflow-y-scroll no-scrollbar lg:overflow-y-hidden`}
        >
          <div
            className={`overflow-x-visible lg:h-full lg:overflow-y-scroll lg:no-scrollbar px-3 pt-20 lg:pb-8`}
          >
            <div
              className={`bg-primary-300/50 backdrop-filter backdrop-blur-xl border border-primary-200/80 p-5 rounded-xl basis-1/3`}
            >
              <div className={`grow-0 space-y-4 sm:space-y-10 rounded-md`}>
                {event.image && (
                  <Image
                    src={event.image as string}
                    // src="https://res.cloudinary.com/dg1941jdi/image/upload/v1706863440/Events/Usaravalli_1706863437635.png"
                    className={`relative w-full sm:rounded-md rounded-t-md z-10`}
                    alt={event.name}
                    width={1000}
                    height={1000}
                  />
                )}
                <h1
                  className={`font-VikingHell capitalize text-center text-3xl md:text-6xl tracking-wider px-4 pb-0 sm:p-0 font-bold`}
                >
                  {event.name}
                </h1>
                <div className={`px-4 pb-4 sm:p-0`}>
                  <EventDetails details={event.description as string} />
                </div>
              </div>
            </div>
          </div>
          <div
            className={`basis-1/3 lg:h-full lg:overflow-y-scroll lg:no-scrollbar px-3 lg:pt-20 pb-8 w-full shrink-0 flex flex-col gap-5 items-center rounded-md`}
          >
            <div
              className={`bg-primary-300/50 backdrop-filter backdrop-blur-xl border border-primary-200/80 w-full p-5 rounded-xl`}
            >
              <div>
                <div className={`space-y-1.5 order-2 w-full`}>
                  {/* <hr className="w-48 h-1 mx-auto my-4 bg-secondary-800 border-0 rounded " /> */}
                  <h2
                    className={`font-VikingHell tracking-wider mb-2 text-2xl md:text-4xl`}
                  >
                    Details
                  </h2>
                  <div className={`flex flex-wrap mt-2 gap-2 w-full bodyFont`}>
                    {getEventAttributes().map((attr) =>
                      attr.text ? (
                        <div
                          key={attr.name}
                          className={`text-sm md:text-md w-full flex items-center border border-secondary-400/40 gap-2 text-left bg-primary-200/30 p-1 rounded-full px-2`}
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
                    <div className={`grid grid-cols-1 gap-2`}>
                      {event.rounds.map((round) => (
                        <div
                          key={round.roundNo}
                          className={`py-2 text-white bg-primary-200/30 space-y-2 px-3 items-center bodyFont border border-secondary-400/40 rounded-xl`}
                        >
                          <div className={` font-semibold `}>
                            Round {round.roundNo}
                          </div>
                          <div className={`space-y-2`}>
                            <p
                              className={`flex gap-2 items-center`}
                              suppressHydrationWarning
                            >
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
                            <p
                              className={`flex gap-2 items-center`}
                              suppressHydrationWarning
                            >
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
                <div className={`w-full flex justify-center order-1 mt-3`}>
                  <EventRegistration
                    fees={event.fees}
                    eventId={event.id}
                    type={event.eventType}
                  />
                </div>
              </div>
            </div>
            {event.organizers.length > 0 && (
              <div
                className={`bg-primary-300/50 backdrop-filter backdrop-blur-xl border border-primary-200/80 p-5 rounded-xl w-full`}
              >
                <div className={`w-full order-3`}>
                  <h2
                    className={`font-VikingHell mb-2 text-2xl md:text-4xl tracking-wider`}
                  >
                    Organizers
                  </h2>
                  <div className={`space-y-2 w-full bodyFont`}>
                    {event.organizers.map((organizer) => (
                      <div
                        key={organizer.user.id}
                        className={`text-white w-full p-3 rounded-xl text-md border border-secondary-400/40 bg-primary-200/30`}
                      >
                        <h3 className={`text-lg font-semibold mb-2`}>
                          {organizer.user.name}
                        </h3>
                        <div className={`flex gap-2 flex-col`}>
                          {organizer.user.email && (
                            <a
                              href={`mailto:${organizer.user.email}`}
                              className={`text-sm inline-flex overflow-x-auto items-center gap-2 hover:underline hover:underline-offset-4`}
                            >
                              <MdOutlineMailOutline className={`text-lg`} />{" "}
                              {organizer.user.email}
                            </a>
                          )}
                          {organizer.user.phoneNumber && (
                            <a
                              href={`tel:${organizer.user.phoneNumber}`}
                              className={`text-sm inline-flex items-center gap-2 hover:underline hover:underline-offset-4`}
                            >
                              <BsFillTelephoneFill className={`text-lg`} />{" "}
                              {organizer.user.phoneNumber}
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      ) : (
        <div
          className={`absolute inset-0 flex flex-col p-10 text-white justify-center gap-5 items-center h-screen`}
        >
          <h1 className={`text-3xl font-semibold `}>Oops!</h1>
          <div className={`text-center`}>
            <p>
              Looks like you&apos;ve glitched out and got lost in the pixels!
            </p>
            <p>
              Click{" "}
              <Link className={`underline`} href={"/events"}>
                here
              </Link>{" "}
              to head back to the events page
            </p>
          </div>
          <p
            className={`px-4 text-center py-2 rounded-md bg-red-200 text-red-800`}
          >
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

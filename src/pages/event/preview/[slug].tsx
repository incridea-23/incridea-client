import EventDetails from "@/src/components/pages/event/EventDetails";
import EventRegistration from "@/src/components/pages/event/EventRegistration";
import { Event, EventByIdDocument } from "@/src/generated/generated";
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
      teamSizeText += event.minTeamSize;
      if (event.minTeamSize === 1) {
        teamSizeText += " member";
      } else teamSizeText += " members";
    } else {
      teamSizeText = ` ${event.minTeamSize} - ${event.maxTeamSize}`;
    }

    if (event.eventType.includes("MULTIPLE")) {
      eventTypeText =
        event.eventType.split("_")[0][0] +
        event.eventType.split("_")[0].slice(1).toLowerCase() +
        " Event (Multiple Entry)";
    } else
      eventTypeText =
        event.eventType[0] + event.eventType.slice(1).toLowerCase() + " Event";

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
        name: "Maximum Teams",
        text: event.maxTeams,
        Icon: IoInformationOutline,
      },
    ];
  };

  return (
    <div className="bg-gradient-to-bl  from-[#41acc9]  via-[#075985] to-[#2d6aa6]">
      <Toaster />
      {event ? (
        <section className="flex lg:flex-row flex-col gap-5 py-20 px-5 max-w-7xl mx-auto text-white">
          <div className="basis-3/4 grow-0 space-y-4 sm:space-y-10 bg-black/20 backdrop-blur-sm p-0 sm:p-7 rounded-md">
            {event.image && (
              <Image
                src={event.image as string}
                className="w-full sm:rounded-md rounded-t-md"
                alt={event.name}
                width={1000}
                height={1000}
              />
            )}
            <h1
              className={`titleFont text-2xl sm:text-4xl px-4 pb-0 sm:p-0 font-bold text-white`}>
              {event.name}
            </h1>
            <div className="px-4 pb-4 sm:p-0">
              <EventDetails details={event.description as string} />
            </div>
          </div>
          <div className="basis-1/4 shrink-0 flex flex-col gap-5 items-center rounded-md sm:bg-black/20 backdrop-blur-sm p-0 sm:p-7">
            <div className="space-y-1.5 max-w-2xl w-[300px]">
              <h2 className={`titleFont mb-2 text-2xl`}>Details</h2>
              <div className="flex flex-wrap mt-2 gap-1.5  w-full bodyFont">
                {getEventAttributes().map((attr) =>
                  attr.text ? (
                    <div
                      key={attr.name}
                      className="max-w-[100%] flex flex-wrap break-words text-semibold px-3 py-2 text-white bg-gray-300/20 shrink-0 text-sm rounded-sm grow gap-1 items-center">
                      {<attr.Icon />}
                      <p>
                        {attr.name} {" : "}
                      </p>
                      <p className="leading-4">{attr.text}</p>
                    </div>
                  ) : (
                    <></>
                  )
                )}
              </div>
              <div className="text-sm">
                <div className="grid grid-cols-1 gap-1.5">
                  {event.rounds.map((round) => (
                    <div
                      key={round.roundNo}
                      className="py-2 text-white rounded-sm bg-gray-300/20 space-y-2 px-3 items-center bodyFont">
                      <div className=" font-semibold ">
                        Round {round.roundNo}
                      </div>
                      <div className="space-y-2">
                        <p className="flex gap-2 items-center">
                          <BsFillCalendar2WeekFill />
                          {round.date &&
                            new Date(round.date).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                        </p>
                        <p className="flex gap-2 items-center">
                          <BiTimeFive />
                          {round.date &&
                            new Date(round.date).toLocaleTimeString("en-IN", {
                              hour: "numeric",
                              minute: "numeric",
                              hour12: true,
                            })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <EventRegistration
              fees={event.fees}
              eventId={event.id}
              type={event.eventType}
            />

            <div className="w-full">
              <h2 className={`titleFont mb-2 text-2xl`}>Organizers</h2>
              <div className="space-y-1.5 w-full bodyFont">
                {event.organizers.map((organizer) => (
                  <div
                    key={organizer.user.id}
                    className="text-white w-full p-2.5 rounded-sm bg-gray-300/20 px-3  text-md   ">
                    <h3 className="text-lg font-semibold mb-2">
                      {organizer.user.name}
                    </h3>
                    <div className="flex gap-1 flex-col">
                      {organizer.user.email && (
                        <Link
                          href={`mailto:${organizer.user.email}`}
                          className="text-sm inline-flex overflow-x-auto items-center gap-2">
                          <MdOutlineMailOutline className="text-lg" />{" "}
                          {organizer.user.email}
                        </Link>
                      )}
                      {organizer.user.phoneNumber && (
                        <Link
                          href={`tel:${organizer.user.phoneNumber}`}
                          className="text-sm inline-flex items-center gap-2">
                          <BsFillTelephoneFill className="text-lg" />{" "}
                          {organizer.user.phoneNumber}
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="flex flex-col p-10 text-white justify-center gap-5 items-center h-screen">
          <h1 className="text-3xl font-semibold ">Oops!</h1>
          <div className="text-center">
            <p>Looks like you&apos;ve wandered too deep and gotten lost!</p>
            <p>
              Click{" "}
              <Link className="underline" href={"/events"}>
                here
              </Link>{" "}
              to head back to the events page
            </p>
          </div>
          <p className="px-4 py-2 rounded-md bg-red-200 text-red-800">
            <b>Error message:</b> {error}
          </p>
        </div>
      )}
    </div>
  );
}

export default event;

// ISR
export async function getServerSideProps({ params }: { params: Params }) {
  try {
    const { data: event } = await client.query({
      query: EventByIdDocument,
      variables: {
        id: params.slug.split("-").pop() as string,
      },
      fetchPolicy: "no-cache",
    });
    return {
      props: {
        event: event.eventById,
      },
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

type Params = {
  slug: string;
};

import EventDetails from "@/src/components/pages/event/EventDetails";
import EventRegistration from "@/src/components/pages/event/EventRegistration";
import {
  Event,
  EventByIdDocument,
  PublishedEventsSlugDocument,
} from "@/src/generated/generated";
import { client } from "@/src/lib/apollo";
import { titleFont } from "@/src/utils/fonts";
import Image from "next/image";
import { BiDotsVerticalRounded, BiTimeFive } from "react-icons/bi";
import { BsFillCalendar2WeekFill, BsFillTelephoneFill } from "react-icons/bs";
import {
  IoCashOutline,
  IoInformationOutline,
  IoLocationOutline,
  IoPeopleOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { MdDriveFileMove, MdOutlineMailOutline } from "react-icons/md";

function event({ event }: { event: Event }) {
  const getEventAttributes = () => {
    let teamSizeText = "";
    if (event.minTeamSize === event.maxTeamSize) {
      teamSizeText += event.minTeamSize;
      if (event.minTeamSize === 1) {
        teamSizeText += " member";
      } else teamSizeText += " members";
    } else {
      teamSizeText = ` ${event.minTeamSize} - ${event.maxTeamSize}`;
    }
    return [
      {
        name: "Venue",
        text: event.venue,
        Icon: IoLocationOutline,
      },
      {
        name: "Event Type",
        text: event.eventType,
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
    <div className="bg-gradient-to-bl  from-sky-700 via-blue-600 to-indigo-800">
      <section className="flex lg:flex-row flex-col gap-5 py-20 px-5 max-w-7xl mx-auto text-white">
        <div className="basis-3/4 space-y-2 sm:space-y-10  bg-black/20 backdrop-blur-sm p-5 sm:p-10 rounded-md">
          {event.image && (
            <Image
              src={event.image as string}
              className="w-full rounded-md aspect-video "
              alt={event.name}
              width={1000}
              height={1000}
            />
          )}
          <h1
            className={`${titleFont.className} text-3xl sm:text-4xl font-bold text-white`}>
            {event.name}
          </h1>
          <EventDetails details={event.description as string} />
        </div>
        <div className="basis-1/4 flex flex-col gap-5 sm:gap-10 justify-between items-center rounded-md bg-black/20 backdrop-blur-sm p-5 sm:p-10  ">
          <div className="space-y-2">
            <h2 className={`${titleFont.className} mb-2 text-2xl`}>Details</h2>
            <div className="flex flex-wrap mt-2 gap-1.5  w-full">
              {getEventAttributes().map(
                (attr) =>
                  attr.text && (
                    <div
                      key={attr.name}
                      className="flex text-semibold px-3 py-2 text-white bg-gray-300/20 shrink-0 text-sm rounded-sm grow gap-1 items-center">
                      {<attr.Icon />}
                      <p>
                        {attr.name} {" : "}
                      </p>
                      <p className="leading-4">
                        {/* <span className="font-semibold">{attr.name}: </span> */}
                        {attr.text}
                      </p>
                    </div>
                  )
              )}
            </div>
            <div className="text-sm  ">
              <div className="grid grid-cols-2 mt-2 gap-1.5">
                {event.rounds.map((round) => (
                  <div
                    key={round.roundNo}
                    className="py-2 text-white  rounded-sm bg-gray-300/20     space-y-2 px-3 items-center">
                    <div className=" text-semibold ">Round {round.roundNo}</div>
                    <div className="space-y-2">
                      <p className="flex gap-2 items-center">
                        <BsFillCalendar2WeekFill />
                        {new Date(round.date).toLocaleString("en-IN", {
                          year: "numeric",
                          month: "short",
                          day: "2-digit",
                        })}
                      </p>
                      <p className="flex gap-2 items-center">
                        <BiTimeFive />
                        {new Date(round.date).toLocaleString("en-IN", {
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
            <h2 className={`${titleFont.className} mb-2 text-2xl`}>
              Organizers
            </h2>
            <div className="space-y-1.5 w-full  ">
              {event.organizers.map((organizer) => (
                <div
                  key={organizer.user.id}
                  className="text-white w-full p-2.5 rounded-sm bg-gray-300/20 px-3  text-md   ">
                  <h3 className="text-lg font-semibold mb-2">
                    {organizer.user.name}
                  </h3>
                  <div className="flex gap-0.5 flex-col">
                    <p className="text-sm inline-flex items-center gap-2">
                      <MdOutlineMailOutline className="text-lg" />{" "}
                      {organizer.user.email}
                    </p>
                    <p className="text-sm inline-flex items-center gap-2">
                      <BsFillTelephoneFill className="text-lg" />{" "}
                      {organizer.user.phoneNumber}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default event;

// ISR
export async function getStaticProps({ params }: { params: Params }) {
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
    revalidate: 1,
  };
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

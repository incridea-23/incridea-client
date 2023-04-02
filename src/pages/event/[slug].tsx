import EventDetails from "@/src/components/pages/event/EventDetails";
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
    <div className="bg-gradient-to-bl from-sky-700 via-blue-600 to-indigo-800">
      <section className="flex lg:flex-row flex-col gap-5 py-20 px-5 max-w-7xl mx-auto text-white">
        <div className="max-w-6xl space-y-5 sm:space-y-10  bg-black/20 backdrop-blur-sm p-5 sm:p-10 rounded-md">
          <Image
            src={event.image as string}
            className="w-full rounded-md aspect-video "
            alt={event.name}
            width={1000}
            height={1000}
          />
          <h1
            className={`${titleFont.className} text-3xl sm:text-4xl font-bold text-white`}>
            {event.name}
          </h1>
          <EventDetails details={event.description as string} />
        </div>
        <div className="basis-1/4 flex flex-col gap-5 sm:gap-10 justify-between items-center rounded-md bg-black/20 backdrop-blur-sm p-5 sm:p-10  ">
          <div className=" space-y-2 w-full">
            <h2 className={`${titleFont.className} mb-2 text-2xl`}>Details</h2>
            {getEventAttributes().map((attr) =>
              attr.text ? (
                <div
                  key={attr.name}
                  className="flex px-3 text-white text-md  py-2 bg-black/40 backdrop-blur-sm shrink-0 rounded-lg grow gap-2 items-center">
                  {<attr.Icon />}
                  <p className="whitespace-wrap">
                    <span className="font-semibold ">{attr.name}: </span>
                    {attr.text}
                  </p>
                </div>
              ) : (
                <></>
              )
            )}
            <div className="text-md  py-2 bg-black/40 backdrop-blur-sm shrink-0 rounded-lg grow ">
              <div className="flex flex-col gap-2 px-3">
                {event.rounds.map((round) => (
                  <div
                    key={round.roundNo}
                    className=" space-y-2 px-3 items-center">
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
          <div className="w-full">
            <h2 className={`${titleFont.className} mb-2 text-2xl`}>
              Organizers
            </h2>
            <div className="bg-black/40 space-y-5 p-2.5 rounded-lg ">
              {event.organizers.map((organizer) => (
                <div
                  key={organizer.user.id}
                  className=" px-3 text-white text-md   shrink-0 rounded-lg grow space-y-2">
                  <h3 className="text-xl font-semibold">
                    {organizer.user.name}
                  </h3>
                  <p className="text-sm inline-flex items-center gap-2">
                    <MdOutlineMailOutline className="text-lg" />{" "}
                    {organizer.user.email}
                  </p>
                  <p className="text-md inline-flex items-center gap-2">
                    <BsFillTelephoneFill className="text-lg" />{" "}
                    {organizer.user.phoneNumber}
                  </p>
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

import React from "react";
import { PublishedEventsQuery } from "@/src/generated/generated";
import Link from "next/link";
import {
  IoCalendarOutline,
  IoLocationOutline,
  IoPeopleOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { generateEventUrl } from "@/src/utils/url";
import Image from "next/image";
import styles from "./styles.module.css";
import { useRouter } from "next/router";
import { IoIosPlayCircle } from "react-icons/io";

const Event = ({
  data,
}: {
  data: PublishedEventsQuery["publishedEvents"][0];
}) => {
  const router = useRouter();
  const getEventAttributes = () => {
    let teamSizeText = "",
      eventTypeText = "";
    if (data.minTeamSize === data.maxTeamSize) {
      if (data.minTeamSize === 1)
        teamSizeText += `${data.minTeamSize} member per team`;
      else teamSizeText += `${data.minTeamSize} members per team`;
      if (data.minTeamSize === 0) teamSizeText = "";
    } else {
      teamSizeText = `${data.minTeamSize} - ${data.maxTeamSize} members per team`;
    }

    if (data.eventType.includes("MULTIPLE")) {
      eventTypeText =
        data.eventType.split("_")[0][0] +
        data.eventType.split("_")[0].slice(1).toLowerCase() +
        " (Multiple Entry)";
    } else
      eventTypeText = data.eventType[0] + data.eventType.slice(1).toLowerCase();

    eventTypeText = eventTypeText.replaceAll("Individual", "Solo");
    eventTypeText = eventTypeText.replaceAll("Team", "Multiplayer");

    return [
      {
        name: "Date",
        text: data.rounds[0]?.date
          ? new Date(data.rounds[0]?.date).toLocaleString("en-IN", {
              day: "numeric",
              month: "short",
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })
          : "TBD",
        Icon: IoCalendarOutline,
      },
      {
        name: "Type",
        text: eventTypeText,
        Icon: IoPersonOutline,
      },
      {
        name: "Venue",
        text: data.venue,
        Icon: IoLocationOutline,
      },
      {
        name: "Team Size",
        text: teamSizeText,
        Icon: IoPeopleOutline,
      },
    ];
  };

  return (
    <div
      data-scroll
      onClick={() => router.push(generateEventUrl(data.name, data.id))}
      className={`relative bg-[#551d96] border border-[#294558] px-2 rounded-2xl flex flex-col gap-2 w-full mx-auto py-2`}
    >
      <div>
        <div className="bg-[#f648ae] rounded-t-xl">
          <div className="w-full">
            <div className="-skew-x-[40deg] bg-[#551d96] absolute rounded-bl-3xl rounded-br-xl left-0 w-1/2 flex justify-start px-4 -translate-y-1">
              <Image
                src="/assets/png/incridealogo.png"
                alt={"Incridea Logo"}
                width={550}
                height={550}
                className="object-fill h-8 w-16 z-0  text-white skew-x-[40deg] "
              />
            </div>
            <div
              className={` tracking-wider uppercase font-bold flex justify-end pt-1 pr-2 text-secondary-900`}
            >
              {data.category?.toLowerCase() === "non_technical"
                ? "Non Tech"
                : data.category?.toLocaleLowerCase()}
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-b from-[#f648ae] to-[#d41b8f] rounded-b-xl rounded-tl-xl justify-end items-end right-0">
          <div className={`rounded-xl object-fill p-2`}>
            {data.image && (
              <Image
                // src={`https://res.cloudinary.com/dqy4wpxhn/image/upload/v1682653090/Events/VOCAL_TWIST_%28WESTERN%29_1682653088345.jpg`}
                src={data.image}
                alt={data.name}
                width={250}
                height={250}
                className="object-fill rounded-xl h-full w-full z-0 text-white"
              />
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full gap-2 text-white px-1 py-3 justify-center items-start md:w-full h-[9rem]">
        {getEventAttributes().map((attr, i) =>
          attr.name ? (
            <div
              className="w-full flex items-center border border-secondary-400/40 gap-2 text-left bg-primary-200/30 p-1 rounded-full px-2"
              key={i}
            >
              <attr.Icon />
              {/* hyd warning due to toLocaleString()
                safe to ignore - https://nextjs.org/docs/messages/react-hydration-error#solution-3-using-suppresshydrationwarning */}
              <span suppressHydrationWarning className="text-sm truncate">
                {attr.text}
              </span>
            </div>
          ) : null
        )}
      </div>
      <div className="w-full">
        <Link href={generateEventUrl(data.name, data.id)}>
          <button className="font-VikingHell tracking-wider text-lg text-white capitalize shrink-0 w-full py-2 flex gap-2 items-center justify-center rounded-full bg-gradient-to-tr from-secondary-800 to-secondary-600 hover:brightness-125 hover:scale-[1.02] transition-all duration-300">
            <IoIosPlayCircle />
            Play
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Event;

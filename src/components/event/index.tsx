/* eslint-disable @next/next/no-img-element */

import { PublishedEventsQuery } from "@/src/generated/generated";
import { titleFont } from "@/src/utils/fonts";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import Button from "../button";
import Link from "next/link";
import Image from "next/image";
import {
  IoCalendarClearOutline,
  IoCalendarOutline,
  IoCashOutline,
  IoInformationOutline,
  IoLocationOutline,
  IoPeopleOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { generateEventUrl } from "@/src/utils/url";

const Event = ({
  data,
}: {
  data: PublishedEventsQuery["publishedEvents"][0];
}) => {
  const router = useRouter();

  const getEventAttributes = () => {
    let teamSizeText = "";
    if (data.minTeamSize === data.maxTeamSize) {
      if (data.minTeamSize !== 1)
        teamSizeText += `${data.minTeamSize} members per team`;
    } else {
      teamSizeText = `${data.minTeamSize} - ${data.maxTeamSize} members per team`;
    }
    return [
      {
        name: "Date",
        text: data.rounds[0]?.date || "TBD",
        Icon: IoCalendarOutline,
      },
      {
        name: "Venue",
        text: data.venue,
        Icon: IoLocationOutline,
      },
      {
        name: "Fees",
        text: data.fees || "Free",
        Icon: IoCashOutline,
      },
      {
        name: "Type",
        text:
          data.eventType[0] + data.eventType.slice(1).toLowerCase() + " Event",
        Icon: IoPersonOutline,
      },
      {
        name: "Team Size",
        text: teamSizeText,
        Icon: IoPeopleOutline,
      },
    ];
  };

  return (
    <AnimatePresence>
      <motion.div
        onClick={() => {
          router.push(
            `event/${data.name.toLocaleLowerCase().split(" ").join("-")}-${
              data.id
            }`
          );
        }}
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.1 },
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        layout
        key={data.id}
        className="bg-black/20 backdrop-blur-sm flex flex-col cursor-pointer p-4 rounded-sm">
        <div className="relative grow">
          {data.image ? (
            <img
              src={data.image}
              alt={data.name}
              width={500}
              height={500}
              className="w-full object-cover rounded-sm"
            />
          ) : (
            <div className="h-full min-h-[200px] bg-gray-700 flex items-center justify-center italic text-gray-400 rounded-sm">
              no image
            </div>
          )}
          <span
            className={`${titleFont.className} bg-gradient-to-t from-black/30 to-transparent p-2 pl-4 h-1/2 w-full flex items-end bottom-0 absolute drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.7)] text-gray-100 font-bold text-xl`}>
            {data.name}
          </span>
        </div>
        <div className="flex flex-wrap mt-2 gap-1.5">
          {getEventAttributes().map(
            (attr) =>
              attr.text && (
                <div
                  key={attr.name}
                  className="flex px-3 py-2 text-gray-200 bg-gray-300/20 shrink-0 text-sm rounded-sm grow gap-1 items-center">
                  {<attr.Icon />}
                  <p className="leading-4">
                    {/* <span className="font-semibold">{attr.name}: </span> */}
                    {attr.text}
                  </p>
                </div>
              )
          )}
        </div>
        <Button noScaleOnHover className="hover:scale-0 shrink-0 mt-2">
          <Link href={generateEventUrl(data.name, data.id)}>Register</Link>
        </Button>
      </motion.div>
    </AnimatePresence>
  );
};

export default Event;

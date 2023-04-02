import { EventsByBranchRepQuery } from '@/src/generated/generated';
import { titleFont } from '@/src/utils/fonts';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { IoLocationOutline } from 'react-icons/io5';
import { RiNumbersLine } from 'react-icons/ri';

const EventCard: FC<{ event: EventsByBranchRepQuery["eventsByBranchRep"][0] }> = ({ event }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="flex flex-col items-center justify-center my-4 bg-white rounded-lg shadow-lg bg-opacity-30 backdrop-blur-2xl max-w-2xl w-[300px]"
    >
      <div className="flex items-center justify-center w-full h-40 overflow-hidden border-gray-300 rounded-t">
        {event?.image ? (
          <Image
            src={event?.image}
            alt={event?.name}
            width={300}
            height={200}
            className="rounded-lg"
          />
        ) : (
          <span className="text-xl font-semibold italic text-center h-full bg-gray-300/40 w-full flex items-center justify-center text-gray-800/70">
            no image
          </span>
        )}
      </div>

      <div className="pt-5">
        <h1
          className={`${titleFont.className} text-2xl font-bold text-center text-gray-900`}
        >
          {event?.name}
        </h1>
      </div>

      <div className="flex justify-between w-full p-5">
        <p className="flex items-center gap-1 text-lg font-medium text-center text-gray-800">
          <RiNumbersLine />
          {event?.rounds.length} Rounds
        </p>

        <div className="flex items-center justify-center gap-1">
          <IoLocationOutline />
          <p className="text-lg font-medium text-center text-gray-800">
            {event?.venue}
          </p>
        </div>
      </div>
      <button className="w-full p-2 bg-white bg-opacity-40 hover:bg-opacity-70 transition-colors duration-300 rounded-b-lg">
        <Link href={`/events/${event.name.toLowerCase().replaceAll(' ', '-')}-${event.id}`}>View Event</Link>
      </button>
    </motion.div>
  );
};

export default EventCard;

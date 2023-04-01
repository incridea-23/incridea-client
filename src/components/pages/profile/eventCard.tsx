import { titleFont } from '@/src/utils/fonts';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { IoLocationOutline } from 'react-icons/io5';
import { RiNumbersLine } from 'react-icons/ri';

const EventCard: FC<{ event: any }> = ({ event }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex flex-col items-center justify-center my-4 bg-white rounded-lg shadow-lg bg-opacity-30 backdrop-blur-2xl max-w-2xl w-[300px]"
    >
      <div className="flex items-center justify-center w-full h-40 overflow-hidden border-b border-gray-300 rounded-t">
        {event?.image ? (
          <Image
            src={event?.image}
            alt={event?.name}
            width={300}
            height={200}
            className="rounded-lg"
          />
        ) : (
          <span className="text-xl font-bold text-center text-gray-800">
            No Image Available.
          </span>
        )}
      </div>

      <div className="pt-5">
        <Link
          href={`/events/${event?.id}`}
          className={`${titleFont.className} text-2xl font-bold text-center text-gray-900 hover:text-gray-700`}
        >
          {event?.name}
        </Link>
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
    </motion.div>
  );
};

export default EventCard;

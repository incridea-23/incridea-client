import { titleFont } from '@/src/utils/fonts';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FC } from 'react';
import { IoLocationOutline } from 'react-icons/io5';

const EventCard: FC<{ event: any }> = ({ event }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex flex-col items-center justify-center p-4 my-4 bg-white rounded-lg shadow-lg bg-opacity-30 backdrop-blur-2xl max-w-2xl w-[300px]"
    >
      {event?.image ? (
        <div className="flex items-center justify-center w-full h-40 overflow-hidden rounded-lg">
          <Image
            src={event?.image}
            alt={event?.name}
            width={300}
            height={200}
            className="rounded-lg"
          />
        </div>
      ) : (
        <span className="flex items-center justify-center w-full h-40 text-xl font-bold text-center text-gray-800">
          No Image Available.
        </span>
      )}
      <div className="flex flex-col items-center justify-center pt-5">
        <h1
          className={`${titleFont.className} text-2xl font-bold text-center text-gray-800`}
        >
          {event?.name}
        </h1>

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

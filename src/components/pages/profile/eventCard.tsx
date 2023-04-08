import { titleFont } from '@/src/utils/fonts';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { IoLocationOutline } from 'react-icons/io5';
import { RiNumbersLine } from 'react-icons/ri';

const EventCard: FC<{
  event: any;
}> = ({ event }) => {
  return (
    <Link
      href={`/event/${event.name.toLowerCase().replaceAll(' ', '-')}-${
        event.id
      }`}
      key={event.id}
      className="bg-white bg-opacity-30 backdrop-blur-sm flex flex-col cursor-pointer rounded-sm rounded-b-lg max-w-2xl w-[300px] hover:scale-[1.03] transition-transform duration-300"
    >
      <div className="relative grow">
        {event.image ? (
          <Image
            src={event.image}
            alt={event.name}
            width={200}
            height={200}
            className="w-full object-cover rounded-sm"
          />
        ) : (
          <div className="h-full min-h-[200px] bg-gray-700 rounded-sm flex items-center justify-center italic text-gray-400">
            no image
          </div>
        )}
        <span
          className={`${titleFont.className} bg-gradient-to-t from-black/30 to-transparent p-2 pl-4 h-1/2 w-full flex items-end bottom-0 absolute drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.7)] text-gray-100 font-bold text-xl`}
        >
          {event.name}
        </span>
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
      <button className="w-full p-2 bg-white bg-opacity-40 hover:bg-opacity-70 transition-colors duration-300 rounded-b-sm">
        View Event
      </button>
    </Link>
  );
};

export default EventCard;

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
      className="bg-black/20 backdrop-blur-sm flex flex-col cursor-pointer rounded-sm  max-w-2xl w-[300px] hover:scale-[1.03] transition-transform duration-300"
    >
      <div className="relative grow">
        {event.image ? (
          <Image
            src={event.image}
            alt={event.name}
            width={500}
            height={300}
            className="w-full h-full object-cover rounded-t-sm"
          />
        ) : (
          <div className="h-full min-h-[200px] bg-gray-700 flex items-center justify-center italic text-gray-400 rounded-sm">
            no image
          </div>
        )}
        <span
          className={`titleFont bg-gradient-to-t from-black/50 to-transparent p-2 pl-4 h-1/2 w-full flex items-end bottom-0 absolute drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.7)] text-gray-100 font-bold text-xl`}
        >
          {event.name}
        </span>
      </div>

      <div className="flex flex-col space-y-3 justify-center my-3 mx-2 text-gray-200">
        <div className="flex items-center justify-center gap-1 w-full">
          <div className="w-5">
            <IoLocationOutline />
          </div>
          <p className="text-sm font-medium text-center">{event?.venue}</p>
        </div>

        <div className="flex items-center justify-center gap-1 w-full">
          <div className="w-5">
            <RiNumbersLine />
          </div>
          <p className="text-sm font-medium text-center">
            {event?.rounds.length} Round{event?.rounds.length > 1 && 's'}
          </p>
        </div>
      </div>
      <button className="w-full bodyFont p-2 bg-black bg-opacity-30 text-gray-200 hover:bg-opacity-50 transition-colors duration-300 rounded-b-sm">
        View Event
      </button>
    </Link>
  );
};

export default EventCard;

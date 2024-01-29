/* eslint-disable @next/next/no-img-element */

import { PublishedEventsQuery } from '@/src/generated/generated';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Button from '../button';
import Link from 'next/link';
import Image from 'next/image';
import {
  IoCalendarOutline,
  IoCashOutline,
  IoLocationOutline,
  IoPeopleOutline,
  IoPersonOutline,
} from 'react-icons/io5';
import { generateEventUrl } from '@/src/utils/url';

const Event = ({
  data,
}: {
  data: PublishedEventsQuery['publishedEvents'][0];
}) => {

  const getEventAttributes = () => {
    let teamSizeText = '',
      eventTypeText = '';
    if (data.minTeamSize === data.maxTeamSize) {
      if (data.minTeamSize !== 1)
        teamSizeText += `${data.minTeamSize} members per team`;
      if (data.minTeamSize === 0)
        teamSizeText = "";
    } else {
      teamSizeText = `${data.minTeamSize} - ${data.maxTeamSize} members per team`;
    }

    if (data.eventType.includes('MULTIPLE')) {
      eventTypeText =
        data.eventType.split('_')[0][0] +
        data.eventType.split('_')[0].slice(1).toLowerCase() +
        ' Event (Multiple Entry)';
    } else
      eventTypeText =
        data.eventType[0] + data.eventType.slice(1).toLowerCase() + ' Event';

    eventTypeText= eventTypeText.replaceAll("Individual", "Solo")
    return [
      {
        name: "Date",
        text: data.rounds[0]?.date ? new Date(data.rounds[0]?.date).toLocaleString('en-IN', {
          day: 'numeric',
          month: 'short',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        })  : "TBD",
        Icon: IoCalendarOutline,
      },
      {
        name: 'Venue',
        text: data.venue,
        Icon: IoLocationOutline,
      },
      {
        name: 'Fees',
        text: data.fees || 'Free',
        Icon: IoCashOutline,
      },
      {
        name: 'Type',
        text: eventTypeText,
        Icon: IoPersonOutline,
      },
      {
        name: 'Team Size',
        text: teamSizeText,
        Icon: IoPeopleOutline,
      },
    ];
  };

  return (
      <Link
      href={`event/${data.name.toLocaleLowerCase().split(' ').join('-')}-${
        data.id
      }`}
      >
    <AnimatePresence>
        <motion.div
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.1 },
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          layout
          key={data.id}
          className="bg-black/20 backdrop-blur-sm flex h-full flex-col cursor-pointer p-4 rounded-sm"
        >
          <div className="relative grow">
            {data.image ? (
              <Image
                src={data.image}
                alt={data.name}
                width={500}
                height={300}
                className="w-full h-full object-cover rounded-sm"
              />
            ) : (
              <div className="bodyFont h-full min-h-[200px] bg-gray-700 flex items-center justify-center italic text-gray-400 rounded-sm">
                no image
              </div>
            )}
            <span
              className={`titleFont bg-gradient-to-t capitalize from-black/50 to-transparent p-2 pl-4 h-1/2 w-full flex items-end bottom-0 absolute drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.7)] text-gray-100 font-bold text-xl`}>
              {data.name}
            </span>
          </div>
          <div className="flex flex-wrap mt-2 gap-1.5 bodyFont">
            {getEventAttributes().map((attr) =>
              attr.text ? (
                <div
                  key={attr.name}
                  className="flex px-3 py-2 text-gray-200 bg-gray-300/20 shrink-0 text-sm rounded-sm grow gap-1 items-center max-w-full"
                >
                  {<attr.Icon className='w-5' />}
                  <p className="leading-4">
                    {/* <span className="font-semibold">{attr.name}: </span> */}
                    {attr.text}
                  </p>
                </div>
              ) : (
                <></>
              )
            )}
          </div>
          <Button disabled={data.name.toLowerCase() === 'lazzerena'} noScaleOnHover className="hover:scale-0 shrink-0 mt-2">
            <Link href={generateEventUrl(data.name, data.id)}>{data.name.toLowerCase() === 'lazzerena' ? 'On Spot Registrations Only'  : 'Register'}</Link>
          </Button>
        </motion.div>
    </AnimatePresence>
      </Link>
  );
};

export default Event;

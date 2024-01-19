import { PublishedEventsQuery } from '@/src/generated/generated';
import Link from 'next/link';
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
      href={generateEventUrl(data.name, data.id)}
      >
      </Link>
  );
};

export default Event;

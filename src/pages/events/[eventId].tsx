import { useRouter } from 'next/router';
import { NextPage } from 'next';

const EventPage: NextPage = () => {
  const router = useRouter();
  const { eventId } = router.query; //geting event id from url


  return (
    <div>
      <h1>Event {eventId}</h1>
    </div>
  );
}

export default EventPage;
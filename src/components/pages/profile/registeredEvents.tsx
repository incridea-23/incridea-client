import { RegisterdEventsDocument } from '@/src/generated/generated';
import { titleFont } from '@/src/utils/fonts';
import { useQuery } from '@apollo/client';
import Spinner from '../../spinner';
import EventCard from './eventCard';

const UserEvents = () => {
  const { data: events, loading, error } = useQuery(RegisterdEventsDocument);

  return (
    <section data-scroll-section className="min-h-screen">
      <h1
        className={`${titleFont.className} text-2xl lg:text-4xl font-bold text-center text-white flex justify-center lg:max-w-full md:max-w-full max-w-sm`}
      >
        Dive into action with your upcoming adventures!
      </h1>
      {loading && (
        <div className="flex items-center justify-center h-40">
          <Spinner size={'medium'} intent={'white'} />
        </div>
      )}
      {!loading && !error && events && (
        <div className="flex gap-5 flex-wrap items-center justify-center mt-5">
          {events?.registeredEvents.__typename ===
            'QueryRegisteredEventsSuccess' &&
            events?.registeredEvents.data?.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
        </div>
      )}
    </section>
  );
};

export default UserEvents;

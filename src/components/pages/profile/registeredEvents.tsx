import { RegisterdEventsDocument } from '@/src/generated/generated';

import { useQuery } from '@apollo/client';
import Link from 'next/link';
import Button from '../../button';
import Spinner from '../../spinner';
import EventCard from './eventCard';
import UserTeams from './userTeams';
import { FC } from 'react';

const UserEvents: FC<{
  userId: string;
  name: string;
  email: string;
}> = ({ userId, name, email }) => {
  const { data: events, loading, error } = useQuery(RegisterdEventsDocument);

  return (
    <section>
      <h1
        className={`titleFont text-2xl lg:text-4xl font-bold text-center text-white flex justify-center lg:max-w-full md:max-w-full max-w-sm`}
      >
        Dive into action with your upcoming adventures!
      </h1>
      {loading ? (
        <div className="flex items-center justify-center h-40">
          <Spinner size={'medium'} intent={'white'} />
        </div>
      ) : events?.registeredEvents.__typename ===
          'QueryRegisteredEventsSuccess' &&
        events.registeredEvents.data.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-5 h-40">
          <p className="text-white/80 text-lg">
            Register for an event to see it here
          </p>
          <Button>
            <Link href="/events" className="text-white">
              Explore Events
            </Link>
          </Button>
        </div>
      ) : null}

      {!loading &&
        !error &&
        events?.registeredEvents.__typename ===
          'QueryRegisteredEventsSuccess' &&
        events.registeredEvents.data.length !== 0 && (
          <>
            <div className="flex gap-5 flex-wrap items-stretch justify-center mt-10">
              {events?.registeredEvents.__typename ===
                'QueryRegisteredEventsSuccess' &&
                events?.registeredEvents.data?.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
            </div>
            {events.registeredEvents.__typename ===
              'QueryRegisteredEventsSuccess' && (
              <UserTeams
                userId={userId}
                teams={events.registeredEvents.data
                  ?.map((event) => event?.teams)
                  .flat()}
                name={name}
                email={email}
              />
            )}
          </>
        )}
    </section>
  );
};

export default UserEvents;

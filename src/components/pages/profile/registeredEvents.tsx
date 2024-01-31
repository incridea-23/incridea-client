// import { RegisterdEventsDocument } from '@/src/generated/generated';

import { useQuery } from '@apollo/client';
import Link from 'next/link';
import Button from '../../button';
import Spinner from '../../spinner';
import EventCard from './eventCard';
import UserTeams from './userTeams';
import { FC } from 'react';
import { RegisterdEventsDocument } from '@/src/generated/generated';

const UserEvents: FC<{
  userId: string;
  name: string;
  email: string;
}> = ({ userId, name, email }) => {
  const { data: events, loading, error } = useQuery(RegisterdEventsDocument);

  return (
    <section className='h-full mt-10 lg:mt-0'>
      {loading ? (
        <div className="flex items-center justify-center h-40">
          <Spinner size={'medium'} intent={'white'} />
        </div>
      ) : events?.registeredEvents.__typename ===
          'QueryRegisteredEventsSuccess' &&
        events.registeredEvents.data.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-5 h-full">
          <p className="text-white/80 text-lg">
            Register for an event to see it here gamer!
          </p>
          <Button>
            <Link href="/events" className="text-white">
              Explore Quests
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
           {/* the mini bar */}
            <div className='h-auto hidden lg:block w-full bg-[#ababab] backdrop-filter backdrop-blur-xl bg-opacity-10 font-bold text-xl md:p-3 text-white sticky top-0 z-50 text-center'>My Quests</div>
            <div className='p-5'>
            <h3 className='text-white px-3 z-1 md:text-center lg:text-left'>You have entered <span className='text-fuchsia-500'>{events.registeredEvents.data.length}</span> quest{events.registeredEvents.data.length > 1 && 's'}</h3>
            <div className="flex gap-5 flex-wrap  pt-3 items-center justify-center lg:p-3">
           
            
              {events?.registeredEvents.__typename ===
                'QueryRegisteredEventsSuccess' &&
                events?.registeredEvents.data?.map((event) => (
                  <EventCard key={event.id} teams={event.teams} event={event} userId={userId} name={name} email={email} />
                ))}
            </div>
            </div>
          </>
        )}
    </section>
  );
};

export default UserEvents;
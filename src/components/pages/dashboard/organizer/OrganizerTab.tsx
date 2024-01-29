import { EventByOrganizerDocument } from '@/src/generated/generated';
import { useQuery } from '@apollo/client';
import { Tab } from '@headlessui/react';
import RoundsTab from './RoundsTab';
import ViewEventModal from './ViewEventModal';
import EditEventModal from './EditEventModal';
import RoundEventModal from './RoundEventModal';
import Spinner from '@/src/components/spinner';

function OrganizerTab({ organizerId }: { organizerId: string }) {
  const { data, loading, error } = useQuery(EventByOrganizerDocument, {
    variables: {
      organizerId,
    },
  });
  if (loading) {
    return <Spinner />;
  }
  if (!data || data.eventByOrganizer.length == 0) return <div>No events</div>;
  return (
    <Tab.Group as={'div'} className='sm:rounded-xl mt-5 overflow-hidden border-0 border-gray-900/40'>
      <Tab.List className="w-full overflow-x-auto flex  backdrop-blur-md bg-gray-600/60 ">
        {data.eventByOrganizer.map((event) => (
          <Tab className="focus:outline-none" key={event.id}>
            {({ selected }) => (
              <button
                className={` sm:px-5 transition-colors whitespace-nowrap sm:py-4 sm:text-lg text-base p-3 font-semibold ${
                  selected
                    ? 'bg-gray-900 shadow-lg shadow-black text-white'
                    : 'bg-transparent hover:bg-gray-800/60 text-white'
                }`}
              >
                {event.name}
              </button>
            )}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels>
        <div className='bg-gray-900 p-0 sm:p-5 pt-3 '>
          {data.eventByOrganizer.map((event) => (
            <Tab.Panel className=" space-y-3" key={event.id}>
              <div className="py-3 flex items-center justify-between flex-wrap gap-5  backdrop-blur-md rounded-lg   border-gray-600 bg-gray-900/30 ">
                <div className="flex px-5 sm:px-0 gap-3">
                  <h2 className="text-2xl font-bold">{event.name}</h2>
                  <p className="text-green-400  px-2 flex justify-center items-center leading-8 border border-green-400 h-fit rounded-md">{event.branch.name}</p>
                </div>
                <div className="space-x-2 px-5 flex overflow-x-auto md:overflow-hidden md:p-0">
                  <ViewEventModal event={event} />
                  <EditEventModal event={event} />
                  <RoundEventModal event={event} />
                </div>
              </div>
              <RoundsTab
                eventType={event.eventType}
                rounds={event.rounds}
                eventId={event.id}
              />
            </Tab.Panel>
          ))}
        </div>
      </Tab.Panels>
    </Tab.Group>
  );
}
export default OrganizerTab;

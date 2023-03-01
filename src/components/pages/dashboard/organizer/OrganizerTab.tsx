import { EventByOrganizerDocument } from '@/src/generated/generated';
import { useQuery } from '@apollo/client';
import { Tab } from '@headlessui/react';
import RoundsTab from './RoundsTab';
import ViewEventModal from './ViewEventModal';
import EditEventModal from './EditEventModal';
import RoundEventModal from './rounds/RoundEventModal';

function OrganizerTab({ organizerId }: { organizerId: string }) {
  const { data, loading, error } = useQuery(EventByOrganizerDocument, {
    variables: {
      organizerId,
    },
  });
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!data || data.eventByOrganizer.length == 0) return <div>No events</div>;
  return (
    <Tab.Group>
      <Tab.List className="w-full px-3 py-2 overflow-x-auto gap-2 flex  backdrop-blur-md rounded-2xl border  border-gray-600 bg-gray-900/30 ">
        {data.eventByOrganizer.map((event) => (
          <Tab className="focus:outline-none" key={event.id}>
            {({ selected }) => (
              <button
                className={` px-3 whitespace-nowrap py-2 rounded-xl   ${
                  selected
                    ? 'bg-blue-500/50 text-white'
                    : 'bg-gray-300 text-black'
                }`}
              >
                {event.name}
              </button>
            )}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels>
        {data.eventByOrganizer.map((event) => (
          <Tab.Panel className="my-3 space-y-3" key={event.id}>
            <div className="p-3 flex items-center justify-between flex-wrap gap-5  backdrop-blur-md rounded-2xl border  border-gray-600 bg-gray-900/30 ">
              <div className="flex gap-5">
                <h2 className="text-xl font-bold">{event.name}</h2>
                <p className="text-green-500">{event.branch.name}</p>
              </div>
              <div className="space-x-2 flex">
                <ViewEventModal event={event} />
                <EditEventModal event={event} />
                <RoundEventModal event={event} />
              </div>
            </div>
            <RoundsTab rounds={event.rounds} eventId={event.id} />
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
}
export default OrganizerTab;

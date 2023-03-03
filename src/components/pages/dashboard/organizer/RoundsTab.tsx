import {
  CreateRoundDocument,
  DeleteRoundDocument,
  EventByOrganizerQuery,
} from '@/src/generated/generated';
import { Tab } from '@headlessui/react';
import Teams from './Teams';
import { useMutation } from '@apollo/client';
import { BiLoaderAlt, BiSearch } from 'react-icons/bi';
import { AiOutlinePlus } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import AddParticipantModal from './AddParticipantModal';
import AddTeamModal from './AddTeamModal';
import { useState } from 'react';
import ScanModal from './ScanModal';

function RoundsTab({
  rounds,
  eventId,
  eventType,
}: {
  rounds: EventByOrganizerQuery['eventByOrganizer'][0]['rounds'];
  eventId: string;
  eventType: string;
}) {
  const [createRound, { data, loading, error }] = useMutation(
    CreateRoundDocument,
    {
      refetchQueries: ['EventByOrganizer'],
      variables: {
        eventId: eventId,
      },
    }
  );
  const [searchParam, setSearchParam] = useState('');
  const [deleteRound, { data: data2, loading: loading2, error: error2 }] =
    useMutation(DeleteRoundDocument, {
      refetchQueries: ['EventByOrganizer'],
      variables: {
        eventId: eventId,
      },
    });

  return (
    <div className="flex flex-col  h-full  md:flex-row gap-3">
      <Tab.Group>
        <Tab.List className=" flex flex-row overflow-x-auto items-center gap-2 md:flex-col backdrop-blur-md rounded-lg border p-3  w-full  md:max-w-xs  border-gray-600 bg-gray-900/30">
          {rounds.map((round) => (
            <Tab key={round.roundNo} className="focus:outline-none md:w-full">
              {({ selected }) => (
                /* Use the `selected` state to conditionally style the selected tab. */
                <button
                  className={` px-3 whitespace-nowrap py-2 rounded-lg  w-full ${
                    selected
                      ? 'bg-blue-900/40 text-white'
                      : 'bg-gray-600/40 text-gray-300'
                  }`}
                >
                  Round {round.roundNo}
                </button>
              )}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="backdrop-blur-md grow max-h-[70vh] overflow-y-auto rounded-lg p-3 w-full border border-gray-600 bg-gray-900/30">
          {rounds.map((event) => (
            <Tab.Panel key={event.roundNo}>
              {/* search bar  */}
              <div className="flex mb-4 flex-col-reverse md:flex-row gap-2">
                <div className="flex rounded-lg group  bg-gray-600/40 p-1 w-full gap-2 items-center justify-center">
                  <input
                    value={searchParam}
                    onChange={(e) => {
                      setSearchParam(e.target.value);
                    }}
                    type="text"
                    className="bg-transparent w-full text-white outline-none p-2  rounded-xl"
                    placeholder="Search by team name"
                  />
                  <BiSearch className="text-white text-2xl mx-2" />
                </div>
                <ScanModal />
                {eventType === 'INDIVIDUAL' ||
                eventType === 'INDIVIDUAL_MULTIPLE_ENTRY' ? (
                  <AddParticipantModal eventId={eventId} />
                ) : (
                  <AddTeamModal eventId={eventId} />
                )}
              </div>
              <Teams
                eventType={eventType}
                contains={searchParam}
                roundNo={event.roundNo}
                eventId={event.eventId}
              />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export default RoundsTab;

import {
  CreateRoundDocument,
  DeleteRoundDocument,
  EventByOrganizerQuery,
} from '@/src/generated/generated';
import { Tab } from '@headlessui/react';
import { useMutation } from '@apollo/client';
import { BiLoaderAlt } from 'react-icons/bi';
import { AiOutlinePlus } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { FC } from 'react';

const RoundsSidebar: FC<{
  rounds: EventByOrganizerQuery['eventByOrganizer'][0]['rounds'];
  eventId: string;
}> = ({ rounds, eventId }) => {
  const [createRound, { data, loading, error }] = useMutation(
    CreateRoundDocument,
    {
      refetchQueries: ['EventByOrganizer'],
      variables: {
        eventId: eventId,
      },
    }
  );

  const [deleteRound, { data: data2, loading: loading2, error: error2 }] =
    useMutation(DeleteRoundDocument, {
      refetchQueries: ['EventByOrganizer'],
      variables: {
        eventId: eventId,
      },
    });

  return (
    <div className="flex flex-row h-full w-full gap-5 px-2">
      <Tab.Group>
        <Tab.List className="flex flex-row overflow-x-auto items-center gap-2 backdrop-blur-md rounded-2xl border p-3  w-full  border-gray-600 bg-gray-900/30">
          {rounds.map((round) => (
            <Tab key={round.roundNo} className="focus:outline-none md:w-full">
              {({ selected }) => (
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
          <div className="flex gap-2 items-end justify-center  text-xs">
            <button
              className="bg-blue-500/50 text-white p-3 w-fit rounded-xl inline-flex gap-1 items-center"
              disabled={loading2 || loading}
              onClick={() => {
                createRound();
              }}
            >
              {loading ? (
                <>
                  <BiLoaderAlt className="animate-spin text-xl" />
                  Adding...{' '}
                </>
              ) : (
                <>
                  <AiOutlinePlus className=" text-xl" /> Add
                </>
              )}
            </button>
            <button
              className="bg-red-500 text-white p-3 w-fit rounded-xl inline-flex gap-1 items-center"
              disabled={loading2 || loading}
              onClick={() => {
                deleteRound();
              }}
            >
              {loading2 ? (
                <>
                  <BiLoaderAlt className="animate-spin text-xl" />
                  Deleting...
                </>
              ) : (
                <>
                  <MdDelete className=" text-xl" />
                  Delete
                </>
              )}
            </button>
          </div>
        </Tab.List>
      </Tab.Group>
    </div>
  );
};

export default RoundsSidebar;

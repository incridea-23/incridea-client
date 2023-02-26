import {
  CreateRoundDocument,
  DeleteRoundDocument,
  EventByOrganizerQuery,
} from "@/src/generated/generated";
import { Tab } from "@headlessui/react";
import Teams from "./Teams";
import { useMutation } from "@apollo/client";
import { BiLoaderAlt } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
function RoundsTab({
  rounds,
  eventId,
}: {
  rounds: EventByOrganizerQuery["eventByOrganizer"][0]["rounds"];
  eventId: string;
}) {
  const [createRound, { data, loading, error }] = useMutation(
    CreateRoundDocument,
    {
      refetchQueries: ["EventByOrganizer"],
      variables: {
        eventId: eventId,
      },
    }
  );
  const [deleteRound, { data: data2, loading: loading2, error: error2 }] =
    useMutation(DeleteRoundDocument, {
      refetchQueries: ["EventByOrganizer"],
      variables: {
        eventId: eventId,
      },
    });

  return (
    <div className="flex flex-col  h-full  md:flex-row gap-5">
      <Tab.Group>
        <Tab.List className=" flex flex-row overflow-x-auto items-center gap-2 md:flex-col backdrop-blur-md rounded-2xl border p-3  w-full  md:max-w-xs  border-gray-600 bg-gray-900/30">
          {rounds.map((round) => (
            <Tab key={round.roundNo} className="focus:outline-none md:w-full">
              {({ selected }) => (
                /* Use the `selected` state to conditionally style the selected tab. */
                <button
                  className={` px-3 whitespace-nowrap py-2 rounded-lg  w-full ${
                    selected
                      ? "bg-blue-900/40 text-white"
                      : "bg-gray-600/40 text-gray-300"
                  }`}>
                  Round {round.roundNo}
                </button>
              )}
            </Tab>
          ))}
          <div className="flex gap-2 items-end justify-center  text-xs">
            <button
              className="bg-blue-500/50 text-white p-2 w-fit rounded-xl inline-flex gap-1 items-center"
              disabled={loading2 || loading}
              onClick={() => {
                createRound();
              }}>
              {loading ? (
                <>
                  <BiLoaderAlt className="animate-spin text-xl" />
                  Adding...{" "}
                </>
              ) : (
                <>
                  <AiOutlinePlus className=" text-xl" /> Add Round
                </>
              )}
            </button>
            <button
              className="bg-red-500 text-white p-2 w-fit rounded-xl inline-flex gap-1 items-center"
              disabled={loading2 || loading}
              onClick={() => {
                deleteRound();
              }}>
              {loading2 ? (
                <>
                  <BiLoaderAlt className="animate-spin text-xl" />
                  Deleting...
                </>
              ) : (
                <>
                  <MdDelete className=" text-xl" />
                  Delete Round
                </>
              )}
            </button>
          </div>
        </Tab.List>
        <Tab.Panels className="backdrop-blur-md h-fit max-h-[70vh] overflow-y-auto rounded-2xl border p-3 w-full border-gray-600 bg-gray-900/30">
          {rounds.map((event) => (
            <Tab.Panel key={event.roundNo}>
              <Teams roundNo={event.roundNo} eventId={event.eventId} />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export default RoundsTab;

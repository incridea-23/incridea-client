import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment, useState } from "react";
import {
  CreateRoundDocument,
  EventByOrganizerQuery,
} from "@/src/generated/generated";
import { IoClose } from "react-icons/io5";
import RoundsSidebar from "./RoundsSidebar";
import Button from "@/src/components/button";
import { AiFillSetting, AiOutlinePlus } from "react-icons/ai";
import { BiLoaderAlt } from "react-icons/bi";
import createToast from "@/src/components/toast";
import { useMutation } from "@apollo/client";

const RoundAddModal: FC<{
  eventID: string;
  roundNo: number;
  published: boolean;
}> = ({ eventID, roundNo, published }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dateTime, setDateTime] = useState(
    new Date(new Date(2024, 1, 22, 9, 30))
  );
  const [createRound, { loading, data, error }] = useMutation(
    CreateRoundDocument,
    {
      refetchQueries: ["EventByOrganizer"],
      variables: {
        eventId: eventID,
        date: dateTime.toString(),
      },
      awaitRefetchQueries: true, // waits for changes to be reflected, better UX(?) but slower
    }
  );
  // console.log(dateTime.toISOString().slice(0, 16));
  // console.log(data, error);
  const closeModal = () => {
    setIsOpen(false);
    setDateTime(new Date(2024, 1, 22, 14, 30));
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleCreateRound = async () => {
    let promise = createRound();
    await createToast(promise, "Adding round...");
  };

  return (
    <>
      <Button
        disabled={loading || published}
        onClick={openModal}
        intent="success">
        {loading ? (
          <>
            <BiLoaderAlt className="animate-spin text-xl" />
            Adding...{" "}
          </>
        ) : (
          <>
            <AiOutlinePlus className=" text-xl" /> Add
          </>
        )}
      </Button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="absolute flex items-center justify-center  w-screen h-screen backrop-blur-sm  top-0 left-0  z-20"
          onClose={closeModal}>
          <div className="  inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center text-center">
              <Dialog.Panel className="w-full  max-w-2xl transform overflow-hidden rounded-2xl bg-gray-700/70 text-gray-100 backdrop-blur-xl text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="div"
                  className="flex justify-between  items-center md:p-6 p-5">
                  <h3 className="text-lg font-medium leading-6 text-white">
                    Select Date for Round {roundNo}
                  </h3>
                  <button
                    className="hover:text-white text-gray-400 transition-colors"
                    onClick={closeModal}>
                    <IoClose size="1.4rem" />
                  </button>
                </Dialog.Title>
                {/* dateTime  picker */}
                <div className="flex flex-col p-10 items-center justify-center">
                  <input
                    type="datetime-local"
                    className="w-full p-2 rounded-md bg-gray-800/70 text-gray-100"
                    value={toISOStringWithTimezone(dateTime).slice(0, 16)}
                    onChange={(e) => {
                      setDateTime(new Date(e.target.value));
                    }}
                  />
                </div>
                <div className="flex flex-col items-center justify-center">
                  <Button
                    disabled={loading}
                    onClick={handleCreateRound}
                    intent="info"
                    className="w-full">
                    Add Round
                  </Button>
                </div>
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default RoundAddModal;

export const toISOStringWithTimezone = (date: Date) => {
  const tzOffset = -date.getTimezoneOffset();
  const diff = tzOffset >= 0 ? "+" : "-";
  const pad = (n: number) => `${Math.floor(Math.abs(n))}`.padStart(2, "0");
  return (
    date.getFullYear() +
    "-" +
    pad(date.getMonth() + 1) +
    "-" +
    pad(date.getDate()) +
    "T" +
    pad(date.getHours()) +
    ":" +
    pad(date.getMinutes()) +
    ":" +
    pad(date.getSeconds()) +
    diff +
    pad(tzOffset / 60) +
    pad(tzOffset % 60)
  );
};

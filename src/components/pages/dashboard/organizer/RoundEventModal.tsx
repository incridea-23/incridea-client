import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment, useState } from "react";
import { EventByOrganizerQuery } from "@/src/generated/generated";
import { IoClose } from "react-icons/io5";
import RoundsSidebar from "./RoundsSidebar";
import Button from "@/src/components/button";
import { AiFillSetting } from "react-icons/ai";

const RoundEventModal: FC<{
  event: EventByOrganizerQuery["eventByOrganizer"][0];
}> = ({ event }) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Button onClick={openModal} intent="secondary">
        <AiFillSetting />
        Rounds
      </Button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-gray-700/70 text-gray-100 backdrop-blur-xl text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="div"
                    className="flex justify-between items-center md:p-6 p-5">
                    <h3 className="text-lg font-medium leading-6 text-white">
                      {event.name} | Round Details
                    </h3>
                    <button
                      className="hover:text-white text-gray-400 transition-colors"
                      onClick={closeModal}>
                      <IoClose size="1.4rem" />
                    </button>
                  </Dialog.Title>
                  <RoundsSidebar
                    eventId={event.id}
                    rounds={event.rounds}
                    isPublished={event.published}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default RoundEventModal;

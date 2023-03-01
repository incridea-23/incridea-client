import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import {} from "@/src/generated/generated";

import { useMutation } from "@apollo/client";
import Spinner from "@/src/components/spinner";
import Button from "@/src/components/button";

export default function AddParticipantModal() {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <Button type="button" intent={'secondary'} onClick={openModal} className='whitespace-nowrap rounded-lg'>
        Add Participant
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
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-gray-900/50 text-gray-100 backdrop-blur-xl p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-white">
                    Edit Event Details
                  </Dialog.Title>
                  <hr className="opacity-50" />

                  <div className="w-full flex justify-end bottom-5 gap-2 right-5">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 justify-center rounded-md border border-transparent bg-blue-100 text-black px-4 py-2 text-sm font-medium  hover:bg-blue-200 focus:outline-none disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                      {false ? (
                        <>
                          <Spinner size="small" className=" text-black " /> Adding
                          Participant
                        </>
                      ) : (
                        "Add Participant"
                      )}
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium  hover:bg-red-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-700 focus-visible:ring-offset-2"
                      onClick={closeModal}>
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

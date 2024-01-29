import { Dialog, Transition } from "@headlessui/react";
import React, { FC, Fragment } from "react";
import { IoClose } from "react-icons/io5";

type ModalProps = {
  children: React.ReactNode;
  title: string;
  onClose: () => void;
  showModal: boolean;
};

const Modal: FC<ModalProps> = ({ children, title, onClose, showModal }) => {
  return (
    <Transition appear show={showModal} as={Fragment}>
      <Dialog as="div" className="relative z-[900]" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25 backdrop-blur-lg" />
        </Transition.Child>

        <div className={`fixed inset-0 z-10 h-full w-full overflow-y-auto`}>
          <div className="flex min-h-full items-center justify-center text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={`w-full h-full transform overflow-hidden rounded-none text-gray-100 backdrop-blur-xl text-left align-middle shadow-xl transition-all`}
              >
                <button
                  className="hover:text-white text-gray-200 transition-colors z-[50000] absolute top-2 right-2"
                  onClick={onClose}
                >
                  <IoClose size="1.4rem" />
                </button>
                <div>{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;

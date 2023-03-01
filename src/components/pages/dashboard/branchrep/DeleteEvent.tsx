import createToast from '@/src/components/toast';
import { DeleteEventDocument } from '@/src/generated/generated';
import { useMutation } from '@apollo/client';
import { FC, Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { IoClose } from 'react-icons/io5';
import Button from '@/src/components/button';
import { BiTrash } from 'react-icons/bi';

const DeleteEvent: FC<{
  eventsRefetch: () => Promise<any>;
  eventId: string;
  published: boolean;
}> = ({ eventsRefetch, eventId, published }) => {
  // 2. Delete Event
  const [deleteEventMutation, { loading: deleteEventLoading }] =
    useMutation(DeleteEventDocument);

  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  // 2. Delete Event Handler
  const handleDeleteEvent = () => {
    let promise = deleteEventMutation({
      variables: {
        id: parseInt(eventId),
      },
    }).then((res) => {
      if (res.data?.deleteEvent.__typename === 'MutationDeleteEventSuccess') {
        closeModal();
        return eventsRefetch();
      }
    });
    createToast(promise, 'Deleting event...');
  };
  return (
    <>
      <Button
        intent={'danger'}
        className="ml-auto "
        disabled={published}
        onClick={openModal}
      >
        Delete <BiTrash />
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
            leaveTo="opacity-0"
          >
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
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-gray-700/70 text-gray-100 backdrop-blur-xl text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="div"
                    className="flex justify-between items-center md:p-6 p-5"
                  >
                    <h3 className="text-lg font-medium leading-6 text-white">
                      Are you sure you want to delete this event?
                    </h3>
                    <button
                      className="hover:text-white text-gray-400 transition-colors"
                      onClick={closeModal}
                    >
                      <IoClose size="1.4rem" />
                    </button>
                  </Dialog.Title>
                  <hr className="opacity-30" />
                  <div className='pb-3'>
                    <div className="flex justify-center gap-3 mt-5">
                      <Button
                        intent={'danger'}
                        onClick={handleDeleteEvent}
                        disabled={deleteEventLoading}
                      >
                        Delete
                      </Button>
                      <Button intent={'secondary'} onClick={() => closeModal()}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default DeleteEvent;

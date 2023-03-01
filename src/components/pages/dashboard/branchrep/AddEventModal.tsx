import { FC, Fragment, useState } from 'react';
import Button from '@/src/components/button';
import { Dialog, Transition } from '@headlessui/react';
import { IoClose } from 'react-icons/io5';
import { useMutation } from '@apollo/client';
import { CreateEventDocument, EventType } from '@/src/generated/generated';
import createToast from '@/src/components/toast';
import TextInput from '@/src/components/input';

const AddEventModal: FC<{
  eventsRefetch: () => Promise<any>;
}> = ({ eventsRefetch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const [createEventMutation, { loading: createEventLoading }] =
    useMutation(CreateEventDocument);

  const handleAddEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let promise = createEventMutation({
      variables: {
        eventType: eventType,
        name: eventName,
      },
    }).then((res) => {
      if (res.data?.createEvent.__typename === 'MutationCreateEventSuccess') {
        closeModal();
        return eventsRefetch();
      }
    });

    createToast(promise, 'Adding event...');
  };

  //Controlled Inputs
  const [eventName, setEventName] = useState('');
  const [eventType, setEventType] = useState<EventType>(EventType.Individual);

  return (
    <div className="flex items-center justify-center">
      <Button intent={'info'} size="large" onClick={openModal}>
        Add Event
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
                      Round Details
                    </h3>
                    <button
                      className="hover:text-white text-gray-400 transition-colors"
                      onClick={closeModal}
                    >
                      <IoClose size="1.4rem" />
                    </button>
                  </Dialog.Title>
                  <div>
                    <hr className="border-gray-500 " />
                    <form
                      onSubmit={(e) => {
                        handleAddEvent(e);
                      }}
                      className={`flex flex-col gap-5 p-4 md:p-10 ${
                        createEventLoading &&
                        'opacity-50 pointer-events-none cursor-not-allowed '
                      }}`}
                    >
                      <div className="flex gap-3 items-center">
                        <label className="basis-1/5" htmlFor="eventName">
                          Name
                        </label>
                        <TextInput
                          value={eventName}
                          onChange={(e) => setEventName(e.target.value)}
                          id="eventName"
                          placeholder="Event Name"
                          additionalclasses="basis-4/5"
                        />
                      </div>
                      <div className="flex gap-3 items-center">
                        <label className="basis-1/5" htmlFor="eventType">
                          Type
                        </label>
                        <select
                          onChange={(e) => {
                            setEventType(e.target.value as EventType);
                          }}
                          value={eventType}
                          id="eventType"
                          placeholder="Event Type"
                          className="basis-4/5  bg-gray-700 border border-gray-500 h-10 px-4 pr-16 rounded-lg text-sm focus:outline-none focus:ring-2 ring-gray-500"
                        >
                          {Object.values(EventType).map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>
                      <Button type="submit" intent={'primary'} fullWidth>
                        Add Event
                      </Button>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default AddEventModal;

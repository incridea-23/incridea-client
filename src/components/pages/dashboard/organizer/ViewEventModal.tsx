import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { EventByOrganizerQuery } from '@/src/generated/generated';
import {
  IoCashOutline,
  IoClose,
  IoCreateOutline,
  IoInformationOutline,
  IoLocationOutline,
  IoPeopleOutline,
  IoPersonOutline,
} from 'react-icons/io5';
import Button from '../../../button';
import draftToHtml from 'draftjs-to-html';

export default function ViewEventModal({
  event,
}: {
  event: EventByOrganizerQuery['eventByOrganizer'][0];
}) {
  const [isOpen, setIsOpen] = useState(false);

  const markup = draftToHtml(JSON.parse(event.description as string));

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const getEventAttributes = () => {
    let teamSizeText = '';
    if (event.minTeamSize === event.maxTeamSize) {
      teamSizeText += event.minTeamSize;
      if (event.minTeamSize === 1) {
        teamSizeText += ' member';
      } else teamSizeText += ' members';
    } else {
      teamSizeText = `${event.minTeamSize} - ${event.maxTeamSize} members`;
    }
    return [
      {
        name: 'Venue',
        text: event.venue,
        Icon: IoLocationOutline,
      },
      {
        name: 'Event Type',
        text: event.eventType,
        Icon: IoPersonOutline,
      },
      {
        name: 'Fees',
        text: event.fees,
        Icon: IoCashOutline,
      },
      {
        name: 'Team Size',
        text: teamSizeText,
        Icon: IoPeopleOutline,
      },
      {
        name: 'Maximum Teams',
        text: event.maxTeams,
        Icon: IoInformationOutline,
      },
    ];
  };

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="rounded-md bg-gray-900/70 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        View
      </button>

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
                      Event Details
                    </h3>
                    <button
                      className="hover:text-white text-gray-400 transition-colors"
                      onClick={closeModal}
                    >
                      <IoClose size="1.4rem" />
                    </button>
                  </Dialog.Title>
                  <hr className="opacity-30" />
                  <div className="md:p-6 p-5">
                    <div
                      className={`${
                        event.image ? 'h-64' : 'h-40  bg-gray-800/25'
                      } overflow-hidden relative mb-3 items-end flex rounded-lg bg-cover bg-center w-full`}
                      style={{
                        backgroundImage: event.image
                          ? `url(${event.image})`
                          : 'none',
                      }}
                    >
                      {!event.image && (
                        <span className="absolute top-1/3 translate-x-1/2 text-white/25 text-2xl italic right-1/2">
                          no image added
                        </span>
                      )}
                      <span className="p-5 w-full pt-10 font-bold text-3xl bg-gradient-to-b from-transparent to-black/70">
                        {event.name}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2.5">
                      {getEventAttributes().map((attr) =>
                        attr.text ? (
                          <div
                            key={attr.name}
                            className="flex px-3 py-2 bg-gray-600 shrink-0 rounded-lg grow gap-2 items-center"
                          >
                            {<attr.Icon />}
                            <p>
                              <span className="font-semibold">
                                {attr.name}:{' '}
                              </span>
                              {attr.text}
                            </p>
                          </div>
                        ) : (
                          <></>
                        )
                      )}
                    </div>
                    <div className="bg-gray-600 p-3 mt-2.5 rounded-lg">
                      <div className="flex gap-2 mb-3 items-center">
                        <IoCreateOutline />
                        <p className="font-semibold ">Description</p>
                      </div>
                      <hr className="opacity-30 -mx-3 mb-3" />
                      {event.description ? (
                        //TODO: fix styling of rendered HTML
                        <div dangerouslySetInnerHTML={{ __html: markup }}></div>
                      ) : (
                        <p
                          className="text-gray-400 italic
                      "
                        >
                          no description added
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="w-full flex justify-end p-5 pt-0 gap-2">
                    <Button
                      type="button"
                      intent={'danger'}
                      onClick={closeModal}
                    >
                      Close
                    </Button>
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

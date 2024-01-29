import { FC,useState } from 'react';
import { EventsQuery } from '@/src/generated/generated';
import Button from '@/src/components/button';
import { AiOutlineEye } from 'react-icons/ai';
import Modal from '@/src/components/modal';
import { IoCashOutline, IoCreateOutline, IoInformationOutline, IoLocationOutline, IoPeopleOutline, IoPersonOutline } from 'react-icons/io5';
import draftToHtml from 'draftjs-to-html';
import EditEventModal from './EditEvent';
import TeamModal from './TeamModal';
import styles from "../../../pages/event/EventDetails.module.css";
import Link from 'next/link';

const VieweventModal: FC<{
  Event: EventsQuery['events']['edges'][0];
    }> = ( Event ) => {
    const event = Event?.Event?.node;

    const [showModal, setShowModal] = useState(false);
    const markup = draftToHtml(JSON.parse(event?.description as string));

    const getEventAttributes = () => {
        let teamSizeText = '';
        if (event?.minTeamSize === event?.maxTeamSize) {
          teamSizeText += event?.minTeamSize;
          if (event?.minTeamSize === 1) {
            teamSizeText += ' member';
          } else teamSizeText += ' members';
        } else {
          teamSizeText = `${event?.minTeamSize} - ${event?.maxTeamSize} members`;
        }
        return [
          {
            name: 'Venue',
            text: event?.venue,
            Icon: IoLocationOutline,
          },
          {
            name: 'Event Type',
            text: event?.eventType,
            Icon: IoPersonOutline,
          },
          {
            name: 'Fees',
            text: event?.fees,
            Icon: IoCashOutline,
          },
          {
            name: 'Team Size',
            text: teamSizeText,
            Icon: IoPeopleOutline,
          },
          {
            name: 'Maximum Teams',
            text: event?.maxTeams,
            Icon: IoInformationOutline,
          },
        ];
      };

    function handleCloseModal() {
        setShowModal(false);
    }

    return (<>
        <Button
        onClick={() => setShowModal(true)}
        intent='secondary'
      >
        <AiOutlineEye /> View
      </Button>

      <Modal
        title="Event Details"
        showModal={showModal}
        size="medium"
        onClose={handleCloseModal}
      >
        <div className="md:p-6 p-5">
          <div
            className={`${
              event?.image ? 'h-64' : 'h-40  bg-gray-800/25'
            } overflow-hidden relative mb-3 items-end flex rounded-lg bg-cover bg-center w-full`}
            style={{
              backgroundImage: event?.image ? `url(${event?.image})` : 'none',
            }}
          >
            {!event?.image && (
              <span className="absolute top-1/3 translate-x-1/2 text-white/25 text-2xl italic right-1/2">
                no image added
              </span>
            )}
            <span className="p-5 w-full pt-10 font-bold text-3xl bg-gradient-to-b from-transparent to-black/70">
              {event?.name}
            </span>
            <Link href={`/event/preview/${event?.id}`} className="p-5">
              <Button intent={'secondary'}>Preview</Button>
            </Link>
          </div>
          <div className="mb-3 flex flex-row gap-2">
            {Event &&
              <EditEventModal Event={Event.Event} />
            }
            {Event &&
              <TeamModal 
                Team={Event.Event}
              />
            }
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
                    <span className="font-semibold">{attr.name}: </span>
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
            {event?.description ? (
              //TODO: fix styling of rendered HTML
              <div className={`${styles.markup} w-full event-description`} dangerouslySetInnerHTML={{ __html: markup }}></div>
            ) : (
              <p
                className="text-gray-400 italic"
              >
                no description added
              </p>
            )}
          </div>
        </div>

        <div className="w-full flex justify-end p-5 pt-0 gap-2">
          <Button className='rounded-lg' type="button" intent={'danger'} onClick={handleCloseModal}>
            Close
          </Button>
        </div>
      </Modal>
    </>
    )
}

export default VieweventModal;
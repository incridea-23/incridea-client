import Button from "@/src/components/button";
import Modal from "@/src/components/modal";
import { Dispatch, useState } from "react";
import { FaInfo } from "react-icons/fa";
export default function Info() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button
        onClick={() => setShowModal(true)}
        className="absolute text-white top-[74px] left-4 z-50 "
      >
        <FaInfo />
      </Button>
      <Modal
        size="medium"
        title="Rules and Regulations"
        showModal={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <div className="w-full justify-center h-full items-center flex p-8 xl:text-xl md:text-base text-sm">
          <ol className="flex text-justify justify-center list-decimal pl-4 items-start gap-4 flex-col">
            <li>
              Admission to the pronite is only permitted after scanning the
              attendee&apos;s PIDs at the pronite scanning booth.
            </li>
            <li>
              Upon successful scanning, the attendee will receive a wristband
              that must be presented to gain entry to Sadananda Auditorium
              during the pronite.
            </li>
            <li>
              No food or water bottles are allowed inside the auditorium under
              any circumstances.
            </li>
            <li>
              Upon entrance, all bags and belongings will be thoroughly
              inspected; any perfumes, makeup kits/materials, intoxicating
              substances, any flammable materials, any sharp objects, weapons,
              weapon like objects or food items of any kind will not be allowed
              inside the venue and will be confiscated if found any.
            </li>
            <li>
              Entry to the venue while intoxicated is strictly prohibited, as
              mentioned in the guidelines, they may be expelled from the campus
              and their registration will be cancelled.
            </li>
            <li>
              Attendees who cause a disturbance or inconvenience to others will
              be immediately removed from the venue and barred from re-entry.
            </li>
            <li>
              A security officials, disciplinary committee, and Team Incridea
              will be present at all times during the pronite to monitor and
              prevent any unruly behavior. In case of an emergency, please seek
              their assistance.
            </li>
            <li>
              Attendees are required to comply with the instructions of the Team
              Incridea, security officials, disciplinary committee and at all
              times. The decisions made by them are final and non-negotiable.
            </li>
          </ol>
        </div>
      </Modal>
    </>
  );
}

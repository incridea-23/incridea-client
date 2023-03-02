import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import {
  OrganizerAddTeamMemberDocument,
  OrganizerDeleteTeamMemberDocument,
  OrganizerRegisterSoloDocument,
  TeamDetailsDocument,
} from "@/src/generated/generated";

import { useMutation, useQuery } from "@apollo/client";
import Spinner from "@/src/components/spinner";
import Modal from "@/src/components/modal";
import createToast from "@/src/components/toast";
import { MdOutlineDeleteOutline, MdOutlineQrCodeScanner } from "react-icons/md";
import Button from "@/src/components/button";

export default function AddParticipantModal({ eventId }: { eventId: string }) {
  const [organizerRegisterSolo, _] = useMutation(
    OrganizerRegisterSoloDocument,
    {
      refetchQueries: ["TeamsByRound"],
    }
  );
  console.log(_);
  const [userId, setUserId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const addHandler = () => {
    if (!userId) return;
    let promise = organizerRegisterSolo({
      variables: {
        eventId,
        userId,
      },
    }).then((res) => {
      if (
        res.data?.organizerRegisterSolo.__typename ===
        "MutationOrganizerRegisterSoloSuccess"
      ) {
        setUserId("");
      } else {
        if (res.errors) {
          throw new Error(res.errors[0].message);
        } else {
          throw new Error("Error adding member to team");
        }
      }
    });
    createToast(promise, "Adding Participant...");
  };

  return (
    <>
      <Button
        intent={"info"}
        outline
        size={"large"}
        className="w-full md:w-fit whitespace-nowrap rounded-lg"
        onClick={() => setIsOpen(true)}>
        Add Participant
      </Button>

      <Modal
        showModal={isOpen}
        onClose={() => setIsOpen(false)}
        title={"Add Participant"}>
        <div className="w-full  md:w-fit space-y-5 md:p-6 p-5 mx-auto">
          <div className="space-y-2">
            {/* scan user */}
            <label
              htmlFor="ParticipantID"
              className="block text-sm font-medium text-gray-300">
              Scan Participant ID
            </label>
            <Button
              intent={"primary"}
              className=" w-full"
              outline
              size={"large"}>
              Scan <MdOutlineQrCodeScanner className="inline-block text-2xl" />
            </Button>
          </div>
          <div className="w-full text-center ">OR</div>
          <div className="space-y-2">
            <label
              htmlFor="ParticipantID"
              className="block text-sm font-medium text-gray-300">
              Enter Participant ID
            </label>
            <input
              type="text"
              className=" border w-full    rounded-lg   block p-2.5 bg-gray-600 border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 ring-gray-500"
              placeholder="INC23-0069"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
          <Button
            intent={"info"}
            outline
            size={"large"}
            onClick={addHandler}
            className="w-full  whitespace-nowrap rounded-lg">
            Add Participant
          </Button>
        </div>
      </Modal>
    </>
  );
}

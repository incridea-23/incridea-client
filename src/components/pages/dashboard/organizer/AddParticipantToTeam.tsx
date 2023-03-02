import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { OrganizerAddTeamMemberDocument } from "@/src/generated/generated";

import { useMutation } from "@apollo/client";
import Spinner from "@/src/components/spinner";
import Modal from "@/src/components/modal";
import createToast from "@/src/components/toast";
import Teams from "./Teams";

export default function AddParticipantToTeam({
  isOpen,
  setIsOpen,
  teamId,
  teamName,
}: {
  teamId: string;
  isOpen: boolean;
  teamName: string;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const [organizerAddParticipantToTeam, { data, loading, error }] = useMutation(
    OrganizerAddTeamMemberDocument,
    {
      refetchQueries: ["TeamsByEventId"],
    }
  );
  const addHandler = (userId: string) => {
    let promise = organizerAddParticipantToTeam({
      variables: {
        teamId,
        userId,
      },
    }).then((res) => {
      if (
        res.data?.organizerAddTeamMember.__typename ===
        "MutationOrganizerAddTeamMemberSuccess"
      ) {
      }
    });
    createToast(promise, "Adding Participant...");
  };
  useEffect(() => {
    if (error) {
      createToast(Promise.reject(error), error.message);
    }
  }, [error]);

  return (
    <Modal
      showModal={isOpen}
      onClose={() => setIsOpen(false)}
      title={"Add Participant"}
      size={"small"}>
      <div className="md:p-6 p-5"></div>
    </Modal>
  );
}

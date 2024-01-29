import { useState } from "react";
import {
  OrganizerCreateTeamDocument,
} from "@/src/generated/generated";

import { useMutation } from "@apollo/client";
import Button from "@/src/components/button";
import Modal from "@/src/components/modal";
import createToast from "@/src/components/toast";
import AddParticipantToTeam from "./AddParticipantToTeam";

export default function AddTeamModal({ eventId }: { eventId: string }) {
  let [isOpen, setIsOpen] = useState(false);
  const [isOpenParticipantModal, setIsOpenParticipantModal] = useState(false);
  const [organizerCreateTeam, { data, loading, error }] = useMutation(
    OrganizerCreateTeamDocument,
    {
      refetchQueries: ["TeamDetails"],
    }
  );

  function validateAlphaNumeric(str:string) {
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    return alphanumericRegex.test(str);
  }

  const [teamName, setTeamName] = useState("");
  const createHandler = () => {
    if(teamName.length !== 0  ) {
      if(!validateAlphaNumeric(teamName)){
        createToast(Promise.reject("Team name can only contain alphanumeric characters"), "Team name can only contain alphanumeric characters");
        return;
      }
      let promise = organizerCreateTeam({
        variables: {
          eventId,
          name: teamName,
        },
      }).then((res) => {
        if (res.data?.organizerCreateTeam.__typename === "MutationOrganizerCreateTeamSuccess") {
          setTeamName("");
          setIsOpen(false);
          setIsOpenParticipantModal(true);
        } else {
          let errorMessage = "Error creating team";
          if (res.data) {
            errorMessage = res.data.organizerCreateTeam.message;
          }
          createToast(Promise.reject(promise), errorMessage);
          throw new Error(errorMessage);
        }
      }).catch((error) => {
        throw new Error(`Error: ${error.message}`);
      });      
    createToast(promise, "Creating Team...");
  }else{
    createToast(Promise.reject("Team name cannot be empty"), "Team name cannot be empty");
  }
};

  return (
    <>
      <Button
        intent={"info"}
        outline
        size={"large"}
        className="w-full md:w-fit whitespace-nowrap rounded-lg"
        onClick={() => setIsOpen(true)}>
        <span className="text-white">Add Team</span>
      </Button>
      <Modal
        showModal={isOpen}
        onClose={() => setIsOpen(false)}
        title={"Add Team"}>
        <div className="md:p-6 p-5">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-white">
              Team Name
            </label>
            <input
              type="text"
              disabled={loading}
              className="bg-gray-600 text-gray-100 rounded-md p-2 disabled:opacity-50"
              placeholder="RCB"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
          </div>
          <div>
            <Button
              intent={"info"}
              size={"large"}
              className="whitespace-nowrap mt-4 rounded-lg"
              disabled={loading}
              onClick={createHandler}>
              Add Team
            </Button>
          </div>
        </div>
      </Modal>
      {data?.organizerCreateTeam.__typename ===
        "MutationOrganizerCreateTeamSuccess" &&
        isOpenParticipantModal && (
          <AddParticipantToTeam
            isOpen={isOpenParticipantModal}
            teamName={data.organizerCreateTeam.data.name}
            setIsOpen={setIsOpenParticipantModal}
            teamId={data.organizerCreateTeam.data.id}
          />
        )}
    </>
  );
}

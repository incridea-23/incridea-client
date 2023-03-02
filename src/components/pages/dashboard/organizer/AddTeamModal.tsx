import { Fragment, useEffect, useState } from "react";
import {
  OrganizerCreateTeamDocument,
  TeamDetailsDocument,
} from "@/src/generated/generated";

import { useMutation, useQuery } from "@apollo/client";
import Spinner from "@/src/components/spinner";
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
  // const {
  //   data: teamData,
  //   error: teamError,
  //   loading: teamLoading,
  // } = useQuery(TeamDetailsDocument, {
  //   variables: {

  //   },
  // });
  const [teamName, setTeamName] = useState("");
  const createHandler = () => {
    let promise = organizerCreateTeam({
      variables: {
        eventId,
        name: teamName,
      },
    }).then((res) => {
      if (
        res.data?.organizerCreateTeam.__typename ===
        "MutationOrganizerCreateTeamSuccess"
      ) {
        setTeamName("");
        setIsOpen(false);
        setIsOpenParticipantModal(true);
      } else {
        if (res.errors) {
          throw new Error(res.errors[0].message);
        } else {
          throw new Error("Error creating team");
        }
      }
    });
    createToast(promise, "Creating Team...");
  };

  return (
    <>
      <Button
        intent={"info"}
        outline
        size={"large"}
        className="w-full md:w-fit whitespace-nowrap rounded-lg"
        onClick={() => setIsOpen(true)}>
        Add Team
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

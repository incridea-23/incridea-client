import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { OrganizerCreateTeamDocument } from "@/src/generated/generated";

import { useMutation } from "@apollo/client";
import Spinner from "@/src/components/spinner";
import Button from "@/src/components/button";
import Modal from "@/src/components/modal";
import createToast from "@/src/components/toast";

export default function AddTeamModal({ eventId }: { eventId: string }) {
  let [isOpen, setIsOpen] = useState(false);
  const [organizerCreateTeam, { data, loading, error }] = useMutation(
    OrganizerCreateTeamDocument,
    {
      refetchQueries: ["TeamsByEventId"],
    }
  );
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
        setIsOpen(false);
        setTeamName("");
      }
    });
    createToast(promise, "Creating Team...");
  };
  useEffect(() => {
    if (error) {
      createToast(Promise.reject(error), error.message);
    }
  }, [error]);

  return (
    <>
      <Button
        intent={"dark"}
        size={"large"}
        className="whitespace-nowrap"
        onClick={() => setIsOpen(true)}>
        Add Team
      </Button>
      <Modal
        showModal={isOpen}
        onClose={() => setIsOpen(false)}
        title={"Add Team"}
        size={"small"}>
        <div className="md:p-6 p-5">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-white">
              Team Name
            </label>
            <input
              type="text"
              className="bg-gray-900/50 text-gray-100 rounded-md p-2"
              placeholder="RCB"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
          </div>
          <div>
            <Button
              intent={"info"}
              size={"large"}
              className="whitespace-nowrap mt-4"
              disabled={loading}
              onClick={createHandler}>
              {loading ? <Spinner size={"small"} /> : null}
              Add Team
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

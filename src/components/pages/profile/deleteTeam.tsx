import Button from "@/src/components/button";
import Modal from "@/src/components/modal";
import Spinner from "@/src/components/spinner";
import createToast from "@/src/components/toast";
import { DeleteTeamDocument } from "@/src/generated/generated";
import { useMutation } from "@apollo/client";
import React, { FC, useState } from "react";
import { BiTrashAlt } from "react-icons/bi";

const DeleteTeamModal: FC<{
  teamId: string;
}> = ({ teamId }) => {
  const [showModal, setShowModal] = useState(false);

  const [deleteTeam, { loading: deleteTeamLoading }] = useMutation(
    DeleteTeamDocument,
    {
      refetchQueries: ["RegisterdEvents", "MyTeam"],
      awaitRefetchQueries: true,
    }
  );

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDelete = (teamId: string) => {
    setShowModal(false);
    let promise = deleteTeam({
      variables: {
        teamId: teamId,
      },
    }).then((res) => {
      if (res?.data?.deleteTeam.__typename !== "MutationDeleteTeamSuccess") {
        return Promise.reject("Error deleting team");
      }
    });
    createToast(promise, "Deleting");
  };

  return (
    <>
      <div className="flex justify-end p-5">
        <Button
          onClick={() => {
            setShowModal(true);
          }}
          disabled={deleteTeamLoading}>
          Delete Team
          <BiTrashAlt />
        </Button>
      </div>
      <Modal
        title={`Are you sure you want to delete the team?`}
        showModal={showModal}
        onClose={handleCloseModal}
        size={"small"}>
        <div className="text-sm text-center">This action cannot be undone.</div>
        <div className="flex justify-center gap-3 my-5">
          <Button
            size={"small"}
            onClick={() => {
              handleDelete(teamId as string);
            }}
            disabled={deleteTeamLoading}>
            {deleteTeamLoading ? (
              <Spinner intent={"white"} size={"small"} />
            ) : (
              "Delete"
            )}
          </Button>
          <Button
            size={"small"}
            intent={"ghost"}
            onClick={() => handleCloseModal()}>
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default DeleteTeamModal;

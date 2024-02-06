import Button from "@/src/components/button";
import Modal from "@/src/components/modal";
import Spinner from "@/src/components/spinner";
import { LeaveTeamDocument } from "@/src/generated/generated";
import { useMutation } from "@apollo/client";
import React, { FC, useState } from "react";
import { toast } from "react-hot-toast";

const LeaveTeamModal: FC<{
  refetch: string;
  teamId: string;
}> = ({ teamId, refetch }) => {
  const [showModal, setShowModal] = useState(false);

  const [leaveTeam, { loading }] = useMutation(LeaveTeamDocument, {
    refetchQueries: [refetch],
    awaitRefetchQueries: true,
  });

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleLeave = (teamId: string) => {
    setShowModal(false);
    const loadingToast = toast.loading("Leaving team...");
    leaveTeam({
      variables: {
        teamId,
      },
    }).then((res) => {
      if (res.data?.leaveTeam.__typename === "MutationLeaveTeamSuccess") {
        toast.success("You've left the team!");
        toast.dismiss(loadingToast);
      } else {
        toast.error(res.data?.leaveTeam.message!);
        toast.dismiss(loadingToast);
      }
    });
  };

  return (
    <>
      <Button
        size={"small"}
        className="mt-3 !px-5 w-fit rounded-full justify-center !skew-x-0 bodyFont !tracking-normal"
        onClick={() => {
          setShowModal(true);
        }}
        intent={"primary"}
        fullWidth
      >
        Leave Team
      </Button>
      <Modal
        title={`Are you sure you want to confirm the team?`}
        showModal={showModal}
        onClose={handleCloseModal}
        size={"small"}
      >
        <div className="text-sm text-center px-5 mt-2">
          Are you sure you want to leave the team?
        </div>
        <div className="flex justify-center gap-3 my-5">
          <Button
            size={"small"}
            onClick={() => {
              handleLeave(teamId);
            }}
            disabled={loading}
            className="rounded-full justify-center !skew-x-0 bodyFont !tracking-normal"
          >
            {loading ? <Spinner intent={"white"} size={"small"} /> : "Leave"}
          </Button>
          <Button
            size={"small"}
            intent={"ghost"}
            onClick={() => handleCloseModal()}
            className="rounded-full justify-center !skew-x-0 bodyFont !tracking-normal"
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default LeaveTeamModal;

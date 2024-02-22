import Badge from "@/src/components/badge";
import Button from "@/src/components/button";
import Modal from "@/src/components/modal";
import Link from "next/link";
import { FC, useState } from "react";
import {
  MdOutlineDeleteOutline,
  MdOutlineMail,
  MdOutlinePhone,
} from "react-icons/md";
import { BsFillEyeFill } from "react-icons/bs";
import { idToPid } from "@/src/utils/id";
import { BiPlus, BiTrashAlt } from "react-icons/bi";
import { useMutation } from "@apollo/client";
import {
  OrganizerDeleteTeamMemberDocument,
  TeamDetailsDocument,
} from "@/src/generated/generated";
import createToast from "@/src/components/toast";
import { useQuery } from "@apollo/client";
import Spinner from "@/src/components/spinner";

const ViewTeamModal: FC<{
  teamId: string;
  teamName: string;
}> = ({ teamId, teamName }) => {
  const [showModal, setShowModal] = useState(false);

  const {
    data: teamData,
    error: teamError,
    loading: teamLoading,
  } = useQuery(TeamDetailsDocument, {
    variables: {
      id: teamId,
    },
  });

  const teamSize =
    teamData?.teamDetails.__typename === "QueryTeamDetailsSuccess"
      ? teamData?.teamDetails.data.members.length
      : 0;

  function handleCloseModal() {
    setShowModal(false);
  }

  return (
    <div>
      <Button
        onClick={() => setShowModal(true)}
        className="w-6 h-auto md:w-auto"
      >
        <BsFillEyeFill />
      </Button>
      <Modal
        title="Team Details"
        showModal={showModal}
        onClose={handleCloseModal}
        size="medium"
      >
        <div className="flex flex-col p-5">
          <div className="flex flex-col justify-start ">
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold">{teamName}</h2>
              <div className="flex justify-end items-center gap-2">
                <Badge
                  className="w-fit"
                  color={teamSize === 0 ? "danger" : "success"}
                >
                  {teamSize === 0 ? "No Members" : `${teamSize} Members`}
                </Badge>
              </div>
            </div>
            <div className="flex flex-col just gap-3 mt-5">
              {teamData &&
              teamData.teamDetails.__typename === "QueryTeamDetailsSuccess" ? (
                teamData?.teamDetails.data.members?.map((member) => (
                  <div
                    key={member.user.id}
                    className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg bg-clip-padding rounded-lg md:p-5 p-3 flex flex-col md:flex-row md:items-center items-start justify-between md:gap-5 gap-3 md:h-28"
                  >
                    <div className="flex flex-col gap-1">
                      <Badge color={"info"}>{idToPid(member.user.id)}</Badge>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-gray-400 text-sm flex items-center gap-1">
                        Name
                      </span>
                      {member.user.name}
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-gray-400 text-sm flex items-center gap-1">
                        Name
                      </span>
                      {member.user.college?.name}
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-gray-400 text-sm flex items-center gap-1">
                        Email
                        <MdOutlineMail />
                      </span>
                      <Link
                        href={`mailto:${member.user.email}`}
                        className="hover:underline"
                      >
                        {member.user.email}
                      </Link>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-gray-400 text-sm flex items-center gap-1">
                        Phone
                        <MdOutlineMail />
                      </span>
                      <Link
                        href={`mailto:${member.user.phoneNumber}`}
                        className="hover:underline"
                      >
                        {member.user.phoneNumber}
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <Spinner />
              )}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ViewTeamModal;

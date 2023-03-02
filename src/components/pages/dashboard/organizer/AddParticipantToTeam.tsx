import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import {
  OrganizerAddTeamMemberDocument,
  TeamDetailsDocument,
} from "@/src/generated/generated";

import { useMutation, useQuery } from "@apollo/client";
import Spinner from "@/src/components/spinner";
import Modal from "@/src/components/modal";
import createToast from "@/src/components/toast";
import Teams from "./Teams";
import { MdOutlineDeleteOutline, MdOutlineQrCodeScanner } from "react-icons/md";
import Button from "@/src/components/button";

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
      refetchQueries: ["TeamDetails"],
    }
  );
  const {
    data: teamData,
    error: teamError,
    loading: teamLoading,
  } = useQuery(TeamDetailsDocument, {
    variables: {
      id: teamId,
    },
  });
  const [userId, setUserId] = useState<string>("");
  const addHandler = () => {
    if (!userId) return;
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
    <Modal
      showModal={isOpen}
      onClose={() => setIsOpen(false)}
      title={"Add Participant"}>
      <div className="flex flex-wrap md:p-6 p-5 gap-10">
        <div className="w-full md:w-fit space-y-5">
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
        <div className="space-y-6 w-full md:w-fit ">
          <p>Members of Team {teamName}</p>

          <div>
            {teamData &&
            teamData.teamDetails.__typename === "QueryTeamDetailsSuccess" ? (
              <div className="space-y-2">
                {teamData.teamDetails.data.members.map((member) => (
                  <div
                    key={member.user.id}
                    className="bg-white  bg-opacity-10   rounded-lg md:p-3 p-2 flex   items-start justify-between md:gap-5 gap-3">
                    <div className="flex items-center space-x-3">
                      <div className="text-lg  text-green-500 font-mono">
                        {member.user.id}
                      </div>
                      <div className="flex flex-col">
                        <p className="text-white font-medium">
                          {member.user.name}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {member.user.email}
                        </p>
                      </div>
                    </div>
                    <Button intent={"danger"} outline className=" text-xl">
                      <MdOutlineDeleteOutline className="text-2xl" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <Spinner />
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}

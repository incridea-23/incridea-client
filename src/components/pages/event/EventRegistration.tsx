import { useAuth } from "@/src/hooks/useAuth";
import Link from "next/link";
import React, { useState } from "react";
import Button from "../../button";
import {
  CreateTeamDocument,
  Event,
  JoinTeamDocument,
  User,
} from "@/src/generated/generated";
import Modal from "../../modal";
import { useMutation } from "@apollo/client";
import event from "@/src/pages/event/[slug]";
import createToast from "../../toast";

function EventRegistration({
  eventId,
  type,
  fees,
}: {
  eventId: Event["id"];
  type: Event["eventType"];
  fees: Event["fees"];
}) {
  const { loading, user, status } = useAuth();
  if (loading) return null;
  return (
    <div>
      {!user ? (
        <Link href={"/login"}>
          <Button intent={"primary"}>Login to Register</Button>
        </Link>
      ) : (
        <EventRegistrationButton eventId={eventId} type={type} fees={fees} />
      )}
    </div>
  );
}

export default EventRegistration;

function EventRegistrationButton({
  eventId,
  type,
  fees,
}: {
  eventId: Event["id"];
  type: Event["eventType"];
  fees: Event["fees"];
}) {
  if (type === "INDIVIDUAL" || type === "INDIVIDUAL_MULTIPLE_ENTRY") {
    if (fees === 0) {
      return <Button intent={"primary"}>Register Now</Button>;
    } else {
      return <Button intent={"primary"}>Pay and Register</Button>;
    }
  } else {
    return <CreateTeamJoinTeam eventId={eventId} />;
  }
}

function CreateTeamJoinTeam({ eventId }: { eventId: Event["id"] }) {
  return (
    <div className=" space-y-2">
      <CreateTeamModal eventId={eventId} />
      <JoinTeamModal />
    </div>
  );
}

const CreateTeamModal = ({ eventId }: { eventId: Event["id"] }) => {
  const [open, setOpen] = useState(false);
  const [createTeam, { loading, error }] = useMutation(CreateTeamDocument, {
    refetchQueries: ["myTeamByEventId"],
  });
  const [name, setName] = useState("");
  const handleCreateTeam = async () => {
    const promise = createTeam({
      variables: {
        eventId: eventId,
        name: name,
      },
    }).then((res) => {
      if (res.data?.createTeam.__typename === "Error") {
        throw new Error(res.data.createTeam.message);
      }
    });
    await createToast(promise, "Creating Team");
  };

  return (
    <div>
      <Button
        className="w-full"
        onClick={() => setOpen(true)}
        intent={"primary"}>
        Create Team
      </Button>
      <Modal
        onClose={() => setOpen(false)}
        showModal={open}
        size="small"
        title="Create Team">
        <div className="space-y-2 p-5  w-full  flex flex-col ">
          <label htmlFor="teamName" className="text-gray-300 font-semibod">
            Team Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="teamName"
            id="teamName"
            className="w-full bg-gray-800 border border-gray-700 rounded-md px-2 py-1"
          />
          <Button onClick={handleCreateTeam} intent="success">
            Create Team
          </Button>
        </div>
      </Modal>
    </div>
  );
};

const JoinTeamModal = () => {
  const [open, setOpen] = useState(false);
  const [joinTeam, { loading, error }] = useMutation(JoinTeamDocument);
  const handleJoinTeam = async () => {
    const promise = joinTeam({
      variables: {
        teamId: teamId,
      },
    }).then((res) => {
      if (res.data?.joinTeam.__typename === "Error") {
        throw new Error(res.data.joinTeam.message);
      }
    });
    await createToast(promise, "Joining Team");
  };
  const [teamId, setTeamId] = useState("");
  return (
    <>
      <Button
        className="w-full"
        onClick={() => setOpen(true)}
        intent={"primary"}>
        Join Team
      </Button>
      <Modal
        onClose={() => setOpen(false)}
        showModal={open}
        size="small"
        title="Create Team">
        <div className="space-y-2 p-5  w-full  flex flex-col ">
          <label htmlFor="teamName" className="text-gray-300 font-semibod">
            Team Id
          </label>
          <input
            type="text"
            value={teamId}
            onChange={(e) => setTeamId(e.target.value)}
            name="teamName"
            id="teamName"
            className="w-full bg-gray-800 border border-gray-700 rounded-md px-2 py-1"
          />
          <Button onClick={handleJoinTeam} intent="success">
            Join Team
          </Button>
        </div>
      </Modal>
    </>
  );
};

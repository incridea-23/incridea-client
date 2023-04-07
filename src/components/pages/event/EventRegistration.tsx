import { useAuth } from "@/src/hooks/useAuth";
import Link from "next/link";
import React, { useState } from "react";
import Button from "../../button";
import {
  CreateTeamDocument,
  Event,
  JoinTeamDocument,
  MyTeamDocument,
  QueryMyTeamSuccess,
} from "@/src/generated/generated";
import Modal from "../../modal";
import { useMutation, useQuery } from "@apollo/client";
import event from "@/src/pages/event/[slug]";
import createToast from "../../toast";
import { QRCodeSVG } from "qrcode.react";
import { idToTeamId } from "@/src/utils/id";
import EditTeamModal from "../profile/editTeam";
import ConfirmTeamModal from "../profile/confirmTeam";
import { titleFont } from "@/src/utils/fonts";
import { Team } from "../profile/userTeams";

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
    <>
      {!user ? (
        <Link href={"/login"}>
          <Button intent={"primary"}>Login to Register</Button>
        </Link>
      ) : (
        <EventRegistrationButton
          userId={user.id}
          eventId={eventId}
          type={type}
          fees={fees}
        />
      )}
    </>
  );
}

export default EventRegistration;

function EventRegistrationButton({
  eventId,
  type,
  fees,
  userId,
}: {
  eventId: Event["id"];
  type: Event["eventType"];
  fees: Event["fees"];
  userId: string;
}) {
  const { loading, data, error } = useQuery(MyTeamDocument, {
    variables: {
      eventId: eventId,
    },
  });
  if (loading) return null;
  if (data?.myTeam.__typename === "QueryMyTeamSuccess" && data.myTeam.data) {
    return (
      <TeamCard
        userId={userId}
        team={data.myTeam.data as QueryMyTeamSuccess["data"]}
      />
    );
  } else {
    if (type === "INDIVIDUAL" || type === "INDIVIDUAL_MULTIPLE_ENTRY") {
      if (fees === 0) {
        return <Button fullWidth intent={"primary"}>Register Now</Button>;
      } else {
        return <Button fullWidth intent={"primary"}>Pay and Register</Button>;
      }
    } else {
      return <div className="w-full space-y-2">
      <CreateTeamModal eventId={eventId} />
      <JoinTeamModal />
    </div>;
    }
  }
}

const CreateTeamModal = ({ eventId }: { eventId: Event["id"] }) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [createTeam, { loading, error: mutationError }] = useMutation(CreateTeamDocument, {
    refetchQueries: ["myTeamByEventId"],
  });
  const [name, setName] = useState("");
  const handleCreateTeam = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const promise = createTeam({
      variables: {
        eventId: eventId,
        name: name,
      },
    }).then((res) => {
      if (res.data?.createTeam.__typename === "Error") {
        setError(res.data.createTeam.message);
        throw new Error(res.data.createTeam.message);
      } else setOpen(false);
    });
    await createToast(promise, "Creating Team");
  };

  return (
    <>
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
        title="Create Team"
        rounded="md"
        >
        <form  onSubmit={handleCreateTeam} className="gap-3 md:px-6 md:pb-6 px-5 pb-5  w-full  flex flex-col ">
          <div className="flex flex-col gap-2">
            <label htmlFor="teamName" className="text-gray-300 font-semibod">
              Team Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="teamName"
              id="teamName"
              required
              className="w-full bg-gray-800 rounded-sm px-2 py-1 focus:outline-none focus:ring ring-gray-500"
            />
          </div>
          <Button type="submit" intent="success">
            Create Team
          </Button>
          {error && <p className="text-red-800 bg-red-200 px-3 py-1 rounded-sm font-semibold">{error}</p>}
        </form>
      </Modal>
    </>
  );
};

const JoinTeamModal = () => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [joinTeam, { loading, error: mutationError }] = useMutation(JoinTeamDocument);
  const handleJoinTeam = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const promise = joinTeam({
      variables: {
        teamId: teamId,
      },
    }).then((res) => {
      if (res.data?.joinTeam.__typename === "Error") {
        setError(res.data.joinTeam.message);
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
        title="Create Team"
        rounded="md">
        <form onSubmit={handleJoinTeam} className="gap-3 md:px-6 md:pb-6 px-5 pb-5  w-full  flex flex-col ">
          <div className="flex flex-col gap-2">
            <label htmlFor="teamName" className="text-gray-300 font-semibod">
              Team Id
            </label>
            <input
              type="text"
              value={teamId}
              onChange={(e) => setTeamId(e.target.value)}
              name="teamName"
              id="teamName"
              required
              className="w-full bg-gray-800 rounded-sm px-2 py-1 focus:outline-none focus:ring ring-gray-500"
            />
          </div>
          <Button type="submit" intent="success">
            Join Team
          </Button>
          {error && <p className="text-red-800 bg-red-200 px-3 py-1 rounded-sm font-semibold">{error}</p>}
        </form>
      </Modal>
    </>
  );
};

const TeamCard = ({
  team,
  userId,
}: {
  team: QueryMyTeamSuccess["data"];
  userId: string;
}) => {
  return (
    <div className="relative flex flex-col items-start justify-center my-4 bg-white/20 rounded-sm  max-w-2xl w-[300px] p-5 ">
      <div className="flex gap-5 flex-wrap">
        <div className="p-3 text-center  bg-white/70 mx-auto">
          <QRCodeSVG
            value={idToTeamId(team.id)}
            size={100}
            className="mb-1"
            bgColor="transparent"
          />
          <div className="text-black">{idToTeamId(team.id)}</div>
        </div>
        <div>
          <div
            className={`${titleFont.className} w-fit text-2xl font-bold  justify-center  text-center text-gray-900 space-x-2`}>
            {team.name}
          </div>
          {Number(userId) === team.leaderId && (
            // TODO: Add Edit and Delete Team
            <div className="flex gap-2">
              <Button
                intent="primary"
                className="text-xs"
                onClick={() => {
                  console.log("clicked");
                }}>
                Edit Team
              </Button>
              <Button
                intent="danger"
                className="text-xs"
                onClick={() => {
                  console.log("clicked");
                }}>
                Delete Team
              </Button>
            </div>
          )}
        </div>
      </div>

      <hr className="w-full border-white/40 my-3" />

      <div className="basis-1/2">
        <div className="w-full">
          {team?.members?.map((member: any) => (
            <div
              className="flex justify-between items-center"
              key={member.user.id}>
              <h1>{member.user.name}</h1>
            </div>
          ))}
        </div>

        <div className="w-full mt-2">
          {team.confirmed ? (
            <h1 className="text-xs">
              Your team is confirmed and ready to dive!
            </h1>
          ) : (
            <h1 className="text-xs">
              Heads up! Your team is not confirmed yet.
            </h1>
          )}
        </div>
        {
          // TODO: Confirm / Pay & Confirm
        }
      </div>
    </div>
  );
};

import { useAuth } from "@/src/hooks/useAuth";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Button from "../../button";
import {
  CreateTeamDocument,
  Event,
  JoinTeamDocument,
  MyTeamDocument,
  QueryMyTeamSuccess,
  RegisterSoloEventDocument,
} from "@/src/generated/generated";
import Modal from "../../modal";
import { useMutation, useQuery } from "@apollo/client";

import createToast from "../../toast";
import { QRCodeSVG } from "qrcode.react";
import { idToPid, idToTeamId, teamIdToId } from "@/src/utils/id";

import ConfirmTeamModal from "../profile/confirmTeam";
import { titleFont } from "@/src/utils/fonts";
import EditTeamModal from "./EditEvent";
import { makeTeamPayment } from "@/src/utils/razorpay";
import { BsCalendar, BsCalendar2Check, BsWhatsapp } from "react-icons/bs";
import { AiOutlineCopy } from "react-icons/ai";
import toast from "react-hot-toast";
import { generateEventUrl } from "@/src/utils/url";
import { BiInfoCircle } from "react-icons/bi";

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
          name={user.name}
          email={user.email}
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
  name,
  email,
}: {
  eventId: Event["id"];
  type: Event["eventType"];
  fees: Event["fees"];
  userId: string;
  name: string;
  email: string;
}) {
  const { loading, data, error } = useQuery(MyTeamDocument, {
    variables: {
      eventId: eventId,
    },
  });
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [registerSoloEvent, { loading: regLoading, data: regData }] =
    useMutation(RegisterSoloEventDocument, {
      refetchQueries: ["MyTeam"],
    });
  const handleSoloRegister = async () => {
    let promise = registerSoloEvent({
      variables: {
        eventId: eventId,
      },
    }).then((res) => {
      if (
        res.data?.registerSoloEvent.__typename ===
        "MutationRegisterSoloEventSuccess"
      ) {
        if (fees !== 0) {
          makeTeamPayment(
            res.data?.registerSoloEvent.data.id,
            name,
            email,
            setSdkLoaded
          );
        }
      }
    });
    createToast(promise, "Registering...");
  };
  if (loading) return null;
  if (data?.myTeam.__typename === "QueryMyTeamSuccess" && data.myTeam.data) {
    return (
      <TeamCard
        userId={userId}
        name={name}
        email={email}
        team={data.myTeam.data as QueryMyTeamSuccess["data"]}
      />
    );
  } else {
    if (type === "INDIVIDUAL" || type === "INDIVIDUAL_MULTIPLE_ENTRY") {
      if (fees === 0) {
        return (
          <Button onClick={handleSoloRegister} fullWidth intent={"primary"}>
            Register Now
          </Button>
        );
      } else {
        return (
          <Button
            disabled={regLoading || sdkLoaded}
            onClick={handleSoloRegister}
            fullWidth
            intent={"primary"}>
            Pay ₹{fees} and Register
          </Button>
        );
      }
    } else {
      return (
        <div className="w-full space-y-2">
          <CreateTeamModal eventId={eventId} />
          <JoinTeamModal />
        </div>
      );
    }
  }
}

const CreateTeamModal = ({ eventId }: { eventId: Event["id"] }) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [createTeam, { loading, error: mutationError }] = useMutation(
    CreateTeamDocument,
    {
      refetchQueries: ["MyTeam"],
    }
  );

  const [name, setName] = useState("");
  const handleCreateTeam = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const promise = createTeam({
      variables: {
        eventId: eventId,
        name: name,
      },
      refetchQueries: ["MyTeam"],
    }).then((res) => {
      if (res.data?.createTeam.__typename === "Error") {
        setError(res.data.createTeam.message);
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
        onClose={() => {
          setOpen(false);
          setError("");
        }}
        showModal={open}
        size="small"
        title="Create Team"
        rounded="md">
        <form
          onSubmit={handleCreateTeam}
          className="gap-3 md:px-6 md:pb-6 px-5 pb-5  w-full  flex flex-col ">
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
          {error && (
            <p className="text-red-800 bg-red-200 px-3 py-1 rounded-sm font-semibold">
              {error}
            </p>
          )}
        </form>
      </Modal>
    </>
  );
};

const JoinTeamModal = () => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [joinTeam, { loading, error: mutationError }] = useMutation(
    JoinTeamDocument,
    {
      refetchQueries: ["MyTeam"],
    }
  );
  const handleJoinTeam = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const promise = joinTeam({
      variables: {
        teamId: teamIdToId(teamId),
      },
    }).then((res) => {
      if (res.data?.joinTeam.__typename === "Error") {
        setError(res.data.joinTeam.message);
      } else {
        setError("");
        setOpen(false);
      }
    });
    await createToast(promise, "Joining Team");
  };
  const [teamId, setTeamId] = useState("");
  return (
    <>
      <Button
        className="w-full"
        disabled={loading}
        onClick={() => setOpen(true)}
        intent={"primary"}>
        Join Team
      </Button>
      <Modal
        onClose={() => setOpen(false)}
        showModal={open}
        size="small"
        title="Join Team"
        rounded="md">
        <form
          onSubmit={handleJoinTeam}
          className="gap-3 md:px-6 md:pb-6 px-5 pb-5  w-full  flex flex-col ">
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
              placeholder="T23-10902"
              required
              className="w-full bg-gray-800 rounded-sm px-2 py-1 focus:outline-none focus:ring ring-gray-500"
            />
          </div>
          <Button disabled={loading} type="submit" intent="success">
            Join Team
          </Button>
          {error && (
            <p className="text-red-800 bg-red-200 px-3 py-1 rounded-sm font-semibold">
              {error}
            </p>
          )}
        </form>
      </Modal>
    </>
  );
};

const TeamCard = ({
  team,
  userId,
  name,
  email,
}: {
  team: QueryMyTeamSuccess["data"];
  userId: string;
  name: string;
  email: string;
}) => {
  console.log(team);
  const [sdkLoading, setSdkLoading] = useState(false);
  const url = `Join my team for ${
    team.event.name
  } event at Incridea 2023! Here's the link: https://incridea.in${generateEventUrl(
    team.event.name,
    team.event.id
  )}?jointeam=${team.id}`;
  const copyUrl = async () => {
    await navigator.clipboard.writeText(url);
    toast.success("Copied to clipboard!");
  };
  return (
    <div className="relative flex flex-col items-start justify-center my-4 bg-white/20 rounded-sm  max-w-2xl w-[300px] p-5 ">
      <div className="w-full">
        <div className="flex items-center mb-2 justify-center ">
          {team.event.eventType === "INDIVIDUAL" ||
          team.event.eventType === "INDIVIDUAL_MULTIPLE_ENTRY" ? (
            team.confirmed && (
              <div className="p-3 text-center w-fit  bg-white/70 ">
                <QRCodeSVG
                  value={idToPid(userId)}
                  size={100}
                  className="mb-1"
                  bgColor="transparent"
                />
                <div className="text-black">{idToPid(userId)}</div>
              </div>
            )
          ) : (
            <div className="p-3 text-center w-fit  bg-white/70 ">
              <QRCodeSVG
                value={idToTeamId(team.id)}
                size={100}
                className="mb-1"
                bgColor="transparent"
              />
              <div className="text-black">{idToTeamId(team.id)}</div>
            </div>
          )}
        </div>
        <div>
          <div className="flex justify-between items-center w-full">
            {!(
              team.event.eventType === "INDIVIDUAL" ||
              team.event.eventType === "INDIVIDUAL_MULTIPLE_ENTRY"
            ) ? (
              <div
                className={`${titleFont.className} w-fit text-2xl font-bold  justify-center  text-center space-x-2`}>
                {team.name}
              </div>
            ) : (
              <div
                className={`${titleFont.className} w-fit text-2xl font-bold  justify-center  text-center space-x-2`}>
                {idToPid(userId)}
              </div>
            )}
            {Number(userId) === team.leaderId && !team.confirmed ? (
              !(
                team.event.eventType === "INDIVIDUAL" ||
                team.event.eventType === "INDIVIDUAL_MULTIPLE_ENTRY"
              ) && <EditTeamModal team={team} userId={userId} />
            ) : (
              <div className="flex  items justify-center gap-2 text-green-500 border-2 font-bold border-green-500 text-xs rounded-md p-1">
                Registered
              </div>
            )}
          </div>
          {!team.confirmed && (
            <span className="text-xs">
              almost there! pay {team.event.fees} to confirm your{" "}
              {team.event.eventType === "INDIVIDUAL" ||
              team.event.eventType === "INDIVIDUAL_MULTIPLE_ENTRY"
                ? "entry"
                : "team"}
            </span>
          )}
          {!team.confirmed &&
            (team.event.fees > 0 ? (
              <Button
                fullWidth
                intent="success"
                className="mt-2"
                disabled={sdkLoading}
                onClick={() => {
                  makeTeamPayment(team.id, name, email, setSdkLoading);
                }}>
                Pay {team.event.fees} to confirm
              </Button>
            ) : (
              <ConfirmTeamModal teamId={team.id} isPaid={false} />
            ))}
        </div>
      </div>

      <hr className="w-full border-white/40 my-3" />

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
          team.event.eventType === "INDIVIDUAL" ||
          team.event.eventType === "INDIVIDUAL_MULTIPLE_ENTRY" ? (
            <h1 className="text-xs">Your registered and ready to dive!</h1>
          ) : (
            <h1 className="text-xs">
              Your team is registered and ready to dive!
            </h1>
          )
        ) : team.event.eventType === "INDIVIDUAL" ||
          team.event.eventType === "INDIVIDUAL_MULTIPLE_ENTRY" ? (
          <h1 className="text-xs">
            Heads up! Your registration is not confirmed yet.
          </h1>
        ) : (
          <h1 className="text-xs">Heads up! Your team is not confirmed yet.</h1>
        )}
      </div>
      <hr className="w-full border-white/40 my-3" />
      {!team.confirmed ? (
        <div className="flex w-full flex-col justify-center">
          <p className="text-xs">
            Share this link with your friends to add them to your team!
          </p>
          <div className="flex gap-2 items-center justify-evenly mt-2">
            <input
              type="url"
              className="bg-white bg-opacity-20 rounded-lg overflow-hidden w-full text-sm p-2"
              value={url}
            />
            <AiOutlineCopy
              onClick={copyUrl}
              size={20}
              className="cursor-pointer hover:text-gray-400"
            />
          </div>

          <div className="flex items-center py-2">
            <div className="flex-grow h-px white/40"></div>
            <span className="flex-shrink text-sm px-4 italic font-light">
              or
            </span>
            <div className="flex-grow h-px white/40"></div>
          </div>

          <Link
            href={`https://wa.me/?text=${encodeURIComponent(url)}`}
            className="flex items-center justify-center gap-2 bg-black/30  hover:bg-black/50 text-green-500 text-bold rounded-md p-2 cursor-pointer text-sm">
            <BsWhatsapp /> Share on WhatsApp
          </Link>
        </div>
      ) : (
        <div className="w-full space-y-3">
          <Link
            href={`https://wa.me/?text=${encodeURIComponent(url)}`}
            className="flex items-center justify-center gap-2 bg-black/30 font-semibold hover:bg-black/50 text-blue-300 text-bold rounded-md p-2 cursor-pointer text-sm">
            <BsCalendar2Check /> Add to Calender
          </Link>
        </div>
      )}
    </div>
  );
};

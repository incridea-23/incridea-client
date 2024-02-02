import Image from "next/image";
import Link from "next/link";
import React, { FC, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { RiNumbersLine } from "react-icons/ri";
import { Team } from "./userTeams";
import TeamCard from "./teamCard";
import { QRCodeSVG } from "qrcode.react";
import { idToPid, idToTeamId } from "@/src/utils/id";
import { makeTeamPayment } from "@/src/utils/razorpay";
import email from "next-auth/providers/email";
import toast from "react-hot-toast";
import Button from "../../button";
import LeaveTeamModal from "./LeaveTeamModal";
import ConfirmTeamModal from "./confirmTeam";
import EditTeamModal from "./editTeam";
import DeleteTeamModal from "./deleteTeam";

const EventCard: FC<{
  teams: any;
  event: any;
  userId: string;
  name: string;
  email: string;
}> = ({ teams, event, userId, name, email }) => {
  const [sdkLoading, setSdkLoading] = useState(false);
  const solo =
    event.eventType === "INDIVIDUAL" ||
    event.eventType === "INDIVIDUAL_MULTIPLE_ENTRY";
  const changes = null;
  return (
    <Link
      href={`/event/${event.name.toLowerCase().replaceAll(" ", "-")}-${
        event.id
      }`}
      key={event.id}
      className="bg-white/10 flex justify-evenly items-center w-full h-full  rounded-lg p-5  cursor-pointer hover:scale-[1.02] transition-transform duration-300"
    >
      <div className="flex justify-center items-center flex-col gap-5">
        <Image
          src={event.image}
          alt={event.name}
          height={300}
          width={300}
          className="w-72 rounded-xl"
        />
        <div className="flex items-center w-full justify-end">
          <div className="flex flex-col  justify-start gap-4 text-gray-200">
            <div>
              <div className="flex items-center justify-start gap-1 w-max">
                <div className="w-5">
                  <IoLocationOutline />
                </div>
                <p className="text-sm font-medium">{event?.venue}</p>
              </div>
              <div className="flex items-center justify-start gap-1 w-max">
                <div className="w-5">
                  <RiNumbersLine />
                </div>
                <p className="text-sm font-medium text-center">
                  {event?.rounds.length} Round{event?.rounds.length > 1 && "s"}
                </p>
              </div>
            </div>

            {teams?.map((team: Team, index: number) => (
              <div className="flex flex-col-reverse" key={index}>
                <div className="flex justify-start">
                  {!team.confirmed &&
                    Number(team.leaderId) === Number(userId) && (
                      <ConfirmTeamModal
                        teamId={team.id}
                        canConfirm={
                          team.members.length >= team.event.minTeamSize
                        }
                        needMore={team.event.minTeamSize - team.members.length}
                      />
                    )}
                </div>
                <div className=" text-ellipsis overflow-hidden w-2/3 text-md">
                  {team.confirmed ? (
                    <p>
                      {solo ? "You are " : "Your team is "} confirmed and ready
                      to play!
                    </p>
                  ) : (
                    <p>
                      Hey, {solo ? "You are " : "Your team is "} not confirmed
                      yet.
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {teams?.map((team: Team) => (
            <>
              <div className="flex flex-col gap-2 justify-center items-center ">
                <div className="titleFont text-white flex justify-center space-x-2">
                  <span className="break-normal text-center">
                    {solo ? idToPid(userId) : team.name.toUpperCase()}
                  </span>

                  <div className="flex items-start">
                    {!team.confirmed && !solo && team.leaderId == userId && (
                      <EditTeamModal userId={userId} team={team} />
                    )}
                    {!team.confirmed && solo && (
                      <DeleteTeamModal teamId={team.id} solo={solo} />
                    )}
                  </div>
                </div>
                <div className="flex flex-col justify-center gap-y-2">
                  <QRCodeSVG
                    color="#ffffff"
                    fgColor="#ffffff"
                    value={solo ? idToPid(userId) : idToTeamId(team.id)}
                    size={100}
                    bgColor="transparent"
                  />
                  <button
                    onClick={async (event) => {
                      event.preventDefault();
                      await navigator.clipboard.writeText(
                        solo ? idToPid(userId) : idToTeamId(team.id)
                      );
                      toast.success("Copied to clipboard", {
                        position: "bottom-center",
                      });
                    }}
                    className="text-white text-xm cursor-pointer"
                  >
                    {solo ? idToPid(userId) : idToTeamId(team.id)}
                  </button>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default EventCard;

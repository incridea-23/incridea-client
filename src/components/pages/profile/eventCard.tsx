import Image from "next/image";
import React, { FC } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { RiNumbersLine } from "react-icons/ri";
import { Team } from "./userTeams";
import { QRCodeSVG } from "qrcode.react";
import { idToPid, idToTeamId } from "@/src/utils/id";
import ConfirmTeamModal from "./confirmTeam";
import EditTeamModal from "./editTeam";
import DeleteTeamModal from "./deleteTeam";
import { useRouter } from "next/router";

const EventCard: FC<{
  teams: any;
  event: any;
  userId: string;
}> = ({ teams, event, userId }) => {
  const eventType = event.teams.map((team: Team) => team.event.eventType)[0];
  const solo =
    eventType === "INDIVIDUAL" || eventType === "INDIVIDUAL_MULTIPLE_ENTRY";

  const router = useRouter();

  return (
    <div
      onClick={() =>
        router.push(
          `/event/${event.name.toLowerCase().replaceAll(" ", "-")}-${event.id}`
        )
      }
      key={event.id}
      className="w-[19rem] bg-primary-400 border border-primary-200/70 flex justify-evenly items-start rounded-lg p-5 cursor-pointer hover:scale-[1.02] transition-transform duration-300"
    >
      <div className="flex flex-col justify-center items-center">
        <div className="relative">
          <Image
            // src={`https://res.cloudinary.com/dqy4wpxhn/image/upload/v1682653090/Events/VOCAL_TWIST_%28WESTERN%29_1682653088345.jpg`}
            src={event.image || ""}
            alt={event.name}
            height={300}
            width={300}
            className="rounded-xl"
          />
          <h1 className="absolute bottom-0 text-center w-full pb-3 text-sm md:text-xl font-bold rounded-xl text-white bg-gradient-to-t from-black to-transparent">
            {event.name}
          </h1>
        </div>
        <div className="mt-4 flex flex-col items-center w-full justify-end px-5">
          <div className="flex flex-wrap justify-between gap-2 text-gray-200">
            <div className="w-full justify-center flex items-center border border-secondary-400/40 gap-2 text-left bg-primary-200/30 py-1 rounded-full px-3">
              <IoLocationOutline />
              <p className="text-xs md:text-sm font-medium truncate">
                {event?.venue}
              </p>
            </div>
            <div className="w-full justify-center flex items-center border border-secondary-400/40 gap-2 text-left bg-primary-200/30 py-1 rounded-full px-3">
              <RiNumbersLine />
              <p className="text-xs md:text-sm font-medium text-center">
                {event?.rounds.length} Round{event?.rounds.length > 1 && "s"}
              </p>
            </div>
          </div>

          {teams?.map((team: Team, i: number) => (
            <div
              key={i}
              className="mt-5 flex flex-col gap-2 justify-center items-center border border-primary-200/80 rounded-xl w-full p-3"
            >
              <div className="flex gap-5 items-center">
                <QRCodeSVG
                  color="#ffffff"
                  fgColor="#ffffff"
                  value={solo ? idToPid(userId) : idToTeamId(team.id)}
                  size={75}
                  bgColor="transparent"
                />
                <div className="text-white flex flex-col justify-between gap-2">
                  <p className="text-white text-sm lg:text-lg cursor-pointer font-bold">
                    {solo ? idToPid(userId) : idToTeamId(team.id)}
                  </p>

                  {!team.confirmed && (
                    <div className="flex items-start">
                      {!solo && team.leaderId == userId && (
                        <EditTeamModal userId={userId} team={team} />
                      )}
                      {solo && <DeleteTeamModal teamId={team.id} solo={solo} />}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col-reverse">
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
                <div className="text-ellipsis overflow-hidden text-sm text-white text-center border rounded-full w-fit px-3 py-1 border-primary-200/80 mt-1">
                  {team.confirmed ? (
                    <p>{solo ? "You are " : "Your team is "} confirmed!</p>
                  ) : (
                    <p>
                      {solo ? "You are " : "Your team is "} not confirmed yet.
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventCard;

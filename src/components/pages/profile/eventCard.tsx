import Image from 'next/image';
import Link from 'next/link';
import React, { FC, useState } from 'react';
import { IoLocationOutline } from 'react-icons/io5';
import { RiNumbersLine } from 'react-icons/ri';
import { Team } from './userTeams';
import TeamCard from './teamCard';
import { QRCodeSVG } from 'qrcode.react';
import { idToPid, idToTeamId } from '@/src/utils/id';
import { makeTeamPayment } from '@/src/utils/razorpay';
import email from 'next-auth/providers/email';
import toast from 'react-hot-toast';
import Button from '../../button';
import LeaveTeamModal from './LeaveTeamModal';
import ConfirmTeamModal from './confirmTeam';
import EditTeamModal from './editTeam';
import DeleteTeamModal from './deleteTeam';

const EventCard: FC<{
  teams: any;
  event: any;
  userId: string;
  name: string;
  email: string;
}> = ({ teams, event, userId, name, email}) => {
  const [sdkLoading, setSdkLoading] = useState(false);
  const solo =
    event.eventType === 'INDIVIDUAL' ||
    event.eventType === 'INDIVIDUAL_MULTIPLE_ENTRY';
  const changes = null;
  return (
    <Link
      href={`/event/${event.name.toLowerCase().replaceAll(' ', '-')}-${
        event.id
      }`}
      key={event.id}
      className="bg-[#ababab] justify-center  lg:max-w-[680px] rounded-lg flex flex-col p-5 lg:p-0 2xl:w-fit backdrop-filter backdrop-blur-xl bg-opacity-10 lg:flex-row cursor-pointer hover:scale-[1.03] transition-transform duration-300"
    >

    {/* event banner */}
      <div className="flex lg:flex-none items-center lg:w-2/5 lg:p-5">
        {event.image ? (
          <Image
            src={event.image}
            alt={event.name}
            width={300}
            height={150}
            className="w-full h-full rounded-xl"
          />
        ) : (
          <div className="h-full min-h-[200px] bg-fuchsia-900 flex items-center justify-center italic text-gray-400 rounded-sm">
            <Image
            src={'/assets/png/Image.png'}
            alt='No Image'
            height={50}
            width={50}
            />
          </div>
        )}
      </div>
    

      {/* details about the event */}
      <div className='flex flex-row lg:flex-grow justify-between p-3'>


        <div className='max-w-[176px] lg:w-full text-white flex flex-col lg:h-full lg:justify-center '>

        {/* title of the event */}
        <div className='titleFont w-4/5 text-ellipsis overflow-hidden truncate'>{event.name}</div>

        {/* location and rounds */}
       <div className="flex flex-col justify-start my-1 text-gray-200">
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
             {event?.rounds.length} Round{event?.rounds.length > 1 && 's'}
          </p>
        </div>
      </div>

      {/* button and status of the team */}
      {teams?.map((team: Team,index:number) => (
        <div className='flex flex-col gap-2' key={index}>
        <div className='flex justify-start'>
        {!team.confirmed &&
            Number(team.leaderId) === Number(userId) &&
            (team.event.fees > 0 ? (
              <Button
                fullWidth
                intent="primary"
                size={'small'}
                className="w-fit mt-2"
                disabled={sdkLoading}
                onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                  e.preventDefault();
                  e.stopPropagation();
                  solo
                    ? makeTeamPayment(team.id, name, email, setSdkLoading)
                    : team.members.length >= team.event.minTeamSize
                    ? makeTeamPayment(team.id, name, email, setSdkLoading)
                    : toast.error(
                        `You need ${
                          team.event.minTeamSize - team.members.length
                        } more members to confirm your team.`,
                        {
                          position: 'bottom-center',
                        }
                      );
                }}
              >
                Pay & confirm
              </Button>
            ) : (
              <ConfirmTeamModal
                teamId={team.id}
                canConfirm={team.members.length >= team.event.minTeamSize}
                needMore={
                  team.event.minTeamSize - team.members.length
                }
              />
            ))}
          </div>
          {/* <div className="w-2/3 lg:w-2/3 text-ellipsis overflow-hidden"> */}
          <div className="lg:w-2/3 text-ellipsis overflow-hidden">
          {team.confirmed ? (
          <p className="text-xs">
            {solo ? 'You are ' : 'Your team is '} confirmed and ready to play!
          </p>
          ) : (
          <p className="text-xs">
            Hey, {solo ? 'You are ' : 'Your team is '} not confirmed yet.
          </p>
          )}
          </div> 
      </div> 
      ))}
      </div>

    {/* the team name and QR code */}
      {teams?.map((team: Team) => (
       <>        
          
        <div className="flex flex-col gap-2 justify-center w-fit">
        <div className="titleFont text-white  flex flex-row w-full lg:justify-center lg:gap-1 items-center justify-between">
        <span className='break-normal text-center'>{solo ? idToPid(userId) : team.name.toUpperCase()}</span>
          
          <div className='flex items-start'>
          {!team.confirmed && !solo && team.leaderId == userId && (
              <EditTeamModal userId={userId} team={team} />
            )}
            {!team.confirmed && solo && (
              <DeleteTeamModal teamId={team.id} solo={solo} />
            )}
          </div>
          </div>
            <QRCodeSVG
        color="#ffffff"
        fgColor="#ffffff"
        value={solo ? idToPid(userId) : idToTeamId(team.id)}
        size={100}
        className="h-fit w-fit"
        bgColor="transparent"
        />
        <button
        onClick={async (event) => {
          event.preventDefault();
          await navigator.clipboard.writeText(
            solo ? idToPid(userId) : idToTeamId(team.id)
          );
          toast.success('Copied to clipboard', {
            position: 'bottom-center',
          });
        }}
        className="text-white text-xm cursor-pointer"
      >
        {solo ? idToPid(userId) : idToTeamId(team.id)}
      </button>
        </div>
        </>
     ))}

     </div>


    </Link>
  );
};

export default EventCard;
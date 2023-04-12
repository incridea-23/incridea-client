import { BsWhatsapp } from 'react-icons/bs';
import GoogleCalendar from './googleCalendar';
import LeaveTeamModal from '../profile/LeaveTeamModal';
import Link from 'next/link';
import { AiOutlineCopy } from 'react-icons/ai';
import ConfirmTeamModal from '../profile/confirmTeam';
import Button from '../../button';
import { makeTeamPayment } from '@/src/utils/razorpay';
import { idToPid, idToTeamId } from '@/src/utils/id';
import EditTeamModal from './EditEvent';
import { titleFont } from '@/src/utils/fonts';
import { QRCodeSVG } from 'qrcode.react';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import { QueryMyTeamSuccess } from '@/src/generated/generated';
import { generateEventUrl } from '@/src/utils/url';

const TeamCard = ({
  team,
  userId,
  name,
  email,
}: {
  team: QueryMyTeamSuccess['data'];
  userId: string;
  name: string;
  email: string;
}) => {
  const [sdkLoading, setSdkLoading] = useState(false);

  const url = `Join my team for ${
    team.event.name
  } event at Incridea 2023! Here's the link: https://incridea.in${generateEventUrl(
    team.event.name,
    team.event.id
  )}?jointeam=${idToTeamId(team.id)}`;

  const copyUrl = async () => {
    await navigator.clipboard.writeText(url);
    toast.success('Copied to clipboard!', {
      position: 'bottom-center',
    });
  };

  return (
    <div className="relative flex flex-col items-start justify-center my-4 bg-white/20 rounded-sm  max-w-2xl w-[300px] p-5 ">
      <div className="w-full">
        <div className="flex items-center mb-2 justify-center ">
          {team.event.eventType === 'INDIVIDUAL' ||
          team.event.eventType === 'INDIVIDUAL_MULTIPLE_ENTRY' ? (
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
            <div className="p-3 text-center w-fit  bg-white/70">
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
          <div className="flex justify-between items-center w-full mt-5">
            {!(
              team.event.eventType === 'INDIVIDUAL' ||
              team.event.eventType === 'INDIVIDUAL_MULTIPLE_ENTRY'
            ) ? (
              <div
                className={`${titleFont.className} w-fit text-2xl font-bold  justify-center  text-center space-x-2`}
              >
                {team.name}
              </div>
            ) : (
              <div
                className={`${titleFont.className} w-fit text-2xl font-bold  justify-center  text-center space-x-2`}
              >
                {idToPid(userId)}
              </div>
            )}
            {Number(userId) === team.leaderId && !team.confirmed ? (
              !(
                team.event.eventType === 'INDIVIDUAL' ||
                team.event.eventType === 'INDIVIDUAL_MULTIPLE_ENTRY'
              ) && <EditTeamModal team={team} userId={userId} />
            ) : (
              <div className="flex  items justify-center gap-2 text-green-500 border-2 font-bold border-green-500 text-xs rounded-md p-1">
                Registered
              </div>
            )}
          </div>
          {!team.confirmed && (
            <span className="text-xs">
              Almost there! {team.event.fees ? `Pay ${team.event.fees} to` : ''}{' '}
              Confirm your{' '}
              {team.event.eventType === 'INDIVIDUAL' ||
              team.event.eventType === 'INDIVIDUAL_MULTIPLE_ENTRY'
                ? 'entry'
                : 'team'}
            </span>
          )}
          {!team.confirmed &&
            team.leaderId === Number(userId) &&
            (team.event.fees > 0 ? (
              <Button
                fullWidth
                intent="success"
                className="mt-2"
                disabled={sdkLoading}
                onClick={() => {
                  makeTeamPayment(team.id, name, email, setSdkLoading);
                }}
              >
                Pay {team.event.fees} to confirm
              </Button>
            ) : (
              <ConfirmTeamModal teamId={team.id} />
            ))}
        </div>
      </div>

      <hr className="w-full border-white/40 my-3" />

      <div className="w-full">
        {team?.members?.map((member: any) => (
          <div
            className="flex justify-between items-center"
            key={member.user.id}
          >
            <h1>{member.user.name}</h1>
          </div>
        ))}
      </div>

      <div className="w-full mt-2">
        {team.confirmed ? (
          team.event.eventType === 'INDIVIDUAL' ||
          team.event.eventType === 'INDIVIDUAL_MULTIPLE_ENTRY' ? (
            <h1 className="text-xs">Your registered and ready to dive!</h1>
          ) : (
            <h1 className="text-xs">
              Your team is registered and ready to dive!
            </h1>
          )
        ) : team.event.eventType === 'INDIVIDUAL' ||
          team.event.eventType === 'INDIVIDUAL_MULTIPLE_ENTRY' ? (
          <h1 className="text-xs">
            Heads up! Your registration is not confirmed yet.
          </h1>
        ) : (
          <h1 className="text-xs">Heads up! Your team is not confirmed yet.</h1>
        )}
      </div>
      {!team.confirmed &&
        (team.leaderId === Number(userId) ? (
          <>
            <hr className="w-full border-white/40 my-3" />
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
                className="flex items-center justify-center gap-2 bg-black/30  hover:bg-black/50 text-green-500 text-bold rounded-md p-2 cursor-pointer text-sm"
              >
                <BsWhatsapp /> Share on WhatsApp
              </Link>
            </div>
          </>
        ) : (
          <LeaveTeamModal refetch={'MyTeam'} teamId={team.id} />
        ))}

      {team.confirmed && (
        <>
          <hr className="w-full border-white/40 my-3" />
          <div className="w-full space-y-3">
            <GoogleCalendar />
          </div>
        </>
      )}
    </div>
  );
};

export default TeamCard;

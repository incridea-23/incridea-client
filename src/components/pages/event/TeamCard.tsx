import { BsWhatsapp } from 'react-icons/bs';
// import GoogleCalendar from './googleCalendar';
import LeaveTeamModal from '../profile/LeaveTeamModal';
import Link from 'next/link';
import { AiOutlineCopy } from 'react-icons/ai';
import ConfirmTeamModal from '../profile/confirmTeam';
import Button from '../../button';
import { makeTeamPayment } from '@/src/utils/razorpay';
import { idToPid, idToTeamId } from '@/src/utils/id';
import EditTeamModal from './EditEvent';

import { QRCodeSVG } from 'qrcode.react';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import {
  QueryMyTeamSuccess,
  RegisterSoloEventDocument,
} from '@/src/generated/generated';
import { generateEventUrl } from '@/src/utils/url';
import CreateTeamModal from './CreateTeamModal';
import JoinTeamModal from './JoinTeamModal';
import { useMutation } from '@apollo/client';
import createToast from '../../toast';
import Badge from '../../badge';
import { BiCheck, BiCheckDouble } from 'react-icons/bi';
import { FaCheck } from 'react-icons/fa';

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
    <>
      <div className="relative flex flex-col items-start justify-center mb-4 mt-2  bg-black/20 rounded-md w-full p-5 ">
        <div className="w-full text-center text-lg font-semibold mb-2 bodyFont">
          {team.confirmed ? (
            team.event.eventType === 'INDIVIDUAL' ||
            team.event.eventType === 'INDIVIDUAL_MULTIPLE_ENTRY' ? (
              <h1 className="">You&apos;re registered and ready to dive!</h1>
            ) : (
              <h1 className="">Your team is registered and ready to dive!</h1>
            )
          ) : team.event.eventType === 'INDIVIDUAL' ||
            team.event.eventType === 'INDIVIDUAL_MULTIPLE_ENTRY' ? (
            <h1 className="">
              Heads up! Your registration is not confirmed yet.
            </h1>
          ) : (
            <h1 className="">Heads up! Your team is not confirmed yet.</h1>
          )}
        </div>
        <div className="w-full">
          <div className="flex items-center mb-2 justify-center ">
            {team.event.eventType === 'INDIVIDUAL' ||
            team.event.eventType === 'INDIVIDUAL_MULTIPLE_ENTRY' ? (
              team.confirmed && (
                <div className="p-3 text-center w-fit   ">
                  <QRCodeSVG
                    value={idToPid(userId)}
                    size={100}
                    className="mb-1"
                    bgColor="transparent"
                    fgColor="#ffffff"
                    // filter='drop-shadow(0px 0px 4px #111111bb)'
                  />
                </div>
              )
            ) : (
              <div className="p-3 text-center w-fit">
                <QRCodeSVG
                  value={idToTeamId(team.id)}
                  size={100}
                  className="mb-1"
                  fgColor="#ffffff"
                  bgColor="transparent"
                />
                <div className="text-white font-semibold bodyFont mt-2">
                  {idToTeamId(team.id)}
                </div>
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
                  className={`titleFont w-fit text-2xl font-bold  justify-center  text-center space-x-2`}
                >
                  {team.name}
                </div>
              ) : (
                <div
                  className={`bodyFont w-full -mt-5 text-lg font-bold  justify-center  text-center space-x-2`}
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
                <Badge
                  color={'success'}
                  className="inline-flex font-semibold items-center gap-1 text-xs absolute top-0 bg-green-300 text-green-700 -translate-y-1/2 right-1/2 translate-x-1/2 bodyFont"
                >
                  <BiCheckDouble /> Registered
                </Badge>
              )}
            </div>
            {!team.confirmed && (
              <span className="text-xs bodyFont">
                Almost there!{' '}
                {team.event.fees
                  ? `Pay ${team.event.fees} to confirm `
                  : 'Confirm '}
                your{' '}
                {team.event.eventType === 'INDIVIDUAL' ||
                team.event.eventType === 'INDIVIDUAL_MULTIPLE_ENTRY'
                  ? 'entry'
                  : 'team'}{' '}
                by clicking the button below.
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
                    team.members.length >= team.event.minTeamSize
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
                  Pay {team.event.fees} to confirm
                </Button>
              ) : (
                <ConfirmTeamModal
                  teamId={team.id}
                  canConfirm={team.members.length >= team.event.minTeamSize}
                  needMore={team.event.minTeamSize - team.members.length}
                />
              ))}
          </div>
        </div>

        {!(
          team.event.eventType === 'INDIVIDUAL' ||
          team.event.eventType === 'INDIVIDUAL_MULTIPLE_ENTRY'
        ) && (
          <>
            {/* <hr className="w-full border-white/40 mt-3 mb-2" /> */}
            <p className="text-xs mb-1 mt-5 bodyFont font-semibold">
              Team Members:
            </p>
            <div className="w-full bodyFont">
              {team?.members?.map((member: any) => (
                <div className="text-sm" key={member.user.id}>
                  <h1>{member.user.name}</h1>
                </div>
              ))}
            </div>
          </>
        )}

        {!(
          team.event.eventType === 'INDIVIDUAL' ||
          team.event.eventType === 'INDIVIDUAL_MULTIPLE_ENTRY'
        ) &&
          !team.confirmed &&
          (team.leaderId === Number(userId) ? (
            <>
              <hr className="w-full border-white/20 my-3" />
              <div className="flex w-full flex-col justify-center bodyFont">
                <p className="text-xs bodyFont">
                  Share this link with your friends to add them to your team!
                </p>
                <div className="flex gap-2 items-center justify-evenly mt-2">
                  <input
                    readOnly
                    type="url"
                    className="bg-white bg-opacity-20 rounded-lg overflow-hidden w-full text-sm p-2 px-3 bodyFont"
                    value={url}
                  />
                  <AiOutlineCopy
                    onClick={copyUrl}
                    size={20}
                    className="cursor-pointer hover:text-gray-400"
                  />
                </div>

                <div className="flex items-center py-2 bodyFont">
                  <div className="flex-grow h-px white/40"></div>
                  <span className="flex-shrink text-sm px-4 font-light">
                    or
                  </span>
                  <div className="flex-grow h-px white/40"></div>
                </div>

                <Link
                  href={`https://wa.me/?text=${encodeURIComponent(url)}`}
                  className="flex items-center transition-colors justify-center gap-2 bg-black/30  hover:bg-black/50 text-green-500 text-bold rounded-md p-2 cursor-pointer text-sm bodyFont"
                >
                  <BsWhatsapp /> Share on WhatsApp
                </Link>
              </div>
            </>
          ) : (
            <LeaveTeamModal refetch={'MyTeam'} teamId={team.id} />
          ))}

        {/* {team.confirmed && (
          <>
            <hr className="w-full border-white/40 my-3" />
            <div className="w-full space-y-3">
              <GoogleCalendar />
            </div>
          </>
        )} */}
      </div>
      {(team.event.eventType === 'TEAM_MULTIPLE_ENTRY' ||
        team.event.eventType === 'INDIVIDUAL_MULTIPLE_ENTRY') && (
        <div className="flex flex-col items-start justify-center bg-white/20 rounded-sm  max-w-2xl w-[300px] p-5">
          <EventButtons
            type={team.event.eventType}
            eventId={team.event.id}
            fees={team.event.fees}
            name={name}
            email={email}
          />
        </div>
      )}
    </>
  );
};

const EventButtons = ({
  type,
  eventId,
  fees,
  name,
  email,
}: {
  type: string;
  eventId: string;
  fees: number;
  name: string;
  email: string;
}) => {
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [registerSoloEvent, { loading: regLoading, data: regData }] =
    useMutation(RegisterSoloEventDocument, {
      refetchQueries: ['MyTeam'],
    });

  const handleSoloRegister = async () => {
    let promise = registerSoloEvent({
      variables: {
        eventId: eventId,
      },
    }).then((res) => {
      if (
        res.data?.registerSoloEvent.__typename ===
        'MutationRegisterSoloEventSuccess'
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
    createToast(promise, 'Registering...');
  };

  if (type === 'INDIVIDUAL' || type === 'INDIVIDUAL_MULTIPLE_ENTRY') {
    if (fees === 0) {
      return (
        <Button onClick={handleSoloRegister} fullWidth intent={'primary'}>
          Register Now
        </Button>
      );
    } else {
      return (
        <Button
          disabled={regLoading || sdkLoaded}
          onClick={handleSoloRegister}
          fullWidth
          intent={'primary'}
        >
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
};

export default TeamCard;

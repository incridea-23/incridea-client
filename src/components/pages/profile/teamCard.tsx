import { idToPid, idToTeamId } from '@/src/utils/id';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { toast } from 'react-hot-toast';
import EditTeamModal from './editTeam';

import Link from 'next/link';
import ConfirmTeamModal from './confirmTeam';
import LeaveTeamModal from './LeaveTeamModal';
import DeleteTeamModal from './deleteTeam';
import Button from '../../button';
import { useState } from 'react';
import { makeTeamPayment } from '@/src/utils/razorpay';

// For both Team and Solo Teams
const TeamCard = ({
  team,
  userId,
  name,
  email,
  solo,
}: {
  team: any;
  userId: string;
  name: string;
  email: string;
  solo?: boolean;
}) => {
  const [sdkLoading, setSdkLoading] = useState(false);

  return (
    <motion.div
      key={team.id}
      whileHover={{ scale: 1.03 }}
      className="relative rounded-sm text-gray-100 flex flex-col items-start justify-center my-4 bg-black shadow-lg bg-opacity-30 backdrop-blur-2xl max-w-2xl w-[300px] p-5"
    >
      <span
        onClick={async () => {
          await navigator.clipboard.writeText(
            solo ? idToPid(userId) : idToTeamId(team.id)
          );
          toast.success('Copied to clipboard', {
            position: 'bottom-center',
          });
        }}
        className="absolute rounded-sm -top-3 -right-3 text-white text-xs bg-[#0B2639] px-2 py-1 cursor-pointer"
      >
        {solo ? idToPid(userId) : idToTeamId(team.id)}
      </span>

      <div className="w-full text-center flex flex-col justify-center items-center">
        <QRCodeSVG
          color="#ffffff"
          fgColor="#ffffffdd"
          value={solo ? idToPid(userId) : idToTeamId(team.id)}
          size={100}
          className="mb-5 mx-auto"
          bgColor="transparent"
        />

        <div
          className={`titleFont text-3xl font-bold text-center text-gray-200 flex items-center space-x-2`}
        >
          <div>{solo ? idToPid(userId) : team.name}</div>
          {!team.confirmed && !solo && team.leaderId == userId && (
            <EditTeamModal userId={userId} team={team} />
          )}
          {!team.confirmed && solo && (
            <DeleteTeamModal teamId={team.id} solo={solo} />
          )}
        </div>

        <Link
          href={`/event/${team.event.name
            .toLocaleLowerCase()
            .split(' ')
            .join('-')}-${team.event.id}`}
        >
          <h1 className="text-gray-200 hover:text-gray-300 transition-colors duration-300 bodyFont">
            {team.event.name}
          </h1>
        </Link>
      </div>

      <hr className="w-full border-white/40 my-3" />

      <div className="basis-1/2 flex flex-col bodyFont">
        {
          <div className="w-full flex-grow">
            {team?.members?.map((member: any) => (
              <div
                className="flex justify-between items-center"
                key={member.user.id}
              >
                <h1>{member.user.name}</h1>
              </div>
            ))}
          </div>
        }

        <div className="w-full mt-1">
          {team.confirmed ? (
            <p className="text-xs">
              {solo ? 'You are ' : 'Your team is '} confirmed and ready to dive!
            </p>
          ) : (
            <p className="text-xs">
              Hey, {solo ? 'You are ' : 'Your team is '} not confirmed yet.
            </p>
          )}
        </div>

        <div>
          {!team.confirmed &&
            team.leaderId === Number(userId) &&
            (team.event.fees > 0 ? (
              <Button
                fullWidth
                intent="primary"
                size={'small'}
                className="mt-3 w-fit"
                disabled={sdkLoading}
                onClick={() => {
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

          {!team.confirmed && team.leaderId != userId && (
            <LeaveTeamModal refetch={'RegisterdEvents'} teamId={team.id} />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TeamCard;

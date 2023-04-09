import { idToPid, idToTeamId } from '@/src/utils/id';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { toast } from 'react-hot-toast';
import EditTeamModal from './editTeam';
import { titleFont } from '@/src/utils/fonts';
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
      className="relative rounded-sm flex flex-col items-start justify-center my-4 bg-white shadow-lg bg-opacity-30 backdrop-blur-2xl max-w-2xl w-[300px] p-5 border-t border-l border-white"
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
        className="absolute rounded-sm -top-3 -right-3 text-black text-xs bg-white px-2 py-1 cursor-pointer"
      >
        {solo ? idToPid(userId) : idToTeamId(team.id)}
      </span>

      <div className="basis-1/2">
        <QRCodeSVG
          value={solo ? idToPid(userId) : idToTeamId(team.id)}
          size={100}
          className="mb-5"
          bgColor="transparent"
        />

        <div
          className={`${titleFont.className} text-3xl font-bold text-center text-gray-900 flex items-center space-x-2`}
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
          <h1 className="text-gray-900 hover:text-gray-300 transition-colors duration-300">
            {team.event.name}
          </h1>
        </Link>
      </div>

      <hr className="w-full border-white/40 my-3" />

      <div className="basis-1/2 flex flex-col">
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

        <div className="w-full mt-2">
          {team.confirmed ? (
            <p className="text-xs">
              {solo ? 'You are ' : 'Your team is '} confirmed and ready to dive!
            </p>
          ) : (
            <p className="text-xs">
              Hey, {solo ? 'You are ' : 'Your team is '} is not confirmed yet.
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
                className="mt-2 w-fit"
                disabled={sdkLoading}
                onClick={() => {
                  makeTeamPayment(team.id, name, email, setSdkLoading);
                }}
              >
                Pay & confirm
              </Button>
            ) : (
              <ConfirmTeamModal teamId={team.id} />
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

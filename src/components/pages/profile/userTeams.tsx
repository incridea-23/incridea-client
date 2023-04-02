import { titleFont } from '@/src/utils/fonts';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { QRCodeSVG } from 'qrcode.react';
import { FC } from 'react';
import DeleteTeamModal from './deleteTeam';
import AddMemberModal from './addMember';
import { BiEditAlt, BiTrashAlt } from 'react-icons/bi';
import Button from '../../button';
import DeleteTeamMember from './deleteMember';
import EditTeamModal from './editTeam';

export type Team = {
  id: string;
  name: string;
  confirmed: boolean;
  leaderId: string;
  event: {
    id: string;
    name: string;
    maxTeamSize: number;
  };
  members: {
    user: {
      id: string;
      name: string;
    };
  }[];
};

const UserTeams: FC<{
  teams: any;
  userId: string;
}> = ({ teams, userId }) => {
  // Todo: Show winning status (if any)
  return (
    <section className="mt-10">
      <h1
        className={`${titleFont.className} text-2xl lg:text-4xl font-bold text-center text-white flex justify-center lg:max-w-full md:max-w-full max-w-sm`}
      >
        Your squad beneath the waves
      </h1>
      <div className="flex gap-5 flex-wrap items-stretch justify-center mt-5">
        {teams?.map((team: Team) => (
          <motion.div
            key={team.id}
            whileHover={{ scale: 1.03 }}
            className="relative flex flex-col items-start justify-center my-4 bg-white rounded-lg shadow-lg bg-opacity-30 backdrop-blur-2xl max-w-2xl w-[300px] p-5 border-t border-l border-white"
          >
            <span className="absolute -top-3 -right-3 text-black text-xs bg-white rounded-full px-2 py-1 cursor-pointer">
              T23-0{team.id}
            </span>
            <QRCodeSVG
              value={team.id}
              size={100}
              className="mb-5"
              bgColor="transparent"
            />

            <div
              className={`${titleFont.className} text-3xl font-bold text-center text-gray-900 flex items-center space-x-2`}
            >
              <div>{team.name}</div>
              {!team.confirmed && team.leaderId == userId && (
                <EditTeamModal userId={userId} team={team} />
              )}
            </div>

            <Link href={`/events/${team.event.id}`}>
              <h1 className="text-gray-900 hover:text-gray-300 transition-colors duration-300">
                {team.event.name}
              </h1>
            </Link>

            <hr className="w-full border-white/40 my-3" />

            <div className="w-full">
              <span className='font-semibold'>Members</span>
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
                <h1 className="text-xs">
                  Your team is confirmed and ready to dive!
                </h1>
              ) : (
                <h1 className="text-xs">
                  Heads up! Your team is not confirmed yet.
                </h1>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default UserTeams;

import { titleFont } from '@/src/utils/fonts';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { QRCodeSVG } from 'qrcode.react';
import { FC } from 'react';
import EditTeamModal from './editTeam';
import ConfirmTeamModal from './confirmTeam';
import { idToTeamId } from '@/src/utils/id';
import LeaveTeamModal from './LeaveTeamModal';
import { toast } from 'react-hot-toast';

export type Team = {
  id: string;
  name: string;
  confirmed: boolean;
  leaderId: string;
  event: {
    id: string;
    name: string;
    maxTeamSize: number;
    fees: number;
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
        Set sail with your Squad
      </h1>
      <div className="flex gap-5 flex-wrap items-stretch justify-center mt-5">
        {teams?.map((team: Team) => (
          <motion.div
            key={team.id}
            whileHover={{ scale: 1.03 }}
            className="relative rounded-sm flex flex-col items-start justify-center my-4 bg-white shadow-lg bg-opacity-30 backdrop-blur-2xl max-w-2xl w-[300px] p-5 border-t border-l border-white"
          >
            <span
              onClick={async () => {
                await navigator.clipboard.writeText(idToTeamId(team.id));
                toast.success('Copied to clipboard',{
                  position: 'bottom-center',
                });
              }}
              className="absolute rounded-sm -top-3 -right-3 text-black text-xs bg-white px-2 py-1 cursor-pointer"
            >
              {idToTeamId(team.id)}
            </span>

            <div className="basis-1/2">
              <QRCodeSVG
                value={idToTeamId(team.id)}
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
                  <h1 className="text-xs">
                    Your team is confirmed and ready to dive!
                  </h1>
                ) : (
                  <h1 className="text-xs">
                    Heads up! Your team is not confirmed yet.
                  </h1>
                )}
              </div>

              <div>
                {!team.confirmed && team.leaderId == userId && (
                  <ConfirmTeamModal
                    teamId={team.id}
                    isPaid={team.event.fees !== 0}
                  />
                )}

                {!team.confirmed && team.leaderId != userId && (
                  <LeaveTeamModal teamId={team.id} />
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default UserTeams;

import { titleFont } from '@/src/utils/fonts';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FC } from 'react';

const UserTeams: FC<{
  teams: any;
}> = ({ teams }) => {
  // Todo: Show winning status (if any)
  return (
    <section className="mt-10">
      <h1
        className={`${titleFont.className} text-2xl lg:text-4xl font-bold text-center text-white flex justify-center lg:max-w-full md:max-w-full max-w-sm`}
      >
        Your squad beneath the waves
      </h1>
      <div className="flex gap-5 flex-wrap items-center justify-center mt-5">
        {teams?.map((team: any) => (
          <motion.div
            key={team.id}
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center justify-center my-4 bg-white rounded-lg shadow-lg bg-opacity-30 backdrop-blur-2xl max-w-2xl w-[300px] p-5 border-t border-l border-white"
          >
            <h1
              className={`${titleFont.className} text-3xl font-bold text-center text-gray-900`}
            >
              {team.name}
            </h1>
            <Link href={`/events/${team.event.id}`}>
              <h1 className="text-gray-900 hover:text-gray-600">
                {team.event.name}
              </h1>
            </Link>
            <hr className="w-full border-gray-500 my-5" />
            <div className="flex flex-col gap-1 mb-5">
              {team?.members?.map((member: any, index: number) => (
                <div className="flex gap-2" key={member.user.id}>
                  <a className="text-black w-3">{++index}.</a>
                  <h1>{member.user.name}</h1>
                </div>
              ))}
            </div>
            <div>
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

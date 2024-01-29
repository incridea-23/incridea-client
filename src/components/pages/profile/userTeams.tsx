import { FC } from 'react';
import TeamCard from './teamCard';
import { EventType } from '@/src/generated/generated';

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
    eventType: EventType;
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
  name: string;
  email: string;
}> = ({ teams, userId, name, email }) => {
  // Todo: Show winning status (if any)
  return (
    <section className="mt-14">
      <h1
        className={`titleFont text-2xl lg:text-4xl font-bold text-center text-white flex justify-center lg:max-w-full md:max-w-full max-w-sm`}
      >
        Set sail with your Squad
      </h1>
      <div className="flex gap-5 flex-wrap items-stretch justify-center mt-6">
        {teams?.map((team: Team) => (
          <TeamCard
            key={team.id}
            team={team}
            userId={userId}
            solo={
              team.event.eventType === 'INDIVIDUAL' ||
              team.event.eventType === 'INDIVIDUAL_MULTIPLE_ENTRY'
            }
            name={name}
            email={email}
          />
        ))}
      </div>
    </section>
  );
};

export default UserTeams;

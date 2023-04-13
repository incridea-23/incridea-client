import TeamCard from '@/src/components/pages/about/TeamCard';
import { NextPage } from 'next';
import { TeamMembers } from './team';

const Team: NextPage = () => {
  return (
    <div className="pt-28 pb-10 min-h-screen bg-gradient-to-bl from-[#41acc9]  via-[#075985] to-[#2d6aa6]">
      <h1 className="text-3xl lg:text-5xl font-bold text-white text-center titleFont">
        Incridea&apos;s Code Wizards
      </h1>
      <p className="text-lg lg:text-2xl font-bold text-white text-center bodyFont mb-10">
        Meet the developers
      </p>
      <div className="flex justify-center flex-wrap gap-10 max-w-7xl mx-auto px-2">
        {TeamMembers.map((member) => (
          <TeamCard
            key={member.name}
            name={member.name}
            role={member.role}
            linkedin={member.linkedin}
            instagram={member.instagram}
            github={member.github}
            quote={member.quote}
          />
        ))}
      </div>
    </div>
  );
};

export default Team;

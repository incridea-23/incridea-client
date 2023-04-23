import React from 'react';
import CreateCriteriaModal from './CreateCriteriaModal';
import { Criteria, DeleteCriteriaDocument } from '@/src/generated/generated';
import CriteriaBox from './CriteriaBox';
import Remarks from './Remarks';

type Props = {
  eventId: string;
  roundNo: number;
  criterias: Criteria[] | null | undefined;
  selectedTeam: string | null;
  setSelectedTeam: React.Dispatch<React.SetStateAction<string | null>>;
};

const Criterias = ({
  eventId,
  roundNo,
  criterias,
  selectedTeam,
  setSelectedTeam,
}: Props) => {
  return (
    <div className="h-full overflow-y-auto">
      <div className="px-4 shadow-sm flex items-end justify-between py-3 mb-2 rounded-t-lg bg-[#35436F] sticky top-0">
        <h1 className="text-2xl font-semibold">Criterias</h1>
        <CreateCriteriaModal eventId={eventId} roundNo={roundNo} />
      </div>
      <div className="px-3 pb-3 flex flex-wrap justify-start gap-4 text-white">
        {criterias?.length === 0 && (
          <div className="text-white/60 text-center w-full py-5">
            <p>No criterias yet</p>
          </div>
        )}
        {criterias?.map((criteria, index) => (
          <div
            key={index}
            className="flex grow gap-3 p-4 rounded-md bg-white/10 flex-col w-fit items-center justify-between mb-2"
          >
            <CriteriaBox
              teamId={selectedTeam!}
              criteria={criteria}
              eventId={eventId}
              roundNo={roundNo}
            />
          </div>
        ))}
      </div>
      <Remarks eventId={eventId} roundNo={roundNo} teamId={selectedTeam!} />
    </div>
  );
};

export default Criterias;

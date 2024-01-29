import { Criteria } from "@/src/generated/generated";
import Score from "./Score";

const CriteriaBox = ({
  criteria,
  roundNo,
  teamId,
}: // onUpdateScore,
{
  criteria: Criteria;
  roundNo: number;
  teamId: string;
  // onUpdateScore: (newScore: number) => void;
}) => {
  return (
    <div className="flex grow gap-3 p-5 rounded-md bg-white/10 flex-col items-center justify-between mt-2 w-[250px]">
      <div className="flex gap-1.5 items-center">
        <p className="text-white/90 font-semibold mr-2">{criteria.name}</p>
      </div>
      <Score
        key={criteria.id}
        teamId={teamId}
        criteriaId={criteria.id}
        roundNo={roundNo}
        type={criteria.type as string}
        // onUpdateScore={onUpdateScore}
      />
    </div>
  );
};

export default CriteriaBox;

import Button from '@/src/components/button';
import createToast from '@/src/components/toast';
import {
  Criteria,
  DeleteCriteriaDocument,
  GetScoreDocument,
} from '@/src/generated/generated';
import { useMutation, useQuery } from '@apollo/client';
import { BiTrashAlt } from 'react-icons/bi';

const CriteriaBox = ({
  criteria,
  eventId,
  roundNo,
  teamId,
}: {
  criteria: Criteria;
  eventId: string;
  roundNo: number;
  teamId: string;
}) => {
  const { data, loading, error } = useQuery(GetScoreDocument, {
    variables: {
      criteriaId: criteria.id,
      teamId: teamId,
      roundNo,
    },
    skip: !roundNo || !teamId || !criteria.id,
  });

  const [deleteCriteria, { loading: deleteCriteriaLoading }] = useMutation(
    DeleteCriteriaDocument,
    {
      refetchQueries: ['RoundByJudge'],
      awaitRefetchQueries: true,
    }
  );

  const handleDeleteCriteria = (id: string) => {
    let promise = deleteCriteria({
      variables: {
        eventId: eventId,
        roundNo: roundNo,
        criteriaId: id,
      },
    });
    createToast(promise, 'Deleting criteria...');
  };

  return (
    <>
      <div className="flex gap-1.5 items-center">
        <p className="text-white/90 font-semibold mr-2">{criteria.name}</p>
        <Button
          onClick={() => handleDeleteCriteria(criteria.id)}
          disabled={deleteCriteriaLoading}
          title="Delete Criteria"
          intent={'ghost'}
          className="hover:bg-red-600/30 px-1"
          size={'small'}
        >
          <BiTrashAlt size={'1rem'} />
        </Button>
      </div>
      <div className="flex items-center text-lg gap-2">
        <button className="w-6 h-6 leading-5 bg-white/10 rounded-full">
          -
        </button>
        <input
          disabled={loading}
          value={
            data?.getScore.__typename === 'QueryGetScoreSuccess'
              ? data.getScore.data.score
              : 0
          }
          type="number"
          className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
					 				w-16 bg-white/10 min-h-[24px] rounded-lg text-center text-white/90 focus:ring-2 ring-white/50 outline-none"
          //first few classes to hide default input type=number buttons
        />
        <button className="w-6 h-6 leading-5 bg-white/10 rounded-full">
          +
        </button>
      </div>
    </>
  );
};

export default CriteriaBox;

import Button from '@/src/components/button';
import createToast from '@/src/components/toast';
import { Criteria, DeleteCriteriaDocument } from '@/src/generated/generated';
import { useMutation } from '@apollo/client';
import { BiTrashAlt } from 'react-icons/bi';
import Score from './Score';

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
    <div className="flex grow gap-3 p-5 rounded-md bg-white/10 flex-col items-center justify-between mt-2 w-[250px]">
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
      <Score teamId={teamId} criteriaId={criteria.id} roundNo={roundNo} />
    </div>
  );
};

export default CriteriaBox;

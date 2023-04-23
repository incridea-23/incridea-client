import Button from '@/src/components/button';
import React from 'react';
import { BiTrashAlt } from 'react-icons/bi';
import CreateCriteriaModal from './CreateCriteriaModal';
import { Criteria, DeleteCriteriaDocument } from '@/src/generated/generated';
import createToast from '@/src/components/toast';
import { useMutation } from '@apollo/client';

type Props = {
  eventId: string;
  roundNo: number;
  criterias: Criteria[] | null | undefined;
};

const Criterias = ({ eventId, roundNo, criterias }: Props) => {
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
            <div className="flex gap-1.5 items-center">
              <p className="text-white/90 font-semibold mr-2">
                {criteria.name}
              </p>
              <Button
                onClick={() => handleDeleteCriteria(criteria.id)}
                title="Delete Criteria"
                intent={'ghost'}
                className="hover:bg-red-600/30 px-1"
                size={'small'}
              >
                <BiTrashAlt size={'1rem'} />
              </Button>
            </div>
            {/* <div className="flex items-center text-lg gap-2">
              <button
                className="w-6 h-6 leading-5 bg-white/10 rounded-full"
              >
                -
              </button>
              <input
                type="number"
                value={criteria.score}
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
					 				w-16 bg-white/10 min-h-[24px] rounded-lg text-center text-white/90 focus:ring-2 ring-white/50 outline-none"
                //first few classes to hide default input type=number buttons
              />
              <button
                className="w-6 h-6 leading-5 bg-white/10 rounded-full"
              >
                +
              </button>
            </div> */}
          </div>
        ))}
      </div>
      <div className="p-3 pt-0 relative">
        <textarea
          rows={4}
          className="mb-3 px-3 py-2 w-full bg-white/10 placeholder:text-white/60 rounded-md resize-none"
          placeholder="Additional remarks (optional)"
        />
        <Button intent={'success'} className="absolute bottom-10 right-5">
          Add
        </Button>
      </div>
    </div>
  );
};

export default Criterias;

import Button from '@/src/components/button';
import TextInput from '@/src/components/input';
import Modal from '@/src/components/modal';
import Spinner from '@/src/components/spinner';
import createToast from '@/src/components/toast';
import {
  CreateCriteriaDocument,
  CriteriaType,
} from '@/src/generated/generated';
import { useMutation } from '@apollo/client';
import { FC, useState } from 'react';

const CreateCriteriaModal: FC<{
  eventId: string;
  roundNo: number;
}> = ({ eventId, roundNo }) => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [type, setType] = useState(CriteriaType.Number);

  function handleCloseModal() {
    setShowModal(false);
  }

  const [createCriteria, { loading }] = useMutation(CreateCriteriaDocument);

  const handleCreateCriteria = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let promise = createCriteria({
      variables: {
        name,
        type,
        eventId,
        roundNo,
      },
      refetchQueries: ['RoundByJudge'],
      awaitRefetchQueries: true,
    }).then((res) => {
      if (
        res.data?.createCriteria.__typename === 'MutationCreateCriteriaSuccess'
      ) {
        setName('');
        setType(CriteriaType.Number);
        handleCloseModal();
      } else {
        console.log(res.data?.createCriteria.message);
        throw new Error('Error creating criteria');
      }
    });
    createToast(promise, `Adding criteria...`);
  };

  return (
    <div>
      <Button
        onClick={() => {
          setShowModal(true);
        }}
        noScaleOnHover
      >
        Create {' '} <span className='hidden md:block'>Criteria</span>
      </Button>
      <Modal
        title={`Create Criteria`}
        showModal={showModal}
        onClose={handleCloseModal}
        size="medium"
      >
        <div
          className={`p-5 ${
            loading && 'opacity-50 pointer-events-none cursor-not-allowed'
          }`}
        >
          <form
            className="flex flex-col gap-5"
            onSubmit={(e) => {
              handleCreateCriteria(e);
            }}
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Criteria Name</label>
              <TextInput
                name="name"
                placeholder="Enter criteria name (optional)"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <span className="text-xs text-gray-500">
                (If not provided, will be auto-generated as &quot;criteria
                1&quot;, &quot;criteria 2&quot;, etc.)
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="type">Criteria Type</label>
              <select
                value={type}
                onChange={(e) => {
                  setType(e.target.value as CriteriaType);
                }}
                className="bg-gray-600 border-gray-500 h-10 px-4 pr-16 rounded-lg text-sm focus:outline-none focus:ring-2 ring-gray-500"
              >
                {Object.values(CriteriaType).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end">
              <Button className="rounded-lg" type="submit">
                {loading ? (
                  <>
                    <Spinner intent={'white'} size={'small'} />
                    Creating...
                  </>
                ) : (
                  'Create'
                )}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default CreateCriteriaModal;

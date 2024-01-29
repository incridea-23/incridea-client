import { FC, useState } from 'react';
import Button from '@/src/components/button';
import { useMutation } from '@apollo/client';
import { CreateCardDocument, CreateEventDocument, DayType, EventType } from '@/src/generated/generated';
import createToast from '@/src/components/toast';
import TextInput from '@/src/components/input';
import Modal from '@/src/components/modal';
import { IoAdd } from 'react-icons/io5';

const CreateCardModal: FC<{
  cardsRefetch: () => Promise<any>;
}> = ({ cardsRefetch }) => {
  const [showModal, setShowModal] = useState(false);

  function handleCloseModal() {
    setShowModal(false);
  }

  const [createCardMutation, { loading: createCardLoading }] =
    useMutation(CreateCardDocument);

  const handleAddCard = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleCloseModal();

    let promise = createCardMutation({
      variables: {
        clue: clue,
        day: day,
      },
    }).then((res) => {
      if (res.data?.createCard.__typename === 'MutationCreateCardSuccess') {
        return cardsRefetch();
      }
    });

    createToast(promise, 'Adding card...');
  };

  //Controlled Inputs
  const [clue, setClue] = useState('');
  const [day, setDay] = useState<DayType>(DayType.Day1);

  return (
    <div className="flex items-center justify-center">
      <Button fullWidth intent={'info'} size={'large'} onClick={() => setShowModal(true)}>
        <IoAdd />  Create Card
      </Button>
        <Modal title="Create Card" size="medium" onClose={handleCloseModal} showModal={showModal}>
          <form
            onSubmit={(e) => {
              handleAddCard(e);
            }}
            className={`flex flex-col gap-5 p-4 md:p-6 ${
              createCardLoading &&
              'opacity-50 pointer-events-none cursor-not-allowed'
            }}`}
          >
            <div className="flex gap-3 items-center">
              <label className="basis-1/5" htmlFor="eventName">
                Clue
              </label>
              <TextInput
                value={clue}
                onChange={(e) => setClue(e.target.value)}
                id="eventName"
                placeholder="Clue"
                additionalclasses="basis-4/5"
              />
            </div>
            <div className="flex gap-3 items-center">
              <label className="basis-1/5" htmlFor="eventType">
                Type
              </label>
              <select
                onChange={(e) => {
                  setDay(e.target.value as DayType);
                }}
                value={day}
                id="eventType"
                placeholder="Event Type"
                className="basis-4/5  bg-gray-600  border-gray-500 h-10 px-4 pr-16 rounded-lg text-sm focus:outline-none focus:ring-2 ring-gray-500"
              >
                {Object.values(DayType).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <Button type="submit" className='rounded-lg self-end' fullWidth={false} intent={'info'}>
              Create Card
            </Button>
          </form>
        </Modal>
    </div>
  );
};

export default CreateCardModal;

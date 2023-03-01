import { FC, useState } from 'react';
import Button from '@/src/components/button';
import { useMutation } from '@apollo/client';
import { CreateEventDocument, EventType } from '@/src/generated/generated';
import createToast from '@/src/components/toast';
import TextInput from '@/src/components/input';
import Modal from '@/src/components/modal';

const AddEventModal: FC<{
  eventsRefetch: () => Promise<any>;
}> = ({ eventsRefetch }) => {
  const [showModal, setShowModal] = useState(false);

  function handleCloseModal() {
    setShowModal(false);
  }

  const [createEventMutation, { loading: createEventLoading }] =
    useMutation(CreateEventDocument);

  const handleAddEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let promise = createEventMutation({
      variables: {
        eventType: eventType,
        name: eventName,
      },
    }).then((res) => {
      if (res.data?.createEvent.__typename === 'MutationCreateEventSuccess') {
        handleCloseModal();
        return eventsRefetch();
      }
    });

    createToast(promise, 'Adding event...');
  };

  //Controlled Inputs
  const [eventName, setEventName] = useState('');
  const [eventType, setEventType] = useState<EventType>(EventType.Individual);

  return (
    <div className="flex items-center justify-center">
      <Button intent={'info'} size={'large'} onClick={() => setShowModal(true)}>
        Add Event
      </Button>
      {showModal && (
        <Modal title="Add Event" size="medium" onClose={handleCloseModal} showModal={showModal}>
          <form
            onSubmit={(e) => {
              handleAddEvent(e);
            }}
            className={`flex flex-col gap-5 p-4 md:p-10 ${
              createEventLoading &&
              'opacity-50 pointer-events-none cursor-not-allowed'
            }}`}
          >
            <div className="flex gap-3 items-center">
              <label className="basis-1/5" htmlFor="eventName">
                Name
              </label>
              <TextInput
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                id="eventName"
                placeholder="Event Name"
                additionalclasses="basis-4/5"
              />
            </div>
            <div className="flex gap-3 items-center">
              <label className="basis-1/5" htmlFor="eventType">
                Type
              </label>
              <select
                onChange={(e) => {
                  setEventType(e.target.value as EventType);
                }}
                value={eventType}
                id="eventType"
                placeholder="Event Type"
                className="basis-4/5  bg-gray-700 border border-gray-500 h-10 px-4 pr-16 rounded-lg text-sm focus:outline-none focus:ring-2 ring-gray-500"
              >
                {Object.values(EventType).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <Button type="submit" intent={'primary'} fullWidth>
              Add Event
            </Button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default AddEventModal;

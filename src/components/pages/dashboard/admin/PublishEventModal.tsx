import { FC } from 'react';
import Button from '@/src/components/button';
import Modal from '@/src/components/modal';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { PublishEventDocument } from '@/src/generated/generated';
import createToast from '@/src/components/toast';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';

const PublishEventModal: FC<{
  eventId: string;
  eventName: string;
  published: boolean;
}> = ({ eventId, eventName, published }) => {
  //mutation to publish event
  const [publishEvent] = useMutation(PublishEventDocument, {
    refetchQueries: ['Events'],
    awaitRefetchQueries: true,
  });

  function handlePublishEvent() {
    let promise;
    if (!published) {
      promise = publishEvent({
        variables: {
          id: eventId,
          published: true,
        },
      }).then((res) => {
        if (
          res.data?.publishEvent.__typename !== 'MutationPublishEventSuccess'
        ) {
          return Promise.reject('Error could not publish event');
        }
      });
      createToast(promise, 'Publishing Event...');
    } else {
      promise = publishEvent({
        variables: {
          id: eventId,
          published: false,
        },
      }).then((res) => {
        if (
          res.data?.publishEvent.__typename !== 'MutationPublishEventSuccess'
        ) {
          return Promise.reject('Error could not unpublish event');
        }
      });
      createToast(promise, 'Unpublishing Event...');
    }
    setShowModal(false);
  }

  const [showModal, setShowModal] = useState(false);

  return (
    <div className='text-center flex justify-center items-center'>
      <Button
        intent={published ? 'danger' : 'success'}
        disabled={false}
        onClick={() => {
          setShowModal(true);
        }}
      >
        {published ? (
          <>
            <AiOutlineArrowDown /> Unpublish
          </>
        ) : (
          <>
            <AiOutlineArrowUp /> Publish
          </>
        )}
      </Button>
      {published ? (
        <Modal
          title={`Publish Event ${eventName}`}
          size="medium"
          showModal={showModal}
          onClose={() => setShowModal(false)}
        >
          <div>
            <div className="flex flex-col gap-2 m-3">
              <p className="text-xl text-center m-3">
                Are you sure you want to unpublish this event?
              </p>
            </div>
            <div className="flex flex-row justify-center text-center">
              <h1 className="text-center m-3">
                <Button
                  intent="success"
                  className="ml-auto"
                  disabled={false}
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  Cancel
                </Button>
              </h1>
              <h1 className="text-center m-3">
                <Button
                  intent="danger"
                  className="ml-auto"
                  disabled={false}
                  onClick={() => {
                    handlePublishEvent();
                  }}
                >
                  Unpublish
                </Button>
              </h1>
            </div>
          </div>
        </Modal>
      ) : (
        <Modal
          title={`Publish Event ${eventName}`}
          size="medium"
          showModal={showModal}
          onClose={() => setShowModal(false)}
        >
          <div className="flex flex-col gap-2 m-3">
            <p className="text-xl text-center m-3">
              Are you sure you want to publish this event?
            </p>
            <div className="flex gap-2 justify-center flex-row">
              <h1 className="text-center m-3">
                <Button
                  intent="danger"
                  className="ml-auto"
                  disabled={false}
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  Cancel
                </Button>
              </h1>
              <h1 className="text-center m-3">
                <Button
                  intent="success"
                  className="ml-auto"
                  disabled={false}
                  onClick={() => {
                    handlePublishEvent();
                  }}
                >
                  Publish
                </Button>
              </h1>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default PublishEventModal;

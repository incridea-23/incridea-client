import { FC } from 'react';
import Button from '@/src/components/button';
import Modal from '@/src/components/modal';
import { useState } from 'react';

const PublishEventModal: FC<{
    eventId: string;
    eventName: string;
    published: boolean;
}> = ({ eventId, eventName, published }) => {
    
    const [showModal, setShowModal] = useState(false);

        return (
            <div>
                <Button
                    intent={published ? 'success' : 'danger'}
                    className="ml-auto"
                    disabled={false}
                    onClick={() => {
                        setShowModal(true);
                    }}
                >
                {published ? 'Published' : 'Publish'}
                </Button>
                {published ? 
                    <Modal
                        title={`publish Event ${eventName}`}
                        size='medium'
                        showModal={showModal}
                        onClose={() => setShowModal(false)}
                        >
                        <div className="flex flex-col gap-2 m-3">
                            <p className="text-xl text-center m-3">
                                The Event {eventName} is already published.
                            </p>
                        </div>
                    </Modal>
                    :
                    <Modal
                        title={`Publish Event ${eventName}`}
                        size='small'
                        showModal={showModal}
                        onClose={() => setShowModal(false)}
                    >
                        <div className="flex flex-col gap-2 m-3">
                            <p className="text-xl text-center m-3">
                                Are you sure you want to publish this event?
                            </p>
                            <div className="flex gap-2 justify-center">
                                <h1 className='text-center m-3'>
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
                                <h1 className='text-center m-3'>
                                    <Button
                                        intent="success"
                                        className="ml-auto"
                                        disabled={false}
                                        onClick={() => {
                                            setShowModal(false);
                                        }}
                                    >
                                        Publish
                                    </Button>
                                </h1>
                            </div>
                        </div>
                    </Modal>
                }
            </div>
        )
};

export default PublishEventModal;
import Button from '@/src/components/button';
import Modal from '@/src/components/modal';
import { FC, useState } from 'react';
import { QRCodeScanner } from './QRCodeScanner';

const ScanModal: FC<{
  eventType: string;
  eventId?: string;
}> = ({ eventType, eventId }) => {
  const [showModal, setShowModal] = useState(false);

  function handleCloseModal() {
    setShowModal(false);
  }

  return (
    <>
      <Button
        intent={'ghost'}
        outline
        size={'large'}
        className="w-full md:w-fit whitespace-nowrap rounded-lg"
        onClick={() => {
          setShowModal(true);
        }}
      >
        Scan
      </Button>
      <Modal title="Scan Team" showModal={showModal} onClose={handleCloseModal}>
        <div className="p-5">
          <QRCodeScanner 
          eventId={eventId}
          eventType={eventType}
          intent={'attendance'} />
        </div>
      </Modal>
    </>
  );
};

export default ScanModal;

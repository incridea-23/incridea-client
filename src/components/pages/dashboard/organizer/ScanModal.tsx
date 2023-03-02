import Button from '@/src/components/button';
import Modal from '@/src/components/modal';
import { FC, useState } from 'react';
import { QRCodeScanner } from './QRCodeScanner';

const ScanModal: FC = () => {
  const [showModal, setShowModal] = useState(false);

  function handleCloseModal() {
    setShowModal(false);
  }

  return (
    <>
      <Button
        intent={'info'}
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
          <QRCodeScanner />
        </div>
      </Modal>
    </>
  );
};

export default ScanModal;

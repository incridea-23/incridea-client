import React, { FunctionComponent } from 'react';

const Modal: FunctionComponent<{
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}> = ({ isOpen, onClose, children }) => {
  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  if (!isOpen) return null;

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-70 z-50"
      onClick={handleClose}
    >
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-4/6 bg-white text-black z-50 p-10 rounded-lg">
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            X
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;

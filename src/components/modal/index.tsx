import React, { FunctionComponent } from 'react'
import { IoClose } from 'react-icons/io5'

const Modal: FunctionComponent<{
  isOpen: boolean
  title?: string
  onClose: () => void
  children: React.ReactNode
  size?: 'small' | 'medium'
}> = ({ isOpen, onClose, children, title, size }) => {
  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }
  if (!isOpen) return null

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen backdrop-blur-sm bg-black/40 z-50"
      onMouseDown={handleClose}
      onClick={handleClose}
    >
      <div className={`${size === 'small' ? 'w-fit' : 'w-1/2'} rounded-xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black z-50`}>
        <div className={`flex items-center justify-between ${size === 'small' ? 'px-6 py-4' : 'px-8 py-6'}`}>
          {title && <h1 className={`${size==='small' ? 'text-xl' : 'text-2xl'} font-semibold`}>{title}</h1>}
          <button className='text-gray-500 hover:text-black transition-colors ml-auto text-2xl' onClick={onClose}><IoClose /></button>
        </div>
        {<hr />}
        <div className={`${size === 'small' ? 'p-6 pt-4' : 'p-8 pt-6'}`}>
          {children}
        </div>
      </div>
    </div>
  );

}

export default Modal

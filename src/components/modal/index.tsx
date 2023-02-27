import React, { FunctionComponent, useEffect } from 'react'
import { IoClose } from 'react-icons/io5'

const Modal: FunctionComponent<{
  isOpen: boolean
  title?: string | null
  onClose: () => void
  children: React.ReactNode
  size?: 'small' | 'medium'
}> = ({ isOpen, onClose, children, title, size }) => {
  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }
  
  // Close modal on escape key press
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => {
      window.removeEventListener('keydown', handleEsc)
    }
  }, [onClose])
  
  if (!isOpen) return null

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen backdrop-blur-sm bg-black/40 z-50"
      onMouseDown={handleClose}
      onClick={handleClose}
    >
      <div className={`${size === 'small' ? 'md:w-fit' : 'md:w-1/2'} w-[95%] rounded-xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 text-white z-50`}>
        <div className={`flex  items-center justify-between ${size === 'small' ? 'px-6 py-4' : 'md:p-6  p-4'}`}>
          {title && <h1 className={`${size==='small' ? 'text-xl' : 'text-2xl'} font-semibold`}>{title}</h1>}
          <button className='text-gray-500 hover:text-gray-300 transition-colors ml-auto text-2xl' onClick={onClose}><IoClose /></button>
        </div>
        {<hr className='border-gray-500 ' />}
        <div className={`${size === 'small' ? 'p-6 pt-4' : 'md:p-6 p-4 '}`}>
          {children}
        </div>
      </div>
    </div>
  );

}

export default Modal

import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'

type Props = {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchBox = ({ value, onChange }: Props) => {
  return (
    <div className='relative'>
      <input
        type={'text'}
        value={value}
        onChange={onChange}
        className='p-2 pr-10 text-gray-500 border w-full rounded-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-gray-500'
        placeholder='Search by name or PID'
      />
      <AiOutlineSearch
        size={'1.4rem'}
        className='absolute right-3 top-2.5 text-gray-500'
      />
    </div>
  )
}

export default SearchBox

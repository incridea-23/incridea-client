import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import TextInput from '../input'

type Props = {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchBox = ({ value, onChange }: Props) => {
  return (
    <div className='relative'>
      <TextInput
        type={'text'}
        value={value}
        onChange={onChange}
        additionalClasses='p-2 pr-10 w-full'
        placeholder='Search by name or PID'
      />
      <AiOutlineSearch
        size={'1.4rem'}
        className='absolute right-3 top-2.5 text-gray-400'
      />
    </div>
  )
}

export default SearchBox

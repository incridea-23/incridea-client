import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import TextInput from '../input'

type Props = {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
}

const SearchBox = ({className, value, onChange }: Props) => {
  return (
    <div className={className + ' relative'}>
      <TextInput
        type={'text'}
        value={value}
        onChange={onChange}
        additionalclasses='p-2 pr-10 w-full'
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

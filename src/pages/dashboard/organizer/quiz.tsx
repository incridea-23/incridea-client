import Dashboard from '@/src/components/layout/dashboard'
import React from 'react'
import { CiCirclePlus,CiImageOn } from "react-icons/ci";
import { HiOutlineDuplicate } from "react-icons/hi";
import { MdDeleteOutline } from "react-icons/md";
const Quiz = () => {
  return (
    <Dashboard>
      <div className='flex flex-col'>
        <h1 className='text-4xl font-semibold mt-4'>Quiz Title</h1>
        <div className='flex flex-row py-8'>
          <div className='flex flex-col items-start rounded-3xl bg-gray-900/80 w-full h-80 mx-4 p-4 px-8'>
            <h1 className='text-xl font-medium mt-4'>Enter the Question</h1>
            <div className='flex flex-row  items-center w-full'>
          <input className='w-[1000px] h-24 rounded-3xl mt-4 bg-slate-600 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-20'></input>
          <CiImageOn className='text-3xl mx-8'/>
          <select name="type" className='border text-sm rounded-lg block  px-8 py-2 bg-gray-600 border-gray-900 placeholder-gray-400 text-white focus:outline-none focus:ring-2 ring-gray-500' id="">
            <option value="MCQ">MCQ</option>
            <option value="MMCQ">MMCQ</option>
            <option value="FITB">FITB</option>
          </select>
          </div>
          </div>
          <div className='flex flex-col justify-around items-center  w-20 rounded-2xl bg-gray-900/80'>
          <CiCirclePlus className='text-2xl' />
          <HiOutlineDuplicate className='text-2xl' />
          <MdDeleteOutline className='text-2xl' />
          </div>
        </div>
      </div>
      </Dashboard>
  )
}

export default Quiz
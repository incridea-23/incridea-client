import Dashboard from '@/src/components/layout/dashboard'
import React from 'react'
import { CiCirclePlus,CiImageOn } from "react-icons/ci";
import { HiOutlineDuplicate } from "react-icons/hi";
import { MdDeleteOutline } from "react-icons/md";
const Quiz = () => {
  return (
    <Dashboard>
      <div className='flex flex-col'>
        <input className='text-xl font-medium mt-4 w-60 rounded-2xl bg-gray-900/80 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-30 outline-none p-2 px-4' placeholder='Enter quiz title' />
        <div className='flex flex-row py-8'>
          <div className='flex flex-col items-start rounded-3xl bg-gray-900/80 w-full h-80 mx-4 p-4 px-8'>
            <h1 className='text-xl font-medium mt-4 font-gilroy'>Enter the Question</h1>
            <div className='flex flex-row  items-center w-full'>
          <input className='w-[1000px] h-24 rounded-3xl px-4 mt-4 bg-slate-600 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-20 outline-none' type='text'></input>
          <CiImageOn className='text-3xl mx-8'/>
          <select name="type" className='border-0 text-sm rounded-lg block  px-8 py-2 bg-slate-700 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-60 border-gray-900 placeholder-gray-800 text-white focus:outline-none focus:ring-2 ring-gray-500' id="">
            <option value="MCQ">MCQ</option>
            <option value="MMCQ">MMCQ</option>
            <option value="FITB">FITB</option>
          </select>
          </div>
          </div>
          <div className='flex flex-col justify-around items-center w-20 rounded-2xl bg-gray-900/80'>
          <CiCirclePlus className='text-3xl hover:bg-slate-800 hover:rounded-lg'/>
          <HiOutlineDuplicate className='text-3xl hover:bg-slate-800 hover:rounded-lg' />
          <MdDeleteOutline className='text-3xl hover:bg-slate-800 hover:rounded-lg' />
          </div>
        </div>
      </div>
      </Dashboard>
  )
}

export default Quiz
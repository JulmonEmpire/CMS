import React from 'react'
import { FaUserInjured } from 'react-icons/fa'

export default function PatientInformation() {
  return (
    <div className='pt-6 px-4 h-[77.8vh]'>
    <div className='flex gap-4'>
      <div className='bg-gradient-to-r from-[#6C526F] to-[#AE89A5] w-16 h-14 flex justify-center items-center shadow-md rounded-sm'>
        <FaUserInjured className='text-white text-2xl' />
      </div>
      <h1 className='self-end mb-2 font-bold text-xl text-[#595659]'>PATIENT DETAIL</h1>
    </div>
    <div>
      information
    </div>
  </div>
  )
}

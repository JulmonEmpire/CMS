import React from 'react'

export default function PatientInformation() {
  return (
    <div className='pt-4 px-4 h-[87vh]'>
    <div className='flex gap-4'>
      <div className='bg-gradient-to-r from-[#6C526F] to-[#AE89A5] w-16 h-14 flex justify-center items-center shadow-md rounded-sm'>
        <MdContactEmergency className='text-white text-2xl' />
      </div>
      <h1 className='self-end mb-2 font-bold text-xl text-[#595659]'>EMERGENCY / NEXT OF KIN CONTACT INFORMATION</h1>
    </div>
    <div>
      information
    </div>
  </div>
  )
}

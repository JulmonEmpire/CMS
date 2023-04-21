import React, { useState } from 'react'
import { FaUserInjured } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

export default function MedicalAidInformation() {
  const location = useLocation();
  const [patient, setPatient] = useState(location.state)
  return (
    <div className='pt-6 mb-10 px-4'>
      <div className='flex gap-4'>
        <div className='bg-gradient-to-r from-[#6C526F] to-[#AE89A5] w-16 h-14 flex justify-center items-center shadow-md rounded-sm'>
          <FaUserInjured className='text-white text-2xl' />
        </div>
        <h1 className='self-end mb-2 font-bold text-xl text-[#595659]'>MEDICAL AID INFORMATION</h1>
      </div>
      <div className='mt-4 flex flex-col gap-2'>
        <div>
          <span className='inline-block text-lg font-[500] w-[220px]'>Medical Aid:</span> <p className='inline text-lg'>{patient.medicalAidName.name}</p>
        </div>
        <div>
          <span className='inline-block text-lg font-[500] w-[220px]'>Membership Number:</span> <p className='inline text-lg'>{patient?.memberShipNumber}</p>
        </div>
        <div>
          <span className='inline-block text-lg font-[500] w-[220px]'>Dependent code:</span> <p className='inline text-lg'>{patient.dependentCode}</p>
        </div>
        <div>
          <span className='inline-block text-lg font-[500] w-[220px]'>ID No:</span> <p className='inline text-lg'>{patient.idNo}</p>
        </div>
        <div>
          <span className='inline-block text-lg font-[500] w-[220px]'>Relationship to Patient:</span> <p className='inline text-lg'>{patient.relationShipToPatient}</p>
        </div>
      </div>
    </div>
  )
}

import React, { useState } from 'react'
import { FaUserInjured } from 'react-icons/fa'
import { useLocation } from 'react-router-dom'

export default function PatientDetailInformation() {
  const location = useLocation();
  const [patient, setPatient] = useState(location.state)

  
  return (
    <div className='pt-6 mb-10 px-4 '>
      <div className='flex gap-4'>
        <div className='bg-gradient-to-r from-[#6C526F] to-[#AE89A5] w-16 h-14 flex justify-center items-center shadow-md rounded-sm'>
          <FaUserInjured className='text-white text-2xl' />
        </div>
        <h1 className='self-end mb-2 font-bold text-xl text-[#595659]'>PATIENT INFORMATION</h1>
      </div>
      <div className='mt-4 flex flex-col gap-2'>
        <div>
          <span className='inline-block text-lg font-[500] w-[170px]'>Last Name:</span> <p className='inline text-lg'>{`${patient?.title}.${patient?.lastName}`}</p>
        </div>
        <div>
          <span className='inline-block text-lg font-[500] w-[170px]'>First Name:</span> <p className='inline text-lg'>{`${patient?.title}.${patient?.firstName}`}</p>
        </div>
        <div>
          <span className='inline-block text-lg font-[500] w-[170px]'>Email:</span> <p className='inline text-lg'>{`${patient.email || "-"}`}</p>
        </div>
        <div>
          <span className='inline-block text-lg font-[500] w-[170px]'>Reffering Doctor:</span> <p className='inline text-lg'>{`${patient.refferingDoctor.firstName} ${patient.refferingDoctor.lastName}`}</p>
        </div>
        <div>
          <span className='inline-block text-lg font-[500] w-[170px]'>Places Of Service:</span> <p className='inline text-lg'>{`${patient.placesOfService.name}`}</p>
        </div>
        <div>
          <span className='inline-block text-lg font-[500] w-[170px]'>ID Number:</span> <p className='inline text-lg'>{`${patient.idNumber}`}</p>
        </div>
        <div>
          <span className='inline-block text-lg font-[500] w-[170px]'>Date of Birth:</span> <p className='inline text-lg'>{`${patient.dateOfBirth}`}</p>
        </div>
        <div>
          <span className='inline-block text-lg font-[500] w-[170px]'>Gender:</span> <p className='inline text-lg'>{`${patient.gender}`}</p>
        </div>
        <div>
          <span className='inline-block text-lg font-[500] w-[170px]'>Age:</span> <p className='inline text-lg'>{`${patient?.age || ""}`}</p>
        </div>
        <div>
          <span className='inline-block text-lg font-[500] w-[170px]'>Physical Address:</span> <p className='inline text-lg'>{`${patient.physicalAddress}`}</p>
        </div>
        <div>
          <span className='inline-block text-lg font-[500] w-[170px]'>City:</span> <p className='inline text-lg'>{`${patient.city}`}</p>
        </div>
        <div>
          <span className='inline-block text-lg font-[500] w-[170px]'>Province:</span> <p className='inline text-lg'>{`${patient.province}`}</p>
        </div>
        <div>
          <span className='inline-block text-lg font-[500] w-[170px]'>Postal Code:</span> <p className='inline text-lg'>{`${patient.postalCode}`}</p>
        </div>
        <div>
          <span className='inline-block text-lg font-[500] w-[170px]'>Cell Phone:</span> <p className='inline text-lg'>{`${patient.cellPhone}`}</p>
        </div>
        <div>
          <span className='inline-block text-lg font-[500] w-[170px]'>Work Phone:</span> <p className='inline text-lg'>{`${patient.workPhone || "-"}`}</p>
        </div>
        <div>
          <span className='inline-block text-lg font-[500] w-[170px]'>Martial Status:</span> <p className='inline text-lg'>{`${patient.martialStatus}`}</p>
        </div>
        <div>
          <span className='inline-block text-lg font-[500] w-[170px]'>Race:</span> <p className='inline text-lg'>{`${patient.race}`}</p>
        </div>
      </div>
    </div>
  )
}

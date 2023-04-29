import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import { FaUserInjured } from 'react-icons/fa'
import { toast } from 'react-toastify';
import AddDateModal from './AddDateModal';
import { useLocation, useNavigate } from 'react-router-dom';

export default function DatesOfConsultaion() {
  const location = useLocation();
  const navigate=useNavigate();

  const [showDateModal, setShowDateModal] = useState(false);

  const showAddModal = () => {
    setShowDateModal(true)
  }
  const hideAddModal = () => {
    setShowDateModal(false)
  }

  return (
    <>
      {showDateModal &&
        <AddDateModal hideAddModal={hideAddModal} />
      }
      <div>
        <div className='flex justify-between items-center'>
          <div className='flex gap-4'>
            <div className='bg-gradient-to-r from-[#6C526F] to-[#AE89A5] w-16 h-14 flex justify-center items-center shadow-md rounded-sm'>
              <FaUserInjured className='text-white text-2xl' />
            </div>
            <h1 className='self-end mb-2 font-bold text-xl text-[#595659]'>DATE'S OF CONSULTATION</h1>
          </div>

          <div>
            <button onClick={showAddModal} className='cursor-pointer flex justify-center items-center w-32 h-12 rounded-sm bg-gradient-to-r from-[#6C526F] to-[#AE89A5] hover:bg-gradient-to-l text-xl text-white' type='button' htmlFor="scannedCopies">Add Date</button>
            {/* <label className='cursor-pointer flex justify-center items-center w-32 h-12 rounded-sm bg-gradient-to-r from-[#6C526F] to-[#AE89A5] hover:bg-gradient-to-l text-xl text-white' type='button' htmlFor="scannedCopies"><img className='w-[30px] m-auto' src='/WhiteLoading.svg' /></label> */}
          </div>
        </div>

        <div className='py-4 space-y-2'>
          {location?.state?.datesOfConsultaion === undefined || location?.state?.datesOfConsultaion?.length === 0 ? <p>No record found</p> : location?.state?.datesOfConsultaion?.map((date, index) => {
            const d = new Date(date?.date);
            const dateObj = new Date(date?.date);
            const formattedDate = dateObj.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

            return (
              <div onClick={()=> navigate("/patients-information/notes",{state:{...location.state,showAddButton:true,dateId:date.id}})} className='flex gap-4 cursor-pointer hover:opacity-70'>
                <p className='text-lg font-[500]'>{`${index + 1}.`}</p>
                {/* <p className='text-lg'>{`${d.toString().slice(0, 24)}`}</p> */}
                <p className='text-lg'>{`${d.toString().slice(0, 15)} ${formattedDate}`}</p>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
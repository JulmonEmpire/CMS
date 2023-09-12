import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { FaUserInjured } from 'react-icons/fa'
import { toast } from 'react-toastify';
import AddDateModal from './AddDateModal';
import { useLocation, useNavigate } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../Utils/firebase';
import {AiFillDelete} from 'react-icons/ai'
import {IoMdAlert} from "react-icons/io"

export default function DatesOfConsultaion() {
  const location = useLocation();
  const navigate = useNavigate();

  const queryClient = useQueryClient()
  const [showDateModal, setShowDateModal] = useState(false);

  const showAddModal = () => {
    setShowDateModal(true)
  }
  const hideAddModal = () => {
    setShowDateModal(false)
  }

  const deleteDateOfConsultation = async (patientId, dateId) => {
    try {
      const userRef = doc(db, "patients", patientId);

      let patient = { ...location.state }

      // Get the existing datesOfConsultaion array from the document data
      const existingDates = patient?.datesOfConsultaion || [];

      // Filter out the date with the provided dateId from the array
      const updatedDates = existingDates.filter((date) => date.id !== dateId);

      // Update the document with the modified datesOfConsultaion array
      await updateDoc(userRef, { datesOfConsultaion: updatedDates });
      queryClient.invalidateQueries(['patients']);

      patient.datesOfConsultaion = updatedDates
      navigate('.', { state: { ...patient } });


    } catch (error) {
      console.error("Error deleting date of consultation:", error);
    }
  };

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

            // Calculate 6 years ago from today
            // const sixYearsAgo = new Date();
            // sixYearsAgo.setFullYear(sixYearsAgo.getFullYear() - 6);

            const sixYearsAgo = new Date();
            sixYearsAgo.setDate(sixYearsAgo.getDate() - 1);

            // Check if the date is before 6 years ago
            const isDateBefore6YearsAgo = d < sixYearsAgo;
            return (
              <div key={index} className='flex gap-4 justify-between items-center'>
                <>
                  {isDateBefore6YearsAgo && (
                    <IoMdAlert title='The last date of consultation was added 6 years ago. Please take necessary action' className='w-[20px] text-[#6C526F] h-[20px] rounded-full'></IoMdAlert>
                  )}
                  <div onClick={() => navigate("/patients-information/notes", { state: { ...location.state, showAddButton: true, dateId: date.id, date: date.date } })} className='flex flex-1 gap-10 cursor-pointer hover:opacity-70'>
                    <div className='flex gap-4'>
                      <p className='text-lg font-[500]'>{`${index + 1}.`}</p>
                      {/* <p className='text-lg'>{`${d.toString().slice(0, 24)}`}</p> */}
                      <p className='text-lg w-[240px]'>{`${d.toString().slice(0, 15)}`}</p>
                    </div>
                    <p>{date?.therapyType}</p>
                  </div>
                  <button className='cursor-pointer flex justify-center items-center p-4 py-2 rounded-sm bg-gradient-to-r from-[#6C526F] to-[#AE89A5] hover:bg-gradient-to-l text-lg text-white' onClick={(e) => { deleteDateOfConsultation(location.state.id, date.id); e.stopPropagation() }}><AiFillDelete/></button>
                </>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { doc, updateDoc } from 'firebase/firestore';
import React, { useRef, useState } from 'react'
import { ImCross } from 'react-icons/im';
import { db } from '../Utils/firebase';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function AddDateModal({hideAddModal}) {
  const location=useLocation()
  const formRef = useRef();
  const queryClient=useQueryClient()
  const navigate=useNavigate()

  const mutation=useMutation({
    mutationFn:async(data)=>{
      const patientRef = doc(db, "patients", location.state.id);

        let datesOfConsultaion = [data.date];
        if (location.state?.datesOfConsultaion !== undefined && location.state?.datesOfConsultaion?.length > 0) {
          datesOfConsultaion = [...location.state?.datesOfConsultaion, data.date];
        }
        await updateDoc(patientRef, { datesOfConsultaion: datesOfConsultaion });
        return datesOfConsultaion
    },
    onSuccess:(res)=>{
      console.log(res);
      queryClient.invalidateQueries(["patients"])
      toast.success("Date added successfully");
      hideAddModal();
      navigate('.', { state: { ...location.state, datesOfConsultaion: res } });
    },
    onError:()=>{
      toast.error("Error adding date");
    }
  })

  const formHandler = async (e) => {
    e.preventDefault();
    let d=new Date(formRef.current.date.value)
    d=d.getTime();

    let data={
      date:d
    }
    mutation.mutate(data);
  }
  
  return (
    <div onClick={()=>hideAddModal()} className='absolute top-0 left-0 w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.25)] backdrop-blur-[4px] flex justify-center items-center'>
      <div onClick={(e) => { e.stopPropagation(); }} className='bg-white w-96 h-80 rounded-lg p-2 divide-y-2'>
        <div className='flex justify-between items-center'>
          <h1 className='py-4 px-2 text-xl font-bold text-[#595659]'>Add date of consultation</h1>
          <ImCross onClick={hideAddModal} className='mr-4 text-2xl cursor-pointer' />
        </div>
        <form onSubmit={formHandler} ref={formRef} className='px-2 flex flex-col gap-4 pt-4 justify-center h-[70%]'>
          <input required className='p-2 text-[#595659] border-[rgba(0,0,0,0.1)] border-2' type={'date'} name='date' placeholder='Type Date'></input>
          <button disabled={mutation.isLoading ? true : false} className='w-28 h-10 self-center rounded-sm bg-gradient-to-r from-[#6C526F] to-[#AE89A5] hover:bg-gradient-to-l text-lg text-white transition-colors duration-300' type='submit'>{mutation.isLoading ? <img className='w-[30px] m-auto' src='/WhiteLoading.svg' /> : "Submit"}</button>
        </form>
      </div>
    </div>
  )
}

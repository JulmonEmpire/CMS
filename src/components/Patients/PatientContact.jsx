import { useMutation } from '@tanstack/react-query';
import React, { useRef } from 'react'
import { MdContactEmergency } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';
import { doc, setDoc } from "firebase/firestore";
import { toast } from 'react-toastify';
import { db } from '../Utils/firebase';

export default function PatientContact() {

  const formRef = useRef();
  const navigate = useNavigate();

  const location=useLocation();

  const addPatientMutation=useMutation({
    mutationFn:async (data)=>{
      const randomNum = Math.floor(Math.random() * 90) + 10;
      let userId=data.idNumber.slice(0,6);
      userId=userId+randomNum
      const result=await setDoc(doc(db, "patients", userId), data);
      return result;
    },
    onSuccess:()=>{
      toast.success("Patient Added");
    },
    onError:(error)=>{
      toast.error("Error adding Patient");
      console.log(error)
    }
  })

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const data={
      ...location.state.medicalAid,
      emergencyFirstName:formRef.current.emergencyFirstName.value,
      emergencylastName:formRef.current.emergencylastName.value,
      emergencyrelationShipToPatient:formRef.current.emergencyrelationShipToPatient.value,
      emergencyHomePhone:formRef.current.emergencyHomePhone.value,
      emergencyWorkPhone:formRef.current.emergencyWorkPhone.value,
      emergencyCellPhone:formRef.current.emergencyCellPhone.value,
    };
    addPatientMutation.mutate(data);
  }
  return (
    <div className='pt-4 px-4 h-[87vh]'>
      <div className='flex gap-4'>
        <div className='bg-gradient-to-r from-[#6C526F] to-[#AE89A5] w-16 h-14 flex justify-center items-center shadow-md rounded-sm'>
          <MdContactEmergency className='text-white text-2xl' />
        </div>
        <h1 className='self-end mb-2 font-bold text-xl text-[#595659]'>EMERGENCY / NEXT OF KIN CONTACT INFORMATION</h1>
      </div>
      <form onSubmit={formSubmitHandler} ref={formRef} className='py-8 flex flex-col gap-4 w-[60%] text-[#595659]'>
        <div className='flex gap-4'>
          <input name="emergencyFirstName" className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[50%]' placeholder='First Name' />
          <input name="emergencylastName" className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[50%]' placeholder='Last Name' />
        </div>
        <input name="emergencyrelationShipToPatient" className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='Relationship to Patient:' type={"text"} />
        <input name="emergencyHomePhone" className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='Home Phone:' type={"number"} />
        <input name="emergencyWorkPhone" className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='Work Phone:' type={"number"} />
        <input name="emergencyCellPhone" className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='Cell Phone:' type={"number"} />
        <div className='flex gap-4 mt-2'>
          <button onClick={() => navigate(-1,{state:{data:"location.state.medicalAid"}})} className='w-32 h-12 border-2 border-[#AE89A5] text-xl text-[#AE89A5] hover:bg-gradient-to-r from-[#6C526F] to-[#AE89A5] hover:text-white'>Back</button>
          <button className='w-32 h-12 rounded-sm bg-gradient-to-r from-[#6C526F] to-[#AE89A5] hover:bg-gradient-to-l text-xl text-white'>Submit</button>
        </div>
      </form>
    </div>
  )
}
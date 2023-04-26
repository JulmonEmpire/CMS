import { useQueryClient } from '@tanstack/react-query';
import { collection, deleteDoc, doc } from 'firebase/firestore';
import React, { useState } from 'react'
import { auth, db } from '../Utils/firebase';
import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { toast } from 'react-toastify';

export default function PatientDeleteConfirm({ hidePatientDeleteHandler, id }) {
  const [password, setPassword] = useState(null);
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false)

  async function deletePatient() {
    setLoading(true);
    const user = auth.currentUser;

    const credential = EmailAuthProvider.credential(
      user.email,
      password
    );

    reauthenticateWithCredential(auth.currentUser, credential)
      .then(async () => {
        const patientRef = doc(collection(db, "patients"), id);
        await deleteDoc(patientRef);
        queryClient.invalidateQueries(['patients']);
        toast.success("Patient Deleted");
        setLoading(false);
        hidePatientDeleteHandler();
      })
      .catch((error) => {
        console.log(error.code)
        if (error.code === "auth/wrong-password") {
          toast.error("Wrong password");
          setLoading(false);
          return
        }
        toast.error("Error deleting patient")
        setLoading(false);

      });
  }
  return (
    <div onClick={() => hidePatientDeleteHandler()} className='w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.2)] backdrop-blur-sm absolute z-[1000] top-0 left-0 flex justify-center items-center'>
      <div onClick={(e) => { e.stopPropagation() }} className='w-[430px] h-[270px] bg-[white] py-4 pt-2 px-2 divide-y-2 rounded-lg'>
        <h1 className='text-2xl font-[500] py-2'>Warning</h1>
        <div className='flex flex-col justify-around h-[70%]'>
          <p className='text-[16px]'>{`Enter your password to proceed`}</p>
          <input onChange={(e) => setPassword(e.target.value)} className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='Password' />
          <div className='space-x-2'>
            <button onClick={() => hidePatientDeleteHandler()} className='w-24 h-10 rounded-sm bg-gradient-to-r from-[#6C526F] to-[#AE89A5] hover:bg-gradient-to-l text-[18px] text-white'>Cancel</button>
            {loading?
            <button className='w-24 max-w-[96px] h-10 relative top-[6px] border-2 border-[#AE89A5] text-[18px] text-[#AE89A5] hover:bg-gradient-to-r from-[#6C526F] to-[#AE89A5] hover:text-white'>{<img className='w-[25px] m-auto' src='/WhiteLoading.svg'/>}</button>
            :
            <button onClick={() => { deletePatient(); }} className='w-24 max-w-[96px] h-10 border-2 border-[#AE89A5] text-[18px] text-[#AE89A5] hover:bg-gradient-to-r from-[#6C526F] to-[#AE89A5] hover:text-white'>{"Confirm"}</button>
            }
            </div>
        </div>
      </div>
    </div>
  )
}

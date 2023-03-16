import React, { useRef, useState } from 'react'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../Utils/firebase';
import { toast } from 'react-toastify';
import { ImCross } from "react-icons/im"

export default function ForgotPassword({ hideForgotPasswordModal }) {
  const formRef = useRef();
  const [loading,setLoading]=useState(false)

  const formHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await sendPasswordResetEmail(auth, formRef.current.email.value);
      console.log("Password reset email sent successfully");
      toast.success("Password Change Email sent. Please check your inbox.");
      setLoading(false);
      hideForgotPasswordModal();
    } catch (error) {
      toast.error("Error sending Password Change Email.");
      setLoading(false);
    }
  }

  return (
    <div onClick={() => { hideForgotPasswordModal() }} className='w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.2)] backdrop-blur-sm  absolute top-0 flex justify-center items-center'>
      <div onClick={(e) => { e.stopPropagation(); }} className='bg-white w-96 h-80 rounded-lg p-2 divide-y-2'>
        <div className='flex justify-between items-center'>
          <h1 className='py-4 px-2 text-xl font-bold text-[#595659]'>Forgot Password?</h1>
          <ImCross onClick={hideForgotPasswordModal} className='mr-4 text-2xl cursor-pointer'/>
        </div>
        <form onSubmit={formHandler} ref={formRef} className='px-2 flex flex-col gap-4 pt-4 justify-center h-[70%]'>
          <input required className='p-2 text-[#595659]' type={'text'} name='email' placeholder='Type Email'></input>
          <button disabled={loading?true:false} className='w-28 h-10 rounded-sm bg-gradient-to-r from-[#6C526F] to-[#AE89A5] hover:bg-gradient-to-l text-lg text-white transition-colors duration-300' type='submit'>{loading?<img className='w-[30px] m-auto' src='/WhiteLoading.svg'/>:"Submit"}</button>
        </form>
      </div>
    </div>
  )
}

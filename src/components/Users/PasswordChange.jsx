import React, { useRef, useState } from 'react'
import { AiFillEye } from "react-icons/ai"
import { AiFillEyeInvisible } from "react-icons/ai"
import { toast } from 'react-toastify';
import { updatePassword } from "firebase/auth";
import { auth, db } from '../Utils/firebase';
import { useMutation } from '@tanstack/react-query';
import {doc,updateDoc} from "firebase/firestore"

export default function PasswordChange({ hideModal }) {

  const formRef = useRef();
  const [showPassword, setShowPassword] = useState(false)
  const [showChangePassword, setShowChangePassword] = useState(false);


  const passwordChangeMutation=useMutation({
    mutationFn:async (newPassword)=>{
      updatePassword(auth.currentUser, newPassword).then(async() => {
        const userRef=doc(db,"users",auth.currentUser.uid);
        const result=await updateDoc(userRef,{firstPasswordChange:true});
        return result;
      }).catch((error) => {
        console.log(error);
      });
    },
    onSuccess:()=>{
      toast.success("Password changed")
    },
    onError:(error)=>{
      toast.error("Error changing password");
      console.log(error)
    }
  })


  const formHandler = async (e) => {
    e.preventDefault();
    if(formRef.current.password.value !== formRef.current.confirmPassword.value){
      toast.error("Password doesn't match.")
    }
    passwordChangeMutation.mutate(formRef.current.password.value)
  }

  return (
    <div onClick={() => { hideModal() }} className='w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.2)] backdrop-blur-sm  absolute top-0 flex justify-center items-center'>
      <div onClick={(e) => { e.stopPropagation(); }} className='bg-white w-96 h-80 rounded-lg p-2 divide-y-2'>
        <h1 className='py-4 px-2 text-xl font-bold text-[#595659]'>Change Password</h1>
        <form onSubmit={formHandler} ref={formRef} className='px-2 flex flex-col gap-4 pt-4 justify-center h-[70%]'>
          <div className='outline border-[2px] h-10 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%] flex relative'>
            <input required className='flex-1 p-2 text-[#595659]' type={showPassword ? 'text' : 'password'} name='password' placeholder='Type password'></input>
            {!showPassword ?
              <AiFillEye onClick={() => setShowPassword(true)} className='absolute right-[2%] top-[30%] cursor-pointer text-[#595659] text-xl' />
              : <AiFillEyeInvisible onClick={() => setShowPassword(false)} className='absolute right-[2%] top-[30%] cursor-pointer text-[#595659] text-xl' />
            }

          </div>
          <div className='outline border-[2px] h-10 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%] flex relative'>
            <input required className='flex-1 p-2 text-[#595659]' type={showChangePassword ? 'text' : 'password'} name='confirmPassword' placeholder='Confirm password'></input>
            {!showChangePassword ?
              <AiFillEye onClick={() => setShowChangePassword(true)} className='absolute right-[2%] top-[30%] cursor-pointer text-[#595659] text-xl' />
              : <AiFillEyeInvisible onClick={() => setShowChangePassword(false)} className='absolute right-[2%] top-[30%] cursor-pointer text-[#595659] text-xl' />
            }
          </div>
          <button className='w-28 h-10 rounded-sm bg-gradient-to-r from-[#6C526F] to-[#AE89A5] hover:bg-gradient-to-l text-lg text-white' type='submit'>Submit</button>
        </form>
      </div>
    </div>
  )
}

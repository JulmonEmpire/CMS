import { useMutation } from '@tanstack/react-query';
import React, { useRef } from 'react'
import { CgDetailsMore } from 'react-icons/cg';
import { auth, db } from '../Utils/firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';




export default function AddUser() {
  const formRef = useRef();
  const navigate = useNavigate();

  const signupMutation = useMutation({
    mutationFn: async (data) => {
      return createUserWithEmailAndPassword(auth, data.email, data.password)
        .then(async (userCredentials) => {
          delete data.password;
          data.uid = userCredentials.user.uid
          // const myCollection = collection(db, "users");
          // await addDoc(myCollection, data, userCredentials.user.uid);
          await setDoc(doc(db, "users", userCredentials.user.uid), data);
        })
        .catch((error) => {
          console.log(error);
        })
    },
    onSuccess: () => {
      toast.success("User created successfully");
      console.log("success");
      navigate('/home/users');
    },
    onError: () => {
      toast.error("Error creating user");
      console.log("error");
    }
  });

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    let data = {
      firstName: formRef.current.firstName.value,
      lastName: formRef.current.lastName.value,
      email: formRef.current.email.value,
      password: formRef.current.password.value,
      location: formRef.current.location.value,
      role: formRef.current.role.value,
    }

    console.log(data);
    signupMutation.mutate(data);
  }


  return (
    <div className='pt-8 px-4 h-full'>
      <div className='flex gap-4'>
        <div className='bg-gradient-to-r from-[#6C526F] to-[#AE89A5] w-16 h-14 flex justify-center items-center shadow-md rounded-sm'>
          <CgDetailsMore className='text-white text-2xl' />
        </div>
        <h1 className='self-end mb-2 font-bold text-xl text-[#595659]'>USER’S DETAILS</h1>
      </div>
      <form onSubmit={formSubmitHandler} ref={formRef} className='py-8 flex flex-col gap-4 w-[60%] text-[#595659]'>
        <div className='flex gap-4'>
          <input className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[50%]' placeholder='First Name' name='firstName' />
          <input className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[50%]' placeholder='Last Name' name='lastName' />
        </div>
        <input className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='Email' name='email' />
        <input className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='Default Password' name='password' />
        <input className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='Location' name="location" />
        <select className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' name='role'>
          <option selected disabled value={null}>User Role</option>
          <option value={"Basic User"}>Basic User</option>
          <option value={"Advanced User"}>Advanced User</option>
        </select>
        {!signupMutation.isLoading &&
          <button type='submit' className='w-32 h-12 mt-4 rounded-sm bg-gradient-to-r from-[#6C526F] to-[#AE89A5] hover:bg-gradient-to-l text-xl text-white'>Submit</button>
        }
        {signupMutation.isLoading &&
          <button type='button' disabled className='w-32 h-12 mt-4 rounded-sm bg-gradient-to-r from-[#6C526F] to-[#AE89A5] hover:bg-gradient-to-l text-xl text-white'><img className='w-[30px] m-auto' src='/WhiteLoading.svg'/></button>
        }
      </form>
    </div>
  )
}

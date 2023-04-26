import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useRef, useState } from 'react'
import { CgDetailsMore } from 'react-icons/cg';
import { db } from '../Utils/firebase';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { doc, updateDoc } from "firebase/firestore";

export default function EditUser() {
  const formRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  const queryClient = useQueryClient();

  const [initialValues, setInitialValues] = useState({
    email: location.state.user.email,
    firstName: location.state.user.firstName,
    lastName: location.state.user.lastName,
    location: location.state.user.location,
    role: location.state.user.role,
    uid: location.state.user.uid
  });


  const editUserMutation = useMutation({
    mutationFn: async (data) => {
      const userRef = doc(db, "users", initialValues.uid);
      const result=updateDoc(userRef,data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      toast.success("Changes applied successfully");
      navigate('/users');
    },
    onError: () => {
      toast.error("Error applying changes");
    }
  });

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    let data = {
      firstName: formRef.current.firstName.value,
      lastName: formRef.current.lastName.value,
      email: formRef.current.email.value,
      location: formRef.current.location.value,
      role: formRef.current.role.value,
    }

    const isFormEdited = Object.keys(initialValues).some((fieldName, index) => {
      return data[fieldName] !== initialValues[fieldName]
    });

    if (!isFormEdited) {
      toast.info("Nothing has been changed");
      return;
    }
    editUserMutation.mutate(data);
  }

  return (
    <div className='pt-4 px-4 h-full'>
      <div className='flex gap-4'>
        <div className='bg-gradient-to-r from-[#6C526F] to-[#AE89A5] w-16 h-14 flex justify-center items-center shadow-md rounded-sm'>
          <CgDetailsMore className='text-white text-2xl' />
        </div>
        <h1 className='self-end mb-2 font-bold text-xl text-[#595659]'>EDIT USER</h1>
      </div>
      <form onSubmit={formSubmitHandler} ref={formRef} className='py-8 flex flex-col gap-4 w-[60%] text-[#595659]'>
        <div className='flex gap-4'>
          <input defaultValue={initialValues?.firstName} className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[50%]' placeholder='First Name' name='firstName' />
          <input defaultValue={initialValues?.lastName} className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[50%]' placeholder='Last Name' name='lastName' />
        </div>
        <input defaultValue={initialValues?.email} disabled className='opacity-[0.8] outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='Email' name='email' />
        <input defaultValue={initialValues?.location} className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='Location' name="location" />
        <select defaultValue={initialValues?.role} className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' name='role'>
          <option selected disabled value={null}>User Role</option>
          <option value={"Basic User"}>Basic User</option>
          <option value={"Advanced User"}>Advanced User</option>
        </select>
        {!editUserMutation.isLoading &&
          <button type='submit' className='w-32 h-12 mt-4 rounded-sm bg-gradient-to-r from-[#6C526F] to-[#AE89A5] hover:bg-gradient-to-l text-xl text-white'>Submit</button>
        }
        {editUserMutation.isLoading &&
          <button type='button' disabled className='w-32 h-12 mt-4 rounded-sm bg-gradient-to-r from-[#6C526F] to-[#AE89A5] hover:bg-gradient-to-l text-xl text-white'><img className='w-[30px] m-auto' src='/WhiteLoading.svg' /></button>
        }
      </form>
    </div>
  )
}

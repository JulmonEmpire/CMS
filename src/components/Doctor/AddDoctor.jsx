import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addDoc, collection } from 'firebase/firestore';
import React, { useRef } from 'react'
import { CgDetailsMore } from 'react-icons/cg'
import { useNavigate } from 'react-router-dom';
import { db } from '../Utils/firebase';
import { toast } from 'react-toastify';


import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  practiceNumber: Yup.string().required('Practice Number is required'),
  address: Yup.string().required('Address is required'),
  contactNumber: Yup.string().required('Contact Number is required'),
});

export default function AddDoctor() {

  const formRef = useRef();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const doctorMutation = useMutation({
    mutationFn: async (data) => {
      return await addDoc(collection(db, "doctor"), data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['doctor'])
      toast.success("Doctor added successfully");
      navigate('/doctors');
    },
    onError: () => {
      toast.error("Error adding doctor");
    }
  });

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    let time = new Date();
    time = time.getTime()

    let data = {
      title: formRef.current.title.value,
      firstName: formRef.current.firstName.value,
      lastName: formRef.current.lastName.value,
      email: formRef.current.email.value,
      practiceNumber: formRef.current.practiceNumber.value,
      address: formRef.current.address.value,
      contactNumber: formRef.current.contactNumber.value,
      createdAt: time
    }
    try {
      await validationSchema.validate(data, { abortEarly: false });
      doctorMutation.mutate(data);
    } catch (errors) {
      console.error(errors.inner[0]);
      toast.error(errors.inner[0].message + "");
    }
  }

  return (
    <div className='pt-4 px-4 h-full'>
      <div className='flex gap-4'>
        <div className='bg-gradient-to-r from-[#6C526F] to-[#AE89A5] w-16 h-14 flex justify-center items-center shadow-md rounded-sm'>
          <CgDetailsMore className='text-white text-2xl' />
        </div>
        <h1 className='self-end mb-2 font-bold text-xl text-[#595659]'>DOCTOR’S DETAILS</h1>
      </div>
      <form onSubmit={formSubmitHandler} ref={formRef} className='py-8 flex flex-col gap-4 w-[60%] text-[#595659]'>
        <select name='title' className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]'>
          <option selected disabled value={"null"}>Title</option>
          <option value={"Prof"}>Prof</option>
          <option value={"Dr"}>Dr</option>
          <option value={"Miss"}>Mr</option>
          <option value={"Ms"}>Ms</option>
          <option value={"Miss"}>Mrs</option>
        </select>
        <div className='flex gap-4'>
          <input className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[50%]' placeholder='First Name' name='firstName' />
          <input className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[50%]' placeholder='Last Name' name='lastName' />
        </div>
        <input className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='Email' name='email' />
        <input className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='Practice Number' name='practiceNumber' />
        <input className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='Address' name='address' />
        <input className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='Contact Number' name='contactNumber' />
        {doctorMutation.isLoading ?
          <button type='button' className='w-32 h-12 mt-4 rounded-sm bg-gradient-to-r from-[#6C526F] to-[#AE89A5] hover:bg-gradient-to-l text-xl text-white'><img className='w-[30px] m-auto' src='/WhiteLoading.svg' /></button>
          :
          <button type='submit' className='w-32 h-12 mt-4 rounded-sm bg-gradient-to-r from-[#6C526F] to-[#AE89A5] hover:bg-gradient-to-l text-xl text-white'>Submit</button>
        }
      </form>
    </div>
  )
}

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addDoc, collection } from 'firebase/firestore';
import React, { useRef } from 'react'
import { CgDetailsMore } from 'react-icons/cg'
import { useNavigate } from 'react-router-dom';
import { db } from '../Utils/firebase';
import { toast } from 'react-toastify';

import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Medical Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  address: Yup.string().required('Address is required'),
  contactNumber: Yup.string().required('Contact Number is required'),
});

export default function AddPlacesOfService() {

  const formRef = useRef();
  const navigate = useNavigate();
  const queryClient=useQueryClient();

  const placesOfServiceMutation = useMutation({
    mutationFn: async (data) => {
      return await addDoc(collection(db, "placesOfService"), data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['placesOfService'])
      toast.success("Places of service added successfully");
      navigate('/places-of-service');
    },
    onError: () => {
      toast.error("Error adding places of service");
    }
  });

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    let data = {
      name: formRef.current.name.value,
      email: formRef.current.email.value,
      address: formRef.current.address.value,
      contactNumber: formRef.current.contactNumber.value,
    }

    try {
      await validationSchema.validate(data, { abortEarly: false });
      placesOfServiceMutation.mutate(data);
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
        <h1 className='self-end mb-2 font-bold text-xl text-[#595659]'>PLACES OF SERVICE’S DETAILS</h1>
      </div>
      <form onSubmit={formSubmitHandler} ref={formRef} className='py-8 flex flex-col gap-4 w-[60%] text-[#595659]'>
        <input className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='Places of service' name='name' />
        <input className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='Email' name='email' />
        <input className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='Address' name='address' />
        <input className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm w-[100%]' placeholder='Contact Number' name='contactNumber' />
        {placesOfServiceMutation.isLoading ?
          <button type='button' className='w-32 h-12 mt-4 rounded-sm bg-gradient-to-r from-[#6C526F] to-[#AE89A5] hover:bg-gradient-to-l text-xl text-white'><img className='w-[30px] m-auto' src='/WhiteLoading.svg' /></button>
          :
          <button type='submit' className='w-32 h-12 mt-4 rounded-sm bg-gradient-to-r from-[#6C526F] to-[#AE89A5] hover:bg-gradient-to-l text-xl text-white'>Submit</button>
        }
      </form>
    </div>
  )
}

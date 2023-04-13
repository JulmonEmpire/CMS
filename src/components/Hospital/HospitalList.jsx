import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import HospitalRow from './HospitalRow';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Utils/firebase';

export default function HospitalList() {
    
  const queryClient=useQueryClient();
  const [hospitalQuery,setHospitalQuery]=useState();
  console.log(queryClient.isFetching(['hospital']));

  useEffect(()=>{
    const unsubscribe = queryClient.getQueryCache().subscribe(() => {
      setHospitalQuery(queryClient.getQueryData(['hospital']));
    });

    return () => {
      unsubscribe();
    };

  },[location.pathname,queryClient])

  return (
    <div className='h-[75.5vh]'>
    {/* {hospitalQuery.isLoading ? <img className='w-[50px] m-auto mt-10' src='/Loading.svg' /> : */}
      <table className="table-auto w-full mt-4">
        <thead className='bg-gradient-to-r from-[#6C526F] to-[#AE89A5] h-16'>
          <tr className='text-white text-left'>
            <th className='p-2'>#</th>
            <th className='p-2'>Name</th>
            <th className='p-2'>Email</th>
            <th className='p-2'>Contact</th>
            <th className='p-2'>Address</th>
            <th className='p-2 text-center'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {hospitalQuery?.map((hospital, index) => {
            return (
              <HospitalRow key={hospital?.id} hospital={hospital} index={index} />
            )
          })}
        </tbody>
      </table>
    {/* } */}
  </div>
  )
}

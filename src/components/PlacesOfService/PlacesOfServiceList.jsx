import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Utils/firebase';
import PlacesOfServiceRow from './PlacesOfServiceRow';

export default function PlacesOfServiceList() {
    
  const queryClient=useQueryClient();
  const [placesOfserviceQuery,setPlacesOfserviceQuery]=useState();

  useEffect(()=>{
    const unsubscribe = queryClient.getQueryCache().subscribe(() => {
      setPlacesOfserviceQuery(queryClient.getQueryData(['placesOfService']));
    });

    return () => {
      unsubscribe();
    };

  },[location.pathname,queryClient])

  return (
    <div className='h-[75.5vh]'>
    {/* {placesOfserviceQuery.isLoading ? <img className='w-[50px] m-auto mt-10' src='/Loading.svg' /> : */}
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
          {placesOfserviceQuery?.map((place, index) => {
            return (
              <PlacesOfServiceRow key={place?.id} place={place} index={index} />
            )
          })}
        </tbody>
      </table>
    {/* } */}
  </div>
  )
}

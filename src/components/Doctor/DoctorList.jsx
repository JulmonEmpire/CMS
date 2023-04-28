import { useQuery, useQueryClient } from '@tanstack/react-query';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../Utils/firebase';
import DoctorRow from './DoctorRow';

export default function DoctorList() {
  const queryClient = useQueryClient();
  const [doctorQuery, setDoctorQuery] = useState();

  useEffect(() => {
    const unsubscribe = queryClient.getQueryCache().subscribe(() => {
      setDoctorQuery(queryClient.getQueryData(['doctor']));
    });

    return () => {
      unsubscribe();
    };

  }, [location.pathname, queryClient])

  return (
    <div className='h-[75.5vh]'>
      {/* {doctorQuery.isLoading ? <img className='w-[50px] m-auto mt-10' src='/Loading.svg' /> : */}
      <table className="table-auto w-full mt-4">
        <thead className='bg-gradient-to-r from-[#6C526F] to-[#AE89A5] h-16'>
          <tr className='text-white text-left'>
            <th className='p-2'>#</th>
            <th className='p-2'>Last Name</th>
            <th className='p-2'>First Name</th>
            <th className='p-2'>Email</th>
            <th className='p-2'>Practice Number</th>
            <th className='p-2 '>Contact Number</th>
            <th className='p-2 text-center'>Action</th>
          </tr>
        </thead>
        <tbody>
          {doctorQuery?.map((doctor, index) => {
            return (
              <DoctorRow key={doctor?.id} doctor={doctor} index={index} />
            )
          })}
        </tbody>
      </table>
      {/* } */}
    </div>
  )
}
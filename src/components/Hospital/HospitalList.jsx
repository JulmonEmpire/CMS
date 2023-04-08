import { useQuery } from '@tanstack/react-query';
import React from 'react'
import HospitalRow from './HospitalRow';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Utils/firebase';

export default function HospitalList() {
    
  const hospitalQuery = useQuery(["hospital"], async () => {
    let data = []
    const querySnapshot = await getDocs(collection(db, "hospital"));
    querySnapshot.forEach((doc) => {
      let medicalAiddata = doc.data();
      medicalAiddata.id=doc.id;
      data.push(medicalAiddata);
    })
    return data;
  });

  return (
    <div>
    {hospitalQuery.isLoading ? <img className='w-[50px] m-auto mt-10' src='/Loading.svg' /> :
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
          {hospitalQuery?.data?.map((hospital, index) => {
            return (
              <HospitalRow key={hospital?.id} hospital={hospital} index={index} />
            )
          })}
        </tbody>
      </table>
    }
  </div>
  )
}

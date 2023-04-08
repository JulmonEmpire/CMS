import { useQuery } from '@tanstack/react-query';
import { collection, getDocs } from 'firebase/firestore';
import React from 'react'
import { db } from '../Utils/firebase';
import DoctorRow from './DoctorRow';

export default function DoctorList() {

  const doctorQuery = useQuery(["doctor"], async () => {
    let data = []
    const querySnapshot = await getDocs(collection(db, "doctor"));
    querySnapshot.forEach((doc) => {
      let medicalAiddata = doc.data();
      medicalAiddata.id=doc.id;
      data.push(medicalAiddata);
    })
    return data;
  });

  return (
    <div>
    {doctorQuery.isLoading ? <img className='w-[50px] m-auto mt-10' src='/Loading.svg' /> :
      <table className="table-auto w-full mt-4">
        <thead className='bg-gradient-to-r from-[#6C526F] to-[#AE89A5] h-16'>
          <tr className='text-white text-left'>
            <th className='p-2'>#</th>
            <th className='p-2'>First Name</th>
            <th className='p-2'>Last Name</th>
            <th className='p-2'>Email</th>
            <th className='p-2'>Practice Number</th>
            <th className='p-2 '>Contact Number</th>
            <th className='p-2 text-center'>Action</th>
          </tr>
        </thead>
        <tbody>
          {doctorQuery?.data?.map((doctor, index) => {
            return (
              <DoctorRow key={doctor?.id} doctor={doctor} index={index} />
            )
          })}
        </tbody>
      </table>
    }
  </div>
  )
}
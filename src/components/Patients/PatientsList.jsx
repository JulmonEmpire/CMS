import { useQuery } from '@tanstack/react-query';
import { collection, getDocs } from 'firebase/firestore';
import React from 'react'
import { db } from '../Utils/firebase';
import PatientRow from './PatientRow';

export default function PatientsList() {

  const patientQuery = useQuery(["patients"], async () => {
    let data = []
    const querySnapshot = await getDocs(collection(db, "patients"));
    querySnapshot.forEach((doc) => {
      let medicalAiddata = doc.data();
      medicalAiddata.id = doc.id;
      data.push(medicalAiddata);
    })
    return data;
  });


  console.log(patientQuery.data);

  return (
    <div className='h-[75.5vh]'>
    {patientQuery.isLoading ? <img className='w-[50px] m-auto mt-10' src='/Loading.svg' /> :
      <table className="table-auto w-full mt-4">
        <thead className='bg-gradient-to-r from-[#6C526F] to-[#AE89A5] h-16'>
          <tr className='text-white text-left'>
            <td className='p-2'>#</td>
            <th className='p-2'>Last Name</th>
            <th className='p-2'>First Name</th>
            <th className='p-2'>Email</th>
            <th className='p-2'>Gender</th>
            <th className='p-2'>Reffering Dr</th>
            <th className='p-2'>Medical Aid</th>
            <th className='p-2'>Hospital</th>
            <th className='p-2 text-center'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patientQuery?.data?.map((patient, index) => {
            return (
              <PatientRow key={patient?.id} patient={patient} index={index} />
            )
          })}
        </tbody>
      </table>
    }
  </div>
  )
}

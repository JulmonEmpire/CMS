import { useQuery } from '@tanstack/react-query';
import { collection, getDocs } from 'firebase/firestore';
import React from 'react'
import { db } from '../Utils/firebase';
import MedicalAidRow from './MedicalAidRow';

export default function MedicalAidList() {

  const medicalAidQuery = useQuery(["medicalAid"], async () => {
    let data = []
    const querySnapshot = await getDocs(collection(db, "medicalAid"));
    querySnapshot.forEach((doc) => {
      let medicalAiddata = doc.data();
      console.log(doc.id);
      medicalAiddata.id = doc.id;
      data.push(medicalAiddata);
    })
    console.log(data);
    return data;
  });

  return (
    <div>
      {medicalAidQuery.isLoading ? <img className='w-[50px] m-auto mt-10' src='/Loading.svg' /> :
        <table className="table-auto w-full mt-4">
          <thead className='bg-gradient-to-r from-[#6C526F] to-[#AE89A5] h-16'>
            <tr className='text-white text-left'>
              <td className='p-2'>#</td>
              <th className='p-2'>Name</th>
              <th className='p-2'>Email</th>
              <th className='p-2'>Contact</th>
              <th className='p-2'>Address</th>
              <th className='p-2 text-center'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {medicalAidQuery?.data?.map((medicalAid, index) => {
              return (
                <MedicalAidRow key={medicalAid?.id} medicalAid={medicalAid} index={index} />
              )
            })}
          </tbody>
        </table>
      }
    </div>
  )
}

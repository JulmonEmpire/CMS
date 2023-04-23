import { useQuery } from '@tanstack/react-query';
import { collection, getDocs } from 'firebase/firestore';
import React, { useState } from 'react'
import { db } from '../Utils/firebase';
import PatientRow from './PatientRow';
import { BiSearchAlt } from 'react-icons/bi';
import { ImCross } from 'react-icons/im';

export default function PatientsList() {
  const [patientData, setPatientData] = useState();

  const patientQuery = useQuery(["patients"], async () => {
    let data = []
    const querySnapshot = await getDocs(collection(db, "patients"));
    querySnapshot.forEach((doc) => {
      let medicalAiddata = doc.data();
      medicalAiddata.id = doc.id;
      data.push(medicalAiddata);
    })
    setPatientData(data);
    return data;
  });

  function searchObjects(text) {
    if (text === "") {
      setPatientData(patientQuery.data);
      return
    }
    const filteredData = patientData.filter((item) => {
      const regex = new RegExp(text, "gi");
      return item.firstName.match(regex) || item.lastName.match(regex) || item.id.match(regex);
    }).sort((a, b) => {
      const regex = new RegExp(text, "gi");
      const aMatch = (a.firstname + " " + a.lastname).match(regex);
      const bMatch = (b.firstname + " " + b.lastname).match(regex);
      return bMatch.length - aMatch.length;
    });
    setPatientData(filteredData);
  }


  const [showSearch, setShowSearch] = useState(false)

  return (
    <div className='h-[75.5vh]'>
      {patientQuery.isLoading ? <img className='w-[50px] m-auto mt-10' src='/Loading.svg' /> :
        <table className="table-auto w-full mt-4">
          <thead className='bg-gradient-to-r from-[#6C526F] to-[#AE89A5] h-16'>
            <tr className='text-white text-left relative'>
              <td className='p-2'>#</td>
              <th className='p-2'>Last Name</th>
              <th className='p-2'>First Name</th>
              <th className='p-2'>Email</th>
              <th className='p-2'>Gender</th>
              <th className='p-2'>Reffering Dr</th>
              <th className='p-2'>Medical Aid</th>
              <th className='p-2'>Places of service</th>
              <th className='p-2 text-center'>Actions</th>
              <th className='text-center text-2xl'>
                <BiSearchAlt onClick={() => setShowSearch(true)} className='cursor-pointer' />
                <div style={showSearch ? { maxWidth: "100%", width: "100%", height: "80%", border: "1px solid #6C526F" } : { height: "80%" }} className='max-w-0 transition-all absolute text-lg top-[10%] right-0'>
                  <input onChange={(e) => { searchObjects(e.target.value) }} style={showSearch ? { maxWidth: "100%", width: "100%" } : {}} className='w-full h-full relative !text-[16px] text-[black] font-[400] outline-none p-2' placeholder='Search...'></input>
                  <ImCross style={showSearch ? {} : { maxWidth: 0 }} onClick={() => setShowSearch(false)} className='text-black absolute top-4 right-3 cursor-pointer' />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {patientData?.map((patient, index) => {
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

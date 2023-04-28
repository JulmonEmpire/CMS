import { useQuery, useQueryClient } from '@tanstack/react-query';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react'
import { db } from '../Utils/firebase';
import PatientRow from './PatientRow';
import { BiSearchAlt } from 'react-icons/bi';
import { ImCross } from 'react-icons/im';

export default function PatientsList() {
  const queryClient = useQueryClient();
  const [patientData, setPatientData] = useState();
  const [staticPatientData, setStaticPatientData] = useState()

  useEffect(() => {
    const unsubscribe = queryClient.getQueryCache().subscribe(() => {
      setPatientData(queryClient.getQueryData(['patients']));
      setStaticPatientData(queryClient.getQueryData(['patients']));
    });

    return () => {
      unsubscribe();
    };

  }, [location.pathname, queryClient])

  const searchRef = useRef();

  function searchObjects(text) {
    searchRef.current = staticPatientData;
    if (text === "") {
      setPatientData(staticPatientData);
      return
    }
    const filteredData = searchRef.current.filter((item) => {
      const regex = new RegExp(text, "gi");
      return item.firstName.match(regex) || item.lastName.match(regex) || item.id.match(regex);
    }).sort((a, b) => {
      const regex = new RegExp(text, "gi");
      const aMatch = (a.firstName + " " + a.lastName).match(regex);
      const bMatch = (b.firstName + " " + b.lastName).match(regex);
      return bMatch?.length - aMatch?.length;
    });
    setPatientData(filteredData);
  }


  const [doctors, setDoctors] = useState();
  const [placesOfService, setPlacesOfService] = useState();
  const [medicalAid, setMedicalAid] = useState();
  useEffect(() => {
    setPatientData(queryClient.getQueryData(['patients']))
    setDoctors(queryClient.getQueryData(['doctor']))
    setPlacesOfService(queryClient.getQueryData(['placesOfService']))
    setMedicalAid(queryClient.getQueryData(['medicalAid']))
  }, [queryClient]);

  function filterPatients(id, type) {
    searchRef.current = staticPatientData;
    if (id === "null") {
      setPatientData(staticPatientData);
      return
    }
    const filteredData = searchRef.current.filter(obj => {
      console.log(obj)
      if (id === obj.placesOfService.id && type === "placesOfService") {
        return obj
      }
      if (id === obj.medicalAidName.id && type === "medicalAid") {
        return obj
      }
      if (id === obj.refferingDoctor.id && type === "doctors") {
        return obj
      }
    }
    );

    setPatientData(filteredData);
  }


  return (
    <div className='h-[75.5vh]'>
      <div className='flex gap-2'>
        <input onChange={(e) => { searchObjects(e.target.value) }} style={{ maxWidth: "30%", width: "50%" }} className='h-[40px] border-[2px] border-[#E5E5E5] relative !text-[16px] text-[black] font-[400] outline-none p-2' placeholder='Search...'></input>
        <div className='flex gap-2'>
          <select onChange={(e) => { filterPatients(e.target.value, "doctors") }} name='refferingDoctor' className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm'>
            <option selected value={"null"}>Referring Doctor</option>
            {doctors?.map((doctor) => {
              return (
                <option value={doctor.id} data-option={JSON.stringify(doctor)}>{doctor?.lastName}</option>
              )
            })}
          </select>
          <select onChange={(e) => { filterPatients(e.target.value, "placesOfService") }} name='placesOfService' className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm '>
            <option selected value={"null"}>Places Of Service</option>
            {placesOfService?.map((place) => {
              return (
                <option value={place.id} data-option={JSON.stringify(place)}>{place?.name}</option>
              )
            })}
          </select>
          <select onChange={(e) => { filterPatients(e.target.value, "medicalAid") }} name='medicalAid' className='outline border-[2px] h-10 p-2 border-[rgba(0,0,0,0.1)] rounded-sm'>
            <option selected value={"null"}>Medical Aid</option>
            {medicalAid?.map((aid) => {
              return (
                <option value={aid.id} data-option={JSON.stringify(aid)}>{aid?.name}</option>
              )
            })}
          </select>
        </div>
      </div>

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
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import StatsCard from '../components/Dashboard/StatsCard'
import { useQueryClient } from '@tanstack/react-query';

export default function Dashboard() {
  const queryClient=useQueryClient();

  const [doctor,setDoctor]=useState();
  const [medicalAid,setMedicalAid]=useState();
  const [placesOfService,setPlacesOfService]=useState();
  const [patient,setPatients]=useState();

  useEffect(() => {
    setMedicalAid(queryClient.getQueryData(['medicalAid']))
    setDoctor(queryClient.getQueryData(['doctor']))
    setPatients(queryClient.getQueryData(['patients']))
    setPlacesOfService(queryClient.getQueryData(['placesOfService']));
  }, [queryClient]);

  console.log({doctor,
    medicalAid,
    placesOfService,
    patient,})

  return (
    <div className='p-4'>
      <div className='flex gap-4'>
        <StatsCard count={doctor.length}/>
        <StatsCard count={medicalAid.length}/>
        <StatsCard count={placesOfService.length}/>
        <StatsCard count={patient.length}/>
      </div>
    </div>
  )
}
import React, { useEffect, useState } from 'react'
import StatsCard from '../components/Dashboard/StatsCard'
import { useQueryClient } from '@tanstack/react-query';

export default function Dashboard() {
  const queryClient=useQueryClient();

  const [doctor,setDoctor]=useState();
  const [medicalAid,setMedicalAid]=useState();
  const [placesOfService,setPlacesOfService]=useState();
  const [patient,setPatients]=useState();
  const [doctorStats,setDoctorStats]=useState();
  const [medicalAidStats,setMedicalAidStats]=useState();
  const [placesOfServiceStats,setPlacesOfServiceStats]=useState();
  const [patientStats,setPatientsStats]=useState();

  function filterByTimeframe() {
    const now = Date.now();
    const oneDayAgo = now - (24 * 60 * 60 * 1000);
    const twoDayAgo = now - (48 * 60 * 60 * 1000);

    const oneWeekAgo = now - (7 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = now - (30 * 24 * 60 * 60 * 1000);

    setMedicalAidStats(queryClient.getQueryData(['medicalAid']).filter((obj) => obj.createdAt >= twoDayAgo && obj.createdAt <= oneDayAgo))
    setDoctorStats(queryClient.getQueryData(['doctor']).filter((obj) => obj.createdAt >= twoDayAgo && obj.createdAt <= oneDayAgo))
    setPatientsStats(queryClient.getQueryData(['patients']).filter((obj) => obj.createdAt >= twoDayAgo && obj.createdAt <= oneDayAgo))
    setPlacesOfServiceStats(queryClient.getQueryData(['placesOfService']).filter((obj) => obj.createdAt >= twoDayAgo && obj.createdAt <= oneDayAgo));

    setMedicalAid(queryClient.getQueryData(['medicalAid']).filter((obj) => obj.createdAt >= oneDayAgo))
    setDoctor(queryClient.getQueryData(['doctor']).filter((obj) => obj.createdAt >= oneDayAgo))
    setPatients(queryClient.getQueryData(['patients']).filter((obj) => obj.createdAt >= oneDayAgo))
    setPlacesOfService(queryClient.getQueryData(['placesOfService']).filter((obj) => obj.createdAt >= oneDayAgo));
  }

  useEffect(() => {
    filterByTimeframe()
  }, [queryClient]);

  return (
    <div className='p-4'>
      <div className='flex gap-4 justify-between'>
        {/* <StatsCard title={"Patients"} count={3} stats={4}/> */}
        <StatsCard title={"Patients"} count={patient?.length || 0} stats={patientStats?.length}/>
        <StatsCard title={"Doctor"} count={doctor?.length || 0} stats={doctorStats?.length}/>
        <StatsCard title={"Medical Aid"} count={medicalAid?.length || 0} stats={medicalAidStats?.length}/>
        <StatsCard title={"Places of Service"} count={placesOfService?.length || 0} stats={placesOfServiceStats?.length}/>
      </div>
    </div>
  )
}
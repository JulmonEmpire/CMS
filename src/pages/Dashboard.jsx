import React, { useEffect, useState } from 'react'
import StatsCard from '../components/Dashboard/StatsCard'
import { useQueryClient } from '@tanstack/react-query';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { countLast24Hours, countLast30Days, countLast7Days, last24Hours, last30Days, last7Days } from '../components/Utils/constant';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
  scales: {
    y: {
      ticks: {
        beginAtZero: true,
        stepSize: 1
      }
    }
  }
};



export default function Dashboard() {
  const queryClient = useQueryClient();

  const [doctor, setDoctor] = useState();
  const [medicalAid, setMedicalAid] = useState();
  const [placesOfService, setPlacesOfService] = useState();
  const [patient, setPatients] = useState();
  const [doctorStats, setDoctorStats] = useState();
  const [medicalAidStats, setMedicalAidStats] = useState();
  const [placesOfServiceStats, setPlacesOfServiceStats] = useState();
  const [patientStats, setPatientsStats] = useState();

  function filterByTimeframe24() {
    const now = Date.now();
    const oneDayAgo = now - (24 * 60 * 60 * 1000);
    const twoDayAgo = now - (48 * 60 * 60 * 1000);

    setMedicalAidStats(queryClient.getQueryData(['medicalAid']).filter((obj) => obj.createdAt >= twoDayAgo && obj.createdAt <= oneDayAgo))
    setDoctorStats(queryClient.getQueryData(['doctor']).filter((obj) => obj.createdAt >= twoDayAgo && obj.createdAt <= oneDayAgo))
    setPatientsStats(queryClient.getQueryData(['patients']).filter((obj) => obj.createdAt >= twoDayAgo && obj.createdAt <= oneDayAgo))
    setPlacesOfServiceStats(queryClient.getQueryData(['placesOfService']).filter((obj) => obj.createdAt >= twoDayAgo && obj.createdAt <= oneDayAgo));

    setMedicalAid(queryClient.getQueryData(['medicalAid']).filter((obj) => obj.createdAt >= oneDayAgo))
    setDoctor(queryClient.getQueryData(['doctor']).filter((obj) => obj.createdAt >= oneDayAgo))
    setPatients(queryClient.getQueryData(['patients']).filter((obj) => obj.createdAt >= oneDayAgo))
    setPlacesOfService(queryClient.getQueryData(['placesOfService']).filter((obj) => obj.createdAt >= oneDayAgo));
  }

  function filterByTimeframe7() {
    const now = Date.now();

    const oneWeekAgo = now - (7 * 24 * 60 * 60 * 1000);
    const twoWeekAgo = now - (14 * 24 * 60 * 60 * 1000);

    setMedicalAidStats(queryClient.getQueryData(['medicalAid']).filter((obj) => obj.createdAt >= twoWeekAgo && obj.createdAt <= oneWeekAgo))
    setDoctorStats(queryClient.getQueryData(['doctor']).filter((obj) => obj.createdAt >= twoWeekAgo && obj.createdAt <= oneWeekAgo))
    setPatientsStats(queryClient.getQueryData(['patients']).filter((obj) => obj.createdAt >= twoWeekAgo && obj.createdAt <= oneWeekAgo))
    setPlacesOfServiceStats(queryClient.getQueryData(['placesOfService']).filter((obj) => obj.createdAt >= twoWeekAgo && obj.createdAt <= oneWeekAgo));

    setMedicalAid(queryClient.getQueryData(['medicalAid']).filter((obj) => obj.createdAt >= oneWeekAgo))
    setDoctor(queryClient.getQueryData(['doctor']).filter((obj) => obj.createdAt >= oneWeekAgo))
    setPatients(queryClient.getQueryData(['patients']).filter((obj) => obj.createdAt >= oneWeekAgo))
    setPlacesOfService(queryClient.getQueryData(['placesOfService']).filter((obj) => obj.createdAt >= oneWeekAgo));
  }

  function filterByTimeframe30() {
    const now = Date.now();
    const oneMonthAgo = now - (30 * 24 * 60 * 60 * 1000);
    const twoMonthAgo = now - (60 * 24 * 60 * 60 * 1000);

    setMedicalAidStats(queryClient.getQueryData(['medicalAid']).filter((obj) => obj.createdAt >= twoMonthAgo && obj.createdAt <= oneMonthAgo))
    setDoctorStats(queryClient.getQueryData(['doctor']).filter((obj) => obj.createdAt >= twoMonthAgo && obj.createdAt <= oneMonthAgo))
    setPatientsStats(queryClient.getQueryData(['patients']).filter((obj) => obj.createdAt >= twoMonthAgo && obj.createdAt <= oneMonthAgo))
    setPlacesOfServiceStats(queryClient.getQueryData(['placesOfService']).filter((obj) => obj.createdAt >= twoMonthAgo && obj.createdAt <= oneMonthAgo));

    setMedicalAid(queryClient.getQueryData(['medicalAid']).filter((obj) => obj.createdAt >= oneMonthAgo))
    setDoctor(queryClient.getQueryData(['doctor']).filter((obj) => obj.createdAt >= oneMonthAgo))
    setPatients(queryClient.getQueryData(['patients']).filter((obj) => obj.createdAt >= oneMonthAgo))
    setPlacesOfService(queryClient.getQueryData(['placesOfService']).filter((obj) => obj.createdAt >= oneMonthAgo));
  }

  useEffect(() => {
    filterByTimeframe24();
  }, [queryClient]);

  const onChangeHandler = (e) => {
    if (+e.target.value === 24) {
      filterByTimeframe24()
    } else if (+e.target.value === 7) {
      filterByTimeframe7()
    } else if (+e.target.value === 30) {
      filterByTimeframe30()
    }
  }


  const data = {
    // labels: last24Hours(),
    labels: last30Days(),
    datasets: [
      {
        label: 'Dataset 1',
        data: countLast30Days(patient || []),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        // data: [5, 4, 3, 1, 2, 3, 4, 5, 2, 1, 5, 4, , 5, 4, 3, 2, 1, 5, 4, 3, 2, 3, 2, 1,],
        data: countLast30Days(patient || []),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Dataset 3',
        // data: [5, 4, 3, 1, 2, 3, 4, 5, 2, 1, 5, 4, , 5, 4, 3, 2, 1, 5, 4, 3, 2, 3, 2, 1,],
        data: countLast30Days(patient || []),
        backgroundColor: 'rgba(255, 255, 0, 0.5)',
      },
    ],
  };

  return (
    <div className='p-4 flex flex-col'>
      <div className='flex justify-between mb-4  items-center'>
        <h1>Overview</h1>
        <select onChange={onChangeHandler} className='w-[10vw] border-[rgba(0,0,0,0.1)] border-2 p-2'>
          <option selected value={24}>24 Hours</option>
          <option value={7}>7 Days</option>
          <option value={30}>30 Days</option>
        </select>
      </div>
      <div className='flex gap-4 justify-between'>
        {/* <StatsCard title={"Patients"} count={3} stats={4}/> */}
        <StatsCard title={"Patients"} count={patient?.length || 0} stats={patientStats?.length} />
        <StatsCard title={"Doctor"} count={doctor?.length || 0} stats={doctorStats?.length} />
        <StatsCard title={"Medical Aid"} count={medicalAid?.length || 0} stats={medicalAidStats?.length} />
        <StatsCard title={"Places of Service"} count={placesOfService?.length || 0} stats={placesOfServiceStats?.length} />
      </div>
      <div className='max-h-[370px] h-full'>
        <div className='flex justify-between items-center'>
          <h1 className='py-2'>Patients Overview</h1>
          <select onChange={onChangeHandler} className='w-[10vw] border-[rgba(0,0,0,0.1)] border-2 p-2'>
            <option selected value={24}>Gender</option>
            <option value={7}>Age Group</option>
          </select>
        </div>
        <div className='w-full max-h-[310px]'>
          <Bar style={{ height: "350px" }} options={options} data={data} />
        </div>
      </div>
    </div>
  )
}
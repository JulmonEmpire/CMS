import React from 'react'

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
import { countLast24Hours, countLast24HoursGender, countLast30Days, countLast30DaysGender, countLast7Days, countLast7DaysGender, last24Hours, last30Days, last7Days } from '../Utils/constant';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
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

export default function GenderBar({date,patient}) {

  const data = {
    labels: date === 24 ? last24Hours() : date === 7 ? last7Days() : last30Days(),
    datasets: [
      {
        label: 'Male',
        data: date === 24 ? countLast24HoursGender(patient || [], "Gender", "Male") : date === 7 ? countLast7DaysGender(patient || [], "Gender", "Male") : countLast30DaysGender(patient || [], "Gender", "Male"),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Female',
        data: date === 24 ? countLast24HoursGender(patient || [], "Gender", "Female") : date === 7 ? countLast7DaysGender(patient || [], "Gender", "Female") : countLast30DaysGender(patient || [], "Gender", "Female"),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };
  return (
    <Bar style={{ height: "350px" }} options={options} data={data} />
  )
}

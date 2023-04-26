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
import { countLast24Hours, countLast30Days, countLast7Days, last24Hours, last30Days, last7Days } from '../Utils/constant';

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

export default function SimpleBar({date,patient}) {

  const data = {
    labels: date === 24 ? last24Hours() : date === 7 ? last7Days() : last30Days(),
    datasets: [
      {
        label: 'Patients',
        data: date === 24 ? countLast24Hours(patient || []) : date === 7 ? countLast7Days(patient || []) : countLast30Days(patient || []),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  return (
    <Bar style={{ height: "350px" }} options={options} data={data} />
  )
}

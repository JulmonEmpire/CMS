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
import { last24Hours, last30Days, last7Days, therapyType24hours, therapyTypeLast30Days, therapyTypeLast7Days } from '../Utils/constant';

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

export default function TherapyBar({ date, patient }) {
  const data = {
    labels: date === 24 ? last24Hours() : date === 7 ? last7Days() : last30Days(),
    datasets: [
      {
        label: 'individual therapy',
        data: date === 24 ? therapyType24hours(patient || [], "Age", "Individual") : date === 7 ? therapyTypeLast7Days(patient || [], "Age", "Individual") : therapyTypeLast30Days(patient || [], "Age", "Individual"),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'couple therapy',
        data: date === 24 ? therapyType24hours(patient || [], "Age", "Couple") : date === 7 ? therapyTypeLast7Days(patient || [], "Age", "Couple") : therapyTypeLast30Days(patient || [], "Age", "Couple"),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Child therapy',
        data: date === 24 ? therapyType24hours(patient || [], "Age", "Child") : date === 7 ? therapyTypeLast7Days(patient || [], "Age", "Child") : therapyTypeLast30Days(patient || [], "Age", "Child"),
        backgroundColor: 'rgba(255, 255, 0, 0.5)',
      },
      {
        label: 'family therapy',
        data: date === 24 ? therapyType24hours(patient || [], "Age", "Family") : date === 7 ? therapyTypeLast7Days(patient || [], "Age", "Family") : therapyTypeLast30Days(patient || [], "Age", "Family"),
        backgroundColor: 'rgba(255, 255, 0, 0.5)',
      },
      {
        label: 'group therapy',
        data: date === 24 ? therapyType24hours(patient || [], "Age", "Group") : date === 7 ? therapyTypeLast7Days(patient || [], "Age", "Group") : therapyTypeLast30Days(patient || [], "Age", "Group"),
        backgroundColor: 'rgba(255, 255, 0, 0.5)',
      },
    ],
  };
  return (
    <Bar style={{ height: "350px" }} options={options} data={data} />
  )
}
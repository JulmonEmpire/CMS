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
import { countLast24Hours, countLast24HoursAge, countLast30Days, countLast30DaysAge, countLast7Days, countLast7DaysAge, last24Hours, last30Days, last7Days } from '../Utils/constant';

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

export default function AgeBar({ date, patient }) {

  const data = {
    labels: date === 24 ? last24Hours() : date === 7 ? last7Days() : last30Days(),
    datasets: [
      {
        label: 'Children',
        data: date === 24 ? countLast24HoursAge(patient || [], "Age", "Child") : date === 7 ? countLast7DaysAge(patient || [], "Age", "Child") : countLast30DaysAge(patient || [], "Age", "Child"),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Adolescents',
        data: date === 24 ? countLast24HoursAge(patient || [], "Age", "Adult") : date === 7 ? countLast7DaysAge(patient || [], "Age", "Adult") : countLast30DaysAge(patient || [], "Age", "Adult"),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Adults',
        data: date === 24 ? countLast24HoursAge(patient || [], "Age", "Elderly") : date === 7 ? countLast7DaysAge(patient || [], "Age", "Elderly") : countLast30DaysAge(patient || [], "Age", "Elderly"),
        backgroundColor: 'rgba(255, 255, 0, 0.5)',
      },
    ],
  };
  return (
    <Bar style={{ height: "350px" }} options={options} data={data} />
  )
}

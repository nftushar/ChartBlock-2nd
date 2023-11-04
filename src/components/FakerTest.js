import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
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
};

const labels = ['Label 1', 'Label 2'];

const sampleData = [
  { label: 'Label 1', value: 26 },
  { label: 'Label 2', value: 34 },
];

const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: sampleData.map((data) => data.value),
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

function CustomDataTest() {
  return <Bar options={options} data={data} />;
}

export default CustomDataTest;

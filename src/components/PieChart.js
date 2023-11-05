import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, RadialLinearScale, BarElement, Title, Tooltip, Legend, ArcElement, Filler, LineElement, PointElement } from 'chart.js';

import { Pie, Doughnut, PolarArea, Radar, Bar, Line } from 'react-chartjs-2';
import useFileData from '../hooks/useFileData';

ChartJS.register(CategoryScale, RadialLinearScale, BarElement, LinearScale, ArcElement, LineElement, PointElement, Tooltip, Legend, Title, Legend, Filler);

const PieChart = ({ type, data }) => {
  const ChartType = getChartType(type);

  return (
    <div className="wp-block-b-blocks-pie-chart">
      <div className="dataChart revenueChart">
        {ChartType && <ChartType data={data} />}
      </div>
    </div>
  );
};

const ChartComponent = ({ attributes, setAttributes }) => {
  const { file, chart } = attributes;
  const { border, type, radius, backgroundColor, borderColor } = chart;

  const sampleData = [
    { label: 'Label 1', value: 26 },
    { label: 'Label 2', value: 34 },
  ];

  let { data } = useFileData(file);

  data = data.length ? data : sampleData;

  let labels, values;

  if (Array.isArray(data) && data.length > 0 && data.every((data) => data && data.label && data.value)) {
    labels = data.map((data) => data.label);
    values = data.map((data) => data.value);
    // console.log(labels);
  } else {
    console.error('Unsupported data type or empty/invalid JSON data.');
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom"
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart"
      }
    }
  };


  const chartData = {
    labels,
    datasets: [
      {
        label: labels,
        data: values,
        backgroundColor: backgroundColor || getDefaultBackgroundColor(),
        borderColor: borderColor || getDefaultBorderColor(),
        borderWidth: border,
        borderRadius: radius,

        
        // color: "#1165ed",  
         // fillColor: "rgba(255, 89, 114, 0.6)",
        // strokeColor: "rgba(51, 51, 51, 1)",
        // pointColor: "rgba(255, 89, 114, 1)",
        // pointStrokeColor: "#fff",
        // pointHighlightFill: "#fff",
        // pointHighlightStroke: "rgba(151,187,205,1)",
        // maintainAspectRatio: false,



      },
    ],

  };

  return <PieChart type={type} data={chartData} options={options} />;
};

export default ChartComponent;


function getDefaultBackgroundColor() {
  return [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)',
  ];
}

function getDefaultBorderColor() {
  return [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
  ];
}

function getChartType(type) {
  switch (type) {
    case 'Bar':
      return Bar;
    case 'Line':
      return Line;
    case 'PolarArea':
      return PolarArea;
    case 'Doughnut':
      return Doughnut;
    case 'Pie':
      return Pie;
    case 'Radar':
      return Radar;
    default:
      return null;
  }
}

// import React from 'react';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
// import { Bar } from 'react-chartjs-2';
// import faker from 'faker';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// function FakerChart(attributes) {

//     const { jsonData, chart, csvData, xmlData } = attributes;
//     const { border } = chart;
//     const { color, width, radius } = border;


//     let labels, values;

//     const options = {

//         elements: {
//             bar: {
//                 borderWidth: width
//             },
//         },
//         plugins: {
//             title: {
//                 display: true,
//                 text: 'Chart js Pie Chart',
//             },
//             responsive: true,
//             scales: {
//                 x: {
//                     stacked: true,
//                 },
//                 y: {
//                     stacked: true,
//                 },
//             },
//             legend: {
//                 position: 'top',
//             },
//         },
//     };

//         labels = jsonData.map((data) => data.label);


//     const data = {
//         labels,
//         datasets: [
//             {
//                 labels: 'Dataset 1',
//                 data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//                 borderColor: 'rgb(255, 99, 132)',
//                 backgroundColor: 'rgba(255, 99, 132, 0.5)',
//             },
//             {
//                 label: 'Dataset 2',
//                 data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),

//                 borderColor: 'rgb(53, 162, 235)',
//                 backgroundColor: 'rgba(53, 162, 235, 0.5)',
//             },
//         ],
//     };





//     return <Bar options={options} data={data} />;
// }

// export default FakerChart;
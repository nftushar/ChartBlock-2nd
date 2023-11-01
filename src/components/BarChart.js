import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { Pie, Doughnut, PolarArea, Radar, Bar } from 'react-chartjs-2';

ChartJS.register( Tooltip, Legend, CategoryScale, LinearScale, Title, Tooltip, Legend);







const BarChart = ({ type, data }) => {
  const ChartType =
    type === 'Doughnut' ? Doughnut :
      type === 'PolarArea' ? PolarArea :
        type === 'Radar' ? Radar :
          type === 'Pie' ? Pie :
            type === 'Bar' ? Bar : null;

  return (
    <div className="bBlocksBarChart">
      <div className="dataChart revenueChart">
        {ChartType && <ChartType data={data} />}
      </div>
    </div>
  );
};

const ChartComponent = ({ attributes, setAttributes }) => {
  const { jsonData, chart, csvData, xmlData } = attributes;
  const { border, type, radius } = chart;

  let labels, values;

  if (
    Array.isArray(jsonData) && jsonData.length > 0 && jsonData.every((data) => data && data.label && data.value)
  ) {
    labels = jsonData.map((data) => data.label);
    values = jsonData.map((data) => data.value);
  } else if (
    Array.isArray(xmlData) && xmlData.length > 0 && xmlData.every((data) => data && data.label && data.value)
  ) {
    labels = xmlData.map((data) => data.label);
    values = xmlData.map((data) => data.value);
  } else if (
    Array.isArray(csvData) && csvData.length > 0 && csvData.every((data) => data && data.label && data.value)
  ) {
    labels = csvData.map((data) => data.label);
    values = csvData.map((data) => (data.value ? data.value.replace(/\r/g, '').trim() : ''));
  } else {
    console.error('Unsupported data type or empty/invalid JSON data.');
    console.log('jsonData error:', jsonData);
    console.log('xmlData error:', xmlData);
    console.log('csvData error:', csvData);
    return null;
  }

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: '# of Votes',
        data: values,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],

        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: border,
        borderRadius: radius,
      },
    ],
    responsive: true, // Move this property outside datasets
  };

  return <BarChart type={type} data={chartData} />;
};

export default ChartComponent;

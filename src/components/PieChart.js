import { Chart as ChartJS, CategoryScale, LinearScale, RadialLinearScale,BarElement, Title, Tooltip, Legend, ArcElement, Filler, LineElement, PointElement } from 'chart.js';
import { Pie, Doughnut, PolarArea, Radar, Bar } from 'react-chartjs-2';
import useFileData from '../hooks/useFileData';

ChartJS.register(CategoryScale, RadialLinearScale, BarElement, LinearScale, ArcElement, LineElement, PointElement, Tooltip, Legend, Title, Legend, Filler,);



const PieChart = ({ type, data }) => {
  const ChartType =
    type === 'Bar' ? Bar :
      type === 'PolarArea' ? PolarArea :
        type === 'Doughnut' ? Doughnut :
          type === 'Pie' ? Pie :
            type === 'Radar' ? Radar : null;

  return (
    <div className="wp-block-b-blocks-pie-chart">
      <div className="dataChart revenueChart">
        {ChartType && <ChartType data={data} />}
      </div>
    </div>
  );
};

const ChartComponent = ({ attributes }) => {
  const { file, chart } = attributes;
  const { border, type, radius } = chart;

  const sampleData = [
    { label: 'Label 1', value: 26 },
    { label: 'Label 2', value: 34 },
  ]

  let { data } = useFileData(file);

  data = data.length ? data : sampleData;

  let labels, values;

  if (Array.isArray(data) && data.length > 0 && data.every((data) => data && data.label && data.value)) {

    labels = data.map((data) => data.label);
    values = data.map((data) => data.value);

  } else {
    // eslint-disable-next-line no-console
    console.error('Unsupported data type or empty/invalid JSON data.');
  }

  const chartData = {
    // eslint-disable-next-line object-shorthand
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

  return <PieChart type={type} data={chartData} />;
};

export default ChartComponent;
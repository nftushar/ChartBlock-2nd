import { Chart as ChartJS, CategoryScale, LinearScale, RadialLinearScale, BarElement, Title, Tooltip, Legend, ArcElement, Filler, LineElement, PointElement } from 'chart.js';
import { Pie, Doughnut, PolarArea, Radar, Bar, Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, RadialLinearScale, BarElement, LinearScale, ArcElement, LineElement, PointElement, Tooltip, Legend, Title, Legend, Filler);

import useChartData from '../hooks/useChartData';

const MyChart = ({ attributes }) => {
    const { chart, chartData, file } = attributes;
    const { type } = chart;

    const { data } = useChartData(file);

    const options = {
        responsive: true,
        // border:
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: 'Chart.js Line Chart',
            },
        },
    };

    // How 
    const { labels = [], datasets = [] } = data;

    const cData = {
        labels,
        datasets: datasets.map((dataset, index) => {
            const { label, data } = dataset;
            const { backgroundColor = [], borderColor = [], tension = 0.4, borderWidth = 2, hoverBorderWidth = 2, pointRadius = 3, pointHoverRadius = 4, pointStyle = 'triangle' } = chartData?.['datasets']?.[index] || {};

            return {
                label,
                data,
                backgroundColor: backgroundColor || ["#ff638433", "#36a28733", "#36a28733"],
                // backgroundColor:   ["#36a287", "#36a28733", "#36a28733"],
                // borderColor: ["#ff6384", "#36a287", "#36a287"],
                borderColor: borderColor || ["#ff6384", "#36a287", "#36a287"],
                tension,
                borderWidth,
                hoverBorderWidth,
                pointRadius,
                pointHoverRadius,
                pointStyle
            }
        })
    };

    return <div className="wp-block-b-blocks-pie-chart">
        <div className="dataChart revenueChart">
            {ChartType && <ChartType type={type} options={options} data={cData} />}
        </div>
    </div>
}
export default MyChart;


const ChartType = ({ type, options, data }) => {
    switch (type) {
        case 'Bar':
            return <Bar options={options} data={data} />;
        case 'Line':
            return <Line options={options} data={data} />;
        case 'PolarArea':
            return <PolarArea options={options} data={data} />;
        case 'Doughnut':
            return <Doughnut options={options} data={data} />;
        case 'Pie':
            return <Pie options={options} data={data} />;
        case 'Radar':
            return <Radar options={options} data={data} />;
        default:
            return null;
    }
}
/* eslint-disable no-console */
import { useState, useEffect } from "react";
import Settings from "./Settings";
import Style from "./Style";
// import FakerTest from './components/FakerTest';
// import PieChart from './components/PieChart';     
import Chart from './components/Chart';
import useFileData from './hooks/useFileData2';
// Pie, Doughnut, PolarArea, Radar


const Edit = (props) => {
  const { className, attributes, setAttributes, clientId, isSelected } = props;
  const { file } = attributes;

  useEffect(() => {
    clientId && setAttributes({ cId: clientId });
  }, [clientId, setAttributes]);

  const { fetchData } = useFileData(file);
  const [data, setData] = useState({
    labels: ['First', 'Second'],
    datasets: [
      {
        label: 'Data 1',
        data: [26, 34]
      },
      {
        label: 'Data 2',
        data: [22, 18]
      }
    ]
  });

  useEffect(() => {
    fetchData(file)
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [file]);

  return <>
    <Settings attributes={attributes} setAttributes={setAttributes} data={data} />

    <div className={className} id={`bBlocksPieChart-${clientId}`}>
      {!isSelected && <div className="mouse"></div>}
      <Style attributes={attributes} clientId={clientId} />

      <div className='bBlocksPieChart'>

        <Chart attributes={attributes} data={data} />
      </div>
      {/* <PieChart attributes={attributes} />   */}
      {/* <FakerTest attributes={attributes} /> */}
      {/* <BarChart attributes={attributes} /> */}

      {/* Pie, Doughnut, PolarArea, Radar */}
    </div>
  </>;
};

export default Edit;
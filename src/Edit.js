/* eslint-disable no-console */
import { useState, useEffect } from "react";
import Settings from "./Settings";
import Style from "./Style";
// import FakerTest from './components/FakerTest';
// import PieChart from './components/PieChart';     
import Chart from './components/Chart';
import useChartData from './hooks/useChartData';
// Pie, Doughnut, PolarArea, Radar


const Edit = (props) => {
  const { className, attributes, setAttributes, clientId, isSelected } = props;
  const { file } = attributes;

  useEffect(() => {
    clientId && setAttributes({ cId: clientId });
  }, [clientId, setAttributes]);

  const { data } = useChartData(file);

  return <>
    <Settings attributes={attributes} setAttributes={setAttributes} data={data} />

    <div className={className} id={`wp-block-b-blocks-pie-chart-${clientId}`}>
      {!isSelected && <div className="mouse"></div>}
      <Style attributes={attributes} clientId={clientId} />
      <Chart attributes={attributes} data={data} />
    </div>
  </>;
};

export default Edit;
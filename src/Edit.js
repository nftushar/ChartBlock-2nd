import React, { useEffect } from "react";
import Settings from "./Settings";
import Style from "./Style";        
import PieChart from './components/PieChart'
// import FakerChart from './components/FakerChart';
// Pie, Doughnut, PolarArea, Radar


const Edit = (props) => {
  const { className, attributes, setAttributes, clientId, isSelected } = props;
  const { chart } = attributes;
  // console.log(attributes);

  useEffect(() => {
    clientId && setAttributes({ cId: clientId });
  }, [clientId, setAttributes]);

  // function updateChart(index, property, value) {
  //   const newCharts = [...chart];
  //   newCharts[index][property] = value;
  //   setAttributes({ cards: newCharts });
  // }


  return <>
    <Settings attributes={attributes} setAttributes={setAttributes} />

    <div className={className} id={`wp-block-b-blocks-pie-chart-${clientId}`}>
      {!isSelected && <div className="mouse"></div>}
      <Style attributes={attributes} clientId={clientId} />
      <PieChart attributes={attributes} />  
      {/* <BarChart attributes={attributes} /> */}

      {/* Pie, Doughnut, PolarArea, Radar */}
    </div>
  </>;
};

export default Edit;
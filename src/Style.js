import { getTypoCSS } from "../../Components/utils/getCSS";
import { getBoxValue } from "../../Components/utils/functions";

const Style = ({ attributes, clientId }) => {
  const { chart, textTypo, textColor, padding } = attributes;
  const { chartWidth, chartHeight, background } = chart; 

  const chartId = `#wp-block-b-blocks-pie-chart-${clientId}`;
  const chartSl = `${chartId} .wp-block-b-blocks-pie-chart .dataChart canvas`;


  return <style dangerouslySetInnerHTML={{
    __html: ` ${getTypoCSS(``, textTypo)?.googleFontLink}
        ${getTypoCSS(`${chartSl} .chartPrefix`, textTypo)?.styles}

          ${chartId} { 
            display:flex; 
            justify-content: center;  
          }

          ${chartSl}{
            height: ${chartHeight} !important;
            width: ${chartWidth} !important;
            background-color: ${background}; 
            padding: ${getBoxValue(padding)};
          }
       
    `}}
  />
}
export default Style;
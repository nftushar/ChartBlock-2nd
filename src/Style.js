import { getMultiShadowCSS, getTypoCSS } from "../../Components/utils/getCSS";
import { getArrFromNum } from "./utils/functions";

const Style = ({ attributes, clientId }) => {
    const { chart, gap, alignment, textTypo, textColor, textShadow } = attributes;
    const { chartWidth, chartHeight } = chart;


    const chartId = `#wp-block-b-blocks-b-chart-${clientId}`;
    const chartSl = `#wp-block-b-blocks-b-chart-${clientId} .wp-block-b-blocks-b-chart .dataChart canvas`;
    const dataSl = `${chartSl} .dataChart canvas`;
    const intAndDec = (chart + '').split('.');
    const chartInt = parseInt(intAndDec[0]);
    const chartDec = parseInt(intAndDec[1] || 0);

    return <style dangerouslySetInnerHTML={{
        __html: `
        ${getTypoCSS(``, textTypo)?.googleFontLink}
        ${getTypoCSS(`${chartSl} .chartPrefix`, textTypo)?.styles}

          ${chartId} { 
            display:flex; 
            justify-content: center;
               
            color: ${textColor}; 
          }

          ${chartSl}{
            height:  ${chartHeight}px !important;
            width: ${chartWidth}px !important;
          }
       
    `}}
    />
}
export default Style;
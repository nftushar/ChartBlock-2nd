import {getTypoCSS} from "../../Components/utils/getCSS";
const Style = ({ attributes, clientId }) => {
    const { chart,textTypo, textColor} = attributes;
    const { chartWidth, chartHeight, backgroundColor } = chart;
    console.log(textColor);

    const chartId = `#wp-block-b-blocks-pie-chart-${clientId}`;
    const chartSl = `#wp-block-b-blocks-pie-chart-${clientId} .wp-block-b-blocks-pie-chart .dataChart canvas`;
    

    return <style dangerouslySetInnerHTML={{
        __html: `
        ${getTypoCSS(``, textTypo)?.googleFontLink}
        ${getTypoCSS(`${chartSl} .chartPrefix`, textTypo)?.styles}

          ${chartId} { 
            display:flex; 
            justify-content: center;  
          }

          ${chartSl}{
            height:  ${chartHeight}px !important;
            width: ${chartWidth}px !important;
            background-color: ${backgroundColor}; 
          }
       
    `}}
    />
}
export default Style;
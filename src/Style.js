import { getTypoCSS } from "../../Components/utils/getCSS";
import { getBoxValue } from "../../Components/utils/functions";

const Style = ({ attributes, clientId }) => {
  const { chart, textTypo, chartAlign, padding } = attributes;
  const { width, height, background } = chart;
  // wp-block-b-blocks-pie-chart-b74a970e-0322-4b7e-9f34-4f892dc69021
  const mainSl = `#wp-block-b-blocks-pie-chart-${clientId}`;
  const pieChartSl = `${mainSl} .wp-block-b-blocks-pie-chart-`;
  const canvasSl = `${pieChartSl} canvas`;


  return <style dangerouslySetInnerHTML={{
    __html: ` ${getTypoCSS(``, textTypo)?.googleFontLink}
        ${getTypoCSS(`${pieChartSl} .chartPrefix`, textTypo)?.styles}

          ${mainSl} {
            padding: ${getBoxValue(padding)};
            text-align: ${chartAlign}; 
            background-color: ${background};
          }
          ${pieChartSl}{
            width: ${width};
            height : ${height};
          }
          ${canvasSl}{
            background-color: ${background};
          }
    `}}
  />
}
export default Style;
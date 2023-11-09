import { getTypoCSS } from "../../Components/utils/getCSS";
import { getBoxValue } from "../../Components/utils/functions";

const Style = ({ attributes, clientId }) => {
  const { chart, textTypo, chartAlign, padding } = attributes;
  const { width, height, background } = chart;

  const mainSl = `#bBlocksPieChart-${clientId}`;
  const pieChartSl = `${mainSl} .bBlocksPieChart`;
  const canvasSl = `${pieChartSl} canvas`;


  return <style dangerouslySetInnerHTML={{
    __html: ` ${getTypoCSS(``, textTypo)?.googleFontLink}
        ${getTypoCSS(`${pieChartSl} .chartPrefix`, textTypo)?.styles}

          ${mainSl} {
            padding: ${getBoxValue(padding)};
            text-align: ${chartAlign}; 
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
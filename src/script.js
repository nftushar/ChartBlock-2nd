import { createRoot } from 'react-dom';
import "./style.scss";
import Style from "./Style";
import Chart from './components/Chart'; 

document.addEventListener("DOMContentLoaded", () => {
    const chartEls = document.querySelectorAll(".wp-block-b-blocks-pie-chart");
    chartEls.forEach((chartEl) => {
        const attributes = JSON.parse(chartEl.dataset.attributes);
        const { cId } = attributes;

        const root = createRoot(chartEl);

        root.render(
            <>
                <div className="wp-block-b-blocks-pie-chart"
                 id={`wp-block-b-blocks-pie-chart-${cId}`}>
                    <Style attributes={attributes} clientId={cId} />
                    <Chart attributes={attributes} clientId={cId} /> 
                </div>
            </>, chartEl);
        chartEl?.removeAttribute("data-attributes");
    });
});

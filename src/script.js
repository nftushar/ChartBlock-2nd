import { createRoot } from 'react-dom';
import "./style.scss";
import Style from "./Style";
import PieChart from './components/PieChart';

document.addEventListener("DOMContentLoaded", () => {
    const chartEls = document.querySelectorAll(".wp-block-b-blocks-pie-chart");
    chartEls.forEach((chartEl) => {
        const attributes = JSON.parse(chartEl.dataset.attributes);
        const { cId } = attributes;

        const root = createRoot(chartEl);

        root.render(
            <>
                <Style attributes={attributes} clientId={cId} />
                <PieChart attributes={attributes} clientId={cId} />
            </>, chartEl);
        chartEl?.removeAttribute("data-attributes");
    });
});

import { __ } from "@wordpress/i18n";
import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, TabPanel, PanelRow, SelectControl, RangeControl, __experimentalBoxControl as BoxControl, __experimentalNumberControl as NumberControl, __experimentalUnitControl as UnitControl, Tooltip } from "@wordpress/components";
import produce from 'immer';

import { BColor, InlineMediaUpload, Label } from "../../Components";

import useFileData from './hooks/useFileData2';
import { pointStyles } from './utils/options';


const getRandomColor = () => {
  const letters = '0123456789abcdef';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


const Settings = ({ attributes, setAttributes, data }) => {

  const { file, chart, chartData, chartAlign, padding } = attributes;
  // console.log(chartAlign);
  const { type, border, radius, width, height, background, backgroundColor, borderColor, } = chart;

  const { fetchData } = useFileData(file);

  const updateChart = (property, value, index) => {
    const newChart = { ...chart };
    newChart[property][index] = value;
    setAttributes({ chart: newChart });
  };

  const updateChartData = (key, index, val, t = false, i = false) => {
    const newData = produce(chartData, draft => {
      if (false !== t && false !== i) {
        draft[key][index][t][i] = val;
      } else if (false !== t) {
        draft[key][index][t] = val;
      } else {
        draft[key][index] = val;
      }
    });

    setAttributes({ chartData: newData });
  }

  const { labels = [], datasets = [] } = data;

  return (
    <InspectorControls>
      <TabPanel
        className="bPlTabPanel"
        tabs={[
          { name: "general", title: __("General") },
          { name: "style", title: __("Style") },
        ]}
      >
        {(tab) => (
          <>
            {tab.name === "general" && <>
              <PanelBody
                className="bPlPanelBody"
                title={__("Settings", "pie-chart")} >
                <InlineMediaUpload value={file}
                  label={__("Upload File ( JSON, XML, CSV )", "pie-chart")}
                  types={['application/json', 'application/rss+xml', 'text/csv']}
                  onChange={val => {
                    setAttributes({ file: val });

                    fetchData(val).then((data) => {
                      const { labels = [], datasets = [] } = data;

                      const randomColors = datasets.map(() => {
                        const colors = labels.map(() => getRandomColor());

                        return {
                          backgroundColor: colors.map(c => `${c}33`),
                          borderColor: colors
                        }
                      });


                      const newChart = produce(chartData, draft => {
                        randomColors?.map((rc, i) => {
                          const { backgroundColor, borderColor } = rc;

                          draft['datasets'][i]['backgroundColor'] = backgroundColor;
                          draft['datasets'][i]['borderColor'] = borderColor;
                        });
                      });
                      setAttributes({ chartData: newChart });
                    }).catch((error) => {
                      // eslint-disable-next-line no-console
                      console.error(error);
                    });
                  }} />

                <SelectControl
                  className="mt20"
                  label={__("Chart Type", "pie-chart")}
                  labelPosition="left"
                  value={type}
                  options={[
                    { label: "Bar", value: "Bar" },
                    { label: "Line", value: "Line" },
                    { label: "Pie", value: "Pie" },
                    { label: "Doughnut", value: "Doughnut" },
                    { label: "PolarArea", value: "PolarArea" },
                    { label: "Radar", value: "Radar" },
                  ]}
                  onChange={(val) =>
                    setAttributes({
                      chart: { ...chart, type: val },
                    })
                  }
                />
              </PanelBody>


              <PanelBody lassName='bPlPanelBody' title={__('Data', 'pie-chart')} initialOpen={false}>
                {chartData.datasets?.map((dataset, datasetIndex) => {
                  const { backgroundColor, borderColor, borderWidth, pointRadius, pointHoverRadius, pointStyle } = dataset;

                  return <PanelBody key={datasetIndex} className='bPlPanelBody' title={__(`${datasets?.[datasetIndex]?.label}:`, 'pie-chart')} initialOpen={0 !== datasetIndex ? false : true}>
                    {labels.map((label, labelIndex) => <PanelRow key={labelIndex} className='bChartDatasetEdit'>
                      <Label className=''>{__(`${label}:`, 'pie-chart')}</Label>

                      <Tooltip text={__('Background Color', 'pie-chart')} position='top center' delay={300}>
                        <span>
                          <BColor className='mt0' label='' value={backgroundColor[labelIndex]} onChange={val => updateChartData('datasets', datasetIndex, val, 'backgroundColor', labelIndex)} />
                        </span>
                      </Tooltip>

                      <Tooltip text={__('Border Color', 'pie-chart')} position='top center' delay={300}>
                        <span style={{ marginLeft: '20px' }}>
                          <BColor className='mt0' label='' value={borderColor[labelIndex]} onChange={val => updateChartData('datasets', datasetIndex, val, 'borderColor', labelIndex)} />
                        </span>
                      </Tooltip>
                    </PanelRow>
                    )}

                    <NumberControl className='mt20' label={__('Border Width:')} labelPosition='left' value={borderWidth} onChange={val => {
                      const newChart = produce(chartData, draft => {
                        draft['datasets'][datasetIndex]['borderWidth'] = parseFloat(val);
                        draft['datasets'][datasetIndex]['hoverBorderWidth'] = parseFloat(val);
                      });
                      setAttributes({ chartData: newChart });
                    }} />

                    {['Line', 'Radar'].includes(type) && <>
                      <NumberControl className='mt15' label={__('Point Size:')} labelPosition='left' value={pointRadius} onChange={val => updateChartData('datasets', datasetIndex, parseFloat(val), 'pointRadius')} />

                      <NumberControl className='mt15' label={__('Point Hover Size:')} labelPosition='left' value={pointHoverRadius} onChange={val => updateChartData('datasets', datasetIndex, parseFloat(val), 'pointHoverRadius')} />
                    </>}

                    <PanelRow className='mt10'>
                      <Label className=''>{__('Point Style:', 'pie-chart')}</Label>
                      <SelectControl value={pointStyle} onChange={val => updateChartData('datasets', datasetIndex, val, 'pointStyle')} options={pointStyles} />
                    </PanelRow>
                  </PanelBody>
                })}
              </PanelBody>
            </>}

            {tab.name === "style" && <>
              <PanelBody
                className="bPlPanelBody"
                title={__("Chart", "pie-chart")}
              >
                <UnitControl
                  label={__("Width", "pie-chart")}
                  labelPosition='left'
                  value={width}
                  onChange={(val) =>
                    setAttributes({
                      chart: { ...chart, width: val },
                    })
                  }
                />
                <UnitControl
                  className="mt20"
                  label={__("Height", "pie-chart")}
                  labelPosition='left'
                  value={height}
                  onChange={(val) =>
                    setAttributes({
                      chart: { ...chart, height: val },
                    })
                  }
                />

                <BColor className='mt20 mb20' label={__('Background Color', 'pie-chart')}
                  value={background}
                  onChange={(val) =>
                    setAttributes({
                      chart: { ...chart, background: val },
                    })
                  } defaultColor='#0000' />
                <SelectControl
                  label={__("Alignment", "info-cards")}
                  labelPosition="left"
                  value={chartAlign}
                  onChange={(val) => setAttributes({ chartAlign: val })}
                  options={[
                    { label: "Left", value: "left" },
                    { label: "Center", value: "center" },
                    { label: "Right", value: "right" },
                  ]}
                />
                <BoxControl
                  label={__("Padding", "pie-chart")}
                  values={padding}
                  resetValues={{
                    "top": "0px",
                    "right": "0x",
                    "bottom": "0px",
                    "left": "0px"
                  }}
                  onChange={(value) => setAttributes({ padding: value })} />

                <RangeControl
                  className="mt20"
                  label={__("Border (px):", "pie-chart")}
                  value={border}
                  onChange={(val) =>
                    setAttributes({ chart: { ...chart, border: val }, })
                  }
                  defaults={{ radius: "5px" }}
                  min={0}
                  max={50}
                />

                <RangeControl
                  className="mt20"
                  label="Border Radius (px):"
                  value={radius}
                  onChange={(val) =>
                    setAttributes({
                      chart: { ...chart, radius: val },
                    })
                  }
                  min={0}
                  max={100}
                />
              </PanelBody>
              <PanelBody className="bPlPanelBody" title={__('Data Colors', 'pie-chart')} initialOpen={false}>
                {datasets && Array.isArray(datasets) && datasets.map((color, index) => (
                  <PanelBody
                    key={index}
                    className="bPlPanelBody"
                    title={`Data ${index + 1}`}
                    initialOpen={false}
                  >
                    <BColor
                      key={index}
                      label={`Background Color`}
                      value={backgroundColor && Array.isArray(backgroundColor) ? backgroundColor[index] : ""}
                      onChange={(val) => updateChart("backgroundColor", val, index)}
                    />
                    <BColor
                      key={index}
                      label={`Border Color`}
                      value={borderColor && Array.isArray(borderColor) ? borderColor[index] : ""}
                      onChange={(val) => updateChart("borderColor", val, index)}
                    />
                  </PanelBody>
                ))}

              </PanelBody>

            </>}
          </>
        )}
      </TabPanel>
    </InspectorControls >
  );

};

export default Settings;

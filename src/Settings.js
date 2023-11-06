import { __ } from "@wordpress/i18n";
import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, TabPanel, SelectControl, RangeControl, __experimentalNumberControl as NumberControl, __experimentalBoxControl as BoxControl, __experimentalUnitControl as UnitControl } from "@wordpress/components";
import { BColor, InlineMediaUpload } from "../../Components";
import useFileData from './hooks/useFileData';




const getRandomColor = () => {
  const letters = '0123456789abcdef';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getDefaultBackgroundColor() {
  return [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)',
  ];
}

function getDefaultBorderColor() {
  return [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
  ];
}



const Settings = ({ attributes, setAttributes }) => {

  const { file, chart, padding } = attributes;
  const { type, border, radius, chartWidth, chartHeight, background, backgroundColor, borderColor, } = chart;

  const { fetchData } = useFileData(file);

  let { data } = useFileData(file);

  const updateChart = (property, value, index) => {
    const newChart = { ...chart };
    newChart[property][index] = value;
    setAttributes({ chart: newChart });
  };



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
            {tab.name === "general" && (
              <PanelBody
                className="bPlPanelBody"
                title={__("Settings", "pie-chart")} >

                <InlineMediaUpload value={file}
                  label={__("Upload File ( JSON, XML, CSV )", "pie-chart")}
                  types={['application/json', 'application/rss+xml', 'text/csv']}
                  onChange={val => {
                    setAttributes({ file: val })
                    fetchData(val).then((data) => {
                      setAttributes(data);
                      const generatedColors = data.map(() => getRandomColor());

                      setAttributes({ chart: { ...chart, backgroundColor: generatedColors.map(c => `${c}33`), borderColor: generatedColors } });
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
                    // { label: "Chart", value: "Chart" },
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
            )}

            {tab.name === "style" && <>
              <PanelBody
                className="bPlPanelBody"
                title={__("Chart", "pie-chart")}
              >
                <UnitControl
                  label={__("Width", "pie-chart")}
                  labelPosition='left'
                  value={chartWidth}
                  onChange={(val) =>
                    setAttributes({
                      chart: { ...chart, chartWidth: val },
                    })
                  }
                />
                <UnitControl
                  className="mt20"
                  label={__("Height", "pie-chart")}
                  labelPosition='left'
                  value={chartHeight}
                  onChange={(val) =>
                    setAttributes({
                      chart: { ...chart, chartHeight: val },
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

                <BoxControl
                  label={__("Padding", "pie-chart")}
                  values={padding}
                  resetValues={{
                    "top": "0px",
                    "right": "0px",
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
                {data.length > 0 ? (
                  data.map((color, index) => (
                    <PanelBody
                      key={index}
                      className="bPlPanelBody"
                      title={`Data ${index + 1}`}
                      initialOpen={false}
                    >
                      <BColor
                        key={index}
                        label={`Background Color`}
                        value={backgroundColor[index]}
                        onChange={(val) => updateChart("backgroundColor", val, index)}
                      />
                      <BColor
                        key={index}
                        label={`Border Color`}
                        value={borderColor[index]}
                        onChange={(val) => updateChart("borderColor", val, index)}
                      />
                    </PanelBody>
                  ))
                ) : (
                  // Render default colors when data is empty
                  <>
                    <BColor
                      label={`Background Color`}
                      value={getDefaultBackgroundColor()}
                      onChange={(val) => updateChart("backgroundColor", val, 0)}
                    />
                    <BColor
                      label={`Border Color`}
                      value={getDefaultBorderColor()}
                      onChange={(val) => updateChart("borderColor", val, 0)}
                    />
                  </>
                )}
              </PanelBody>


            </>}
          </>
        )}
      </TabPanel>
    </InspectorControls >
  );

};

export default Settings;

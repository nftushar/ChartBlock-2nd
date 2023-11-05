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


const Settings = ({ attributes, setAttributes }) => {

  const { file, chart, padding } = attributes;
  // console.log(padding);
  const { type, border, radius, chartWidth, chartHeight, background, backgroundColor, borderColor, } = chart;

  const { fetchData } = useFileData(file);

  let { data } = useFileData(file);
  // console.log(data);

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
                title={__("Chart Settings", "pie-chart")} >
                <>

                  <InlineMediaUpload value={file} types={['application/json', 'application/rss+xml', 'text/csv']} onChange={val => {
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

                </>
              </PanelBody>
            )}

            {tab.name === "style" && (
              <PanelBody
                className="bPlPanelBody"
                title={__("Chart Style", "pie-chart")}
              >
                <BoxControl
                  label={__("Padding", "info-cards")}
                  values={padding}
                  resetValues={{
                    "top": "0px",
                    "right": "0x",
                    "bottom": "0px",
                    "left": "0px"
                  }}
                  onChange={(value) => setAttributes({ padding: value })} />
                <UnitControl
                  className="mt20"
                  label={__("Chart Board Width", "pie-chart")}
                  value={chartWidth}
                  onChange={(val) =>
                    setAttributes({
                      chart: { ...chart, chartWidth: val },
                    })
                  }
                />
                <UnitControl
                  className="mt20"
                  label={__("Chart Height", "pie-chart")}
                  value={chartHeight}
                  onChange={(val) =>
                    setAttributes({
                      chart: { ...chart, chartHeight: val },
                    })
                  }
                />

                <RangeControl
                  label={__("Border:", "pie-chart")}
                  className="mt20"
                  value={border}
                  onChange={(val) =>
                    setAttributes({ chart: { ...chart, border: val }, })
                  }
                  defaults={{ radius: "5px" }}
                  min={0}
                  max={10}
                  help={__("Add Chart Border in PX.", "pie-chart")}
                />

                <RangeControl
                  label="Border Radius"
                  value={radius}
                  onChange={(val) =>
                    setAttributes({
                      chart: { ...chart, radius: val },
                    })
                  }
                  min={0}
                  max={50}
                />
                <BColor label={__('Background Color', 'pie-chart')}
                  value={background}
                  onChange={(val) =>
                    setAttributes({
                      chart: { ...chart, background: val },
                    })
                  } defaultColor='#0000' />

                <PanelBody label={__('Background Color', 'pie-chart')}>
                  {data.map((color, index) => (
                    <PanelBody
                      key={index}
                      className="bPlPanelBody"
                      title={`This is Chart ${index + 1}`}
                      initialOpen={false}
                    >
                      <BColor
                        key={index}
                        label={`Chart Color ${index + 1}`}
                        value={backgroundColor[index]}
                        onChange={(val) => updateChart("backgroundColor", val, index)}
                      />
                      <BColor
                        key={index}
                        label={`Chart border Color ${index + 1}`}
                        value={borderColor[index]}
                        onChange={(val) => updateChart("borderColor", val, index)}
                      />
                    </PanelBody>
                  ))}
                </PanelBody>



              </PanelBody>
            )}
          </>
        )}
      </TabPanel>
    </InspectorControls >
  );

};

export default Settings;

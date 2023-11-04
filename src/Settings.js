import { __ } from "@wordpress/i18n";
import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, TabPanel, SelectControl, RangeControl, __experimentalNumberControl as NumberControl } from "@wordpress/components";
import { BColor, InlineMediaUpload } from "../../Components";
import useFileData from './hooks/useFileData';



const Settings = ({ attributes, setAttributes }) => {

  const { file, chart } = attributes;

  const { type, border, radius, chartWidth, chartHeight, backgroundColor, bgColor } = chart;

  const { fetchData } = useFileData(file);



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
                <>

                  <InlineMediaUpload value={file} types={['application/json', 'application/rss+xml', 'text/csv']} onChange={val => {
                    setAttributes({ file: val })
                    fetchData(val).then((data) => {
                      setAttributes(data);
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
                      { label: "Chart", value: "Chart" },
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
                title={__("Title", "pie-chart")}
              >
                <NumberControl
                  className="mt20"
                  label={__("Chart Width")}
                  isShiftStepEnabled={true}
                  value={chartWidth}
                  onChange={(val) =>
                    setAttributes({
                      chart: { ...chart, chartWidth: val },
                    })
                  }
                  shiftStep={2}
                />
                <NumberControl
                  className="mt20"
                  label={__("Chart Height")}
                  isShiftStepEnabled={true}
                  value={chartHeight}
                  onChange={(val) =>
                    setAttributes({
                      chart: { ...chart, chartHeight: val },
                    })
                  }
                  shiftStep={2}
                />
                <RangeControl
                  label={__("Border:", "pie-chart")}
                  className="mt20"
                  value={border}
                  onChange={(val) =>
                    setAttributes({
                      chart: { ...chart, border: val },
                    })
                  }
                  defaults={{ radius: "5px" }}
                  min={0}
                  max={10}
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
                <BColor label={__('Background Color', 'text-domain')}
                  value={backgroundColor}
                  onChange={(val) =>
                    setAttributes({
                      chart: { ...chart, backgroundColor: val },
                    })
                  } defaultColor='#0000' />

                {bgColor.map((color, index) => (
                  <BColor
                    key={index}
                    label={`Chart Background Color ${index + 1}`}
                    value={color}
                    onChange={(val) => updateChart("bgColor", val, index)}
                  />
                ))}

              </PanelBody>
            )}
          </>
        )}
      </TabPanel>
    </InspectorControls>
  );

};

export default Settings;

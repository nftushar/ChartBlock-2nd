import { __ } from "@wordpress/i18n";
import { useState, useEffect } from 'react';
import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, TabPanel, FormFileUpload, SelectControl, RangeControl, __experimentalNumberControl as NumberControl } from "@wordpress/components";
import { BorderControl, BColor, Background, InlineMediaUpload } from "../../Components";
import useFileData from './hooks/useFileData';

 

const Settings = ({ attributes, setAttributes, updateChart }) => {

  const { file, jsonData: existingjsonData, xmlData: existingXmlData, csvData: existingCSVData, chart } = attributes;

  const { type, border, radius, bgColor, chartWidth, chartHeight, backgroundColor } = chart;

  const { fetchData } = useFileData(file);
 
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
                      console.error(error);
                    });
                  }} />
 
                  <SelectControl
                    className="mt20"
                    label={__("Chart Type")}
                    labelPosition="left"
                    value={type}
                    options={[
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
                <BColor label={__('Background Color', 'text-domain')} value={backgroundColor}
                  onChange={(val) =>
                    setAttributes({
                      chart: { ...chart, backgroundColor: val },
                    })
                  } defaultColor='#0000' />
              </PanelBody>
            )}
          </>
        )}
      </TabPanel>
    </InspectorControls>
  );

};

export default Settings;

import { __ } from "@wordpress/i18n";
import React, { useState } from 'react';
import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, TabPanel, FormFileUpload, SelectControl, RangeControl, __experimentalNumberControl as NumberControl } from "@wordpress/components";
import { BorderControl, BColor, Background } from "../../Components";



const readJSONFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target.result);
        resolve(jsonData);
      } catch (error) {
        reject(error);
      }
    };

    reader.readAsText(file);
  });
};

const readXMLFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const xmlData = new DOMParser().parseFromString(e.target.result, 'application/xml');
        const peopleElements = xmlData.querySelector('people');

        if (!peopleElements || peopleElements.children.length === 0) {
          reject('Invalid XML structure: Missing or empty <people> elements');
          return;
        }

        const people = Array.from(peopleElements.children).map((person) => ({
          label: person.querySelector('label')?.textContent,
          value: person.querySelector('value')?.textContent,
        }));
        resolve(people);
      } catch (error) {
        console.error('Error parsing XML:', error);
        reject(error);
      }
    };

    reader.readAsText(file);
  });
};

const readCSVFile = (csv) => {
  const lines = csv.split('\n');
  const result = [];
  const headers = lines[0].split(',');

  for (let i = 1; i < lines.length; i++) {
    const obj = {};
    const currentline = lines[i].split(',');

    for (let j = 0; j < headers.length; j++) {
      const key = headers[j].trim();
      const value = currentline[j].trim();
      obj[key] = value;
    }

    result.push(obj);
  }

  return result;
};



const Settings = ({ attributes, setAttributes, updateChart }) => {

  const { jsonData: existingjsonData, xmlData: existingXmlData, csvData: existingCSVData, chart } = attributes;

  const { type, border, radius, bgColor, chartWidth, chartHeight, backgroundColor } = chart;


  const [jsonData, setJsonData] = useState(null);
  const [xmlData, setXmlData] = useState(null);
  const [csvData, setCsvData] = useState(null);
  // const [chart, setChart] = useState([]); // Initialize chart as an empty array

  const handleFileUpload = async (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      try {
        const fileType = file.type.split('/')[1];

        if (fileType.toLowerCase() === 'json') {
          const jsonData = await readJSONFile(file);
          setJsonData(jsonData);
          setAttributes({ jsonData: jsonData.people, xmlData: [], csvData: [] });
        } else if (fileType.toLowerCase() === 'xml') {
          const xmlData = await readXMLFile(file);
          setXmlData(xmlData);
          setAttributes({ xmlData, jsonData: [], csvData: [] });
        } else if (fileType.toLowerCase() === 'csv') {
          const csvData = readCSVFile(await file.text());
          setCsvData(csvData);
          setAttributes({ csvData, jsonData: [], xmlData: [] });
        } else {
          console.error('Unsupported file format. Please upload a JSON, XML, or CSV file.');
        }
      } catch (error) {
        console.error('Error reading or parsing file:', error);
      }
    }
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
                  <FormFileUpload
                    className="mt20"
                    accept=".json, .xml, .csv"
                    onChange={handleFileUpload}
                  >
                    Upload
                  </FormFileUpload>
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

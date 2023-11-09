import { useEffect, useState } from 'react';
import { getExt } from '../utils/functions'; 


const useFileData = (file) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState([]);

  const fetchData = (file) => {
    return new Promise((resolve, reject) => {
      if (file) {
        const isJson = 'json' === getExt(file);
        const isXml = 'xml' === getExt(file);
        const isCsv = 'csv' === getExt(file);

        fetch(file)
          .then((res) => {
            if (isJson) {
              return res.json();
            } else {
              return res.text();
            }
          })
          .then(async (data) => {
            if (isJson) {
              resolve(data);
            } else if (isXml) {
              const xmlData = new DOMParser().parseFromString(data, 'application/xml');
              const labelsAndDatasets = xmlData.children?.[0]?.children;

              if (labelsAndDatasets?.length !== 2 || labelsAndDatasets === undefined) {
                reject('Invalid XML structure!');
              }

              const labelsEl = labelsAndDatasets[0]?.children;
              const datasetsEl = labelsAndDatasets[1]?.children;

              const labels = labelsEl?.length > 0 ? [].slice.call(labelsEl)?.map(l => l.innerHTML) : [];
              const datasets = datasetsEl?.length > 0 ? [].slice.call(datasetsEl)?.map(d => {
                const label = d.querySelector('label').innerHTML;

                const dataEls = d.querySelectorAll('data');
                const data = [];
                dataEls?.forEach((d, i) => {
                  data[i] = parseInt(d.innerHTML);
                });

                return ({ label, data });
              }) : { label: '', data: [] };

              resolve({ labels, datasets });
            } else if (isCsv) {
              const lines = data.split('\n');

              if (lines?.length < 2 || !lines) {
                reject('Invalid CSV structure!');
              }

              const [labelsStr, ...datasetsArr] = lines;
              const labelsArr = labelsStr?.replace(/["'\s\r]/g, '').split(',');
              // eslint-disable-next-line no-unused-vars
              const [__, ...labels] = labelsArr;

              const datasets = datasetsArr?.length > 0 ? datasetsArr?.map(d => {
                const dataset = d.replace(/["'\s\r]/g, '').split(',');
                const [label, ...data] = dataset;
                return { label, data };
              }) : {};
              resolve({ labels, datasets });
            } else {
              reject('Unsupported file format. Please upload a JSON, XML, or CSV file.');
            }
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        reject('Please Insert a file');
      }
    });
  };

  useEffect(() => {
    fetchData(file)
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        setError(error);
      });
  }, [file]);

  return { data, error, fetchData };
};

export default useFileData;

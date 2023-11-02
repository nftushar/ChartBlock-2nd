import { useEffect, useState } from 'react';

import { getExt, readCSVFile } from '../utils/functions';

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
                            const children = xmlData.children?.[0]?.children;

                            if (children?.length === 0 || children === undefined) {
                                reject('Invalid XML structure: Missing or empty <people> elements');
                            }

                            const newData = [];
                            children?.length > 0 &&
                                [].slice.call(children)?.map((c, i) => {
                                    const label = c.querySelector('label').innerHTML;
                                    const value = c.querySelector('value').innerHTML;

                                    newData[i] = { label, value };
                                });

                            resolve(newData);
                        } else if (isCsv) {
                            const csvData = readCSVFile(data);
                            resolve(csvData);
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
        fetchData(file).then((data) => {
            setData(data)
        }).catch((error) => {
            setError(error)
        });
    }, [file])

    return { data, error, fetchData }
}
export default useFileData;
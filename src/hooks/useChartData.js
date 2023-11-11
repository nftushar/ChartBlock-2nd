import { useState, useEffect } from "react";
import useFileData from './useFileData';

const useChartData = (file) => {
  const { fetchData } = useFileData(file);
  const [data, setData] = useState({
    labels: ['First', 'Second'],
    datasets: [
      {
        label: 'Data 1',
        data: [26, 34]
      },
      {
        label: 'Data 2',
        data: [22, 18]
      }
    ]
  });

  useEffect(() => {
    fetchData(file)
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [file]);

  return { data };
};

export default useChartData;

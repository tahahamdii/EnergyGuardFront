import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';
import moment from 'moment';

interface EnergyProdData {
  date: Date;
  energie: number;
  poids: number;
  duree: number;
  // Add other properties as needed
}

const prepareHighchartsOptions = (data: EnergyProdData[]) => {
  // Format your data as needed for Highcharts
  const formattedData = data.map(entry => ({
    name: moment(entry.date).format('YYYY-MM-DD'), // Format date as 'YYYY-MM-DD'
    y: entry.energie,
    color: 'blue',
  }));

  return {
    chart: {
      type: 'line',
      accessibility: {
        enabled: false,
      },
    },
    title: {
      text: 'Energy Consumption Over Time',
    },
    xAxis: {
      type: 'datetime',
      title: {
        text: 'Date',
      },
    },
    yAxis: {
      title: {
        text: 'Energie',
      },
    },
    series: [{
      name: 'Energy Consumption',
      data: formattedData,
    }] as Highcharts.SeriesOptionsType[],
  };
};

const EnergyProd: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState<EnergyProdData[]>([]);

  useEffect(() => {
    // Fetch data from MongoDB API
    axios.get('http://localhost:5000/energyProd/getEnergyProd')
      .then(response => {
        setChartData(response.data as EnergyProdData[]);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data from MongoDB:', error);
        setError(error);
        setLoading(false);
      });
  }, []); // Empty dependency array to trigger the effect only on mount

  // Use another useEffect to handle chart initialization after data is fetched
  useEffect(() => {
    if (!loading && chartData.length > 0) {
      // Initialize the chart when data is fetched and component has rendered
      const options = prepareHighchartsOptions(chartData);
      //Highcharts.chart('your-chart-container-id', options);
    }
  }, [loading, chartData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error:</div>;
  }

  return (
    <div className="col-span-12 xl:col-span-8">
      <div className="sm:px-7.5 col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-5">
        {/* Additional content for the card */}
        <h5 className="text-xl font-semibold text-black dark:text-white mb-3">
          Energy Consumption Over Time
        </h5>
        {/* You can add more content here based on your design */}
        <div className="mb-2" id="your-chart-container-id">
          {/* Chart container */}
          <HighchartsReact highcharts={Highcharts} options={prepareHighchartsOptions(chartData)} />
        </div>
        {/* Additional content for the card */}
      </div>
    </div>
  );
};

export default EnergyProd;

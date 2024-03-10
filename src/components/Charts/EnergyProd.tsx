import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';

interface EnergyProdData {
  date: Date;
  energie: number;
  poids: number;
  duree: number;
  // Add other properties as needed
}

const EnergyProdChart: React.FC = () => {
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
  }, []);

  const prepareHighchartsOptions = (data: EnergyProdData[]) => {
    const seriesData = data.map(entry => ({
      name: entry.date?.toString() ?? 'Unknown',
      data: [entry.energie, entry.poids, entry.duree],
    }));

    return {
      chart: {
        type: 'column',
        accessibility: {
          enabled: false, // Set to true if you want accessibility features
        },
      },
      title: {
        text: 'Energy Production Chart',
      },
      xAxis: {
        categories: data.map(entry => entry.date.toString()),
        title: {
          text: 'Date',
        },
      },
      yAxis: [
        {
          title: {
            text: 'Energie',
          },
        },
        {
          title: {
            text: 'Poids',
          },
          opposite: true,
        },
        {
          title: {
            text: 'Duree',
          },
          opposite: true,
        },
      ],
      series: seriesData,
      // Additional Highcharts options...
    };
  };

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
          Energy Production Overview
        </h5>
        {/* You can add more content here based on your design */}
        <div className="mb-2">
          <HighchartsReact highcharts={Highcharts} options={prepareHighchartsOptions(chartData)} />
        </div>
        {/* Additional content for the card */}
      </div>
    </div>
  );
};

export default EnergyProdChart;

import { ApexOptions } from 'apexcharts';
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const options: ApexOptions = {
  legend: {
    show: false,
  },
  colors: ['#FF5733', '#33FF57'], // Adjust colors for real-time monitoring
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    height: 335,
    type: 'line', // Change to line chart for real-time monitoring
    toolbar: {
      show: false,
    },
  },
  stroke: {
    width: [3, 3],
    curve: 'smooth',
  },
  grid: {
    show: true,
    borderColor: '#f0f0f0',
    strokeDashArray: 3,
    position: 'back',
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 0,
  },
  xaxis: {
    type: 'category',
    categories: [], // Real-time data categories
    labels: {
      show: true,
    },
  },
  yaxis: {
    title: {
      style: {
        fontSize: '0px',
      },
    },
    min: 0,
    max: 100,
  },
};

const generateRandomData = () => {
  const data = [];
  for (let i = 0; i < 12; i++) {
    data.push(Math.floor(Math.random() * 100)); // Generate random data between 0 and 100
  }
  return data;
};

const ChartOne: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly'>('daily');
  const [seriesData, setSeriesData] = useState({
    daily: [
      {
        name: 'Power Factor',
        data: generateRandomData(), // Random data for power factor
      },
      {
        name: 'Harmonics',
        data: generateRandomData(), // Random data for harmonics
      },
    ],
    weekly: [
      {
        name: 'Power Factor',
        data: generateRandomData(), // Random data for power factor
      },
      {
        name: 'Harmonics',
        data: generateRandomData(), // Random data for harmonics
      },
    ],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeframe === 'daily') {
        setSeriesData(prevState => ({
          ...prevState,
          daily: [
            {
              name: 'Power Factor',
              data: generateRandomData(),
            },
            {
              name: 'Harmonics',
              data: generateRandomData(),
            },
          ],
        }));
      } else if (timeframe === 'weekly') {
        setSeriesData(prevState => ({
          ...prevState,
          weekly: [
            {
              name: 'Power Factor',
              data: generateRandomData(),
            },
            {
              name: 'Harmonics',
              data: generateRandomData(),
            },
          ],
        }));
      }
    }, 2000); // Update data every 2 seconds

    return () => clearInterval(interval);
  }, [timeframe]);

  const handleTimeframeChange = (newTimeframe: 'daily' | 'weekly') => {
    setTimeframe(newTimeframe);
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        {/* Metrics */}
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-primary">Power Factor</p>
              <p className="text-sm font-medium">Real-time Power Factor</p>
            </div>
          </div>
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-secondary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-secondary">Harmonics</p>
              <p className="text-sm font-medium">Real-time Harmonics</p>
            </div>
          </div>
        </div>
        {/* Timeframe Selector */}
        <div className="flex w-full max-w-45 justify-end">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
            <button
              className={`rounded py-1 px-3 text-xs font-medium text-black ${
                timeframe === 'daily' ? 'bg-white shadow-card' : ''
              }`}
              onClick={() => handleTimeframeChange('daily')}
            >
              Daily
            </button>
            <button
              className={`rounded py-1 px-3 text-xs font-medium text-black ${
                timeframe === 'weekly' ? 'bg-white shadow-card' : ''
              }`}
              onClick={() => handleTimeframeChange('weekly')}
            >
              Weekly
            </button>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={timeframe === 'daily' ? seriesData.daily : seriesData.weekly}
            type="line"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartOne;

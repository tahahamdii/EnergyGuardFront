import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const TauxChargeBar = () => {
  useEffect(() => {
  }, []); 

  const chartOptions = {
    chart: {
      type: 'bar'
    },
    title: {
      text: 'Max charge rate',
      align: 'left'
    },
    subtitle: {
      align: 'left'
    },
    xAxis: {
      categories: ['TGBT 1', 'TGBT 2', 'TGBT 3', 'TGBT 4'],
      title: {
        text: null
      },
      gridLineWidth: 1,
      lineWidth: 0
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Data (Khw)',
        align: 'high'
      },
      labels: {
        overflow: 'justify'
      },
      gridLineWidth: 0
    },
    tooltip: {
      valueSuffix: ' %'
    },
    plotOptions: {
      bar: {
        borderRadius: '60%',
        dataLabels: {
          enabled: true
        },
        groupPadding: 0.2,
        pointWidth: 15 
      }
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'top',
      x: -40,
      y: 80,
      floating: true,
      borderWidth: 1,
      backgroundColor: Highcharts.defaultOptions.legend?.backgroundColor || '#FFFFFF',
    },
    credits: {
      enabled: false
    },
    series: [{
      name: 'Data Khw',
      data: [60, 72, 32, 72],
      color: '#21275E' 
    }]
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default TauxChargeBar;

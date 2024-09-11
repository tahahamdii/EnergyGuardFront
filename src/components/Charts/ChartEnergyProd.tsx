import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting'; 
import HighchartsExportData from 'highcharts/modules/export-data'; 


HighchartsExporting(Highcharts);
HighchartsExportData(Highcharts);
const highchartsOptions: Highcharts.Options = {
  title: {
    text: 'Energy Production Chart',
  },
  xAxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  },
  yAxis: {
    title: {
      text: 'Energy (kWh)',
    },
  },
  series: [
    {
      type: 'line',
      name: 'Energy Production',
      data: [65, 34, 12, 56],
    },
  ],
  exporting: {
    buttons: {
      contextButton: {
        menuItems: [
          'downloadPNG',
          'downloadJPEG',
          'downloadPDF',
          'downloadSVG',
          'separator',
          'downloadCSV',
          'downloadXLS',
        ],
      },
    },
  },
};

const ChartEnergyProd: React.FC = () => {
  return (
    <div className="sm:px-7.5 col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-5">
      <style>
        {`
          .highcharts-contextbutton {
            background-color: red; // Background color for the exporting menu
          }
        `}
      </style>
      <div id="chartThree" className="mx-auto flex justify-center">
        <HighchartsReact highcharts={Highcharts} options={highchartsOptions} />
      </div>
    </div>
  );
};

export default ChartEnergyProd;

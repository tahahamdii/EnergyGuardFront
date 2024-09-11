import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const ChartComponent: React.FC = () => {
  const [overallTotalReactiveEnergy, setOverallTotalReactiveEnergy] = useState<number | null>(null);
  const [overallTotalApparenteEnergy, setOverallTotalApparenteEnergy] = useState<number | null>(null);

  useEffect(() => {
    const reactiveEnergy = localStorage.getItem('overallTotalReactiveEnergy');
    if (reactiveEnergy) {
      setOverallTotalReactiveEnergy(JSON.parse(reactiveEnergy));
    }

    const apparenteEnergy = localStorage.getItem('overallTotalApparenteEnergy');
    if (apparenteEnergy) {
      setOverallTotalApparenteEnergy(JSON.parse(apparenteEnergy));
    }



  }, []);

  const options = {
    chart: {
      type: 'column'
    },
    title: {
      align: 'left',
      text: 'Power'
    },
    accessibility: {
      announceNewData: {
        enabled: true
      }
    },
    xAxis: {
      type: 'category'
    },
    yAxis: {
      title: {
        text: 'Energy (Kva)'
      },
      min: 0,
    },
    legend: {
      enabled: false
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: '{point.y:.1f}'
        }
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> of total<br/>'
    },
    series: [
      {
        name: 'Puissence',
        colorByPoint: true,
        data: [
          {
            name: 'Active',
            y: 1823.37,
            drilldown: 'Active'
          },
          {
            name: 'Reactive',
            y: overallTotalReactiveEnergy || 0,
                      color: '#1D568F', 

            drilldown: 'Reactive'
          },
          {
            name: 'Apparente',
            y: 2823.37,
            color: '#21275E', 

            drilldown: 'Apparente '
          }
        ]
      }
    ],
    drilldown: {
      breadcrumbs: {
        position: {
          align: 'right'
        }
      },
      series: []
    }
  };
  

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default ChartComponent;

import React, { useState, useEffect } from 'react';
import { getAllPredictions } from '../../Services/cosphiService';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import ReactApexChart from 'react-apexcharts';

interface Prediction {
    predictedCosphi: string;
    date: string;
    heure: string;
}

const AllPredictionsComponent = () => {
    const [predictions, setPredictions] = useState<Prediction[]>([]);

    useEffect(() => {
        const fetchPredictions = async () => {
            try {
                const allPredictions = await getAllPredictions();
                setPredictions(allPredictions);
            } catch (error) {
                console.error('Error fetching predictions:', error);
            }
        };

        fetchPredictions();
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const chartData = {
        options: {
            legend: {
                show: false,
                position: 'top',
                horizontalAlign: 'left',
            },
            colors: ['#3C50E0'],
            chart: {
                fontFamily: 'Satoshi, sans-serif',
                height: 335,
                type: 'area',
                dropShadow: {
                    enabled: true,
                    color: '#623CEA14',
                    top: 10,
                    blur: 4,
                    left: 0,
                    opacity: 0.1,
                },
                toolbar: {
                    show: false,
                },
            },
            responsive: [
                {
                    breakpoint: 1024,
                    options: {
                        chart: {
                            height: 300,
                        },
                    },
                },
                {
                    breakpoint: 1366,
                    options: {
                        chart: {
                            height: 350,
                        },
                    },
                },
            ],
            stroke: {
                width: 2,
                curve: 'straight',
            },
            grid: {
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
                size: 4,
                colors: '#fff',
                strokeColors: ['#3056D3'],
                strokeWidth: 3,
                strokeOpacity: 0.9,
                strokeDashArray: 0,
                fillOpacity: 1,
                discrete: [],
                hover: {
                    size: undefined,
                    sizeOffset: 5,
                },
            },
            xaxis: {
                type: 'category',
                categories: predictions
                    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                    .map(prediction => formatDate(prediction.date)),
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
                title: {
                    text: 'Date',
                    style: {
                        fontSize: '16px',
                        fontWeight: 'bold',
                    },
                },
            },
            yaxis: {
                title: {
                    text: 'Predicted Cosphi',
                    style: {
                        fontSize: '16px',
                        fontWeight: 'bold',
                    },
                },
                min: 0.7,
                max: 1,
                labels: {
                    formatter: function (value: number) {
                        return value.toFixed(2); // Format value to two decimal places
                    }
                }
            },
        },
        series: [
            {
                name: 'Predicted Cosphi',
                data: predictions.map(prediction => parseFloat(prediction.predictedCosphi))
            }
        ],
    };

    return (
        <div>
    
            <div className="flex flex-col gap-10">  
                <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                    <div className="max-w-full overflow-x-auto">
                        <div style={{ width: '100%' }}>
                            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#446D9A', marginBottom: '15px' }}>All Predictions</h2>
                            {predictions.length > 0 && (
                                <div style={{ height: '400px', width: '100%' }}>
                                    <ReactApexChart
                                        options={chartData.options}
                                        series={chartData.series}
                                        type="area"
                                        height={335}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AllPredictionsComponent;

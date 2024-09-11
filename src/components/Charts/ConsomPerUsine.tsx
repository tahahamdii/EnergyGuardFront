import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import baseUrl from "../../enviroment/enviroment"

interface TotalCosphiPerUsineItem {
    usineID: string;
    totalCosphi: number;
}

const ConsomPerUsine = () => {
    const [seriesData, setSeriesData] = useState<number[]>([]);
    const [overallTotalConsumption, setOverallTotalConsumption] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${baseUrl.baseUrl}/energieUsine/calculateOverallTotalConsumption`);
                const data = await response.json();

                const series = data.totalCosphiPerUsine.map((item: TotalCosphiPerUsineItem) => item.totalCosphi);
                setSeriesData(series);
                setOverallTotalConsumption(data.overallTotalConsumption);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const options: ApexOptions = {
        chart: {
            fontFamily: 'Satoshi, sans-serif',
            type: 'pie', 
           
        },
        colors: [ '#6577F3', '#8FD0EF',  '#63B3ED'], 
        labels: ['Usine 1', 'Usine 2', 'Usine 3'],
        legend: {
            show: false,
            position: 'bottom',
        },
        plotOptions: {
            pie: {
                customScale: 1,
            },
        },
        dataLabels: {
            enabled: false,
        },
        responsive: [
            {
                breakpoint: 2600,
                options: {
                    chart: {
                        width: 380,
                    },
                },
            },
            {
                breakpoint: 640,
                options: {
                    chart: {
                        width: 200,
                    },
                },
            },
        ],
    };

    return (
        <div className="sm:px-7.5 col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-7">
            <div>
                <h5 className="text-xl font-semibold text-black dark:text-white">
                    Energy Consumption Per Usine
                </h5>
            </div>
            <div className="mb-2">
                <div id="chartThree" className="mx-auto flex justify-center">
                    <ReactApexChart
                        options={options}
                        series={seriesData}
                        type="pie"
                    />
                </div>
            </div>
            <div className="text-center mb-4">
                Total consumption: {overallTotalConsumption !== null ? `${overallTotalConsumption} kWh` : 'Loading...'}
            </div>
            <div className="-mx-8 flex items-center justify-center gap-y-3">
                {seriesData.map((item, index) => (
                    <div key={index} className="sm:w-1/2 w-full px-8">
                        <div className="flex w-full items-center">
                            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#6577F3]"></span>
                            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                                <span>Usine{index + 1} : {item.toFixed(2)}    </span>
                                {/* <span>{((item / overallTotalConsumption) * 100).toFixed(2)}%</span> */}
                                <span></span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ConsomPerUsine;


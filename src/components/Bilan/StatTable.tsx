import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Statistics {
    averageCosphi: number;
    totalEnergieActive: number;
    totalCost: number;
}

const StatTable = () => {
    const [statistics, setStatistics] = useState<Statistics[] | null>(null); 

    useEffect(() => {
        console.log("Fetching data...");
        const fetchData = async () => {
            console.log("enter0")

            try {
                console.log("enter")

                        const apiurl = 'http://localhost:5000/bilan/getStat';
                        const response = await fetch(apiurl, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Access-Control-Allow-Origin': 'true',
                            },
                        });
                        if (!response.ok) {
                            throw new Error('something is wrong');
                        } else {
                            const responseData = await response.json();
                            setStatistics(responseData.statistics);
                            console.log(responseData)
                        }                            console.log("responseData")

                    } catch (error) {
                        console.log(error);
                    }
                };
                fetchData();
            }, []);
    

    return (
        <div>
            <h2>Statistics Table</h2>
            {statistics && (
                <table>
                    <thead>
                        <tr>
                            <th>val</th>
                            <th>Value</th>
                            <th>Value2</th>
                        </tr>
                    </thead>
                    <tbody>
                                {statistics.map((statistic, index) => (
                                    <tr key={index}>
                                            <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                            <h5 className="font-medium text-black dark:text-white">
                                               OK
                                            </h5>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                            <h5 className="font-medium text-black dark:text-white">
                                                {statistic.averageCosphi}
                                            </h5>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="text-black dark:text-white">
                                                {statistic.totalEnergieActive}
                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="text-black dark:text-white">
                                            {statistic.totalCost}
                                            </p>
                                        </td>
                                     
                                        
                                    </tr>
                                ))}

                            </tbody>
                </table>
            )}
        </div>
    );
};

export default StatTable;

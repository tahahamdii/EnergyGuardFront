import React, { useState, useEffect } from 'react';
import baseUrl from "../../enviroment/enviroment"
import baseUrlVagrant from "../../enviroment/enviroment"
interface Statistics {
    averageCosphi: string; // Change data type to string
    totalEnergie: number | null;
    totalCost: number | null;
}


const StatTable = () => {
    const [statistics, setStatistics] = useState<Statistics | null>(null);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const apiurl = `${baseUrl.baseUrl}/bilan/getStat/daily/19-04-2024/18-04-2024`;
                const response = await fetch(apiurl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': 'true',
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                } else {
                    const responseData = await response.json();
                    setStatistics(responseData);
                  
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h2>Statistics</h2>
            {statistics && (
                <table>
                    <thead>
                        <tr>
                            <th>Average Cosphiii</th>
                            <th>Total Energy Active</th>
                            <th>Total Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{statistics.averageCosphi}%</td>
                            <td>{statistics.totalEnergie}</td>
                            <td>{statistics.totalCost !== null ? statistics.totalCost : "N/A"}</td>
                        </tr>
                    </tbody>

                </table>
            )}
        </div>
    );
};

export default StatTable;

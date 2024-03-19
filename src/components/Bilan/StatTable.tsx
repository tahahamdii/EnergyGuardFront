import React, { useState, useEffect } from 'react';

interface Statistics {
    averageCosphi: number;
    totalEnergie: number;
    totalCost: number;
}

const StatTable = () => {
    const [statistics, setStatistics] = useState<Statistics | null>(null);

    useEffect(() => {
        console.log("Fetching data...");
        const fetchData = async () => {
            try {
                const apiurl = 'http://localhost:5000/bilan/getStat';
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
                    console.log(responseData);
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
                            <td>{statistics.averageCosphi}</td>
                            <td>{statistics.totalEnergie}</td>
                            <td>{statistics.totalCost}</td>
                        </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default StatTable;

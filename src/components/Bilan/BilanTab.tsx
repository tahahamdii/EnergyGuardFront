

import { Margin } from '@mui/icons-material';
import React, { useState, useEffect } from 'react';

interface Statistics {
    averageCosphi: string;
    totalEnergie: number | null;
    totalCost: number | null;
}

const BilanTab = () => {
    const [statistics, setStatistics] = useState<Statistics | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiurl = 'http://localhost:5000/bilan/getStat';
                const response = await fetch(apiurl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*', // Allow any origin
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
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                Info General
            </h4>
            <div className="flex w-full max-w-900 justify-end">
                <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4 ml-auto">
                    <button className="rounded bg-white py-1 px-3 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:bg-boxdark dark:text-white dark:hover:bg-boxdark">
                        Day
                    </button>
                    <button className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
                        Week
                    </button>
                    <button className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
                        Month
                    </button>
                    <button className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
                        Year
                    </button>
                    <button className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
                        Per Segment
                    </button>
                </div>
            </div>
            <div style={{ marginTop: '1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', backgroundColor: '#edf2f7', borderRadius: '0.375rem', padding: '0.75rem', marginBottom: '1.25rem' }}>
                    <div style={{ padding: '0.75rem' }}>
                        <h5 style={{ textTransform: 'uppercase', fontSize: '0.875rem', fontWeight: 500 }}>Journée</h5>
                    </div>
                    <div style={{ padding: '0.75rem', textAlign: 'center' }}>
                        <h5 style={{ textTransform: 'uppercase', fontSize: '0.875rem', fontWeight: 500 }}>Consom Ennergy</h5>
                    </div>
                    <div style={{ padding: '0.75rem', textAlign: 'center' }}>
                        <h5 style={{ textTransform: 'uppercase', fontSize: '0.875rem', fontWeight: 500 }}>Cosphi</h5>
                    </div>
                    <div style={{ padding: '0.75rem', textAlign: 'center' }}>
                        <h5 style={{ textTransform: 'uppercase', fontSize: '0.875rem', fontWeight: 500 }}>Cost Energetic</h5>
                    </div>
                </div>
                <table style={{ width: '100%' }}>
                    <tbody>
                        <tr>
                            <td >TOD</td>
                            <td>{statistics?.totalEnergie ?? "N/A"}</td>
                            <td>{statistics?.averageCosphi}%</td>
                            <td>{statistics?.totalCost ?? "N/A"}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BilanTab;
import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./pickerstyle.css"
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket } from '@fortawesome/free-solid-svg-icons';
import baseUrl from "../../enviroment/enviroment"
import baseUrlVagrant from "../../enviroment/enviroment"

interface Statistics {
    averageCosphidate1: string;
    averageCosphidate2: string
    totalEnergydate1: number | null;
    totalEnergydate2: number | null,
    totalCost: number | null;
    totalCostYesterday: number | null
}



const BilanTab = () => {
    const [statistics, setStatistics] = useState<Statistics | null>(null);
    const [startDate, setStartDate] = useState(new Date());
    const [prevDate, setprevDate] = useState(new Date());
    const [date1, setDate1] = useState(new Date().toLocaleDateString('en-GB').replace(/\//g, '-'));
    const [date2, setDate2] = useState(getYesterday().replace(/\//g, '-'));
    const [displayedDate1, setdisplayedDate1] = useState(new Date().toLocaleDateString('en-GB').replace(/\//g, '-'));
    const [displayedDate2, setdisplayedDate2] = useState(getYesterday());



    function getYesterday() {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        return yesterday.toLocaleDateString();
    }
    const fetchData = async () => {
        try {
           
            setdisplayedDate1(date1)
            setdisplayedDate2(date2)
            console.log("inside api date 1 : " + date1);
            console.log("inside api date 2 : " + date2);
            console.log(`${baseUrl}/bilan/getStat/daily/${date1}/${date2}`);
            const apiurl = `${baseUrl.baseUrl}/bilan/getStat/daily/${date1}/${date2}`;
            const response = await fetch(apiurl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
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

    useEffect(() => {
        fetchData();
    }, []);

    const handleFetchData = () => {
        fetchData();
    };


    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                Info General
            </h4>
            <button className="cursor-pointer rounded-lg border border-transparent bg-gradient-to-r from-teal-500 to-blue-500 font-bold py-2 px-4 mb-7 text-white text-[16px] transition hover:bg-opacity-90 flex items-center justify-end">
                Average price [DT/Khw] : 0.258
            </button>

            <div className="flex justify-end">
                <Link to="/predict" className="cursor-pointer flex items-center rounded-lg border border-transparent bg-gradient-to-r from-teal-500 to-blue-500 font-bold py-2 px-5 mr-3 text-white text-[17px] transition hover:bg-opacity-90">
                    Predict Cosphi
                    <FontAwesomeIcon icon={faRocket} className="ml-2" />
                </Link>
            </div>

            <div className="flex w-full max-w-900 justify-end mt-3">
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
            <div className='divDate'>
                <DatePicker
                    selected={startDate}
                    onChange={(date) => {
                        setStartDate(date)
                        setDate1(date?.toLocaleDateString('en-GB').replace(/\//g, '-'));
                    }}
                    dateFormat="dd-MM-yyyy"
                    className="custom-datepicker1"
                    maxDate={new Date()}
                />
                <DatePicker
                    selected={prevDate}
                    onChange={(date) => {
                        setprevDate(date)
                        setDate2(date?.toLocaleDateString('en-GB').replace(/\//g, '-'));
                    }}
                    dateFormat="dd-MM-yyyy"
                    className="custom-datepicker2"
                    maxDate={new Date()}
                />
                <button onClick={handleFetchData} className="cursor-pointer rounded-lg border border-transparent bg-gradient-to-r from-teal-500 to-blue-500 font-bold py-2 px-4 ml-2 text-white text-[16px] transition hover:bg-opacity-90 flex items-center justify-end">
                    Fetch Data
                </button>

            </div>
            <div style={{ marginTop: '1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', backgroundColor: '#edf2f7', borderRadius: '0.375rem', padding: '0.75rem', marginBottom: '1.25rem' }}>
                    <div style={{ padding: '0.75rem' }}>
                        <h5 style={{ textTransform: 'uppercase', fontSize: '0.875rem', fontWeight: 500 }}>Day</h5>

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

            </div>
            <div style={{ marginTop: '1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderRadius: '0.375rem', padding: '0.75rem', marginBottom: '1.25rem' }}>
                    <div style={{ padding: '0.75rem' }}>
                        <h5 style={{ textTransform: 'uppercase', fontSize: '0.875rem', fontWeight: 500 }}>{displayedDate1}</h5>

                    </div>
                    <div style={{ padding: '0.75rem' }}>
                        <h5 style={{ textTransform: 'uppercase', fontSize: '0.875rem', fontWeight: 500 }}>{statistics?.totalEnergydate1 ?? "N/A"}</h5>

                    </div>
                    <div style={{ padding: '0.75rem', textAlign: 'center' }}>
                        <h5 style={{ textTransform: 'uppercase', fontSize: '0.875rem', fontWeight: 500 }}>{statistics?.averageCosphidate1 ?? "N/A"}</h5>
                    </div>
                    <div style={{ padding: '0.75rem', textAlign: 'center' }}>
                        <h5 style={{ textTransform: 'uppercase', fontSize: '0.875rem', fontWeight: 500 }}>{statistics?.totalCost ?? "N/A"}</h5>
                    </div>
                </div>

            </div>
            <div style={{ marginTop: '1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderRadius: '0.375rem', padding: '0.75rem', marginBottom: '1.25rem' }}>
                    <div style={{ padding: '0.75rem' }}>
                        <h5 style={{ textTransform: 'uppercase', fontSize: '0.875rem', fontWeight: 500 }}>{displayedDate2}</h5>

                    </div>
                    <div style={{ padding: '0.75rem' }}>
                        <h5 style={{ textTransform: 'uppercase', fontSize: '0.875rem', fontWeight: 500 }}>{statistics?.totalEnergydate2 ?? "N/A"}</h5>

                    </div>
                    <div style={{ padding: '0.75rem', textAlign: 'center' }}>
                        <h5 style={{ textTransform: 'uppercase', fontSize: '0.875rem', fontWeight: 500 }}>{statistics?.averageCosphidate2 ?? "N/A"}</h5>
                    </div>
                    <div style={{ padding: '0.75rem', textAlign: 'center' }}>
                        <h5 style={{ textTransform: 'uppercase', fontSize: '0.875rem', fontWeight: 500 }}>{statistics?.totalCostYesterday ?? "N/A"}</h5>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default BilanTab;
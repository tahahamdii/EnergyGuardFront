import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';

interface Sensor {
    _id: string;
    timestamp: Date;
    electricalParameters: {
        voltage: number;
        current: number;
        power: number;
    };
    thermalParameters: {
        temperature: number;
    };
    harmonicsData: string;
    powerFactor: number;
    machineID: string;
}

const ListSensor = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<Sensor[]>([]); // Initialize data as an empty array
    const [refreshTable, setRefreshTable] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiurl = 'http://localhost:5000/sensor/getSensor';
                const response = await fetch(apiurl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': 'true',
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const responseData = await response.json();
       // Corrected property name to responseData.sensors
                console.log(responseData);
setData(responseData.sensor);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        
            fetchData();
        }, [refreshTable]);

    return (
        <DefaultLayout>
            <Breadcrumb pageName="List Sensors" />

            <div className="flex flex-col gap-10">
                <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                    <div className="max-w-full overflow-x-auto">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                    <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                        Timestamp
                                    </th>
                                    <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                        Voltage
                                    </th>
                                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                        Current
                                    </th>
                                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                        Power
                                    </th>
                                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                                        Temperature
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data && data.length > 0 ? ( // Add a null check for data
                                    data.map((sensor, index) => (
                                        <tr key={index}>
                                            <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                                <h5 className="font-medium text-black dark:text-white">
                                                    {new Date(sensor.timestamp).toLocaleString()}
                                                </h5>
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                <p className="text-black dark:text-white">
                                                    {sensor.electricalParameters.voltage}
                                                </p>
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                <p className="text-black dark:text-white">
                                                    {sensor.electricalParameters.current}
                                                </p>
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                <p className="text-black dark:text-white">
                                                    {sensor.electricalParameters.power}
                                                </p>
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                <p className="text-black dark:text-white">
                                                    {sensor.thermalParameters.temperature}
                                                </p>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="py-5 px-4 text-center text-black dark:text-white">
                                            No data available
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default ListSensor;

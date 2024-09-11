import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface Zone {
    _id: string;
    nom: string;
    isprod: boolean;
    usineID: string; // Add usineID field to the Zone interface
}

const ListZones = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<Zone[]>([]);
    const [usineData, setUsineData] = useState<{ [key: string]: string }>({});
    const [refreshTable, setRefreshTable] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const zoneApiurl = 'http://localhost:5000/zone/getZone';
                const usineApiurl = 'http://localhost:5000/usine/getUsine';

                const zoneResponse = await fetch(zoneApiurl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': 'true',
                    },
                });
                
                if (!zoneResponse.ok) {
                    throw new Error('Failed to fetch zones');
                } else {
                    const zoneData = await zoneResponse.json();
                    setData(zoneData);

                    // Fetch Usine data to associate usineID with Usine name
                    const usineResponse = await fetch(usineApiurl, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': 'true',
                        },
                    });

                    if (!usineResponse.ok) {
                        throw new Error('Failed to fetch usines');
                    } else {
                        const usineData = await usineResponse.json();
                        const usineMap = usineData.reduce((map: { [key: string]: string }, usine: { _id: string; nom: string }) => {
                            map[usine._id] = usine.nom;
                            return map;
                        }, {});

                        setUsineData(usineMap);
                    }
                }
            } catch (error) {
                console.log('Fetch Error:', error);
            }
        };
        fetchData();
    }, [refreshTable]);
    
    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:5000/zone/deleteZone/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'true',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to delete zone');
            } else {
                setRefreshTable(prev => !prev);
            }
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    const handleEdit = (zoneId: string) => {
        navigate(`/zones/editZone/${zoneId}`);
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="List Zones" />
            <div className="flex flex-col gap-10">
                <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                    <div className="max-w-full overflow-x-auto">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                    <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                        Zone ID
                                    </th>
                                    <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                        Zone Name
                                    </th>
                                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                        Is Production
                                    </th>
                                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                     Usine Name
                                    </th>
                                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((zone, index) => (
                                    <tr key={index}>
                                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                            <h5 className="font-medium text-black dark:text-white">
                                                {zone._id}
                                            </h5>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="text-black dark:text-white">
                                                {zone.nom}
                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="text-black dark:text-white">
                                                {zone.isprod ? "Yes" : "No"}
                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="text-black dark:text-white">
                                                {usineData[zone.usineID]}
                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <div className="flex items-center space-x-3.5">
                                                <button className="hover:text-primary" onClick={() => handleEdit(zone._id)}>
                                                    <EditIcon className='text-yellow-400' />
                                                </button>
                                                <button className="hover:text-primary" onClick={() => handleDelete(zone._id)}>
                                                    <DeleteIcon className="text-red-500" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default ListZones;

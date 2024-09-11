import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface Tgbt {
    _id: string;
    nom: string;
    usineID: string;
    puissancemax: number;
    dossier: string;
    seuil: number;
    puissance_souscrite: number;
    isactive: string;
    adressip: string;
    interfaceweb: boolean;
}

const ListTgbt = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<Tgbt[]>([]);
    const [usineData, setUsineData] = useState<{ [key: string]: string }>({});
    const [refreshTable, setRefreshTable] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tgbtApiurl = 'http://localhost:5000/tgbt/getTGBT';
                const usineApiurl = 'http://localhost:5000/usine/getUsine';

                const tgbtResponse = await fetch(tgbtApiurl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': 'true',
                    },
                });

                if (!tgbtResponse.ok) {
                    throw new Error('Failed to fetch tgbt');
                } else {
                    const tgbtData = await tgbtResponse.json();
                    setData(tgbtData);

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
            const response = await fetch(`http://localhost:5000/tgbt/deleteTGBT/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'true',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to delete tgbt');
            } else {
                setRefreshTable(prev => !prev);
            }
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    const handleEdit = (tgbtId: string) => {
        navigate(`/tgbt/updateTGBT/${tgbtId}`);
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="List TGBT" />
            <div className="flex flex-col gap-10">
                <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                    <div className="max-w-full overflow-x-auto">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-gray-2 text-left dark:bg-meta-4">

                                    <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                        TGBT Name
                                    </th>
                                    <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                        TGBT Dossier
                                    </th>
                                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                        Puissance Max
                                    </th>
                                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                        Seuil
                                    </th>
                                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                        Puissance Souscrite
                                    </th>
                                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                        Usine Name
                                    </th>
                                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                        Interfaceweb
                                    </th>
                                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((tgbt, index) => (
                                    <tr key={index}>

                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <h5 className="font-medium text-black dark:text-white">
                                                {tgbt.nom}
                                            </h5>                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="text-black dark:text-white">{tgbt.dossier}</p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="text-black dark:text-white">
                                                {tgbt.puissancemax }
                                            </p>
                                        </td>


                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="text-black dark:text-white">{tgbt.seuil}</p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="text-black dark:text-white">{tgbt.puissance_souscrite}</p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="text-black dark:text-white">
                                                {tgbt.interfaceweb ? 'Yes' : 'No'}
                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="text-black dark:text-white">
                                                {usineData[tgbt.usineID]}
                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <div className="flex items-center space-x-3.5">
                                                <button
                                                    className="hover:text-primary"
                                                    onClick={() => handleEdit(tgbt._id)}
                                                >
                                                    <EditIcon className="text-yellow-400" />
                                                </button>

                                                <button className="hover:text-primary" onClick={() => handleDelete(tgbt._id)}>
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

export default ListTgbt;

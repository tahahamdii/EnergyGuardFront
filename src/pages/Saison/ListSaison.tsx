import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface Saison {
    _id: string;
    nom_saison: string;
    datedebut: Date;
    datefin: Date;
    mois: string;
}

const ListSaison = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<Saison[]>([]);
    const [refreshTable, setRefreshTable] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiurl = 'http://localhost:5000/saison/getSaison';
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
                    
                    // Add this part to parse date properties
                    const parsedSaisons = responseData.map((saison: any) => ({
                        ...saison,
                        datedebut: new Date(saison.datedebut),
                        datefin: new Date(saison.datefin),
                    }));
                    setData(parsedSaisons);
                }
            } catch (error) {
                console.log('Fetch Error:', error);
            }
        };
    
        fetchData();
    }, [refreshTable]);
    
    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:5000/saison/deleteSaison/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'true',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to delete saison');
            } else {
                setRefreshTable(prev => !prev);
            }
        } catch (error) {
            console.error('Delete error:', error);
        }
    };
    const handleEdit = (saisonId: string) => {
        navigate(`/saison/updateSaison/${saisonId}`);
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="List Saisons" />
            <div className="flex flex-col gap-10">
                <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                    <div className="max-w-full overflow-x-auto">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                    <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                        Saison ID
                                    </th>
                                    <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                        Saison Name
                                    </th>
                                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                        Date debut
                                    </th>
                                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                        Date Fin
                                    </th>
                                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                        Mois
                                    </th>
                                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((saison, index) => (
                                    <tr key={index}>
                                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                            <h5 className="font-medium text-black dark:text-white">
                                                {saison._id}
                                            </h5>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="text-black dark:text-white">
                                                {saison.nom_saison}
                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="text-black dark:text-white">
                                            {saison.datedebut.toLocaleDateString()}
                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="text-black dark:text-white">
                                            {saison.datefin.toLocaleDateString()}
                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="text-black dark:text-white">
                                                {saison.mois}
                                            </p>
                                        </td>
                                      
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <div className="flex items-center space-x-3.5">
                                                <button className="hover:text-primary" onClick={() => handleEdit(saison._id)}>
                                                    <EditIcon className='text-yellow-400' />
                                                </button>
                                                <button className="hover:text-primary" onClick={() => handleDelete(saison._id)}>
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

export default ListSaison;

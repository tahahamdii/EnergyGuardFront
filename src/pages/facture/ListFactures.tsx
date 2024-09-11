import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import DeleteIcon from '@mui/icons-material/Delete';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import EditIcon from '@mui/icons-material/Edit';
import { FileInput } from "flowbite-react";
import AddIcon from '@mui/icons-material/Add';
import baseUrl from "../../enviroment/enviroment"

import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

import GeolocationAndTariffComponent from '../../components/Geo/geo_tarif';
import CarbonFootprintCalculator from '../../components/News/News';


interface Facture {
    _id: string;
    numfacture: string | null;
    mois: string | null;
    datefacture: Date | null;
    neta_payer: number | null;
}

const FactureComponent = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<Facture[]>([]);
    const [refreshTable, setRefreshTable] = useState(false);
    const [, setIsModalOpen] = useState(false);
    

    const handleButtonClick = () => {
        navigate('/facture/addFacture');
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiurl = `${baseUrl.baseUrl}/facture/getFacture`;
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
                    setData(responseData);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [refreshTable]);


    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`${baseUrl.baseUrl}/facture/deleteFacture/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'true',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to delete facture');
            } else {
                setRefreshTable(prev => !prev);
            }
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    const handleFile = (factureId: string) => {
        navigate(`/facture/file/${factureId}`);
    };

    const handleEdit = (factureId: string) => {
        navigate(`/facture/edit/${factureId}`);
    };

    function handleButtonPredict(): void {
        navigate('/facture/predictConsumption');    
    }

    return (
        <DefaultLayout>
            <Breadcrumb pageName="List Factures" />
            <div className="flex flex-col gap-10">
            
                <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">

                    <div className="max-w-full overflow-x-auto">

                    <div className="flex justify-between mb-7">
                    <button onClick={handleButtonClick} className="cursor-pointer rounded-lg border border-transparent bg-gradient-to-r from-teal-500 to-blue-500 font-bold py-2 px-4 text-white text-[16px] transition hover:bg-opacity-90 flex items-center">
                        <AddIcon style={{ marginRight: '8px' }} />
                        Add Facture
                    </button>
                   
                </div>

                    <GeolocationAndTariffComponent />

           
                       
                        <button onClick={handleButtonPredict} className="cursor-pointer rounded-lg border border-transparent bg-gradient-to-r from-teal-500 to-blue-500 font-bold py-2 px-4 text-white text-[16px] transition hover:bg-opacity-90 flex items-center">
                        <AutoAwesomeIcon style={{ marginRight: '8px' }} />
                        Predict
                    </button>   
           

                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-gray-2 text-left dark:bg-meta-4">

                                    <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                        Numéro Facture
                                    </th>
                                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                        Mois
                                    </th>
                                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                        Date Facture
                                    </th>
                                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                        Net à Payer
                                    </th>
                                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((facture, index) => (
                                    <tr key={index}>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="text-black dark:text-white">
                                                {facture.numfacture}
                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="text-black dark:text-white">
                                                {facture.mois}
                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="text-black dark:text-white">
                                                {facture.datefacture ? new Date(facture.datefacture).toLocaleDateString() : ''}
                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <p className="text-black dark:text-white">
                                                {facture.neta_payer}
                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                            <div className="flex items-center space-x-3.5">
                                                <button className="hover:text-primary" onClick={() => handleEdit(facture._id)}>
                                                    <EditIcon className='text-yellow-400' />
                                                </button>
                                                <button className="hover:text-primary" onClick={() => handleFile(facture._id)}>
                                                    <PictureAsPdfIcon className='text-blue-400' />
                                                </button>
                                                <button className="hover:text-primary" onClick={() => handleDelete(facture._id)}>
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

export default FactureComponent;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import baseUrl from "../../enviroment/enviroment"

interface Cost {
    _id: string;
    timestamp: Date;
    machineId: string;
    energyConsumption: number;
    costCalculationDetails: string;
}

const ListCosts = () => {
    const navigate = useNavigate();
    const [costs, setCosts] = useState<Cost[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${baseUrl.baseUrl}/cost/getAllCostData`);
                if (!response.ok) {
                    throw new Error('Failed to fetch cost data');
                } else {
                    const responseData = await response.json();
                    setCosts(responseData);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`${baseUrl.baseUrl}/cost/deleteCostData/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete cost data');
            } else {
                setCosts(prevCosts => prevCosts.filter(cost => cost._id !== id));
            }
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    const handleEdit = (costId: string) => {
        navigate(`/cost/editCost/${costId}`);
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="List Costs" />
            <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-2 text-left dark:bg-meta-4">
                            <th className="py-4 px-4 font-medium text-black dark:text-white">Machine ID</th>
                            <th className="py-4 px-4 font-medium text-black dark:text-white">Energy Consumption</th>
                            <th className="py-4 px-4 font-medium text-black dark:text-white">Cost Calculation Details</th>
                            <th className="py-4 px-4 font-medium text-black dark:text-white">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {costs.map(cost => (
                            <tr key={cost._id}>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">{cost.machineId}</p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">{cost.energyConsumption}</p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">{cost.costCalculationDetails}</p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <div className="flex items-center space-x-3.5">
                                        <button className="hover:text-primary" onClick={() => handleEdit(cost._id)}>
                                            <EditIcon className='text-yellow-400' />
                                        </button>
                                        <button className="hover:text-primary" onClick={() => handleDelete(cost._id)}>
                                            <DeleteIcon className="text-red-500" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </DefaultLayout>
    );
};

export default ListCosts;

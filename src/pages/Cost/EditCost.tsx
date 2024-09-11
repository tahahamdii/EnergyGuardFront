import { Box, Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import baseUrl from "../../enviroment/enviroment"

const EditCost = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [costData, setCostData] = useState(null);

    const [machineId, setMachineId] = useState('');
    const [energyConsumption, setEnergyConsumption] = useState('');
    const [costCalculationDetails, setCostCalculationDetails] = useState('');

    useEffect(() => {
        const fetchCostData = async () => {
            try {
                const response = await fetch(`${baseUrl.baseUrl}/cost/getCostDataById/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch cost data');
                } else {
                    const costData = await response.json();
                    setCostData(costData);
                    setMachineId(costData.machineId);
                    setEnergyConsumption(costData.energyConsumption.toString());
                    setCostCalculationDetails(costData.costCalculationDetails);
                }
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
        fetchCostData();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Basic form validation
            if (!machineId || !energyConsumption || !costCalculationDetails) {
                alert('Please fill in all required fields.');
                return;
            }

            const response = await fetch(`${baseUrl.baseUrl}/cost/updateCostData/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'true'
                },
                body: JSON.stringify({ machineId, energyConsumption, costCalculationDetails })
            });
            if (response.ok) {
                console.log("Put request successful");
                navigate("/costs/listCosts");
            } else {
                console.log("put failed");
            }
        } catch (error) {
            console.error('Put error:' + error);
        }
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Edit Cost" />
            <div className="flex flex-col justify-center items-center h-full">
                <div className="rounded-sm border border-stroke bg-white px-10 pt-15 pb-20 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-4" style={{ marginBottom: '20px' }}>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '50ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div>
                            <TextField
                                required
                                id="machineId"
                                label="Machine ID"
                                value={machineId}
                                onChange={(e) => setMachineId(e.target.value)}
                                variant="outlined"
                                error={!machineId && machineId !== ''}
                                helperText={(!machineId && machineId !== '') ? 'Must not be empty' : ''}
                            />
                            <TextField
                                required
                                id="energyConsumption"
                                label="Energy Consumption"
                                type="number"
                                value={energyConsumption}
                                onChange={(e) => setEnergyConsumption(e.target.value)}
                                variant="outlined"
                                error={!energyConsumption && energyConsumption !== ''}
                                helperText={!energyConsumption && energyConsumption !== '' && 'Must not be empty'}
                            />
                            <TextField
                                required
                                id="costCalculationDetails"
                                label="Cost Calculation Details"
                                value={costCalculationDetails}
                                onChange={(e) => setCostCalculationDetails(e.target.value)}
                                variant="outlined"
                                error={!costCalculationDetails && costCalculationDetails !== ''}
                                helperText={!costCalculationDetails && costCalculationDetails !== '' && 'Must not be empty'}
                            />
                        </div>
                        <Button
                            type="submit"
                            variant="contained"
                            style={{ backgroundColor: '#3366cc', color: 'white', marginTop: '20px' }}
                            className=''
                        >
                            Update Cost
                        </Button>
                    </Box>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default EditCost;

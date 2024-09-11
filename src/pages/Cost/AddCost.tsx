import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import baseUrl from "../../enviroment/enviroment"

const AddCost = () => {
    const navigate = useNavigate();
    const [costData, setCostData] = useState('');

    const [machineId, setMachineId] = useState('');
    const [energyConsumption, setEnergyConsumption] = useState('');
    const [costCalculationDetails, setCostCalculationDetails] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Basic form validation
            if (!machineId || !energyConsumption || !costCalculationDetails) {
                alert('Please fill in all required fields.');
                return;
            }

            const response = await fetch(`${baseUrl.baseUrl}/cost/createCostData`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'true'
                },
                body: JSON.stringify({ machineId, energyConsumption, costCalculationDetails })
            });
            if (response.ok) {
                console.log("Post request successful");
                const responseData = await response.json();
                setCostData(responseData);
                navigate("/costs/listCosts");
            } else {
                console.log("post failed");
            }
        } catch (error) {
            console.error('Post error:' + error);
        }
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Add Cost" />
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
                            Add Cost
                        </Button>
                    </Box>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default AddCost;

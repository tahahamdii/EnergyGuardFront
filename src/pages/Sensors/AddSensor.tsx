import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';

const AddSensor = () => {
    const navigate = useNavigate();
    const [data, setData] = useState('');

    const [voltage, setVoltage] = useState('');
    const [current, setCurrent] = useState('');
    const [power, setPower] = useState('');
    const [temperature, setTemperature] = useState('');
    const [harmonicsData, setHarmonicsData] = useState('');
    const [powerFactor, setPowerFactor] = useState('');
    const [machineID, setMachineID] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // Basic form validation
            if (!voltage || !current || !power || !temperature || !machineID) {
                alert('Please fill in all required fields.');
                return;
            }
    
            const response = await fetch('http://localhost:5000/sensor/addSensor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'true'
                },
                body: JSON.stringify({ 
                    electricalParameters: { voltage, current, power },
                    thermalParameters: { temperature },
                    harmonicsData,
                    powerFactor,
                    machineID
                })
            });
            if (response.ok) {
                console.log("Post request successful");
                const responseData = await response.json();
                setData(responseData);
                navigate("/sensors/listSensor");
            } else {
                console.log("post failed");
            }
        } catch (error) {
            console.error('Post error:' + error);
        }
    };
    

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Add Sensor Data" />
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
                                id="voltage"
                                label="Voltage"
                                value={voltage}
                                onChange={(e) => setVoltage(e.target.value)}
                                variant="outlined"
                                type="number"
                            />
                            <TextField
                                required
                                id="current"
                                label="Current"
                                value={current}
                                onChange={(e) => setCurrent(e.target.value)}
                                variant="outlined"
                                type="number"
                            />
                            <TextField
                                required
                                id="power"
                                label="Power"
                                value={power}
                                onChange={(e) => setPower(e.target.value)}
                                variant="outlined"
                                type="number"
                            />
                            <TextField
                                required
                                id="temperature"
                                label="Temperature"
                                value={temperature}
                                onChange={(e) => setTemperature(e.target.value)}
                                variant="outlined"
                                type="number"
                            />
                            <TextField
                                id="harmonicsData"
                                label="Harmonics Data"
                                value={harmonicsData}
                                onChange={(e) => setHarmonicsData(e.target.value)}
                                variant="outlined"
                            />
                            <TextField
                                id="powerFactor"
                                label="Power Factor"
                                value={powerFactor}
                                onChange={(e) => setPowerFactor(e.target.value)}
                                variant="outlined"
                                type="number"
                            />
                            <TextField
                                required
                                id="machineID"
                                label="Machine ID"
                                value={machineID}
                                onChange={(e) => setMachineID(e.target.value)}
                                variant="outlined"
                            />
                        </div>
                        <Button
                            type="submit"
                            variant="contained"
                            style={{ backgroundColor: '#3366cc', color: 'white', marginTop: '20px' }}
                            className=''
                        >
                            Add Sensor Data
                        </Button>
                    </Box>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default AddSensor;

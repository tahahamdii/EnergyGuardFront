import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, TextField } from '@mui/material';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

export interface Machine {
    _id: string;
    machineName: string;
    location: string;
    installationDate: string;
    maintenanceDate: string;
}

const EditSaison = () => {
    const navigate = useNavigate();
    const { machineId } = useParams();
    const [machine, setMachine] = useState<Machine | null>(null);

    useEffect(() => {
        if (machineId) {
            fetchMachine();
        }
    }, [machineId]);

    const fetchMachine = async () => {
        try {
            const response = await fetch(`http://localhost:5000/machine/getMachineByID/${machineId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch machine details');
            }
            const machineData = await response.json();
            const formattedMachineData: Machine = {
                ...machineData,
                installationDate: machineData.installationDate ? new Date(machineData.installationDate).toISOString().split('T')[0] : '',
                maintenanceDate: machineData.maintenanceDate ? new Date(machineData.maintenanceDate).toISOString().split('T')[0] : ''
            };
            setMachine(formattedMachineData);
        } catch (error) {
            console.error('Error fetching machine details:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!machine) {
                console.error('Machine data not available');
                return;
            }
            const response = await fetch(`http://localhost:5000/machine/updateMachine/${machine._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(machine),
            });
            if (!response.ok) {
                throw new Error('Failed to update machine');
            }
            navigate(`/machines/listMachines`); // Redirect after successful update
        } catch (error) {
            console.error('Error updating machine:', error);
        }
    };

    return (
        <DefaultLayout>
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
                        <TextField
                            required
                            id="machineName"
                            label="Machine Name"
                            value={machine?.machineName || ''}
                            onChange={(e) => setMachine(prevMachine => ({
                                ...prevMachine!,
                                machineName: e.target.value
                            }))}
                            variant="outlined"
                        />
                        <TextField
                            required
                            id="location"
                            label="Location"
                            value={machine?.location || ''}
                            onChange={(e) => setMachine(prevMachine => ({
                                ...prevMachine!,
                                location: e.target.value
                            }))}
                            variant="outlined"
                        />
                        <TextField
                            required
                            id="installationDate"
                            label="Installation Date"
                            type="date"
                            value={machine?.installationDate || ''}
                            onChange={(e) => setMachine(prevMachine => ({
                                ...prevMachine!,
                                installationDate: e.target.value
                            }))}
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            required
                            id="maintenanceDate"
                            label="Maintenance Date"
                            type="date"
                            value={machine?.maintenanceDate || ''}
                            onChange={(e) => setMachine(prevMachine => ({
                                ...prevMachine!,
                                maintenanceDate: e.target.value
                            }))}
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            style={{ backgroundColor: '#3366cc', color: 'white', marginTop: '20px' }}
                        >
                            Update Machine
                        </Button>
                    </Box>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default EditSaison;
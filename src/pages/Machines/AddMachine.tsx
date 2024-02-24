import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';

const AddMachine = () => {
    const navigate = useNavigate();
    const [data, setData] = useState('');

    const [machineName, setMachineName] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [installationDate, setInstallationDate] = useState('');
    const [maintenanceDate, setMaintenanceDate] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Basic form validation
            if (!machineName || !location || !installationDate || !maintenanceDate) {
                alert('Please fill in all required fields.');
                return;
            }

            const response = await fetch('http://localhost:5000/machine/addMachine', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'true'
                },
                body: JSON.stringify({ machineName, description, location, installationDate, maintenanceDate })
            });
            if (response.ok) {
                console.log("Post request successful");
                const responseData = await response.json();
                setData(responseData);
                navigate("/machines/listMachines");
            } else {
                console.log("post failed");
            }
        } catch (error) {
            console.error('Signup error:' + error);
        }
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Add Machine" />
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
                                id="machineName"
                                label="Machine Name"
                                value={machineName}
                                onChange={(e) => setMachineName(e.target.value)}
                                variant="outlined"
                                error={!machineName && machineName !== ''}
                                helperText={(!machineName && machineName !== '') ? 'Must not be empty' : ''}
                            />
                            <TextField
                                id="description"
                                label="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                variant="outlined"
                                error={!description && description !== ''}
                                helperText={!description && description !== '' && 'Must not be empty'}
                            />
                            <TextField
                                required
                                id="location"
                                label="Location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                variant="outlined"
                                error={!location && location !== ''}
                                helperText={!location && location !== '' && 'Must not be empty'}
                            />
                            <TextField
                                required
                                id="installationDate"
                                label="Installation Date"
                                type="date"
                                value={installationDate}
                                onChange={(e) => setInstallationDate(e.target.value)}
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                error={!installationDate && installationDate !== ''}
                                helperText={(!installationDate && installationDate !== '') ? 'Must not be empty' : ''}
                            />

                            <TextField
                                required
                                id="maintenanceDate"
                                label="Maintenance Date"
                                type="date"
                                value={maintenanceDate}
                                onChange={(e) => setMaintenanceDate(e.target.value)}
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                error={!maintenanceDate && maintenanceDate !== ''}
                                helperText={!maintenanceDate && maintenanceDate !== '' && 'Must not be empty'}
                            />

                        </div>
                        <Button
                            type="submit"
                            variant="contained"
                            style={{ backgroundColor: '#3366cc', color: 'white', marginTop: '20px' }}
                            className=''
                        >
                            Add Machine
                        </Button>
                    </Box>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default AddMachine;

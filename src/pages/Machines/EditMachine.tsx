import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, TextField } from '@mui/material';

interface MachineData {
    _id: string;
    machineName: string;
    description: string;
    location: string;
    installationDate: string;
    maintenanceDate: string;
}

const EditMachine = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const machineId = searchParams.get('machineId');
    const [machineData, setMachineData] = useState<MachineData | null>(null);

    useEffect(() => {
        const fetchMachineData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/machine/getMachineByID/${machineId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': 'true',
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch machine data');
                } else {
                    const data: MachineData = await response.json();
                    setMachineData(data);
                    console.log(data);
                }
            } catch (error) {
                console.error('Fetch machine data error:', error);
            }
        };

        if (machineId) {
            fetchMachineData();
        }
    }, [machineId]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/machine/updateMachine/${machineId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'true',
                },
                body: JSON.stringify(machineData),
            });
            if (!response.ok) {
                throw new Error('Failed to update machine');
            } else {
                // Handle success, maybe show a success message
            }
        } catch (error) {
            console.error('Update error:', error);
        }
    };

    if (!machineData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Edit Machine</h2>
            <form onSubmit={handleUpdate}>
                <TextField
                    label="Machine Name"
                    value={machineData?.machineName || ''}
                    onChange={(e) => setMachineData({ ...machineData!, machineName: e.target.value })}
                    fullWidth
                />
                <TextField
                    label="Description"
                    value={machineData?.description || ''}
                    onChange={(e) => setMachineData({ ...machineData!, description: e.target.value })}
                    fullWidth
                />
                <TextField
                    label="Location"
                    value={machineData?.location || ''}
                    onChange={(e) => setMachineData({ ...machineData!, location: e.target.value })}
                    fullWidth
                />
                <TextField
                    label="Installation Date"
                    type="date"
                    value={machineData?.installationDate || ''}
                    onChange={(e) => setMachineData({ ...machineData!, installationDate: e.target.value })}
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    label="Maintenance Date"
                    type="date"
                    value={machineData?.maintenanceDate || ''}
                    onChange={(e) => setMachineData({ ...machineData!, maintenanceDate: e.target.value })}
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Button type="submit" variant="contained" color="primary">
                    Update
                </Button>
            </form>
        </div>
    );
};

export default EditMachine;

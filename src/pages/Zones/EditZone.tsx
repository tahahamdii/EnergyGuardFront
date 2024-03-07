import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, TextField, Checkbox, FormControlLabel, Select, MenuItem } from '@mui/material'; // Add Select and MenuItem
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

export interface Zone {
    _id: string;
    nom: string;
    isprod: boolean;
    usineID: string;
}

const EditZone = () => {
    const navigate = useNavigate();
    const { zoneId } = useParams();
    const [zone, setZone] = useState<Zone | null>(null);
    const [usineNames, setUsineNames] = useState<string[]>([]); // State to store usine names

    useEffect(() => {
        if (zoneId) {
            fetchZone();
            fetchUsineNames(); // Fetch usine names
        }
    }, [zoneId]);

    const fetchZone = async () => {
        try {
            const response = await fetch(`http://localhost:5000/zone/getZoneByID/${zoneId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch zone details');
            }
            const zoneData = await response.json();
            setZone(zoneData);
        } catch (error) {
            console.error('Error fetching zone details:', error);
        }
    };

    const fetchUsineNames = async () => { // Function to fetch usine names
        try {
            const response = await fetch(`http://localhost:5000/usine/getUsineNames`);
            if (!response.ok) {
                throw new Error('Failed to fetch usine names');
            }
            const usineNamesData = await response.json();
            setUsineNames(usineNamesData);
        } catch (error) {
            console.error('Error fetching usine names:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!zone) {
                console.error('Zone data not available');
                return;
            }
            const response = await fetch(`http://localhost:5000/zone/updateZone/${zone._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(zone),
            });
            if (!response.ok) {
                throw new Error('Failed to update zone');
            }
            navigate('/zones/listZones'); // Navigate to the list of zones after updating
        } catch (error) {
            console.error('Error updating zone:', error);
        }
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Edit Zone" />

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
                            id="nom"
                            label="Zone Name"
                            value={zone?.nom || ''}
                            onChange={(e) => setZone(prevZone => ({
                                ...prevZone!,
                                nom: e.target.value
                            }))}
                            variant="outlined"
                        />
                        <Select // Select input for usineName
                            required
                            id="usineName"
                            label="Usine Name"
                            value={zone?.usineID || ''}
                            onChange={(e) => setZone(prevZone => ({
                                ...prevZone!,
                                usineID: e.target.value as string // Cast to string
                            }))}
                            variant="outlined"
                        >
                            {usineNames.map((usineName, index) => (
                                <MenuItem key={index} value={usineName}>{usineName}</MenuItem>
                            ))}
                        </Select>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={zone?.isprod || false}
                                    onChange={(e) => setZone(prevZone => ({
                                        ...prevZone!,
                                        isprod: e.target.checked
                                    }))}
                                    color="primary"
                                />
                            }
                            label="Is Production"
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            style={{ backgroundColor: '#3366cc', color: 'white', marginTop: '20px' }}
                        >
                            Update Zone
                        </Button>
                    </Box>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default EditZone;

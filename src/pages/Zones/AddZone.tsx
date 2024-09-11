import React, { useState, useEffect } from 'react';
import { Box, Checkbox, Button, FormControlLabel, TextField, MenuItem, Select, InputLabel, SelectChangeEvent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddZone = () => {
    const navigate = useNavigate();
    const [nom, setNom] = useState('');
    const [isprod, setIsprod] = useState(false);
    const [usineID, setUsineID] = useState('');
    const [nomError, setNomError] = useState('');
    const [usines, setUsines] = useState([]);

    useEffect(() => {
        const fetchUsines = async () => {
            try {
                const response = await fetch('http://localhost:5000/usine/getUsine');
                if (response.ok) {
                    const data = await response.json();
                    setUsines(data);
                } else {
                    throw new Error('Failed to fetch Usines');
                }
            } catch (error) {
                console.error('Fetch Usines error:', error);
            }
        };

        fetchUsines();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (!nom) {
                toast.error('Please fill in all required fields.', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                    style: {
                        backgroundColor: '#f44336',
                        color: '#fff',
                        borderRadius: '8px',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)'
                    }
                });
                return;
            }

            const response = await fetch('http://localhost:5000/zone/addZone', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'true'
                },
                body: JSON.stringify({ nom, isprod, usineID })
            });

            if (response.ok) {
                console.log("Post request successful");
                const responseData = await response.json();
                navigate("/zones/listZones");
            } else {
                console.log("Post failed");
            }
        } catch (error) {
            console.error('Post error:', error);
        }
    };

    const handleNomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setNom(value);
        if (!value.trim()) {
            setNomError('Name is required');
        } else {
            setNomError('');
        }
    };

    const handleUsineChange = (e: SelectChangeEvent<string>) => {
        setUsineID(e.target.value);
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Add Zone" />
            <div className="flex flex-col justify-center items-center h-full">
            <div className="rounded-sm border border-stroke bg-white px-10 pt-15 pb-20 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-4" style={{ marginBottom: '20px' }}>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '50ch' },
                            '& .MuiButton-root': { margin: '20px auto 0' },
                            '& .MuiFormControlLabel-root': { margin: '10px 0' },
                            '& .MuiSelect-root': { width: '50ch', marginBottom: '10px' }
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div>
                            <TextField
                                required
                                id="nom"
                                label="Zone Name"
                                value={nom}
                                onChange={handleNomChange}
                                variant="outlined"
                                error={!!nomError}
                                helperText={nomError}
                                sx={{ marginBottom: '10px' }}
                            />
                            <InputLabel id="usine-select-label">Select Usine</InputLabel>
                            <Select
                                labelId="usine-select-label"
                                id="usine-select"
                                value={usineID}
                                onChange={handleUsineChange}
                                variant="outlined"
                                displayEmpty // This allows the select to display the empty placeholder
                            >
                                <MenuItem value="" disabled selected>
                                    Select Usine || Choose ..
                                </MenuItem>
                                {usines.map((usine: any) => (
                                    <MenuItem key={usine._id} value={usine._id}>
                                        {usine.nom}
                                    </MenuItem>
                                ))}
                            </Select>
                            <br></br>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={isprod}
                                        onChange={(e) => setIsprod(e.target.checked)}
                                        color="primary"
                                    />
                                }
                                label="Is Production"
                                sx={{ marginBottom: '10px' }}
                            />
                        </div>
                        <Button
                            type="submit"
                            variant="contained"
                            style={{ backgroundColor: '#3366cc', color: 'white' }}
                        >
                            Add Zone
                        </Button>
                    </Box>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default AddZone;

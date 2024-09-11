import React, { useEffect, useState } from 'react';
import { ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, TextField, Checkbox, FormControlLabel, Select, MenuItem, } from '@mui/material';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { InputLabel } from '@mui/material';

interface Tgbt {
    _id: string;
    nom: string;
    usineID: string;
    puissancemax: number;
    dossier: string;
    seuil: number;
    puissance_souscrite: number;
    isactive: string;
    adressip: string;
    interfaceweb: boolean;
}

const EditTgbt = () => {
    const navigate = useNavigate();
    const { tgbtId } = useParams();
    const [tgbt, setTgbt] = useState<Tgbt | null>(null);
    const [usineNames, setUsineNames] = useState<string[]>([]);

    useEffect(() => {
        if (tgbtId) {
            fetchTgbt();
            fetchUsineNames();
        }
    }, [tgbtId]);

    
    const fetchTgbt = async () => {
        try {
            const response = await fetch(`http://localhost:5000/tgbt/getTGBTByID/${tgbtId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch tgbt details');
            }
            const tgbtData = await response.json();
            setTgbt((prevTgbt) => ({
                ...prevTgbt ?? {},
                usineID: usineNames.includes(prevTgbt?.usineID || '') ? prevTgbt?.usineID || '' : '',
                ...tgbtData,
            }));
        } catch (error) {
            console.error('Error fetching tgbt details:', error);
        }
    };


    const fetchUsineNames = async () => {
        try {
            const response = await fetch(`http://localhost:5000/usine/getUsine`);
            if (!response.ok) {
                throw new Error('Failed to fetch usine names');
            }
            const usineNamesData = await response.json();
            setUsineNames(usineNamesData);
        } catch (error) {
            console.error('Error fetching usine names:', error);
        }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!tgbt) {
                console.error('Tgbt data not available');
                return;
            }
            const response = await fetch(`http://localhost:5000/tgbt/updateTGBT/${tgbt._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tgbt),
            });
            if (!response.ok) {
                throw new Error('Failed to update TGBT');
            }
            navigate('/tgbt/listTgbt');
        } catch (error) {
            console.error('Error updating tgbt:', error);
        }
    };

    
    const handleInputChange = (field: string) => (
        e: React.ChangeEvent<HTMLInputElement | { value: unknown }>
    ) => {
        setTgbt((prevTgbt) => ({
            ...prevTgbt!,
            [field]: e.target.value,
        }));
    };
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (tgbt) {
            setTgbt((prevTgbt) => ({
                ...prevTgbt!,
                interfaceweb: e.target.checked,
            }));
        }
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Edit TGBT" />

            <div className="flex flex-col justify-center items-center h-full">
                <div
                    className="rounded-sm border border-stroke bg-white px-10 pt-15 pb-20 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-4"
                    style={{ marginBottom: '20px' }}
                >
                    <Box
                        component="form"
                        onSubmit={handleUpdate}
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '50ch' },
                            '& .MuiButton-root': { margin: '20px auto 0' },
                            '& .MuiFormControlLabel-root': { margin: '10px 0' },
                            '& .MuiSelect-root': { width: '50ch', marginBottom: '10px' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            required
                            id="nom"
                            label="TGBT Name"
                            value={tgbt?.nom || ''}
                            onChange={handleInputChange('nom')}
                            variant="outlined"
                            sx={{ marginBottom: '10px' }}
                        />

                        <TextField
                            required
                            id="dossier"
                            label="TGBT Dossier"
                            value={tgbt?.dossier || ''}
                            variant="outlined"
                            sx={{ marginBottom: '10px' }}
                            onChange={handleInputChange('dossier')}
                            type="text"
                        />

                        <TextField
                            required
                            id="puissancemax"
                            label="Puissancemax "
                            value={tgbt?.puissancemax || ''}
                            variant="outlined"
                            sx={{ marginBottom: '10px' }}
                            onChange={handleInputChange('puissancemax')}
                            type="number"
                        />

                        <TextField
                            required
                            id="seuil"
                            label="Seuil"
                            value={tgbt?.seuil || ''}
                            variant="outlined"
                            sx={{ marginBottom: '10px' }}
                            onChange={handleInputChange('seuil')}
                            type="number"
                        />

                        <TextField
                            required
                            id="puissance_souscrite"
                            label="puissance_souscrite"
                            value={tgbt?.puissance_souscrite || ''}
                            variant="outlined"
                            sx={{ marginBottom: '10px' }}
                            onChange={handleInputChange('puissance_souscrite')}
                            type="number"
                        />
                        <TextField
                            required
                            id="isactive"
                            label="Isactive"
                            value={tgbt?.isactive || ''}
                            variant="outlined"
                            sx={{ marginBottom: '10px' }}
                            onChange={handleInputChange('isactive')}
                            type="text"
                        />

                        <TextField
                            required
                            id="adressip"
                            label="Adressip"
                            value={tgbt?.adressip || ''}
                            variant="outlined"
                            sx={{ marginBottom: '10px' }}
                            onChange={handleInputChange('adressip')}
                            type="text"
                        />

                        <FormControlLabel
                            control={
                                <Checkbox checked={tgbt?.interfaceweb || false} onChange={handleCheckboxChange} color="primary" />
                            }
                            label="Interfaceweb"
                            sx={{ marginBottom: '10px' }}
                        />
                        <InputLabel id="usine-select-label">Select Usine</InputLabel>
                        <Select
                            labelId="usine-select-label"
                            id="usine-select"
                            value={tgbt?.usineID || ''}
                            onChange={(e: SelectChangeEvent<string>, child: React.ReactNode) => handleInputChange('usineID')(e)}
                            variant="outlined"
                            displayEmpty
                        >
                            <MenuItem value="" disabled>
                                Select Usine || Choose ..
                            </MenuItem>
                            {usineNames.map((usine: string) => (
                                <MenuItem key={usine} value={usine}>
                                    {usine}
                                </MenuItem>
                            ))}
                        </Select>
                        <Button type="submit" variant="contained" style={{ backgroundColor: '#3366cc', color: 'white' }}>
                            Update TGBT
                        </Button>
                    </Box>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default EditTgbt;

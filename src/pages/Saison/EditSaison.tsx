import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, TextField } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { TextFieldProps } from '@mui/material/TextField';
import DefaultLayout from '../../layout/DefaultLayout';

export interface Saison {
    _id: string;
    nom_saison: string;
    datedebut: Date | null;
    datefin: Date | null;
    mois: string;
}

const EditSaison = () => {
    const navigate = useNavigate();
    const { saisonId } = useParams();
    const [saison, setSaison] = useState<Saison | null>(null);

    useEffect(() => {
        if (saisonId) {
            fetchSaison();
        }
    }, [saisonId]);

    const fetchSaison = async () => {
        try {
            const response = await fetch(`http://localhost:5000/saison/getSaisonByID/${saisonId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch saison details');
            }
            const saisonData = await response.json();
            const formattedSaisonData: Saison = {
                ...saisonData,
                datedebut: saisonData.datedebut ? new Date(saisonData.datedebut) : null,
                datefin: saisonData.datefin ? new Date(saisonData.datefin) : null,
            };
            setSaison(formattedSaisonData);
        } catch (error) {
            console.error('Error fetching saison details:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!saison) {
                console.error('Saison data not available');
                return;
            }
            const response = await fetch(`http://localhost:5000/saison/updateSaison/${saison._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(saison),
            });
            if (!response.ok) {
                throw new Error('Failed to update saison');
            }
            navigate(`/saison/listSaison`);
        } catch (error) {
            console.error('Error updating saison:', error);
        }
    };

    return (
        <DefaultLayout>
            <div className="flex flex-col justify-center items-center h-full">
                <div
                    className="rounded-sm border border-stroke bg-white px-10 pt-15 pb-20 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-4"
                    style={{ marginBottom: '20px' }}
                >
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
                            id="saisonName"
                            label="Saison Name"
                            value={saison?.nom_saison || ''}
                            onChange={(e) => setSaison((prevSaison) => ({ ...prevSaison!, nom_saison: e.target.value }))}
                            variant="outlined"
                        />

                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                id="datedebut"
                                label="Start Date"
                                value={saison?.datedebut || null}
                                onChange={(newDate: Date | null) => setSaison((prevSaison) => ({ ...prevSaison!, datedebut: newDate }))}
                                renderInput={(params: TextFieldProps) => <TextField {...params} variant="outlined" />}
                            />
                            <DatePicker
                                id="datefin"
                                label="End Date"
                                value={saison?.datefin || null}
                                onChange={(newDate: Date | null) => setSaison((prevSaison) => ({ ...prevSaison!, datefin: newDate }))}
                                renderInput={(params: TextFieldProps) => <TextField {...params} variant="outlined" />}
                            />
                        </LocalizationProvider>

                        <TextField
                            id="mois"
                            label="Month"
                            value={saison?.mois || ''}
                            onChange={(e) => setSaison((prevSaison) => ({ ...prevSaison!, mois: e.target.value }))}
                            variant="outlined"
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            style={{ backgroundColor: '#3366cc', color: 'white', marginTop: '20px' }}
                        >
                            Update Saison
                        </Button>
                    </Box>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default EditSaison;

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, TextField, Checkbox, FormControlLabel } from '@mui/material';
import DefaultLayout from '../../layout/DefaultLayout';

export interface Usine {
    _id: string;
    nom: string;
    objectifusine: string;
    isprod: boolean;
}

const EditUsine = () => {
    const navigate = useNavigate();
    const { usineId } = useParams();
    const [usine, setUsine] = useState<Usine | null>(null);

    useEffect(() => {
        if (usineId) {
            fetchUsine();
        }
    }, [usineId]);

    const fetchUsine = async () => {
        try {
            const response = await fetch(`http://localhost:5000/usine/getUsineByID/${usineId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch usine details');
            }
            const usineData = await response.json();
            setUsine(usineData);
        } catch (error) {
            console.error('Error fetching usine details:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!usine) {
                console.error('Usine data not available');
                return;
            }
            const response = await fetch(`http://localhost:5000/usine/updateUsine/${usine._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(usine),
            });
            if (!response.ok) {
                throw new Error('Failed to update usine');
            }
            navigate('/usines/listUsines'); // Navigate to the list of usines after updating
        } catch (error) {
            console.error('Error updating usine:', error);
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
                            id="nom"
                            label="Usine Name"
                            value={usine?.nom || ''}
                            onChange={(e) => setUsine(prevUsine => ({
                                ...prevUsine!,
                                nom: e.target.value
                            }))}
                            variant="outlined"
                        />
                        <TextField
                            required
                            id="objectifusine"
                            label="Objectif Usine"
                            value={usine?.objectifusine || ''}
                            onChange={(e) => setUsine(prevUsine => ({
                                ...prevUsine!,
                                objectifusine: e.target.value
                            }))}
                            variant="outlined"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={usine?.isprod || false}
                                    onChange={(e) => setUsine(prevUsine => ({
                                        ...prevUsine!,
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
                            Update Usine
                        </Button>
                    </Box>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default EditUsine;

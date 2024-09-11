import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { TextField, Button, InputLabel, Select, MenuItem, FormControl } from '@mui/material';

const AddSaison = () => {
    const navigate = useNavigate();
    const [nomSaison, setNomSaison] = useState('');
    const [dateDebut, setDateDebut] = useState('');
    const [dateFin, setDateFin] = useState('');
    const [mois, setMois] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/saison/addSaison', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'true',
                },
                body: JSON.stringify({
                    nom_saison: nomSaison,
                    datedebut: new Date(dateDebut),
                    datefin: new Date(dateFin),
                    mois: mois,
                }),
            });

            if (response.ok) {
                console.log('Post request successful');
                navigate('/saison/listSaison');
            } else {
                console.log('Post failed');
            }
        } catch (error) {
            console.error('Post error:', error);
        }
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Add Saison" />
            <div className="flex flex-col justify-center items-center h-full">
                <div className="rounded-sm border border-stroke bg-white px-10 pt-15 pb-20 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-4">
                    <form onSubmit={handleSubmit}>
                        <TextField
                            required
                            id="nomSaison"
                            label="Saison Name"
                            value={nomSaison}
                            onChange={(e) => setNomSaison(e.target.value)}
                            variant="outlined"
                            sx={{ marginBottom: '10px' }}
                        />

                        <TextField
                            required
                            id="dateDebut"
                            label="Date Debut"
                            type="date"
                            value={dateDebut}
                            onChange={(e) => setDateDebut(e.target.value)}
                            variant="outlined"
                            sx={{ marginBottom: '10px' }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <TextField
                            required
                            id="dateFin"
                            label="Date Fin"
                            type="date"
                            value={dateFin}
                            onChange={(e) => setDateFin(e.target.value)}
                            variant="outlined"
                            sx={{ marginBottom: '10px' }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <FormControl fullWidth required variant="outlined" sx={{ marginBottom: '10px' }}>
                            <InputLabel id="mois-label">Mois</InputLabel>
                            <Select
                                labelId="mois-label"
                                id="mois"
                                value={mois}
                                label="Mois"
                                onChange={(e) => setMois(e.target.value)}
                            >
                                <MenuItem value="January">January</MenuItem>
                                <MenuItem value="February">February</MenuItem>
                                {/* Add other months as needed */}
                            </Select>
                        </FormControl>

                        <Button type="submit" variant="contained" style={{ backgroundColor: '#3366cc', color: 'white' }}>
                            Add Saison
                        </Button>
                    </form>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default AddSaison;

import React, { useState, useEffect } from 'react';
import { Box, Checkbox, Button, FormControlLabel, TextField, MenuItem, Select, InputLabel, SelectChangeEvent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import 'react-toastify/dist/ReactToastify.css';

const AddTgbt = () => {
    const navigate = useNavigate();
    const [nom, setNom] = useState('');
    const [nomError, setNomError] = useState('');
    const [puissancemax, setPuissancemax] = useState('');
    const [dossier, setDossier] = useState('');
    const [seuil, setSeuil] = useState('');
        const [puissance_souscrite, setPuissanceSouscrite] = useState('');
    const [isactive, setIsactive] = useState('');
    const [adressip, setAdressip] = useState('');
    const [interfaceweb, setInterfaceweb] = useState(false);
    const [usineID, setUsineID] = useState('');
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
            if (!nom.trim()) {
                setNomError('Name is required');
                return;
            } else {
                setNomError('');
            }

            const response = await fetch('http://localhost:5000/tgbt/addTGBT', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'true',
                },
                body: JSON.stringify({
                    nom,
                    puissancemax,
                    dossier,
                    seuil,
                    puissance_souscrite,
                    isactive,
                    adressip,
                    interfaceweb,
                    usineID,
                }),
            });

            if (response.ok) {
                console.log('Post request successful');
                const responseData = await response.json();
                navigate('/tgbt/listTgbt');
            } else {
                console.log('Post failed');
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
    const handleDossierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDossier(e.target.value);
    };

    const handlePuissancemaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPuissancemax(e.target.value);
    };

    const handleSeuilChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSeuil(e.target.value);
    };
    const handlePuissanceSouscriteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPuissanceSouscrite(e.target.value);
    };
    const handleIsactiveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsactive(e.target.value);
    };

    const handleAdressipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAdressip(e.target.value);
    };
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInterfaceweb(e.target.checked);
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Add Zone" />
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
                            '& .MuiButton-root': { margin: '20px auto 0' },
                            '& .MuiFormControlLabel-root': { margin: '10px 0' },
                            '& .MuiSelect-root': { width: '50ch', marginBottom: '10px' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div>
                            <TextField
                                required
                                id="nom"
                                label="TGBT Name"
                                value={nom}
                                onChange={handleNomChange}
                                variant="outlined"
                                error={!!nomError}
                                helperText={nomError}
                                sx={{ marginBottom: '10px' }}
                            />

                            <TextField
                                required
                                id="dossier"
                                label="TGBT Dossier"
                                value={dossier}
                                variant="outlined"
                                sx={{ marginBottom: '10px' }}
                                onChange={handleDossierChange}
                                type="text"
                            />

                            <TextField
                                required
                                id="puissancemax"
                                label="Puissancemax "
                                value={puissancemax}
                                variant="outlined"
                                sx={{ marginBottom: '10px' }}
                                onChange={handlePuissancemaxChange}
                                type="number"
                            />

                            <TextField
                                required
                                id="seuil"
                                label="Seuil"
                                value={seuil}
                                variant="outlined"
                                sx={{ marginBottom: '10px' }}
                                onChange={handleSeuilChange}
                                type="number"
                            />

                            <TextField
                                required
                                id="puissance_souscrite"
                                label="puissance_souscrite"
                                value={puissance_souscrite}
                                variant="outlined"
                                sx={{ marginBottom: '10px' }}
                                onChange={handlePuissanceSouscriteChange}
                                type="number"
                            />
                            <TextField
                                required
                                id="isactive"
                                label="Isactive"
                                value={isactive}
                                variant="outlined"
                                sx={{ marginBottom: '10px' }}
                                onChange={handleIsactiveChange}
                                type="text"
                            />

                            <TextField
                                required
                                id="adressip"
                                label="Adressip"
                                value={adressip}
                                variant="outlined"
                                sx={{ marginBottom: '10px' }}
                                onChange={handleAdressipChange}
                                type="text"
                            />

                            <InputLabel id="usine-select-label">Select Usine</InputLabel>
                            <Select
                                labelId="usine-select-label"
                                id="usine-select"
                                value={usineID}
                                onChange={handleUsineChange}
                                variant="outlined"
                                displayEmpty
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

                            <FormControlLabel
                                control={
                                    <Checkbox
                                    checked={interfaceweb}
                                    onChange={handleCheckboxChange}
                                    color="primary"
                                />
                                }
                                label="Interfaceweb"
                                sx={{ marginBottom: '10px' }}
                            />
                            

                        </div>
                        <Button
                            type="submit"
                            variant="contained"
                            style={{ backgroundColor: '#3366cc', color: 'white' }}
                        >
                            Add TGBT
                        </Button>
                    </Box>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default AddTgbt;

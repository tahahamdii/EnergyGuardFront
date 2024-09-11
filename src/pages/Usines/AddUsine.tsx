import React, { useState } from 'react';
import { Box, Checkbox,Button, FormControlLabel, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddUsine = () => {
    const navigate = useNavigate();
    const [nom, setNom] = useState('');
    const [objectifusine, setObjectifusine] = useState('');
    const [isprod, setIsprod] = useState(false);
    const [nomError, setNomError] = useState('');
    const [objectifusineError, setObjectifusineError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (!nom || !objectifusine) {
                toast.error('Please fill in all required fields.', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000 ,// Close the notification after 3 seconds
                    style: {
                        backgroundColor: '#f44336', // Red background color
                        color: '#fff', // White text color
                        borderRadius: '8px', // Rounded corners
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' // Drop shadow
                    }
                });
                return;
            }
            

            const response = await fetch('http://localhost:5000/usine/addUsine', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'true'
                },
                body: JSON.stringify({ nom, objectifusine, isprod })
            });
            if (response.ok) {
                console.log("Post request successful");
                const responseData = await response.json();
                navigate("/usines/listUsines");
            } else {
                console.log("post failed");
            }
        } catch (error) {
            console.error('Post error:', error);
        }
    };

    // Validate nom field
    const handleNomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setNom(value);
        if (!value.trim()) {
            setNomError('Name is required');
        } else {
            setNomError('');
        }
    };

    // Validate objectifusine field
    const handleObjectifusineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setObjectifusine(value);
        if (!value.trim()) {
            setObjectifusineError('Objective is required');
        } else if (isNaN(Number(value))) {
            setObjectifusineError('Objective must be a number');
        } else {
            setObjectifusineError('');
        }
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Add Usine" />
            <div className="flex flex-col justify-center items-center h-full">
                <div className="rounded-sm border border-stroke bg-white px-10 pt-15 pb-20 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-4" style={{ marginBottom: '20px' }}>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '50ch' },
                            '& .MuiButton-root': { margin: '20px auto 0' }, // Center the button
                            '& .MuiFormControlLabel-root': { margin: '10px 0' } // Add margin to the checkbox
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div>
                            <TextField
                                required // Add required prop
                                id="nom"
                                label="Usine Name"
                                value={nom}
                                onChange={handleNomChange}
                                variant="outlined"
                                error={!!nomError}
                                helperText={nomError}
                                sx={{ marginBottom: '10px' }} // Add some bottom margin
                            />
                            <TextField
                                required // Add required prop
                                id="objectifusine"
                                label="Objectif Usine"
                                value={objectifusine}
                                onChange={handleObjectifusineChange}
                                variant="outlined"
                                error={!!objectifusineError}
                                helperText={objectifusineError}
                                sx={{ marginBottom: '10px' }} // Add some bottom margin
                            /><br></br>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={isprod}
                                        onChange={(e) => setIsprod(e.target.checked)}
                                        color="primary"
                                    />
                                }
                                label="Is Production"
                                sx={{ marginBottom: '10px' }} // Add some bottom margin
                            />
                        </div>
                        <Button
                            type="submit"
                            variant="contained"
                            style={{ backgroundColor: '#3366cc', color: 'white' }}
                            className=''
                        >
                            Add Usine
                        </Button>

                    </Box>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default AddUsine;

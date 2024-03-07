import React, { useState } from 'react';
import { Box, Button, Checkbox, FormControlLabel ,TextField} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';

const AddUsine = () => {
    const navigate = useNavigate();
    const [data, setData] = useState('');

    const [nom, setNom] = useState('');
    const [objectifusine, setObjectifusine] = useState('');
    const [isprod, setIsprod] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // Basic form validation
            if (!nom || !objectifusine) {
                alert('Please fill in all required fields.');
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
                setData(responseData);
                navigate("/usines/listUsines");
            } else {
                console.log("post failed");
            }
        } catch (error) {
            console.error('Post error:', error);
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
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div>
                            <TextField
                                required
                                id="nom"
                                label="Usine Name"
                                value={nom}
                                onChange={(e) => setNom(e.target.value)}
                                variant="outlined"
                                error={!nom && nom !== ''}
                                helperText={(!nom && nom !== '') ? 'Must not be empty' : ''}
                            />
                            <TextField
                                id="objectifusine"
                                label="Objectif Usine"
                                value={objectifusine}
                                onChange={(e) => setObjectifusine(e.target.value)}
                                variant="outlined"
                                error={!objectifusine && objectifusine !== ''}
                                helperText={!objectifusine && objectifusine !== '' && 'Must not be empty'}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={isprod}
                                        onChange={(e) => setIsprod(e.target.checked)}
                                        color="primary"
                                    />
                                }
                                label="Is Production"
                            />
                        </div>
                        <Button
                            type="submit"
                            variant="contained"
                            style={{ backgroundColor: '#3366cc', color: 'white', marginTop: '20px' }}
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

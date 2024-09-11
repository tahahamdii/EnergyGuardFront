import React from 'react';
import { TextField, Box } from '@mui/material';

interface PriceDetailsProps {
    formData: {
        prixkwh_jour: string;
        prixkwh_pointe: string;
        prixkwh_soir: string;
        prixkwh_nuit: string;
    };
    handleChange: (name: string, value: string) => void; // Adjusted signature
}

const PriceDetails: React.FC<PriceDetailsProps> = ({ formData, handleChange }) => {
    const handleInputChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        handleChange(name, e.target.value);
    };

    return (
        <Box display="flex" flexDirection="column">
            <TextField
                name="prixkwh_jour"
                label="Prix kWh Jour"
                value={formData.prixkwh_jour}
                onChange={handleInputChange('prixkwh_jour')}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                sx={{ mb: 2 }}
            />
            <TextField
                name="prixkwh_pointe"
                label="Prix kWh Pointe"
                value={formData.prixkwh_pointe}
                onChange={handleInputChange('prixkwh_pointe')}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                sx={{ mb: 2 }}
            />
            <TextField
                name="prixkwh_soir"
                label="Prix kWh Soir"
                value={formData.prixkwh_soir}
                onChange={handleInputChange('prixkwh_soir')}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                sx={{ mb: 2 }}
            />
            <TextField
                name="prixkwh_nuit"
                label="Prix kWh Nuit"
                value={formData.prixkwh_nuit}
                onChange={handleInputChange('prixkwh_nuit')}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                sx={{ mb: 2 }}
            />
        </Box>
    );
};

export default PriceDetails;

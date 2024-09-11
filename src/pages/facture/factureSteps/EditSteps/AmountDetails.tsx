import React, { useState, useEffect, ChangeEvent } from 'react';
import { TextField, Box } from '@mui/material';

interface AmountDetailsProps {
    formData: {
        montant_jour: string;
        montant_pointe: string;
        montant_soir: string;
        montant_nuit: string;
        montant_total: string;
    };
    handleInputChange: (name: string, value: string) => void;
}

const AmountDetails: React.FC<AmountDetailsProps> = ({ formData, handleInputChange }) => {
    const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});

    useEffect(() => {
        // No need to set formData here, as it's already passed through props
    }, [formData]);

    const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.getAttribute('data-name');
        const value = e.target.value;

        if (!name) return; // Ensure name is defined

        // Mark the field as touched
        setTouchedFields({ ...touchedFields, [name]: true });

        handleInputChange(name, value);
    };

    const isFieldValid = (value: string | undefined, touched: boolean) => {
        return touched ? !!value : true;
    };

    return (
        <Box display="flex" flexDirection="column">
            <TextField
                name="montant_jour"
                label="Montant Jour"
                value={formData.montant_jour}
                onChange={handleFieldChange}
                inputProps={{ 'data-name': 'montant_jour' }} // Add data-name attribute to identify the field
                required
                error={!isFieldValid(formData.montant_jour, touchedFields['montant_jour'])}
                helperText={!isFieldValid(formData.montant_jour, touchedFields['montant_jour']) && "Montant Jour is required"}
                sx={{ mb: 2 }}
            />
            <TextField
                name="montant_pointe"
                label="Montant Pointe"
                value={formData.montant_pointe}
                onChange={handleFieldChange}
                inputProps={{ 'data-name': 'montant_pointe' }}
                required
                error={!isFieldValid(formData.montant_pointe, touchedFields['montant_pointe'])}
                helperText={!isFieldValid(formData.montant_pointe, touchedFields['montant_pointe']) && "Montant Pointe is required"}
                sx={{ mb: 2 }}
            />
            <TextField
                name="montant_soir"
                label="Montant Soir"
                value={formData.montant_soir}
                onChange={handleFieldChange}
                inputProps={{ 'data-name': 'montant_soir' }}
                required
                error={!isFieldValid(formData.montant_soir, touchedFields['montant_soir'])}
                helperText={!isFieldValid(formData.montant_soir, touchedFields['montant_soir']) && "Montant Soir is required"}
                sx={{ mb: 2 }}
            />
            <TextField
                name="montant_nuit"
                label="Montant Nuit"
                value={formData.montant_nuit}
                onChange={handleFieldChange}
                inputProps={{ 'data-name': 'montant_nuit' }}
                required
                error={!isFieldValid(formData.montant_nuit, touchedFields['montant_nuit'])}
                helperText={!isFieldValid(formData.montant_nuit, touchedFields['montant_nuit']) && "Montant Nuit is required"}
                sx={{ mb: 2 }}
            />
            <TextField
                name="montant_total"
                label="Montant Total"
                value={formData.montant_total}
                onChange={handleFieldChange}
                inputProps={{ 'data-name': 'montant_total' }}
                required
                error={!isFieldValid(formData.montant_total, touchedFields['montant_total'])}
                helperText={!isFieldValid(formData.montant_total, touchedFields['montant_total']) && "Montant Total is required"}
                sx={{ mb: 2 }}
            />
        </Box>
    );
};

export default AmountDetails;

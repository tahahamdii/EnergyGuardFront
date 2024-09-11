import React, { ChangeEvent, useEffect, useState } from 'react';
import { TextField, Box } from '@mui/material';

interface BasicInformationProps {
    formData: {
        numfacture?: string;
        mois?: string;
        annee?: string;
        datefacture?: string;
        nom_facture?: string;
    };
    handleInputChange: (name: string, value: string) => void;
}

const BasicInformation: React.FC<BasicInformationProps> = ({ formData, handleInputChange }) => {
    const [localFormData, setLocalFormData] = useState(formData);

    useEffect(() => {
        setLocalFormData(formData);
    }, [formData]);

    const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (!name) return; // Ensure name is defined
        setLocalFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
        handleInputChange(name, value); // Pass name and value to handleInputChange
    };

    return (
        <Box display="flex" flexDirection="column">
            <TextField
                name="numfacture"
                label="Numéro Facture"
                value={localFormData.numfacture || ''}
                onChange={handleFieldChange}
                required
                sx={{ mb: 2 }}
            />
            <TextField
                name="mois"
                label="Mois"
                value={localFormData.mois || ''}
                onChange={handleFieldChange}
                required
                sx={{ mb: 2 }}
            />
            <TextField
                name="annee"
                label="Année"
                value={localFormData.annee || ''}
                onChange={handleFieldChange}
                sx={{ mb: 2 }}
            />
            <TextField
                name="datefacture"
                label="Date de Facture"
                type="date"
                value={localFormData.datefacture || ''}
                onChange={handleFieldChange}
                required
                InputLabelProps={{
                    shrink: true,
                }}
                sx={{ mb: 2 }}
            />
            <TextField
                name="nom_facture"
                label="Nom Facture"
                value={localFormData.nom_facture || ''}
                onChange={handleFieldChange}
                required
                sx={{ mb: 2 }}
            />
        </Box>
    );
};

export default BasicInformation;

import React, { ChangeEvent, useEffect, useState } from 'react';
import { TextField, Box } from '@mui/material';

interface SubscriptionDetailsProps {
    formData: {
        souscrite_jour: string;
        souscrite_pointete: string;
        souscrite_soir: string;
        souscrite_pointhiver: string;
        souscrite_reduite: string;
    };
    handleChange: (name: string, value: string) => void;
}

const SubscriptionDetails: React.FC<SubscriptionDetailsProps> = ({ formData, handleChange }) => {
    // Initialize local state to track changes
    const [localFormData, setLocalFormData] = useState(formData);

    // Synchronize local state with props whenever formData changes
    useEffect(() => {
        setLocalFormData(formData);
    }, [formData]);

    // Handle input field change
    const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // Update local state
        setLocalFormData(prevData => ({
            ...prevData,
            [name]: value
        }));

        // Propagate changes to parent component
        handleChange(name, value);
    };

    return (
        <Box display="flex" flexDirection="column">
            <TextField
                name="souscrite_jour"
                label="Souscrite Jour"
                value={localFormData.souscrite_jour}
                onChange={handleFieldChange}
                sx={{ mb: 2 }}
            />
            <TextField
                name="souscrite_pointete"
                label="Souscrite Pointete"
                value={localFormData.souscrite_pointete}
                onChange={handleFieldChange}
                sx={{ mb: 2 }}
            />
            <TextField
                name="souscrite_soir"
                label="Souscrite Soir"
                value={localFormData.souscrite_soir}
                onChange={handleFieldChange}
                sx={{ mb: 2 }}
            />
            <TextField
                name="souscrite_pointhiver"
                label="Souscrite Pointhiver"
                value={localFormData.souscrite_pointhiver}
                onChange={handleFieldChange}
                sx={{ mb: 2 }}
            />
            <TextField
                name="souscrite_reduite"
                label="Souscrite Reduite"
                value={localFormData.souscrite_reduite}
                onChange={handleFieldChange}
                sx={{ mb: 2 }}
            />
        </Box>
    );
};

export default SubscriptionDetails;

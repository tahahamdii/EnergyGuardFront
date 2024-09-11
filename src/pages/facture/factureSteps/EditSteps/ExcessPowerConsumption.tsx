import React, { useState, useEffect } from 'react';
import { TextField, Box } from '@mui/material';

interface ExcessPowerConsumptionProps {
  formData: {
    depassement_puissance_jour: string;
    depassement_puissance_pointete: string;
    depassement_puissance_soir: string;
    depassement_puissance_hiver: string;
    depassement_puissance_reduite: string;
  };
  handleInputChange: (name: string, value: string) => void;
}

const ExcessPowerConsumption: React.FC<ExcessPowerConsumptionProps> = ({ formData, handleInputChange }) => {
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

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
        name="depassement_puissance_jour"
        label="Dépassement Puissance Jour"
        value={formData.depassement_puissance_jour}
        onChange={handleFieldChange}
        required
        error={!isFieldValid(formData.depassement_puissance_jour, touchedFields['depassement_puissance_jour'])}
        helperText={!isFieldValid(formData.depassement_puissance_jour, touchedFields['depassement_puissance_jour']) && "Dépassement Puissance Jour is required"}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        sx={{ mb: 2 }}
      />
      <TextField
        name="depassement_puissance_pointete"
        label="Dépassement Puissance Pointete"
        value={formData.depassement_puissance_pointete}
        onChange={handleFieldChange}
        required
        error={!isFieldValid(formData.depassement_puissance_pointete, touchedFields['depassement_puissance_pointete'])}
        helperText={!isFieldValid(formData.depassement_puissance_pointete, touchedFields['depassement_puissance_pointete']) && "Dépassement Puissance Pointete is required"}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        sx={{ mb: 2 }}
      />
      <TextField
        name="depassement_puissance_soir"
        label="Dépassement Puissance Soir"
        value={formData.depassement_puissance_soir}
        onChange={handleFieldChange}
        required
        error={!isFieldValid(formData.depassement_puissance_soir, touchedFields['depassement_puissance_soir'])}
        helperText={!isFieldValid(formData.depassement_puissance_soir, touchedFields['depassement_puissance_soir']) && "Dépassement Puissance Soir is required"}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        sx={{ mb: 2 }}
      />
      <TextField
        name="depassement_puissance_hiver"
        label="Dépassement Puissance Hiver"
        value={formData.depassement_puissance_hiver}
        onChange={handleFieldChange}
        required
        error={!isFieldValid(formData.depassement_puissance_hiver, touchedFields['depassement_puissance_hiver'])}
        helperText={!isFieldValid(formData.depassement_puissance_hiver, touchedFields['depassement_puissance_hiver']) && "Dépassement Puissance Hiver is required"}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        sx={{ mb: 2 }}
      />
      <TextField
        name="depassement_puissance_reduite"
        label="Dépassement Puissance Reduite"
        value={formData.depassement_puissance_reduite}
        onChange={handleFieldChange}
        required
        error={!isFieldValid(formData.depassement_puissance_reduite, touchedFields['depassement_puissance_reduite'])}
        helperText={!isFieldValid(formData.depassement_puissance_reduite, touchedFields['depassement_puissance_reduite']) && "Dépassement Puissance Reduite is required"}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        sx={{ mb: 2 }}
      />
    </Box>
  );
};

export default ExcessPowerConsumption;

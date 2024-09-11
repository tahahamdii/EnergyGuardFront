import React, { useState, useEffect } from 'react';
import { TextField, Box } from '@mui/material';

interface ConsumptionDetailsProps {
  formData: {
    consommation_jour: string;
    consommation_pointe: string;
    consommation_soir: string;
    consommation_nuit: string;
    consommation_total: string;
  };
  handleInputChange: (name: string, value: string) => void;
}

const ConsumptionDetails: React.FC<ConsumptionDetailsProps> = ({ formData, handleInputChange }) => {
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // No need to set formData here, as it's already passed through props
  }, [formData]);

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
        name="consommation_jour"
        label="Consommation Jour"
        value={formData.consommation_jour}
        onChange={handleFieldChange}
        required
        error={!isFieldValid(formData.consommation_jour, touchedFields['consommation_jour'])}
        helperText={!isFieldValid(formData.consommation_jour, touchedFields['consommation_jour']) && "Consommation Jour is required"}
        sx={{ mb: 2 }}
      />
      <TextField
        name="consommation_pointe"
        label="Consommation Pointe"
        value={formData.consommation_pointe}
        onChange={handleFieldChange}
        required
        error={!isFieldValid(formData.consommation_pointe, touchedFields['consommation_pointe'])}
        helperText={!isFieldValid(formData.consommation_pointe, touchedFields['consommation_pointe']) && "Consommation Pointe is required"}
        sx={{ mb: 2 }}
      />
      <TextField
        name="consommation_soir"
        label="Consommation Soir"
        value={formData.consommation_soir}
        onChange={handleFieldChange}
        required
        error={!isFieldValid(formData.consommation_soir, touchedFields['consommation_soir'])}
        helperText={!isFieldValid(formData.consommation_soir, touchedFields['consommation_soir']) && "Consommation Soir is required"}
        sx={{ mb: 2 }}
      />
      <TextField
        name="consommation_nuit"
        label="Consommation Nuit"
        value={formData.consommation_nuit}
        onChange={handleFieldChange}
        required
        error={!isFieldValid(formData.consommation_nuit, touchedFields['consommation_nuit'])}
        helperText={!isFieldValid(formData.consommation_nuit, touchedFields['consommation_nuit']) && "Consommation Nuit is required"}
        sx={{ mb: 2 }}
      />
      <TextField
        name="consommation_total"
        label="Consommation Total"
        value={formData.consommation_total}
        onChange={handleFieldChange}
        required
        error={!isFieldValid(formData.consommation_total, touchedFields['consommation_total'])}
        helperText={!isFieldValid(formData.consommation_total, touchedFields['consommation_total']) && "Consommation Total is required"}
        sx={{ mb: 2 }}
      />
    </Box>
  );
};

export default ConsumptionDetails;

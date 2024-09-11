import React, { useState } from 'react';
import { TextField, Box } from '@mui/material';

interface AmountDetailsProps {
  formData: {
    montant_jour: string;
    montant_pointe: string;
    montant_soir: string;
    montant_nuit: string;
    montant_total: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AmountDetails: React.FC<AmountDetailsProps> = ({ formData, handleChange }) => {
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Mark the field as touched
    setTouchedFields({ ...touchedFields, [name]: true });

    handleChange(e);
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
        onChange={handleInputChange}
        required
        error={!isFieldValid(formData.montant_jour, touchedFields['montant_jour'])}
        helperText={!isFieldValid(formData.montant_jour, touchedFields['montant_jour']) && "Montant Jour is required"}
        sx={{ mb: 2 }}
      />
      <TextField
        name="montant_pointe"
        label="Montant Pointe"
        value={formData.montant_pointe}
        onChange={handleInputChange}
        required
        error={!isFieldValid(formData.montant_pointe, touchedFields['montant_pointe'])}
        helperText={!isFieldValid(formData.montant_pointe, touchedFields['montant_pointe']) && "Montant Pointe is required"}
        sx={{ mb: 2 }}
      />
      <TextField
        name="montant_soir"
        label="Montant Soir"
        value={formData.montant_soir}
        onChange={handleInputChange}
        required
        error={!isFieldValid(formData.montant_soir, touchedFields['montant_soir'])}
        helperText={!isFieldValid(formData.montant_soir, touchedFields['montant_soir']) && "Montant Soir is required"}
        sx={{ mb: 2 }}
      />
      <TextField
        name="montant_nuit"
        label="Montant Nuit"
        value={formData.montant_nuit}
        onChange={handleInputChange}
        required
        error={!isFieldValid(formData.montant_nuit, touchedFields['montant_nuit'])}
        helperText={!isFieldValid(formData.montant_nuit, touchedFields['montant_nuit']) && "Montant Nuit is required"}
        sx={{ mb: 2 }}
      />
      <TextField
        name="montant_total"
        label="Montant Total"
        value={formData.montant_total}
        onChange={handleInputChange}
        required
        error={!isFieldValid(formData.montant_total, touchedFields['montant_total'])}
        helperText={!isFieldValid(formData.montant_total, touchedFields['montant_total']) && "Montant Total is required"}
        sx={{ mb: 2 }}
      />
    </Box>
  );
};

export default AmountDetails;

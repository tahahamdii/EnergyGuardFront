import React, { useState } from 'react';
import { TextField, Box } from '@mui/material';

interface PriceDetailsProps {
  formData: {
    prixkwh_jour: string;
    prixkwh_pointe: string;
    prixkwh_soir: string;
    prixkwh_nuit: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PriceDetails: React.FC<PriceDetailsProps> = ({ formData, handleChange }) => {
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  const validateField = (value: string | undefined): boolean => {
    return value !== undefined && value !== null && value !== '';
};

  const handleBlur = (name: string) => {
    setTouchedFields((prevTouchedFields) => new Set(prevTouchedFields).add(name));
  };

  const shouldDisplayError = (name: string): boolean => {
    return touchedFields.has(name);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const pattern = /[0-9.]/;
    const inputChar = String.fromCharCode(e.charCode);
    if (!pattern.test(inputChar)) {
      e.preventDefault();
    }
  };

  return (
    <Box display="flex" flexDirection="column">
      <TextField
        name="prixkwh_jour"
        label="Prix kWh Jour"
        value={formData.prixkwh_jour}
        onChange={handleChange}
        onBlur={() => handleBlur('prixkwh_jour')}
        required
        error={!validateField(formData.prixkwh_jour) && shouldDisplayError('prixkwh_jour')}
        helperText={!validateField(formData.prixkwh_jour) && shouldDisplayError('prixkwh_jour') && "Prix kWh Jour is required"}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        onKeyPress={handleKeyPress}
        sx={{ mb: 2 }}
      />
      <TextField
        name="prixkwh_pointe"
        label="Prix kWh Pointe"
        value={formData.prixkwh_pointe}
        onChange={handleChange}
        onBlur={() => handleBlur('prixkwh_pointe')}
        required
        error={!validateField(formData.prixkwh_pointe) && shouldDisplayError('prixkwh_pointe')}
        helperText={!validateField(formData.prixkwh_pointe) && shouldDisplayError('prixkwh_pointe') && "Prix kWh Pointe is required"}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        onKeyPress={handleKeyPress}
        sx={{ mb: 2 }}
      />
      <TextField
        name="prixkwh_soir"
        label="Prix kWh Soir"
        value={formData.prixkwh_soir}
        onChange={handleChange}
        onBlur={() => handleBlur('prixkwh_soir')}
        required
        error={!validateField(formData.prixkwh_soir) && shouldDisplayError('prixkwh_soir')}
        helperText={!validateField(formData.prixkwh_soir) && shouldDisplayError('prixkwh_soir') && "Prix kWh Soir is required"}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        onKeyPress={handleKeyPress}
        sx={{ mb: 2 }}
      />
      <TextField
        name="prixkwh_nuit"
        label="Prix kWh Nuit"
        value={formData.prixkwh_nuit}
        onChange={handleChange}
        onBlur={() => handleBlur('prixkwh_nuit')}
        required
        error={!validateField(formData.prixkwh_nuit) && shouldDisplayError('prixkwh_nuit')}
        helperText={!validateField(formData.prixkwh_nuit) && shouldDisplayError('prixkwh_nuit') && "Prix kWh Nuit is required"}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        onKeyPress={handleKeyPress}
        sx={{ mb: 2 }}
      />
    </Box>
  );
};

export default PriceDetails;

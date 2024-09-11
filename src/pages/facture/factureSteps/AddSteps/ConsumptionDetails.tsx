import React, { useState } from 'react';
import { TextField, Box } from '@mui/material';

interface ConsumptionDetailsProps {
  formData: {
    consommation_jour: string;
    consommation_pointe: string;
    consommation_soir: string;
    consommation_nuit: string;
    consommation_total: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ConsumptionDetails: React.FC<ConsumptionDetailsProps> = ({ formData, handleChange }) => {
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  const validateField = (value: string | undefined): boolean => {
    return (value ?? '').trim() !== '';
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
        name="consommation_jour"
        label="Consommation Jour"
        value={formData.consommation_jour}
        onChange={handleChange}
        onBlur={() => handleBlur('consommation_jour')}
        required
        error={!validateField(formData.consommation_jour) && shouldDisplayError('consommation_jour')}
        helperText={!validateField(formData.consommation_jour) && shouldDisplayError('consommation_jour') && "Consommation Jour is required"}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        onKeyPress={handleKeyPress}
        sx={{ mb: 2 }}
      />
      <TextField
        name="consommation_pointe"
        label="Consommation Pointe"
        value={formData.consommation_pointe}
        onChange={handleChange}
        onBlur={() => handleBlur('consommation_pointe')}
        required
        error={!validateField(formData.consommation_pointe) && shouldDisplayError('consommation_pointe')}
        helperText={!validateField(formData.consommation_pointe) && shouldDisplayError('consommation_pointe') && "Consommation Pointe is required"}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        onKeyPress={handleKeyPress}
        sx={{ mb: 2 }}
      />
      <TextField
        name="consommation_soir"
        label="Consommation Soir"
        value={formData.consommation_soir}
        onChange={handleChange}
        onBlur={() => handleBlur('consommation_soir')}
        required
        error={!validateField(formData.consommation_soir) && shouldDisplayError('consommation_soir')}
        helperText={!validateField(formData.consommation_soir) && shouldDisplayError('consommation_soir') && "Consommation Soir is required"}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        onKeyPress={handleKeyPress}
        sx={{ mb: 2 }}
      />
      <TextField
        name="consommation_nuit"
        label="Consommation Nuit"
        value={formData.consommation_nuit}
        onChange={handleChange}
        onBlur={() => handleBlur('consommation_nuit')}
        required
        error={!validateField(formData.consommation_nuit) && shouldDisplayError('consommation_nuit')}
        helperText={!validateField(formData.consommation_nuit) && shouldDisplayError('consommation_nuit') && "Consommation Nuit is required"}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        onKeyPress={handleKeyPress}
        sx={{ mb: 2 }}
      />
      <TextField
        name="consommation_total"
        label="Consommation Total"
        value={formData.consommation_total}
        onChange={handleChange}
        onBlur={() => handleBlur('consommation_total')}
        required
        error={!validateField(formData.consommation_total) && shouldDisplayError('consommation_total')}
        helperText={!validateField(formData.consommation_total) && shouldDisplayError('consommation_total') && "Consommation Total is required"}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        onKeyPress={handleKeyPress}
        sx={{ mb: 2 }}
      />
    </Box>
  );
};

export default ConsumptionDetails;

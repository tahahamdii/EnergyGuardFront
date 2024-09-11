import React, { useState } from 'react';
import { TextField, Box } from '@mui/material';

interface PowerDetailsProps {
  formData: {
    puissanceinstalle: string;
    cosphi: string;
    coefk: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PowerDetails: React.FC<PowerDetailsProps> = ({ formData, handleChange }) => {
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
        name="puissanceinstalle"
        label="Puissance Installée"
        value={formData.puissanceinstalle}
        onChange={handleChange}
        onBlur={() => handleBlur('puissanceinstalle')}
        required
        error={!validateField(formData.puissanceinstalle) && shouldDisplayError('puissanceinstalle')}
        helperText={!validateField(formData.puissanceinstalle) && shouldDisplayError('puissanceinstalle') && "Puissance Installée is required"}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        onKeyPress={handleKeyPress}
        sx={{ mb: 2 }}
      />
      <TextField
        name="cosphi"
        label="Cos Phi"
        value={formData.cosphi}
        onChange={handleChange}
        onBlur={() => handleBlur('cosphi')}
        required
        error={!validateField(formData.cosphi) && shouldDisplayError('cosphi')}
        helperText={!validateField(formData.cosphi) && shouldDisplayError('cosphi') && "Cos Phi is required"}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        onKeyPress={handleKeyPress}
        sx={{ mb: 2 }}
      />
      <TextField
        name="coefk"
        label="Coefficient K"
        value={formData.coefk}
        onChange={handleChange}
        onBlur={() => handleBlur('coefk')}
        required
        error={!validateField(formData.coefk) && shouldDisplayError('coefk')}
        helperText={!validateField(formData.coefk) && shouldDisplayError('coefk') && "Coefficient K is required"}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        onKeyPress={handleKeyPress}
        sx={{ mb: 2 }}
      />
    </Box>
  );
};

export default PowerDetails;

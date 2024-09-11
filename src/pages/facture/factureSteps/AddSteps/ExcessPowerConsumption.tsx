import React, { useState } from 'react';
import { TextField, Box } from '@mui/material';

interface ExcessPowerConsumptionProps {
  formData?: {
    depassement_puissance_jour?: string;
    depassement_puissance_pointete?: string;
    depassement_puissance_soir?: string;
    depassement_puissance_hiver?: string;
    depassement_puissance_reduite?: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ExcessPowerConsumption: React.FC<ExcessPowerConsumptionProps> = ({ formData = {}, handleChange }) => {
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
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(e.charCode);
    if (!pattern.test(inputChar)) {
      e.preventDefault();
    }
  };

  return (
    <Box display="flex" flexDirection="column">
      <TextField
        name="depassement_puissance_jour"
        label="Dépassement Puissance Jour"
        value={formData?.depassement_puissance_jour || ''}
        onChange={handleChange}
        onBlur={() => handleBlur('depassement_puissance_jour')}
        required
        error={!validateField(formData?.depassement_puissance_jour) && shouldDisplayError('depassement_puissance_jour')}
        helperText={!validateField(formData?.depassement_puissance_jour) && shouldDisplayError('depassement_puissance_jour') && "Dépassement Puissance Jour is required"}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        onKeyPress={handleKeyPress}
        sx={{ mb: 2 }}
      />
      <TextField
        name="depassement_puissance_pointete"
        label="Dépassement Puissance Pointete"
        value={formData?.depassement_puissance_pointete || ''}
        onChange={handleChange}
        onBlur={() => handleBlur('depassement_puissance_pointete')}
        required
        error={!validateField(formData?.depassement_puissance_pointete) && shouldDisplayError('depassement_puissance_pointete')}
        helperText={!validateField(formData?.depassement_puissance_pointete) && shouldDisplayError('depassement_puissance_pointete') && "Dépassement Puissance Pointete is required"}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        onKeyPress={handleKeyPress}
        sx={{ mb: 2 }}
      />
      <TextField
        name="depassement_puissance_soir"
        label="Dépassement Puissance Soir"
        value={formData?.depassement_puissance_soir || ''}
        onChange={handleChange}
        onBlur={() => handleBlur('depassement_puissance_soir')}
        required
        error={!validateField(formData?.depassement_puissance_soir) && shouldDisplayError('depassement_puissance_soir')}
        helperText={!validateField(formData?.depassement_puissance_soir) && shouldDisplayError('depassement_puissance_soir') && "Dépassement Puissance Soir is required"}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        onKeyPress={handleKeyPress}
        sx={{ mb: 2 }}
      />
      <TextField
        name="depassement_puissance_hiver"
        label="Dépassement Puissance Hiver"
        value={formData?.depassement_puissance_hiver || ''}
        onChange={handleChange}
        onBlur={() => handleBlur('depassement_puissance_hiver')}
        required
        error={!validateField(formData?.depassement_puissance_hiver) && shouldDisplayError('depassement_puissance_hiver')}
        helperText={!validateField(formData?.depassement_puissance_hiver) && shouldDisplayError('depassement_puissance_hiver') && "Dépassement Puissance Hiver is required"}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        onKeyPress={handleKeyPress}
        sx={{ mb: 2 }}
      />
      <TextField
        name="depassement_puissance_reduite"
        label="Dépassement Puissance Reduite"
        value={formData?.depassement_puissance_reduite || ''}
        onChange={handleChange}
        onBlur={() => handleBlur('depassement_puissance_reduite')}
        required
        error={!validateField(formData?.depassement_puissance_reduite) && shouldDisplayError('depassement_puissance_reduite')}
        helperText={!validateField(formData?.depassement_puissance_reduite) && shouldDisplayError('depassement_puissance_reduite') && "Dépassement Puissance Reduite is required"}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        onKeyPress={handleKeyPress}
        sx={{ mb: 2 }}
      />
    </Box>
  );
};

export default ExcessPowerConsumption;

import React, { useState } from 'react';
import { TextField, Box } from '@mui/material';

interface MaximumDemandProps {
  formData: {
    maxiappelee_jour: string;
    maxiappelee_pointete: string;
    maxiappelee_soir: string;
    maxiappelee_pointehiver: string;
    maxiappelee_reduite: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MaximumDemand: React.FC<MaximumDemandProps> = ({ formData, handleChange }) => {
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
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(e.charCode);
    if (!pattern.test(inputChar)) {
      e.preventDefault();
    }
  };

  return (
    <Box display="flex" flexDirection="column">
      <TextField
        name="maxiappelee_jour"
        label="Maxiappelée Jour"
        value={formData.maxiappelee_jour}
        onChange={handleChange}
        onBlur={() => handleBlur('maxiappelee_jour')}
        required
        error={!validateField(formData.maxiappelee_jour) && shouldDisplayError('maxiappelee_jour')}
        helperText={!validateField(formData.maxiappelee_jour) && shouldDisplayError('maxiappelee_jour') && "Maxiappelée Jour is required"}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        onKeyPress={handleKeyPress}
        sx={{ mb: 2 }}
      />
      <TextField
        name="maxiappelee_pointete"
        label="Maxiappelée Pointete"
        value={formData.maxiappelee_pointete}
        onChange={handleChange}
        onBlur={() => handleBlur('maxiappelee_pointete')}
        required
        error={!validateField(formData.maxiappelee_pointete) && shouldDisplayError('maxiappelee_pointete')}
        helperText={!validateField(formData.maxiappelee_pointete) && shouldDisplayError('maxiappelee_pointete') && "Maxiappelée Pointete is required"}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        onKeyPress={handleKeyPress}
        sx={{ mb: 2 }}
      />
      <TextField
        name="maxiappelee_soir"
        label="Maxiappelée Soir"
        value={formData.maxiappelee_soir}
        onChange={handleChange}
        onBlur={() => handleBlur('maxiappelee_soir')}
        required
        error={!validateField(formData.maxiappelee_soir) && shouldDisplayError('maxiappelee_soir')}
        helperText={!validateField(formData.maxiappelee_soir) && shouldDisplayError('maxiappelee_soir') && "Maxiappelée Soir is required"}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        onKeyPress={handleKeyPress}
        sx={{ mb: 2 }}
      />
      <TextField
        name="maxiappelee_pointehiver"
        label="Maxiappelée Pointhiver"
        value={formData.maxiappelee_pointehiver}
        onChange={handleChange}
        onBlur={() => handleBlur('maxiappelee_pointehiver')}
        required
        error={!validateField(formData.maxiappelee_pointehiver) && shouldDisplayError('maxiappelee_pointehiver')}
        helperText={!validateField(formData.maxiappelee_pointehiver) && shouldDisplayError('maxiappelee_pointehiver') && "Maxiappelée Pointhiver is required"}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        onKeyPress={handleKeyPress}
        sx={{ mb: 2 }}
      />
      <TextField
        name="maxiappelee_reduite"
        label="Maxiappelée Reduite"
        value={formData.maxiappelee_reduite}
        onChange={handleChange}
        onBlur={() => handleBlur('maxiappelee_reduite')}
        required
        error={!validateField(formData.maxiappelee_reduite) && shouldDisplayError('maxiappelee_reduite')}
        helperText={!validateField(formData.maxiappelee_reduite) && shouldDisplayError('maxiappelee_reduite') && "Maxiappelée Reduite is required"}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        onKeyPress={handleKeyPress}
        sx={{ mb: 2 }}
      />
    </Box>
  );
};

export default MaximumDemand;

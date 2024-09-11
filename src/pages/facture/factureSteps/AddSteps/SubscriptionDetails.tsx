import React, { ChangeEvent, useState } from 'react';
import { TextField, Box } from '@mui/material';

interface SubscriptionDetailsProps {
  formData: {
    souscrite_jour: string;
    souscrite_pointete: string;
    souscrite_soir: string;
    souscrite_pointhiver: string;
    souscrite_reduite: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SubscriptionDetails: React.FC<SubscriptionDetailsProps> = ({ formData, handleChange }) => {
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
        name="souscrite_jour"
        label="Souscrite Jour"
        value={formData.souscrite_jour}
        onChange={handleChange}
        onBlur={() => handleBlur('souscrite_jour')}
        required
        error={!validateField(formData.souscrite_jour) && shouldDisplayError('souscrite_jour')}
        helperText={!validateField(formData.souscrite_jour) && shouldDisplayError('souscrite_jour') && "Souscrite Jour is required"}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        onKeyPress={handleKeyPress}
        sx={{ mb: 2 }}
      />
      <TextField
        name="souscrite_pointete"
        label="Souscrite Pointete"
        value={formData.souscrite_pointete}
        onChange={handleChange}
        onBlur={() => handleBlur('souscrite_pointete')}
        required
        error={!validateField(formData.souscrite_pointete) && shouldDisplayError('souscrite_pointete')}
        helperText={!validateField(formData.souscrite_pointete) && shouldDisplayError('souscrite_pointete') && "Souscrite Pointete is required"}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        onKeyPress={handleKeyPress}
        sx={{ mb: 2 }}
      />
      <TextField
        name="souscrite_soir"
        label="Souscrite Soir"
        value={formData.souscrite_soir}
        onChange={handleChange}
        onBlur={() => handleBlur('souscrite_soir')}
        required
        error={!validateField(formData.souscrite_soir) && shouldDisplayError('souscrite_soir')}
        helperText={!validateField(formData.souscrite_soir) && shouldDisplayError('souscrite_soir') && "Souscrite Soir is required"}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        onKeyPress={handleKeyPress}
        sx={{ mb: 2 }}
      />
      <TextField
        name="souscrite_pointhiver"
        label="Souscrite Pointhiver"
        value={formData.souscrite_pointhiver}
        onChange={handleChange}
        onBlur={() => handleBlur('souscrite_pointhiver')}
        required
        error={!validateField(formData.souscrite_pointhiver) && shouldDisplayError('souscrite_pointhiver')}
        helperText={!validateField(formData.souscrite_pointhiver) && shouldDisplayError('souscrite_pointhiver') && "Souscrite Pointhiver is required"}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        onKeyPress={handleKeyPress}
        sx={{ mb: 2 }}
      />
      <TextField
        name="souscrite_reduite"
        label="Souscrite Reduite"
        value={formData.souscrite_reduite}
        onChange={handleChange}
        onBlur={() => handleBlur('souscrite_reduite')}
        required
        error={!validateField(formData.souscrite_reduite) && shouldDisplayError('souscrite_reduite')}
        helperText={!validateField(formData.souscrite_reduite) && shouldDisplayError('souscrite_reduite') && "Souscrite Reduite is required"}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        onKeyPress={handleKeyPress}
        sx={{ mb: 2 }}
      />
    </Box>
  );
};

export default SubscriptionDetails;

import React from 'react';
import { TextField, Box } from '@mui/material';

interface PowerDetailsProps {
  formData: {
    puissanceinstalle: string;
    cosphi: string;
    coefk: string;
  };
  handleChange: (name: string, value: string) => void;
}

const PowerDetails: React.FC<PowerDetailsProps> = ({ formData, handleChange }) => {
  const handleInputChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(name, e.target.value);
  };

  return (
      <Box display="flex" flexDirection="column">
        <TextField
            name="puissanceinstalle"
            label="Puissance Installée (kW)"
            value={formData.puissanceinstalle}
            onChange={handleInputChange('puissanceinstalle')}
            sx={{ mb: 2 }}
        />
        <TextField
            name="cosphi"
            label="Cos Phi"
            value={formData.cosphi}
            onChange={handleInputChange('cosphi')}
            sx={{ mb: 2 }}
        />
        <TextField
            name="coefk"
            label="Coefficient K"
            value={formData.coefk}
            onChange={handleInputChange('coefk')}
            sx={{ mb: 2 }}
        />
      </Box>
  );
};

export default PowerDetails;

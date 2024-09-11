import React, { ChangeEvent, useState } from 'react';
import { TextField, Box } from '@mui/material';

interface BasicInformationProps {
    formData: {
      [key: string]: string;
      numfacture: string;
      mois: string;
      annee: string;
      datefacture: string;
      nom_facture: string;
      fichier: string;
    };
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    updateValidationStatus: (name: string, isValid: boolean) => void;
}

const BasicInformation: React.FC<BasicInformationProps> = ({ formData, handleChange, updateValidationStatus }) => {
    const currentYear = new Date().getFullYear();
    const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

    const validateField = (name: string, value: string): boolean => {
        switch (name) {
            case 'numfacture':
                return (value ?? '').trim() !== '';
            case 'mois':
                const month = parseInt(value ?? '');
                return !isNaN(month) && month >= 1 && month <= 12;
            case 'annee':
                const year = parseInt(value ?? '');
                return !isNaN(year) && year >= 1900 && year <= currentYear;
            default:
                return true; 
        }
    };

    const handleBlur = (name: string) => {
        setTouchedFields((prevTouchedFields) => new Set(prevTouchedFields).add(name));
    };

    const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
    
        if (name === 'fichier') {
          const file = e.target.files?.[0];
          if (file) {
            try {
              const base64 = await convertToBase64(file);
              handleChange({ target: { name, value: base64 } } as ChangeEvent<HTMLInputElement>);
            } catch (error) {
              console.error('Error converting file to base64:', error);
            }
          }
        } else {
          handleChange(e);
        }
    }


    const shouldDisplayError = (name: string): boolean => {
        return touchedFields.has(name);
    };

    return (
        <Box display="flex" flexDirection="column">
            <TextField
                name="numfacture"
                label="Numéro Facture"
                value={formData.numfacture}
                onChange={handleInputChange}
                onBlur={() => handleBlur('numfacture')}
                required
                error={!validateField('numfacture', formData.numfacture) && shouldDisplayError('numfacture')}
                helperText={(formData.numfacture ?? '').trim() === '' && shouldDisplayError('numfacture') && "Numéro Facture is required"}
                sx={{ mb: 2 }}
            />
            <TextField
                name="mois"
                label="Mois"
                value={formData.mois}
                onChange={handleInputChange}
                onBlur={() => handleBlur('mois')}
                required
                error={!validateField('mois', formData.mois) && shouldDisplayError('mois')}
                helperText={(formData.mois ?? '').trim() === '' || (!validateField('mois', formData.mois) && shouldDisplayError('mois')) ? "Enter a valid month (1-12)" : ''}
                sx={{ mb: 2 }}
            />
            <TextField
                name="annee"
                label="Année"
                value={formData.annee || currentYear.toString()} 
                onChange={handleInputChange} 
                onBlur={() => handleBlur('annee')}
                sx={{ mb: 2 }}
            />
            <TextField
                name="datefacture"
                label="Date de Facture"
                type="date"
                value={formData.datefacture}
                onChange={handleInputChange}
                onBlur={() => handleBlur('datefacture')}
                required
                error={!validateField('datefacture', formData.datefacture) && shouldDisplayError('datefacture')}
                helperText={(formData.datefacture ?? '').trim() === '' && shouldDisplayError('datefacture') && "Date de Facture is required"}
                InputLabelProps={{
                    shrink: true,
                }}
                sx={{ mb: 2 }}
            />
            <TextField
                name="nom_facture"
                label="Nom Facture"
                value={formData.nom_facture}
                onChange={handleInputChange}
                onBlur={() => handleBlur('nom_facture')}
                required
                error={!validateField('nom_facture', formData.nom_facture) && shouldDisplayError('nom_facture')}
                helperText={(formData.nom_facture ?? '').trim() === '' && shouldDisplayError('nom_facture') && "Nom Facture is required"}
                sx={{ mb: 2 }}
            />
        </Box>
    );
};


function convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        if (typeof fileReader.result === 'string') {
          resolve(fileReader.result);
        } else {
          reject(new Error('Failed to read file as data URL'));
        }
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }
  

export default BasicInformation;

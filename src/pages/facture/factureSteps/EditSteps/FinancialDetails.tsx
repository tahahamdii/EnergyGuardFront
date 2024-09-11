import React, { useState } from 'react';
import { TextField } from '@mui/material';

interface FinancialDetailsProps {
  formData: {
    bonfincation: string;
    penalite: string;
    totala: string;
    prime_puissance: string;
    depassement_puissance: string;
    location_materiel: string;
    frais_intervention: string;
    frais_relance: string;
    frais_retard: string;
    totalb: string;
    tva_consommation: string;
    tva_redevance: string;
    contribution_rtt: string;
    surtaxminicipale: string;
    totalc: string;
    avance_consomation: string;
    neta_payer: string;
    consommation_cible_mois: string;
  };
  handleChange: (name: string, value: string) => void;
}

const FinancialDetails: React.FC<FinancialDetailsProps> = ({ formData, handleChange }) => {
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});

  const isNumericInput = (value: string): boolean => {
    return /^\d*\.?\d*$/.test(value);
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const isValidInput = isNumericInput(value);

    setTouchedFields({ ...touchedFields, [name]: true });

    if (isValidInput || value === '') {
      handleChange(name, value);
    }
  };

  return (
    <>
      <TextField
        name="bonfincation"
        label="Bonfincation"
        value={formData.bonfincation}
        onChange={handleFieldChange}
        required
        error={touchedFields['bonfincation'] && (!formData.bonfincation || !isNumericInput(formData.bonfincation))}
        helperText={touchedFields['bonfincation'] && ((!formData.bonfincation && "This field is required") || (!isNumericInput(formData.bonfincation) && "Please enter a valid number"))}
      />
      <TextField
        name="penalite"
        label="Pénalité"
        value={formData.penalite}
        onChange={handleFieldChange}
        required
        error={touchedFields['penalite'] && (!formData.penalite || !isNumericInput(formData.penalite))}
        helperText={touchedFields['penalite'] && ((!formData.penalite && "This field is required") || (!isNumericInput(formData.penalite) && "Please enter a valid number"))}
      />
      <TextField
        name="totala"
        label="Total A"
        value={formData.totala}
        onChange={handleFieldChange}
        required
      />
      <TextField
        name="prime_puissance"
        label="Prime Puissance"
        value={formData.prime_puissance}
        onChange={handleFieldChange}
        required
      />
      <TextField
        name="depassement_puissance"
        label="Dépassement Puissance"
        value={formData.depassement_puissance}
        onChange={handleFieldChange}
        required
      />
      <TextField
        name="location_materiel"
        label="Location Matériel"
        value={formData.location_materiel}
        onChange={handleFieldChange}
        required
      />
      <TextField
        name="frais_intervention"
        label="Frais Intervention"
        value={formData.frais_intervention}
        onChange={handleFieldChange}
        required
      />
      <TextField
        name="frais_relance"
        label="Frais Relance"
        value={formData.frais_relance}
        onChange={handleFieldChange}
        required
      />
      <TextField
        name="frais_retard"
        label="Frais Retard"
        value={formData.frais_retard}
        onChange={handleFieldChange}
        required
      />
      <TextField
        name="totalb"
        label="Total B"
        value={formData.totalb}
        onChange={handleFieldChange}
        required
      />
      <TextField
        name="tva_consommation"
        label="TVA Consommation"
        value={formData.tva_consommation}
        onChange={handleFieldChange}
        required
      />
      <TextField
        name="tva_redevance"
        label="TVA Redevance"
        value={formData.tva_redevance}
        onChange={handleFieldChange}
        required
      />
      <TextField
        name="contribution_rtt"
        label="Contribution RTT"
        value={formData.contribution_rtt}
        onChange={handleFieldChange}
        required
      />
      <TextField
        name="surtaxminicipale"
        label="Surtaxminicipale"
        value={formData.surtaxminicipale}
        onChange={handleFieldChange}
        required
      />
      <TextField
        name="totalc"
        label="Total C"
        value={formData.totalc}
        onChange={handleFieldChange}
        required
      />
      <TextField
        name="avance_consomation"
        label="Avance Consommation"
        value={formData.avance_consomation}
        onChange={handleFieldChange}
        required
      />
      <TextField
        name="neta_payer"
        label="Net à Payer"
        value={formData.neta_payer}
        onChange={handleFieldChange}
        required
      />
      <TextField
        name="consommation_cible_mois"
        label="Consommation Cible Mois"
        value={formData.consommation_cible_mois}
        onChange={handleFieldChange}
        required
      />
    </>
  );
};

export default FinancialDetails;

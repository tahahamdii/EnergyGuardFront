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
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FinancialDetails: React.FC<FinancialDetailsProps> = ({ formData, handleChange }) => {
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});

  const isNumericInput = (value: string): boolean => {
    return /^\d*\.?\d*$/.test(value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const isValidInput = isNumericInput(value);

    setTouchedFields({ ...touchedFields, [name]: true });

    if (isValidInput || value === '') {
      handleChange(e);
    }
  };

  return (
    <>
      <TextField
        name="bonfincation"
        label="Bonfincation"
        value={formData.bonfincation}
        onChange={handleInputChange}
        required
        error={touchedFields['bonfincation'] && (!formData.bonfincation || !isNumericInput(formData.bonfincation))}
        helperText={touchedFields['bonfincation'] && ((!formData.bonfincation && "This field is required") || (!isNumericInput(formData.bonfincation) && "Please enter a valid number"))}
      />
      <TextField
        name="penalite"
        label="Pénalité"
        value={formData.penalite}
        onChange={handleInputChange}
        required
        error={touchedFields['penalite'] && (!formData.penalite || !isNumericInput(formData.penalite))}
        helperText={touchedFields['penalite'] && ((!formData.penalite && "This field is required") || (!isNumericInput(formData.penalite) && "Please enter a valid number"))}
      />
      <TextField
        name="totala"
        label="Total A"
        value={formData.totala}
        onChange={handleChange}
        required
      />
      <TextField
        name="prime_puissance"
        label="Prime Puissance"
        value={formData.prime_puissance}
        onChange={handleChange}
        required
      />
      <TextField
        name="depassement_puissance"
        label="Dépassement Puissance"
        value={formData.depassement_puissance}
        onChange={handleChange}
        required
      />
      <TextField
        name="location_materiel"
        label="Location Matériel"
        value={formData.location_materiel}
        onChange={handleChange}
        required
      />
      <TextField
        name="frais_intervention"
        label="Frais Intervention"
        value={formData.frais_intervention}
        onChange={handleChange}
        required
      />
      <TextField
        name="frais_relance"
        label="Frais Relance"
        value={formData.frais_relance}
        onChange={handleChange}
        required
      />
      <TextField
        name="frais_retard"
        label="Frais Retard"
        value={formData.frais_retard}
        onChange={handleChange}
        required
      />
      <TextField
        name="totalb"
        label="Total B"
        value={formData.totalb}
        onChange={handleChange}
        required
      />
      <TextField
        name="tva_consommation"
        label="TVA Consommation"
        value={formData.tva_consommation}
        onChange={handleChange}
        required
      />
      <TextField
        name="tva_redevance"
        label="TVA Redevance"
        value={formData.tva_redevance}
        onChange={handleChange}
        required
      />
      <TextField
        name="contribution_rtt"
        label="Contribution RTT"
        value={formData.contribution_rtt}
        onChange={handleChange}
        required
      />
      <TextField
        name="surtaxminicipale"
        label="Surtaxminicipale"
        value={formData.surtaxminicipale}
        onChange={handleChange}
        required
      />
      <TextField
        name="totalc"
        label="Total C"
        value={formData.totalc}
        onChange={handleChange}
        required
      />
      <TextField
        name="avance_consomation"
        label="Avance Consommation"
        value={formData.avance_consomation}
        onChange={handleChange}
        required
      />
      <TextField
        name="neta_payer"
        label="Net à Payer"
        value={formData.neta_payer}
        onChange={handleChange}
        required
      />
      <TextField
        name="consommation_cible_mois"
        label="Consommation Cible Mois"
        value={formData.consommation_cible_mois}
        onChange={handleChange}
        required
      />
    </>
  );
};

export default FinancialDetails;

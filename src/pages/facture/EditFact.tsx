import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFactureById, editFacture } from '../../Services/factureService';
import DefaultLayout from '../../layout/DefaultLayout';
import { Stepper, Step, StepLabel, Button, Typography } from '@mui/material';
import BasicInformation from './factureSteps/EditSteps/BasicInformation';
import SubscriptionDetails from './factureSteps/EditSteps/SubscriptionDetails';
import MaximumDemand from './factureSteps/EditSteps/MaximumDemand';
import ExcessPowerConsumption from './factureSteps/EditSteps/ExcessPowerConsumption';
import PowerDetails from './factureSteps/EditSteps/PowerDetails';
import ConsumptionDetails from './factureSteps/EditSteps/ConsumptionDetails';
import PriceDetails from './factureSteps/EditSteps/PriceDetails';
import AmountDetails from './factureSteps/EditSteps/AmountDetails';
import FinancialDetails from './factureSteps/EditSteps/FinancialDetails';

const steps = [
  'Basic Information',
  'Subscription Details',
  'Maximum Demand',
  'Excess Power Consumption',
  'Power Details',
  'Consumption Details',
  'Price Details',
  'Amount Details',
  'Financial Details'
];

const EditFacture = () => {
  const { facture_id } = useParams();
  const [activeStep, setActiveStep] = useState(0);
  const [factureData, setFactureData] = useState({});
  const [allInputs, setAllInputs] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const result = await getFactureById(facture_id);
      if (result.success) {
        setFactureData(result.data);
      } else {
        setError(result.message || 'Failed to retrieve facture data');
      }
    };

    fetchData();
  }, [facture_id]);

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleSave = async () => {
    const result = await editFacture(facture_id, factureData);
    if (result.success) {
      console.log('Facture data updated successfully');
    } else {
      setError(result.message || 'Failed to update facture data');
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setFactureData(prevData => ({
      ...prevData,
      [name]: value,
    }));

    setAllInputs(prevInputs => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleChange = (name: string, value: string) => {
    setFactureData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };


  const handleFinish = () => {
    console.log('All inputs:', allInputs);
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <BasicInformation
            formData={factureData}
            handleInputChange={handleInputChange}
            handleChange={handleChange}
        />;
      case 1:
        return <SubscriptionDetails formData={factureData} handleChange={handleChange} />;
      case 2:
        return <MaximumDemand formData={factureData} handleChange={handleChange} />;
      case 3:
        return <ExcessPowerConsumption formData={factureData} handleInputChange={handleInputChange} />;
      case 4:
        return <PowerDetails formData={factureData} handleChange={handleChange} />;
      case 5:
        return <ConsumptionDetails formData={factureData} handleInputChange={handleInputChange} />;
      case 6:
        return <PriceDetails formData={factureData} handleChange={handleChange} />;
      case 7:
        return <AmountDetails formData={factureData} handleInputChange={handleInputChange} />;
      case 8:
        return <FinancialDetails formData={factureData} handleChange={handleChange} />;
      default:
        return 'Unknown step';
    }
  };

  if (error) {
    return (
        <DefaultLayout>
          <Typography variant="h5" color="error">
            Error: {error}
          </Typography>
        </DefaultLayout>
    );
  }

  return (
      <DefaultLayout>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
          ))}
        </Stepper>
        <>
          {activeStep === steps.length ? (
              <>
                <Typography>All steps completed</Typography>
                <Typography>Review your inputs:</Typography>
                {Object.entries(allInputs).map(([key, value]) => (
                    <Typography key={key}>
                      {key}: {value}
                    </Typography>
                ))}
                <Button onClick={handleSave}>Save</Button>
                <Button onClick={handleFinish}>Finish</Button>
              </>
          ) : (
              <>
                {getStepContent(activeStep)}
                <>
                  <Button disabled={activeStep === 0} onClick={handleBack}>
                    Back
                  </Button>
                  <Button variant="contained" onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </>
              </>
          )}
        </>
</DefaultLayout>
);
};

export default EditFacture;

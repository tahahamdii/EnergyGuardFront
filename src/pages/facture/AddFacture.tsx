import React, { useState } from 'react';
import { Step, StepLabel, Stepper, Button, Typography, Box, TextField } from '@mui/material';
import BasicInformation from './factureSteps/AddSteps/BasicInformation';
import SubscriptionDetails from './factureSteps/AddSteps/SubscriptionDetails';
import MaximumDemand from './factureSteps/AddSteps/MaximumDemand';
import ExcessPowerConsumption from './factureSteps/AddSteps/ExcessPowerConsumption';
import PowerDetails from './factureSteps/AddSteps/PowerDetails';
import ConsumptionDetails from './factureSteps/AddSteps/ConsumptionDetails';
import PriceDetails from './factureSteps/AddSteps/PriceDetails';
import AmountDetails from './factureSteps/AddSteps/AmountDetails';
import FinancialDetails from './factureSteps/AddSteps/FinancialDetails';
import DefaultLayout from '../../layout/DefaultLayout';
import CheckIcon from '@mui/icons-material/Check';
import { addFacture } from '../../Services/factureService';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

function AddFactureStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});

  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      const isFormDataComplete = Object.keys(formData).length === 55;
      console.log(Object.keys(formData).length);

      if (isFormDataComplete) {
        const result = await addFacture(formData);
        if (result.success) {
          console.log('Form data successfully submitted to the server');
        } else {
          console.error('Failed to submit form data to the server');
        }
      } else {
        console.error('Form data is incomplete');
      }
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleStepClick = (index: number) => {
    setActiveStep(index);
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <BasicInformation formData={formData} handleChange={handleChange} />;
      case 1:
        return <SubscriptionDetails formData={formData} handleChange={handleChange} />;
      case 2:
        return <MaximumDemand formData={formData} handleChange={handleChange} />;
      case 3:
        return <ExcessPowerConsumption formData={formData} handleChange={handleChange} />;
      case 4:
        return <PowerDetails formData={formData} handleChange={handleChange} />;
      case 5:
        return <ConsumptionDetails formData={formData} handleChange={handleChange} />;
      case 6:
        return <PriceDetails formData={formData} handleChange={handleChange} />;
      case 7:
        return <AmountDetails formData={formData} handleChange={handleChange} />;
      case 8:
        return <FinancialDetails formData={formData} handleChange={handleChange} />;
    }
  };

  return (

    <DefaultLayout>
      <Breadcrumb pageName="Add Facture" />
      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-4.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">

          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => {
              const labelProps: {
                optional?: React.ReactNode;
                error?: boolean;
                icon?: React.ReactNode;
              } = {};

              const isStepFailed = (step: number) => {
                return step === 1;
              };

              if (index < activeStep) {
                labelProps.icon = <CheckIcon />;
              }

              return (
                <Step key={label} onClick={() => handleStepClick(index)}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          <div>
            {getStepContent(activeStep)}
            <Box display="flex" justifyContent="space-between">
              <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
              <Button
                variant="contained"
                color="info"
                onClick={handleNext}
                disabled={activeStep === steps.length - 1 && Object.keys(formData).length !== 55} // Disable "Next" button if formData is incomplete
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </div>
        </div>
        </div>
    </DefaultLayout>
  );
          }

  export default AddFactureStepper;

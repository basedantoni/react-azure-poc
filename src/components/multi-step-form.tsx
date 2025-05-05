import { Step1 } from './step-1';
import { Step2 } from './step-2';
import { Step3 } from './step-3';
import { Step4 } from './step-4';
import { StepIndicator } from './step-indicator';

import { Button } from './ui/button';

import { ArrowLeftIcon } from 'lucide-react';
import { useFormStepper } from '@/hooks/form';
import { useTranslation } from 'react-i18next';

export function MultiStepForm() {
  const { t } = useTranslation();

  const { currentStep, includeStep3, decrementCurrentStep, user } =
    useFormStepper();

  const allSteps = [
    {
      label: t('welcome'),
      component: <Step1 />,
    },
    {
      label: t('orderDetails'),
      component: <Step2 />,
    },
    {
      label: t('purchaseAdditionalTickets'),
      component: <Step3 />,
    },
    {
      label: t('orderSummary'),
      component: <Step4 />,
    },
  ];

  const steps = includeStep3 ? allSteps : allSteps.filter((_, i) => i !== 2);

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className='flex flex-col w-full max-w-96 items-center justify-center space-y-4'>
      {!isFirstStep ? (
        <Button
          className='mt-3 self-start'
          variant='link'
          onClick={() => decrementCurrentStep()}
          disabled={isFirstStep}
        >
          <ArrowLeftIcon className='w-4 h-4' />
          Back
        </Button>
      ) : (
        <div className='h-12' />
      )}

      <StepIndicator current={currentStep} steps={steps} />
      <h1 className='text-center'>{steps[currentStep].label}</h1>
      <div className='w-96'>{steps[currentStep].component}</div>
    </div>
  );
}

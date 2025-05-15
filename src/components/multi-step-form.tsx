import { Step1 } from './step-1';
import { Step2 } from './step-2';
import { Step3 } from './step-3';
import { Step4 } from './step-4';
import { StepIndicator } from './step-indicator';

import { Button } from './ui/button';

import { ArrowLeftIcon } from 'lucide-react';
import { useFormStepper } from '@/hooks/form';
import { useTranslation } from 'react-i18next';
import PayrollDeductionForm from './payroll-deduction-form';
import { LanguageToggle } from './language-toggle';

export function MultiStepForm() {
  const { t } = useTranslation();

  const { currentStep, includePayrollDeduction, decrementCurrentStep } =
    useFormStepper();

  const allSteps = [
    {
      label: t('welcome'),
      component: <Step1 />,
      description: t('welcomeDescription'),
    },
    {
      label: t('orderDetails'),
      component: <Step2 />,
    },
    {
      label: t('purchaseAdditionalTickets'),
      component: <Step3 />,
      description: t('purchaseAdditionalTicketsDescription'),
    },
    {
      label: t('payrollDeduction'),
      component: <PayrollDeductionForm />,
    },
    {
      label: t('orderSummary'),
      component: <Step4 />,
    },
  ];

  const steps = includePayrollDeduction
    ? allSteps
    : allSteps.filter((_, i) => i !== 2 && i !== 3);

  const isFirstStep = currentStep === 0;

  return (
    <div className='flex flex-col w-full px-4 sm:px-8 sm:max-w-[1000px] items-center justify-center space-y-4'>
      {!isFirstStep ? (
        <div className='flex items-center justify-between w-full p-3 sm:px-0 sm:py-4'>
          <Button
            className='mt-3 self-start'
            variant='link'
            onClick={() => decrementCurrentStep()}
            disabled={isFirstStep}
          >
            <ArrowLeftIcon className='w-4 h-4' />
            Back
          </Button>
          <LanguageToggle />
        </div>
      ) : (
        <div className='min-h-20 flex items-center justify-end w-full py-3'>
          <LanguageToggle />
        </div>
      )}
      <img src='/img/zachry-logo.webp' alt='Zachry Logo' />

      <StepIndicator current={currentStep} steps={steps} />
      <div className='flex flex-col items-center justify-center space-y-2'>
        <h1 className='text-center'>{steps[currentStep].label}</h1>
        <p className='text-muted-foreground text-center'>
          {steps[currentStep].description ?? ''}
        </p>
      </div>
      <div className='w-full'>{steps[currentStep].component}</div>
    </div>
  );
}

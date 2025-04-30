import { useState } from 'react';

import { Step1 } from './step-1';
import { Step2 } from './step-2';
import { Step3 } from './step-3';
import { Step4 } from './step-4';
import { StepIndicator } from './step-indicator';

import { Button } from './ui/button';
import { Form } from './ui/form';

import {
  FormSchema,
  FormValues,
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
} from '@/schema';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeftIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function MultiStepForm() {
  const { t } = useTranslation();
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      lastName: '',
      ein: '',
      park: 'Fiesta Texas',
      name: '',
      jobNumber: '',
      location: '',
      employeeTickets: 0,
      guestTickets: 0,
      childrenTickets: 0,
      fullTicketQuantity: 0,
      mealTicketQuantity: 0,
      email: '',
    },
  });

  const allSteps = [
    {
      label: t('welcome'),
      component: <Step1 form={form} />,
    },
    {
      label: t('orderDetails'),
      component: <Step2 form={form} />,
    },
    {
      label: t('purchaseAdditionalTickets'),
      component: <Step3 form={form} />,
    },
    {
      label: t('orderSummary'),
      component: <Step4 form={form} />,
    },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [includeStep3, setIncludeStep3] = useState(false);

  const steps = includeStep3 ? allSteps : allSteps.filter((_, i) => i !== 2);

  const handleNext = () => {
    const schema = [step1Schema, step2Schema, step3Schema, step4Schema][
      currentStep
    ];
    const keys = Object.keys(schema.shape) as Array<keyof FormValues>;
    const valid = form.getValues(keys);
    if (!valid) return;

    if (
      !includeStep3 &&
      currentStep + 1 === allSteps.findIndex((_, i) => i === 2)
    ) {
      setCurrentStep(steps.length - 1);
    } else {
      setCurrentStep((i) => Math.min(i + 1, steps.length - 1));
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  const handleSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <div className='flex flex-col w-full max-w-96 text-center items-center justify-center space-y-4'>
      {!isFirstStep ? (
        <Button
          className='mt-3 self-start'
          variant='link'
          onClick={handlePrevious}
          disabled={isFirstStep}
        >
          <ArrowLeftIcon className='w-4 h-4' />
          Back
        </Button>
      ) : (
        <div className='h-12' />
      )}

      <StepIndicator current={currentStep} steps={steps} />

      <h1>{steps[currentStep].label}</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className='space-y-8 w-96'
        >
          {steps[currentStep].component}
        </form>
      </Form>
      <div className='flex self-end gap-2.5'>
        {currentStep === 1 && (
          <Button
            variant='secondary'
            onClick={() => {
              setIncludeStep3(true);
              handleNext();
            }}
          >
            Purchase Add'tl Tickets
          </Button>
        )}
        <Button onClick={handleNext} disabled={isLastStep}>
          Next
        </Button>
      </div>
    </div>
  );
}

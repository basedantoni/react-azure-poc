import { useState } from 'react';

import { Step1 } from './step-1';
import { Step2 } from './step-2';
import { Step3 } from './step-3';
import { Step4 } from './step-4';
import { StepIndicator } from './step-indicator';

import { Button } from './ui/button';
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
import { Form } from './ui/form';

export function MultiStepForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      lastName: '',
      EIN: '',
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
      label: 'Welcome to the Zachry Picnic',
      component: <Step1 />,
    },
    {
      label: 'Order Details',
      component: <Step2 />,
    },
    {
      label: 'Purchase Additional Tickets',
      component: <Step3 />,
    },
    {
      label: 'Order Summary',
      component: <Step4 />,
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
    <div>
      <Button variant='link' onClick={handlePrevious} disabled={isFirstStep}>
        Back
      </Button>
      <StepIndicator current={currentStep} steps={steps} />
      <h1>{steps[currentStep].label}</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          {steps[currentStep].component}
        </form>
      </Form>
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
  );
}

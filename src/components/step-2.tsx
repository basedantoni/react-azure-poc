import { Button } from './ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';

import { Check, X, TriangleAlert } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useFormStepper } from '@/hooks/form';
import { step2Schema } from '@/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

type Step2Values = z.infer<typeof step2Schema>;

export function Step2() {
  const { incrementCurrentStep, setIncludePayrollDeduction, user, setUser } =
    useFormStepper();

  const [showChildrenVerification, setShowChildrenVerification] =
    useState(true);
  const [showAdditionalChildInput, setShowAdditionalChildInput] =
    useState(false);

  const form = useForm<Step2Values>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      name: `${user?.firstName} ${user?.lastName}`,
      jobNumber: user?.jobNumber,
      location: user?.jobNumber, // TODO: add location to user table
      employeeTickets: 0,
      guestTickets: user?.guest ? 1 : 0,
      childrenTickets: 0,
      additionalChildren: '',
    },
  });

  const handleSubmit = () => {
    setUser({
      ...user,
      guest: form.getValues('guestTickets') > 0,
    });
    setIncludePayrollDeduction(false);
    incrementCurrentStep();
  };

  const handlePurchaseTickets = () => {
    setIncludePayrollDeduction(true);
    incrementCurrentStep();
  };

  return (
    <div className='flex flex-col space-y-6'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    readOnly
                    {...field}
                    placeholder='Name'
                    value={`${user?.firstName} ${user?.lastName}`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='jobNumber'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Number</FormLabel>
                <FormControl>
                  <Input
                    readOnly
                    {...field}
                    placeholder='Job Number'
                    value={user?.jobNumber ?? ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='location'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input
                    readOnly
                    {...field}
                    placeholder='Location'
                    value={user?.jobNumber ?? ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex flex-col gap-1 max-w-96'>
            <h2 className='text-xl font-semibold'>
              Tickets Provided by Zachry Corp
            </h2>
            <p className='text-sm text-muted-foreground'>
              Zachry Corporation will provide Six Flags Fiesta Texas tickets for
              you and your <span className='font-semibold'>immediate</span>{' '}
              family at no charge to you.
            </p>
          </div>

          <div className='flex flex-col space-y-2'>
            <FormField
              control={form.control}
              name='employeeTickets'
              render={({ field }) => (
                <FormItem className='flex justify-between'>
                  <FormLabel>Employee</FormLabel>
                  <FormControl>
                    <Input
                      readOnly
                      className='w-16'
                      {...field}
                      value={1}
                      type='number'
                      min={0}
                      max={1}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='guestTickets'
              render={({ field }) => (
                <FormItem className='flex justify-between'>
                  <FormLabel required>
                    Spouse/Guest{' '}
                    <span
                      className={`${
                        form.formState.errors.guestTickets
                          ? 'text-destructive'
                          : 'text-muted-foreground'
                      } text-xs`}
                    >
                      (max 1)
                    </span>
                  </FormLabel>
                  <div className='flex items-end flex-col gap-2'>
                    <FormControl>
                      <Input
                        className='w-16'
                        {...field}
                        type='number'
                        min={0}
                        max={1}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <div
              className={
                showChildrenVerification
                  ? 'flex flex-col gap-2 p-4 rounded-md bg-warning'
                  : ''
              }
            >
              {showChildrenVerification && (
                <div className='flex items-center justify-between'>
                  <div className='flex items-start sm:items-end gap-2'>
                    <TriangleAlert className='w-5 h-5 text-warning-foreground' />
                    <p className='text-sm text-warning-foreground'>
                      Please verify this is the correct number of children
                    </p>
                  </div>
                  <div className='flex'>
                    <Button
                      onClick={() => setShowChildrenVerification(false)}
                      variant='ghost'
                      size='sm'
                    >
                      <Check className='w-4 h-4 text-success' />
                    </Button>
                    <Button
                      onClick={() => {
                        setShowChildrenVerification(false);
                        setShowAdditionalChildInput(true);
                      }}
                      variant='ghost'
                      size='sm'
                    >
                      <X className='w-4 h-4 text-destructive' />
                    </Button>
                  </div>
                </div>
              )}
              <FormField
                control={form.control}
                name='childrenTickets'
                render={({ field }) => (
                  <FormItem className='flex justify-between'>
                    <div className='flex flex-col gap-2'>
                      <FormLabel>
                        {showAdditionalChildInput
                          ? 'Correct Number of Children'
                          : 'Children'}
                      </FormLabel>
                      <p className='max-w-xs sm:max-w-sm text-xs text-muted-foreground'>
                        <span className='font-bold'>Disclaimer:</span> For
                        dependent children living at home ages 3-26 only who may
                        be claimed as dependent on federal tax return. Children
                        2 years old and younger do not need an admission ticket.
                        For all others, you must purchase additional tickets.
                      </p>
                    </div>
                    <div className='flex items-end flex-col gap-2'>
                      <FormControl>
                        <Input
                          readOnly={!showAdditionalChildInput}
                          className='w-16'
                          {...field}
                          type='number'
                          min={0}
                          max={10}
                          value={
                            showAdditionalChildInput
                              ? field.value
                              : user?.children
                          }
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>
      {!showChildrenVerification && (
        <div className='flex justify-between'>
          <p className='text-sm text-muted-foreground'>
            Do you need to purchase additional tickets?
          </p>
          <div className='flex gap-2'>
            <Button
              onClick={form.handleSubmit(handlePurchaseTickets)}
              variant='default'
              size='sm'
            >
              Yes
            </Button>
            <Button
              onClick={form.handleSubmit(handleSubmit)}
              variant='outline'
              size='sm'
            >
              No
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

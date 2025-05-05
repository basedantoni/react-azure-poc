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

import { useForm } from 'react-hook-form';
import { useFormStepper } from '@/hooks/form';
import { step2Schema } from '@/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

type Step2Values = z.infer<typeof step2Schema>;

export function Step2() {
  const { incrementCurrentStep, setIncludePayrollDeduction, user } =
    useFormStepper();

  const form = useForm<Step2Values>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      name: `${user?.firstName} ${user?.lastName}`,
      jobNumber: user?.jobNumber,
      location: user?.jobNumber, // TODO: add location to user table
      employeeTickets: 0,
      guestTickets: 0,
      childrenTickets: 0,
    },
  });

  const handleSubmit = () => {
    incrementCurrentStep();
  };

  const handlePurchaseTickets = () => {
    setIncludePayrollDeduction(true);
    incrementCurrentStep();
  };

  return (
    <div className='flex flex-col space-y-8'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8'>
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
          <div className='flex flex-col max-w-80'>
            <h2 className='text-xl font-semibold'>
              Tickets Provided by Zachry Corp
            </h2>
            <p className='text-sm text-gray-500'>
              Zachry Corp will provide you with the following tickets free of
              charge
            </p>
          </div>

          <div className='flex flex-col gap-1.5'>
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
                  <FormLabel>
                    Spouse/Guest{' '}
                    <span
                      className={`${
                        form.formState.errors.guestTickets
                          ? 'text-red-500'
                          : 'text-gray-500'
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
            <FormField
              control={form.control}
              name='childrenTickets'
              render={({ field }) => (
                <FormItem className='flex justify-between'>
                  <FormLabel>Children</FormLabel>
                  <FormControl>
                    <Input
                      readOnly
                      className='w-16'
                      {...field}
                      type='number'
                      min={0}
                      max={10}
                      value={user?.children}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
      <div className='flex w-full justify-end gap-2'>
        <Button
          variant='secondary'
          onClick={form.handleSubmit(handlePurchaseTickets)}
        >
          Purchase Add'tl Tickets
        </Button>
        <Button
          className='cursor-pointer'
          onClick={form.handleSubmit(handleSubmit)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

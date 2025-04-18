import { FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { Input } from './ui/input';

import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '@/schema';

export function Step2({ form }: { form: UseFormReturn<FormValues> }) {
  return (
    <>
      <FormField
        control={form.control}
        name='name'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input {...field} placeholder='Name' />
            </FormControl>
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
              <Input {...field} placeholder='Job Number' />
            </FormControl>
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
              <Input {...field} placeholder='Location' />
            </FormControl>
          </FormItem>
        )}
      />
      <div className='flex flex-col max-w-80'>
        <h2 className='text-xl font-semibold'>
          Tickets Provided by Zachry Corp
        </h2>
        <p className='text-sm text-gray-500'>
          Zachry Corp will provide you with the following tickets free of charge
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
                  className='w-16'
                  {...field}
                  type='number'
                  min={0}
                  max={1}
                />
              </FormControl>
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
                <span className='text-xs text-gray-500'>(max 1)</span>
              </FormLabel>
              <FormControl>
                <Input
                  className='w-16'
                  {...field}
                  type='number'
                  min={0}
                  max={1}
                />
              </FormControl>
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
                  className='w-16'
                  {...field}
                  type='number'
                  min={0}
                  max={10}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </>
  );
}

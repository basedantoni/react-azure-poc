import { Button } from './ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

import { useState } from 'react';
import { step1Schema } from '@/schema';
import { useFormStepper } from '@/hooks/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { authenticateUser } from '@/api/users';

type Step1Values = z.infer<typeof step1Schema>;

export function Step1() {
  const { incrementCurrentStep, setUser } = useFormStepper();
  const [authError, setAuthError] = useState('');

  const form = useForm<Step1Values>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      lastName: '',
      ein: '',
      park: 'Fiesta Texas',
    },
  });

  const onSubmit = async () => {
    try {
      const values = form.getValues();
      const result = await authenticateUser(values.ein, values.lastName);

      if (result.message === 'User not found') {
        setAuthError('User not found');
        form.setError('ein', {
          type: 'manual',
          message: 'Invalid credentials',
        });
        form.setError('lastName', {
          type: 'manual',
          message: 'Invalid credentials',
        });
        return;
      }

      if (result) {
        setUser({
          ...result,
          park: values.park,
        });
        incrementCurrentStep();
      }
    } catch (error) {
      setAuthError('Authentication failed');
      form.setError('ein', { type: 'manual', message: 'Invalid credentials' });
      form.setError('lastName', {
        type: 'manual',
        message: 'Invalid credentials',
      });
      console.error('Authentication failed:', error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        {authError && (
          <p className='text-xl font-medium text-destructive'>{authError}</p>
        )}
        <FormField
          control={form.control}
          name='ein'
          render={({ field }) => (
            <FormItem>
              <FormLabel>EIN</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='EIN'
                  onChangeCapture={() => setAuthError('')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='lastName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='Last Name'
                  onChangeCapture={() => setAuthError('')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='park'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Park</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormItem className='flex gap-2'>
                    <FormControl>
                      <RadioGroupItem value='Fiesta Texas' />
                    </FormControl>
                    <FormLabel>Fiesta Texas</FormLabel>
                  </FormItem>
                  <FormItem className='flex gap-2'>
                    <FormControl>
                      <RadioGroupItem value='Six Flags' />
                    </FormControl>
                    <FormLabel>Six Flags</FormLabel>
                  </FormItem>
                  <FormItem className='flex gap-2'>
                    <FormControl>
                      <RadioGroupItem value='Carowinds' />
                    </FormControl>
                    <FormLabel>Carowinds</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex justify-end gap-2'>
          <Button className='cursor-pointer' type='submit'>
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
}

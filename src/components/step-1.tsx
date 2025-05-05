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
import { useQuery } from '@tanstack/react-query';
import { authenticateUser } from '@/api/users';

type Step1Values = z.infer<typeof step1Schema>;

export function Step1() {
  const { incrementCurrentStep, setUser } = useFormStepper();

  const [isValid, setIsValid] = useState(false);

  const form = useForm<Step1Values>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      lastName: '',
      ein: '',
      park: 'Fiesta Texas',
    },
  });

  const { data: user, isError } = useQuery({
    queryKey: ['users', 'authenticate'],
    queryFn: () =>
      authenticateUser(form.getValues('ein'), form.getValues('lastName')),
    enabled: isValid,
  });
  const onSubmit = async () => {
    setIsValid(true);
    if (isError) {
      setIsValid(false);
      return;
    }

    // Wait for the query to complete
    await form.handleSubmit(async () => {
      console.log('user', user);
      if (user) {
        setUser(user);
        incrementCurrentStep();
      }
    })();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='ein'
          render={({ field }) => (
            <FormItem>
              <FormLabel>EIN</FormLabel>
              <FormControl>
                <Input {...field} placeholder='EIN' />
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
                <Input {...field} placeholder='Last Name' />
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
        <Button className='cursor-pointer' type='submit'>
          Next
        </Button>
      </form>
    </Form>
  );
}

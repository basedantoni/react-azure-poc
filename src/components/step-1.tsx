import { FormField, FormItem, FormLabel, FormControl } from './ui/form';
import { Input } from './ui/input';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '@/schema';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

export function Step1({ form }: { form: UseFormReturn<FormValues> }) {
  return (
    <>
      <FormField
        control={form.control}
        name='ein'
        render={({ field }) => (
          <FormItem>
            <FormLabel>EIN</FormLabel>
            <FormControl>
              <Input {...field} placeholder='EIN' />
            </FormControl>
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
          </FormItem>
        )}
      />
    </>
  );
}

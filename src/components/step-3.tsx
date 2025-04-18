import { Input } from './ui/input';
import { FormField, FormItem, FormLabel, FormControl } from './ui/form';

import { FormValues } from '@/schema';
import { UseFormReturn } from 'react-hook-form';

export function Step3({ form }: { form: UseFormReturn<FormValues> }) {
  return (
    <>
      <FormField
        control={form.control}
        name='fullTicketQuantity'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Full Ticket Quantity</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  );
}

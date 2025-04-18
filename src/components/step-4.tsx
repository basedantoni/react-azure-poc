import { FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { Input } from './ui/input';

import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '@/schema';

export function Step4({ form }: { form: UseFormReturn<FormValues> }) {
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

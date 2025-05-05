import { Button } from './ui/button';
import { Form, FormField, FormMessage } from './ui/form';
import { Input } from './ui/input';
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
  TableFooter,
} from './ui/table';

import { useForm } from 'react-hook-form';
import { useFormStepper } from '@/hooks/form';
import { step3Schema } from '@/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

type Step3Values = z.infer<typeof step3Schema>;

export function Step3() {
  const { incrementCurrentStep, setPayrollDeductionAmount } = useFormStepper();

  const form = useForm<Step3Values>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      fullTicketQuantity: 0,
      mealTicketQuantity: 0,
    },
  });
  const onSubmit = (data: Step3Values) => {
    console.log(data);
    setPayrollDeductionAmount(data.fullTicketQuantity * 100); // TODO: get the real price
    incrementCurrentStep();
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type of Ticket</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Amount Due</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Full Ticket (meal ticket included)</TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name='fullTicketQuantity'
                    render={({ field }) => (
                      <Input
                        type='number'
                        {...field}
                        min={0}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    )}
                  />
                </TableCell>
                <TableCell>$0</TableCell>
                <TableCell>$0</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Meal Ticket</TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name='mealTicketQuantity'
                    render={({ field }) => (
                      <Input
                        type='number'
                        {...field}
                        min={0}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    )}
                  />
                  <FormMessage />
                </TableCell>
                <TableCell>$0</TableCell>
                <TableCell>$0</TableCell>
              </TableRow>
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell>Total</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>$0</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
          <div className='flex justify-end gap-2'>
            <Button className='cursor-pointer' type='submit'>
              Next
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}

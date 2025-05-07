import { Button } from './ui/button';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  Form,
} from './ui/form';
import { Input } from './ui/input';

import { sendEmail } from '@/api/email';
import { useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { step4Schema } from '@/schema';
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
  TableFooter,
} from './ui/table';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormStepper } from '@/hooks/form';
type Step4Values = z.infer<typeof step4Schema>;

// TODO: get the real prices from the backend
const TICKET_PRICE = 60;
const MEAL_TICKET_PRICE = 20;

export function Step4() {
  const navigate = useNavigate();

  const { fullTicketCount, mealTicketCount, payrollDeductionAmount } =
    useFormStepper();

  const form = useForm<Step4Values>({
    resolver: zodResolver(step4Schema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (data: Step4Values) => {
    if (data.email) {
      sendEmail(
        data.email,
        'Order Confirmation',
        'Your order has been confirmed'
      );
    }
    navigate({ to: '/confirmation' });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type of Ticket</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className='text-right'>Amount Due</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Full Ticket (meal ticket included)</TableCell>
              <TableCell>{fullTicketCount}</TableCell>
              <TableCell>${TICKET_PRICE}</TableCell>
              <TableCell className='text-right'>
                ${fullTicketCount * TICKET_PRICE}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Meal Ticket</TableCell>
              <TableCell>{mealTicketCount}</TableCell>
              <TableCell>${MEAL_TICKET_PRICE}</TableCell>
              <TableCell className='text-right'>
                ${mealTicketCount * MEAL_TICKET_PRICE}
              </TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>Total</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell className='text-right'>
                ${payrollDeductionAmount}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  className='w-96'
                  placeholder='Enter your email'
                  type='email'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Enter your email to recieve a copy of this order
              </FormDescription>
            </FormItem>
          )}
        />
        <div className='flex justify-end gap-2'>
          <Button type='submit'>Submit</Button>
        </div>
      </form>
    </Form>
  );
}

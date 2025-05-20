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
import { ProvidedTicketsTable } from './provided-tickets-table';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useFormStepper } from '@/hooks/form';
import { step3Schema } from '@/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

type Step3Values = z.infer<typeof step3Schema>;

// TODO: get the real prices from the backend
const TICKET_PRICE = 60;
const MEAL_TICKET_PRICE = 20;

export function Step3() {
  const {
    incrementCurrentStep,
    setPayrollDeductionAmount,
    fullTicketCount,
    mealTicketCount,
    setFullTicketCount,
    setMealTicketCount,
    user,
  } = useFormStepper();
  console.log(user);

  const totalGuestTickets = user.guest ? 1 : 0;
  const totalChildrenTickets = user.children ? user.children : 0;

  const [ticketQuantity, setTicketQuantity] = useState(fullTicketCount);
  const [mealTicketQuantity, setMealTicketQuantity] = useState(mealTicketCount);

  const form = useForm<Step3Values>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      fullTicketQuantity: fullTicketCount,
      mealTicketQuantity: mealTicketCount,
    },
  });

  const onSubmit = (data: Step3Values) => {
    setFullTicketCount(data.fullTicketQuantity);
    setMealTicketCount(data.mealTicketQuantity);
    setPayrollDeductionAmount(
      data.fullTicketQuantity * TICKET_PRICE +
        data.mealTicketQuantity * MEAL_TICKET_PRICE
    );
    incrementCurrentStep();
  };

  return (
    <div className='flex flex-col gap-8'>
      <ProvidedTicketsTable
        guestTickets={totalGuestTickets}
        childrenTickets={totalChildrenTickets}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <h2 className='text-2xl font-bold text-center'>Employee Purchase</h2>
          <Table className='border'>
            <TableHeader className='bg-emerald-200'>
              <TableRow>
                <TableHead>Type of Ticket</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className='text-right'>Amount Due</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  Full Ticket (park admission + meal ticket)
                </TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name='fullTicketQuantity'
                    render={({ field }) => (
                      <Input
                        type='number'
                        className='w-16'
                        {...field}
                        min={0}
                        onChange={(e) => {
                          field.onChange(e.target.valueAsNumber);
                          setTicketQuantity(e.target.valueAsNumber);
                        }}
                      />
                    )}
                  />
                </TableCell>
                <TableCell>${TICKET_PRICE}</TableCell>
                <TableCell className='text-right'>
                  ${TICKET_PRICE * ticketQuantity}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Meal Ticket (for season pass holders)</TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name='mealTicketQuantity'
                    render={({ field }) => (
                      <Input
                        type='number'
                        className='w-16'
                        {...field}
                        min={0}
                        onChange={(e) => {
                          field.onChange(e.target.valueAsNumber);
                          setMealTicketQuantity(e.target.valueAsNumber);
                        }}
                      />
                    )}
                  />
                  <FormMessage />
                </TableCell>
                <TableCell>${MEAL_TICKET_PRICE}</TableCell>
                <TableCell className='text-right'>
                  ${MEAL_TICKET_PRICE * mealTicketQuantity}
                </TableCell>
              </TableRow>
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell className='font-bold bg-emerald-200'>
                  Total Purchased by Employee
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell className='text-right'>
                  $
                  {(
                    TICKET_PRICE * ticketQuantity +
                    MEAL_TICKET_PRICE * mealTicketQuantity
                  ).toFixed(2)}
                </TableCell>
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
    </div>
  );
}

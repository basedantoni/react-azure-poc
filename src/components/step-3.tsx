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
import { useTranslation } from 'react-i18next';
import { step3Schema } from '@/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getMealTicketPrice, getTicketPrice } from '@/lib/utils';

type Step3Values = z.infer<typeof step3Schema>;

export function Step3() {
  const { t } = useTranslation();

  const {
    incrementCurrentStep,
    setPayrollDeductionAmount,
    fullTicketCount,
    mealTicketCount,
    setFullTicketCount,
    setMealTicketCount,
    park,
    user,
  } = useFormStepper();

  const ticketPrice = getTicketPrice(park) ?? 0;
  const mealTicketPrice = getMealTicketPrice(park) ?? 0;

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
      data.fullTicketQuantity * ticketPrice +
        data.mealTicketQuantity * mealTicketPrice
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
          <h2 className='text-2xl font-bold text-center'>
            {t('employeePurchase')}
          </h2>
          <Table className='border'>
            <TableHeader className='bg-emerald-200'>
              <TableRow>
                <TableHead>{t('typeOfTicket')}</TableHead>
                <TableHead>{t('quantity')}</TableHead>
                <TableHead>{t('price')}</TableHead>
                <TableHead className='text-right'>{t('amountDue')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>{t('fullTicket')}</TableCell>
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
                          field.onChange(
                            Number(e.target.valueAsNumber.toFixed(2))
                          );
                          setTicketQuantity(
                            Number(e.target.valueAsNumber.toFixed(2))
                          );
                        }}
                      />
                    )}
                  />
                </TableCell>
                <TableCell>${ticketPrice}</TableCell>
                <TableCell className='text-right'>
                  ${(ticketPrice * ticketQuantity).toFixed(2)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>{t('mealTicket')}</TableCell>
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
                          field.onChange(
                            Number(e.target.valueAsNumber.toFixed(2))
                          );
                          setMealTicketQuantity(
                            Number(e.target.valueAsNumber.toFixed(2))
                          );
                        }}
                      />
                    )}
                  />
                  <FormMessage />
                </TableCell>
                <TableCell>${mealTicketPrice}</TableCell>
                <TableCell className='text-right'>
                  ${(mealTicketPrice * mealTicketQuantity).toFixed(2)}
                </TableCell>
              </TableRow>
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell className='font-bold bg-emerald-200'>
                  {t('totalPurchasedByEmployee')}
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell className='text-right'>
                  $
                  {(
                    ticketPrice * ticketQuantity +
                    mealTicketPrice * mealTicketQuantity
                  ).toFixed(2)}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
          <div className='flex justify-end gap-2'>
            <Button className='cursor-pointer' type='submit'>
              {t('next')}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

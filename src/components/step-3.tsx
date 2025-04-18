import { FormField } from './ui/form';
import { Input } from './ui/input';

import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '@/schema';
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
  TableFooter,
} from './ui/table';

export function Step3({ form }: { form: UseFormReturn<FormValues> }) {
  return (
    <>
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
                render={({ field }) => <Input type='number' {...field} />}
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
                render={({ field }) => <Input type='number' {...field} />}
              />
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
    </>
  );
}

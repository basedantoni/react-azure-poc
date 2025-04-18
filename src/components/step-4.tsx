import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from './ui/form';
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

export function Step4({ form }: { form: UseFormReturn<FormValues> }) {
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
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Meal Ticket</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
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
      <FormField
        control={form.control}
        name='email'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder='Enter your email' type='email' {...field} />
            </FormControl>
            <FormDescription>
              Enter your email to recieve a copy of this order
            </FormDescription>
          </FormItem>
        )}
      />
    </>
  );
}

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

type Step4Values = z.infer<typeof step4Schema>;

export function Step4() {
  const form = useForm<Step4Values>({
    resolver: zodResolver(step4Schema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (data: Step4Values) => {
    console.log(data);
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
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
}

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
import { PDFDocument, rgb } from 'pdf-lib';

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
import { ProvidedTicketsTable } from './provided-tickets-table';

type Step4Values = z.infer<typeof step4Schema>;

// TODO: get the real prices from the backend
const TICKET_PRICE = 60;
const MEAL_TICKET_PRICE = 20;

export function Step4() {
  const navigate = useNavigate();

  const { fullTicketCount, mealTicketCount, payrollDeductionAmount, user } =
    useFormStepper();

  const totalGuestTickets = user.guest ? 1 : 0;
  const totalChildrenTickets = user.children ? user.children : 0;

  const form = useForm<Step4Values>({
    resolver: zodResolver(step4Schema),
    defaultValues: {
      email: '',
    },
  });

  const handlePrint = async () => {
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]); // A4 size
    const { width, height } = page.getSize();
    const fontSize = 12;
    const lineHeight = fontSize * 1.2;
    let y = height - 50; // Start from top with margin

    // Helper function to add text
    const addText = (text: string, x: number, y: number, options = {}) => {
      page.drawText(text, {
        x,
        y,
        size: fontSize,
        color: rgb(0, 0, 0),
        ...options,
      });
    };

    // Add title
    addText('Order Summary', width / 2 - 50, y, { size: 20 });
    y -= lineHeight * 2;

    // Section A
    addText('Section A - from Zachry Corporation', 50, y, { size: 16 });
    y -= lineHeight * 1.5;
    addText(`Employee Tickets: 1`, 50, y);
    y -= lineHeight;
    addText(`Guest Tickets: ${totalGuestTickets}`, 50, y);
    y -= lineHeight;
    addText(`Children Tickets: ${totalChildrenTickets}`, 50, y);
    y -= lineHeight * 2;

    // Section B
    addText('Section B - Employee Purchase', 50, y, { size: 16 });
    y -= lineHeight * 1.5;
    addText(
      `Full Tickets: ${fullTicketCount} x $${TICKET_PRICE} = $${fullTicketCount * TICKET_PRICE}`,
      50,
      y
    );
    y -= lineHeight;
    addText(
      `Meal Tickets: ${mealTicketCount} x $${MEAL_TICKET_PRICE} = $${mealTicketCount * MEAL_TICKET_PRICE}`,
      50,
      y
    );
    y -= lineHeight;
    addText(`Total Purchased by Employee: $${payrollDeductionAmount}`, 50, y);
    y -= lineHeight * 2;

    // Section C
    addText('Section C', 50, y, { size: 16 });
    y -= lineHeight * 1.5;
    addText(
      `Tickets Purchased by Zachry: ${totalGuestTickets + totalChildrenTickets + 1}`,
      50,
      y
    );
    y -= lineHeight;
    addText(
      `Tickets Purchased by Employee: ${fullTicketCount + mealTicketCount}`,
      50,
      y
    );
    y -= lineHeight;
    addText(
      `Total Number of Tickets Ordered: ${totalGuestTickets + totalChildrenTickets + 1 + fullTicketCount + mealTicketCount}`,
      50,
      y
    );

    // Save the PDF
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    // Open PDF in new window for printing
    const printWindow = window.open(url, '_blank');
    if (printWindow) {
      printWindow.onload = () => {
        printWindow.print();
      };
    }
  };

  const onSubmit = (data: Step4Values) => {
    if (data.email && data.email.trim() !== '') {
      sendEmail(
        data.email,
        'Order Confirmation',
        'Your order has been confirmed'
      );
    }
    navigate({ to: '/confirmation' });
  };

  return (
    <div className='flex flex-col gap-8 pb-4'>
      <h2 className='text-2xl font-bold text-center'>
        Section A - from Zachry Corporation
      </h2>
      <ProvidedTicketsTable
        guestTickets={totalGuestTickets}
        childrenTickets={totalChildrenTickets}
      />
      <Form {...form}>
        <h2 className='text-2xl font-bold text-center'>
          Section B - Employee Purchase
        </h2>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
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
                <TableCell>Full Ticket (meal ticket included)</TableCell>
                <TableCell>{fullTicketCount}</TableCell>
                <TableCell>${TICKET_PRICE}</TableCell>
                <TableCell className='text-right'>
                  ${fullTicketCount * TICKET_PRICE}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Meal Ticket (for season pass holders)</TableCell>
                <TableCell>{mealTicketCount}</TableCell>
                <TableCell>${MEAL_TICKET_PRICE}</TableCell>
                <TableCell className='text-right'>
                  ${mealTicketCount * MEAL_TICKET_PRICE}
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
                  ${payrollDeductionAmount}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>

          <h2 className='text-2xl font-bold text-center'>Section C</h2>
          <Table className='border'>
            <TableBody>
              <TableRow>
                <TableCell className='bg-blue-300'>
                  Number of Tickets Purchased by Zachry (from Section A above)
                </TableCell>
                <TableCell className='text-right'>
                  {totalGuestTickets + totalChildrenTickets + 1}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className='bg-emerald-200'>
                  Number of Tickets purchased by Employee (from Section B above)
                </TableCell>
                <TableCell className='text-right'>
                  {fullTicketCount + mealTicketCount}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className='font-bold'>
                  Total Number of Tickets Ordered
                </TableCell>
                <TableCell className='text-right'>
                  {totalGuestTickets +
                    totalChildrenTickets +
                    1 +
                    fullTicketCount +
                    mealTicketCount}
                </TableCell>
              </TableRow>
            </TableBody>
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
            <Button type='button' variant='outline' onClick={handlePrint}>
              Print
            </Button>
            <Button type='submit'>Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

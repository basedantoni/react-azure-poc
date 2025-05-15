import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

export function ProvidedTicketsTable({
  guestTickets,
  childrenTickets,
}: {
  guestTickets: number;
  childrenTickets: number;
}) {
  const totalTickets = guestTickets + childrenTickets + 1;

  return (
    <Table className='border'>
      <TableHeader className='bg-blue-200'>
        <TableRow>
          <TableHead className='font-bold'>
            Tickets Provided by Zachry
          </TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Employee</TableCell>
          <TableCell className='text-right'>1</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            Spouse <span className='font-bold'>OR</span> Guest
          </TableCell>
          <TableCell className='text-right'>{guestTickets}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Children</TableCell>
          <TableCell className='text-right'>{childrenTickets}</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter className='bg-blue-200'>
        <TableRow>
          <TableCell className='font-bold'>Total Provided by Zachry</TableCell>
          <TableCell className='text-right'>{totalTickets}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

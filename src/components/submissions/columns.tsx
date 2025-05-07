import { ColumnDef } from '@tanstack/react-table';
import { Submission } from '@/types';
import { format } from 'date-fns';
import { Button } from '../ui/button';
import { EyeIcon } from 'lucide-react';

export const columns: ColumnDef<Submission>[] = [
  {
    header: 'Park',
    accessorKey: 'park',
  },
  {
    header: 'Full Ticket',
    accessorKey: 'fullTicket',
  },
  {
    header: 'Meal Ticket',
    accessorKey: 'mealTicket',
  },
  {
    header: 'Created At',
    accessorKey: 'createdAt',
    cell: ({ row }) => {
      return format(new Date(row.original.createdAt || ''), 'MM/dd hh:mm');
    },
  },
  {
    header: 'Updated At',
    accessorKey: 'updatedAt',
    cell: ({ row }) => {
      return format(new Date(row.original.updatedAt || ''), 'MM/dd hh:mm');
    },
  },
  {
    header: 'View',
    accessorKey: 'view',
    cell: () => {
      return (
        <Button size='icon' variant='ghost'>
          <EyeIcon className='w-4 h-4' />
        </Button>
      );
    },
  },
];

import { DataTableColumnHeader } from '../data-table/column-header';
import { ColumnDef } from '@tanstack/react-table';
import { Submission } from '@/types';
import { format } from 'date-fns';
import { Button } from '../ui/button';
import { PencilIcon } from 'lucide-react';

export const columns: ColumnDef<Submission>[] = [
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Park' />
    ),
    accessorKey: 'park',
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Full Ticket' />
    ),
    accessorKey: 'fullTicket',
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Meal Ticket' />
    ),
    accessorKey: 'mealTicket',
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Created At' />
    ),
    accessorKey: 'createdAt',
    cell: ({ row }) => {
      return format(new Date(row.original.createdAt || ''), 'MM/dd hh:mm');
    },
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Updated At' />
    ),
    accessorKey: 'updatedAt',
    cell: ({ row }) => {
      return format(new Date(row.original.updatedAt || ''), 'MM/dd hh:mm');
    },
  },
  {
    header: 'Edit',
    accessorKey: 'edit',
    cell: () => {
      return (
        <Button size='icon' variant='ghost'>
          <PencilIcon className='w-4 h-4' />
        </Button>
      );
    },
  },
];

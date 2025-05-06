import { ColumnDef } from '@tanstack/react-table';
import { Submission } from '@/types';
import { format } from 'date-fns';

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
      return format(new Date(row.original.createdAt || ''), 'MM/dd hh:mmaaa');
    },
  },
  {
    header: 'Updated At',
    accessorKey: 'updatedAt',
    cell: ({ row }) => {
      return format(new Date(row.original.updatedAt || ''), 'MM/dd hh:mmaaa');
    },
  },
];

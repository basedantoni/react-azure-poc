import { ColumnDef } from '@tanstack/react-table';
import { Request } from '@/types';
import { format } from 'date-fns';

export const columns: ColumnDef<Request>[] = [
  {
    header: 'Title',
    accessorKey: 'title',
  },
  {
    header: 'Status',
    accessorKey: 'status',
  },
  {
    header: 'User',
    accessorKey: 'userId',
  },
  {
    header: 'Created At',
    accessorKey: 'createdAt',
    cell: ({ row }) => {
      return format(new Date(row.original.createdAt), 'MM/dd hh:mmaaa');
    },
  },
  {
    header: 'Updated At',
    accessorKey: 'updatedAt',
    cell: ({ row }) => {
      return format(new Date(row.original.updatedAt), 'MM/dd hh:mmaaa');
    },
  },
];

import { ColumnDef } from '@tanstack/react-table';
import { Submission } from '@/types';
import { format } from 'date-fns';
import { PencilIcon } from 'lucide-react';

import { DataTableColumnHeader } from '../data-table/column-header';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { SubmissionForm } from './form';
import { useState } from 'react';
export const columns: ColumnDef<Submission>[] = [
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='User' />
    ),
    accessorKey: 'user.ein',
  },
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
      <DataTableColumnHeader column={column} title='Deduction Period' />
    ),
    accessorKey: 'deductionPeriod',
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
    cell: ({ row }) => {
      const [open, setOpen] = useState(false);
      const closeModal = () => setOpen(false);

      return (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className='cursor-pointer' size='icon' variant='ghost'>
              <PencilIcon className='w-4 h-4' />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Submission</DialogTitle>
            </DialogHeader>
            <SubmissionForm submission={row.original} closeModal={closeModal} />
          </DialogContent>
        </Dialog>
      );
    },
  },
];

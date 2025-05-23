import { ColumnDef } from '@tanstack/react-table';
import { Submission } from '@/types';
import { format } from 'date-fns';
import { PencilIcon, AlertTriangleIcon } from 'lucide-react';

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
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

export const columns: ColumnDef<Submission>[] = [
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='First Name' />
    ),
    accessorKey: 'user.firstName',
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Last Name' />
    ),
    accessorKey: 'user.lastName',
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='EIN' />
    ),
    accessorKey: 'user.ein',
    cell: ({ row }) => {
      const user = row.original.user;
      return (
        <div className='flex items-center gap-2'>
          {user ? (
            user.ein
          ) : (
            <div className='flex items-center gap-2 text-yellow-600'>
              <AlertTriangleIcon className='w-4 h-4' />
              <span>User not found</span>
            </div>
          )}
        </div>
      );
    },
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Job#/Location/Plant' />
    ),
    accessorKey: 'user.jobNumber',
  },
  {
    header: 'Employee + Guest',
    accessorKey: 'guest',
    cell: ({ row }) => {
      return row.original.guest ? 2 : 1;
    },
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Children' />
    ),
    accessorKey: 'pendingDependentChildren',
    cell: ({ row }) => {
      const user = row.original.user;
      return row.original.childrenVerification
        ? row.original.pendingDependentChildren
        : user?.children || 0;
    },
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Full Tickets to Purchase' />
    ),
    accessorKey: 'additionalFullTicket',
    enableResizing: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Meal Tickets to Purchase' />
    ),
    accessorKey: 'additionalMealTicket',
    enableResizing: true,
  },
  {
    header: 'Total Tickets',
    cell: ({ row }) => {
      return row.original.guest
        ? 2
        : 1 +
            row.original.additionalFullTicket +
            row.original.additionalMealTicket +
            (row.original.childrenVerification
              ? row.original.pendingDependentChildren
              : row.original.user?.children || 0);
    },
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Ticket Number' />
    ),
    accessorKey: 'ticketNumber',
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Payroll Deductions' />
    ),
    accessorKey: 'deductionPeriods',
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Park' />
    ),
    accessorKey: 'park',
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Notes' />
    ),
    accessorKey: 'notes',
    cell: ({ row }) => {
      // if notes is a long string, truncate it and add a tooltip
      if (row.original.notes.length > 32) {
        return (
          <Tooltip>
            <TooltipTrigger className='w-4' asChild>
              <span className='truncate'>
                {row.original.notes.slice(0, 32)}
              </span>
            </TooltipTrigger>
            <TooltipContent>{row.original.notes}</TooltipContent>
          </Tooltip>
        );
      }
      return row.original.notes || '-';
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

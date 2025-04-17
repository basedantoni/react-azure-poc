'use client';

import { RequestForm } from '@/components/requests/request-form';
import { Request } from '@/types';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';

const RequestModal = ({
  request,
  emptyState,
}: {
  request?: Request;
  emptyState?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const editing = !!request?.id;

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        {emptyState ? (
          <Button>
            <Plus size={16} />
            New Request
          </Button>
        ) : (
          <Button
            variant={editing ? 'ghost' : 'outline'}
            size={editing ? 'sm' : 'icon'}
          >
            {editing ? 'Edit' : '+'}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className='px-5 pt-5'>
          <DialogTitle>{editing ? 'Edit' : 'Create'} Request</DialogTitle>
        </DialogHeader>
        <div className='px-5 pb-5'>
          <RequestForm closeModal={closeModal} request={request} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RequestModal;

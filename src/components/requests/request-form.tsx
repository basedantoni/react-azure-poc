'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { User, Request, NewRequest } from '@/types';
import { z } from 'zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUsers } from '@/api/users';
import { createRequest, updateRequest } from '@/api/requests';

const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  status: z.enum(['pending', 'complete']),
  userId: z.string().min(1, 'User is required'),
});

type RequestFormProps = {
  closeModal: () => void;
  request?: Request;
};

export function RequestForm({ closeModal, request }: RequestFormProps) {
  const editing = !!request?.id;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      status: 'pending',
      userId: '',
    },
  });

  const queryClient = useQueryClient();

  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers(),
  });

  const { mutate: createRequestMutation, isPending: isCreating } = useMutation({
    mutationFn: (request: NewRequest) => createRequest(request),
    onSuccess: () => {
      closeModal();
      queryClient.invalidateQueries({ queryKey: ['requests'] });
    },
  });

  const { mutate: updateRequestMutation, isPending: isUpdating } = useMutation({
    mutationFn: (request: Request) => updateRequest(request),
    onSuccess: () => {
      closeModal();
      queryClient.invalidateQueries({ queryKey: ['requests'] });
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (editing) {
      updateRequestMutation(request);
    } else {
      createRequestMutation(values);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder='Enter request title' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='status'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select status' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='pending'>Pending</SelectItem>
                  <SelectItem value='complete'>Complete</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='userId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>User</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={
                  users?.find((user: User) => user.id === field.value)?.email
                }
                disabled={isLoading}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select user' />
                  </SelectTrigger>
                </FormControl>
                {users && (
                  <SelectContent>
                    {users.map((user: User) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.email}
                      </SelectItem>
                    ))}
                  </SelectContent>
                )}
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create Request'}
        </Button>
      </form>
    </Form>
  );
}

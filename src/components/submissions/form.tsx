import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Form, FormField, FormItem, FormLabel } from '../ui/form';
import { Submission } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteSubmission, updateSubmission } from '@/api/submissions';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { Checkbox } from '../ui/checkbox';
import { Textarea } from '../ui/textarea';

export function SubmissionForm({
  submission,
  closeModal,
}: {
  submission: Submission;
  closeModal?: () => void;
}) {
  const form = useForm<Submission>({
    defaultValues: submission ?? {
      park: '',
      additionalFullTicket: 0,
      additionalMealTicket: 0,
      payrollDeduction: false,
      deductionPeriods: 0,
      childrenVerification: false,
      notes: '',
    },
  });

  const queryClient = useQueryClient();
  const { mutate: update } = useMutation({
    mutationFn: (data: Submission) => updateSubmission(submission.id, data),
    onSuccess: () => {
      toast.success('Submission updated successfully');
      if (closeModal) closeModal();
      queryClient.invalidateQueries({ queryKey: ['submissions'] });
    },
    onError: () => {
      toast.error('Error updating submission');
    },
  });

  const { mutate: removeSubmission } = useMutation({
    mutationFn: () => deleteSubmission(submission.id),
    onSuccess: () => {
      toast.success('Submission deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['submissions'] });
      if (closeModal) closeModal();
    },
    onError: () => {
      toast.error('Error deleting submission');
    },
  });

  const handleSubmit = (data: Submission) => {
    update(data);
  };

  const handleDelete = () => {
    removeSubmission();
  };

  return (
    <Form {...form}>
      <form className='space-y-4' onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name='park'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Park</FormLabel>
              <Input type='text' {...field} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='additionalFullTicket'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Ticket</FormLabel>
              <Input type='number' {...field} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='additionalMealTicket'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meal Ticket</FormLabel>
              <Input type='number' {...field} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='childrenVerification'
          render={({ field }) => (
            <FormItem className='flex flex-row items-center gap-2'>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <FormLabel>Dependent Children Verification</FormLabel>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='payrollDeduction'
          render={({ field }) => (
            <FormItem className='flex flex-row items-center gap-2'>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <FormLabel>Payroll Deduction</FormLabel>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='deductionPeriods'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deduction Period</FormLabel>
              <Input type='number' {...field} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='notes'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <Textarea {...field} />
            </FormItem>
          )}
        />
        <div className='flex justify-end gap-2'>
          <div className='flex justify-end'>
            <Button type='submit'>Update</Button>
          </div>
          <div className='flex justify-end'>
            <Button variant='destructive' type='button' onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

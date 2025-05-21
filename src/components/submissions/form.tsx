import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Form, FormField, FormItem, FormLabel } from '../ui/form';
import { Submission } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSubmission } from '@/api/submissions';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { Checkbox } from '../ui/checkbox';

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
      fullTicket: 0,
      mealTicket: 0,
      payrollDeduction: false,
      deductionPeriod: 0,
      childrenVerification: false,
    },
  });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
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

  const handleSubmit = (data: Submission) => {
    mutate(data);
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
          name='fullTicket'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Ticket</FormLabel>
              <Input type='number' {...field} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='mealTicket'
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
            <FormItem>
              <FormLabel>Children Verification</FormLabel>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='payrollDeduction'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payroll Deduction</FormLabel>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='deductionPeriod'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deduction Period</FormLabel>
              <Input type='number' {...field} />
            </FormItem>
          )}
        />
        <div className='flex justify-end'>
          <Button type='submit'>Update</Button>
        </div>
      </form>
    </Form>
  );
}

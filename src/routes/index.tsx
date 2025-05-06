import { createFileRoute } from '@tanstack/react-router';
import { MultiStepForm } from '@/components/multi-step-form';

export const Route = createFileRoute('/')({
  component: RouteComponent,
}) as any;

function RouteComponent() {
  return (
    <div className='container mx-auto flex flex-col items-center gap-4'>
      <MultiStepForm />
    </div>
  );
}

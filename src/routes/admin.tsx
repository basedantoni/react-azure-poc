import { createFileRoute } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';

// Lazy load the submission table component
const SubmissionTableWrapper = lazy(() =>
  import('@/components/submissions/submission-table-wrapper').then(
    (module) => ({
      default: module.SubmissionTableWrapper,
    })
  )
);

export const Route = createFileRoute('/admin')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className='flex flex-col py-8 container mx-auto justify-center space-y-8'>
      <h1 className='text-2xl font-bold'>Admin</h1>
      <Suspense fallback={<div className='p-4'>Loading admin data...</div>}>
        <SubmissionTableWrapper />
      </Suspense>
    </main>
  );
}

import { SubmissionTable } from '@/components/submissions/submission-table';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <SubmissionTable />
    </>
  );
}

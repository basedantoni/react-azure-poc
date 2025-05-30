import { useQuery } from '@tanstack/react-query';
import { DataTable } from './data-table';
import { columns } from './columns';
import { getSubmissions } from '@/api/submissions';

export function SubmissionTableWrapper() {
  const { isPending, data, error } = useQuery({
    queryKey: ['submissions'],
    queryFn: getSubmissions,
  });

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <DataTable data={data} columns={columns} />;
}

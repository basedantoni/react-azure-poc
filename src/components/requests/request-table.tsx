import RequestModal from './request-modal';

import { useQuery } from '@tanstack/react-query';
import { DataTable } from './data-table';
import { columns } from './columns';
import { getRequests } from '@/api/requests';

export function RequestTable() {
  const { isPending, data, error } = useQuery({
    queryKey: ['requests'],
    queryFn: getRequests,
  });

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <DataTable data={data} columns={columns} />
      <RequestModal emptyState />
    </>
  );
}

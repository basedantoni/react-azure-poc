import { useState } from 'react';
import {
  ColumnDef,
  SortingState,
  useReactTable,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
} from '@tanstack/react-table';
import { mkConfig, generateCsv, download } from 'export-to-csv';
import { Submission } from '@/types';

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '../ui/table';
import { DataTablePagination } from '../data-table/pagination';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { X } from 'lucide-react';

interface DataTableProps<TData extends Submission, TValue> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
}

export function DataTable<TData extends Submission, TValue>({
  data,
  columns,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState<any>('');

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: 'auto',
    onSortingChange: setSorting,
    state: {
      sorting,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  });

  const today = new Date().toISOString().split('T')[0];
  const csvConfig = mkConfig({
    fieldSeparator: ',',
    filename: `submissions-${today}`,
    decimalSeparator: '.',
    useKeysAsHeaders: true,
  });

  const exportExcel = (rows: Row<Submission>[]) => {
    const rowData = rows.map((row) => ({
      ...row.original,
      user: row.original.user?.ein || '',
    }));
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

  const clearFilters = () => {
    setGlobalFilter('');
    setSorting([]);
  };

  return (
    <div>
      <div className='flex flex-col justify-between gap-2 md:flex-row md:items-center py-4'>
        <div className='flex gap-2'>
          <Input
            placeholder='Search...'
            value={globalFilter}
            onChange={(e) => table.setGlobalFilter(String(e.target.value))}
            className='max-w-sm min-w-64'
          />
          {(globalFilter || sorting.length > 0) && (
            <Button variant='outline' onClick={clearFilters}>
              <X className='w-4 h-4' />
              Clear Filters
            </Button>
          )}
        </div>
        <Button onClick={() => exportExcel(table.getFilteredRowModel().rows)}>
          Generate Report
        </Button>
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}

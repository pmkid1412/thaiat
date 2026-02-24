import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Spinner } from "@/components/ui/spinner";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  onOpenEvidence?: (id: number) => void;
  onOpenPrediction?: (id: number) => void;
  loading?: boolean;
}

export function PredictionList<TData, TValue>({
  columns,
  data,
  onEdit,
  onDelete,
  onOpenEvidence,
  onOpenPrediction,
  loading,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      onEdit,
      onDelete,
      onOpenEvidence,
      onOpenPrediction,
    },
  });

  return (
    <Table className="border-y">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      {loading ? (
        <TableBody>
          <TableRow>
            <TableCell colSpan={columns.length} className="py-10">
              <div className="flex justify-center">
                <Spinner className="size-8" />
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      ) : (
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Không có kết quả.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      )}
    </Table>
  );
}

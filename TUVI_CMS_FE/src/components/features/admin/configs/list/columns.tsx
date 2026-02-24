import { type ColumnDef } from "@tanstack/react-table";
import { Edit } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { ConfigItem } from "@/services/types";

export const columns: ColumnDef<ConfigItem>[] = [
  {
    accessorKey: "name",
    header: "Tên",
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("name")}</span>
    ),
  },
  {
    accessorKey: "valueType",
    header: "Loại",
    cell: ({ row }) => (
      <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
        {row.getValue("valueType")}
      </span>
    ),
  },
  {
    accessorKey: "value",
    header: "Giá trị",
    cell: ({ row }) => (
      <div className="max-w-lg truncate" title={row.getValue("value")}>
        {row.getValue("value")}
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: "Mô tả",
    cell: ({ row }) => (
      <div className="max-w-2xl truncate text-muted-foreground text-sm">
        {row.getValue("description")}
      </div>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-center">Thao tác</div>,
    cell: ({ row, table }) => {
      const config = row.original;
      const meta = table.options.meta as {
        onEdit?: (config: ConfigItem) => void;
      };

      return (
        <div className="text-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => meta.onEdit?.(config)}
            title="Chỉnh sửa"
          >
            <Edit className="size-4" />
          </Button>
        </div>
      );
    },
  },
];

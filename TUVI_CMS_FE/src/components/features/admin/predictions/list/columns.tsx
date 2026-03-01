import { type ColumnDef } from "@tanstack/react-table";
import { Crown, Edit, Ellipsis, Eye, Link, Share2, Trash2, TriangleAlert } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { PredictionItem } from "@/services/types/prediction.type";
import {
  PREDICTION_STATUSES_OPTIONS,
  PREDICTION_TYPES,
} from "@/shared/constants";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export const columns: ColumnDef<PredictionItem>[] = [
  {
    accessorKey: "title",
    header: "Tiêu đề",
    cell: ({ row }) => {
      return (
        <div className="max-w-sm">
          <div className="font-medium truncate" title={row.getValue("title")}>{row.getValue("title")}</div>
          <div className="text-sm text-muted-foreground truncate" title={row.original.summary}>
            {row.original.summary}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Loại",
    cell: ({ row }) => {
      const type: string = row.getValue("type");
      return (
        <Badge
          variant="outline"
          className={cn({
            "border-purple-500 text-purple-600 bg-purple-50":
              type === PREDICTION_TYPES.PRO,
          })}
        >
          {type === PREDICTION_TYPES.PRO && <Crown />} {type}
        </Badge>
      );
    },
  },
  {
    accessorKey: "domainName",
    header: "Lĩnh vực",
    cell: ({ row }) => {
      return <div className="text-sm">{row.getValue("domainName")}</div>;
    },
  },
  {
    accessorKey: "predictionStatus",
    header: "Trạng thái",
    cell: ({ row }) => {
      return (
        <Badge variant="outline">{row.getValue("predictionStatus")}</Badge>
      );
    },
  },
  {
    accessorKey: "confidenceScore",
    header: "Độ tin cậy",
    cell: ({ row }) => {
      const score = row.getValue("confidenceScore") as number;
      return <span className="text-sm font-medium">{score}%</span>;
    },
  },
  {
    accessorKey: "status",
    header: "Phiên bản",
    cell: ({ row }) => {
      const status = PREDICTION_STATUSES_OPTIONS.find(
        (option) => option.value === row.getValue("status")
      );

      return (
        <Badge variant="outline" className={cn("border", status?.className)}>
          {status?.label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Thời gian",

    cell: ({ row }) => {
      const createdAt = new Date(row.getValue("createdAt"));
      return (
        <div className="text-sm text-gray-600">{createdAt.toLocaleDateString("vi-VN")}</div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-center">Thao tác</div>,
    cell: ({ row, table }) => {
      const prediction = row.original;
      const meta = table.options.meta as {
        onEdit?: (id: number) => void;
        onDelete?: (id: number) => void;
        onOpenEvidence?: (id: number) => void;
        onOpenPrediction?: (id: number) => void;
        onShare?: (id: number) => void;
      };
      const { onEdit, onDelete, onOpenEvidence, onOpenPrediction, onShare } = meta;

      return (
        <div className="flex items-center justify-start">
          <div className="flex items-center justify-end w-12">
            <Button
              variant="ghost"
              aria-label="view evidence"
              onClick={() => onOpenEvidence?.(prediction.id)}
              title="Quản lý dẫn chứng"
              className="gap-0.5"
            >
              <Link className="h-4 w-4" />
              {!!prediction.evidenceCount && `(${prediction.evidenceCount})`}
            </Button>
          </div>

          <Button
            size="icon"
            variant="ghost"
            aria-label="view"
            title="Xem chi tiết"
            onClick={() => onOpenPrediction?.(prediction.id)}
          >
            <Eye className="h-4 w-4" />
          </Button>

          <Popover>
            <PopoverTrigger asChild>
              <Button size="icon" variant="ghost">
                <Ellipsis />
              </Button>
            </PopoverTrigger>


            <PopoverContent className="w-fit p-1" align="end">
              <div className="flex flex-col gap-0.5">
                <Button variant="ghost" className="justify-start gap-2" onClick={() => onEdit?.(prediction.id)}>
                  <Edit className="h-4 w-4" /> Chỉnh sửa
                </Button>
                <Button variant="ghost" className="justify-start gap-2 text-blue-600" onClick={() => onShare?.(prediction.id)}>
                  <Share2 className="h-4 w-4" /> Share Facebook
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" className="justify-start gap-2 text-destructive">
                      <Trash2 className="h-4 w-4" /> Xóa
                    </Button>
                  </AlertDialogTrigger>

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="flex items-center gap-2">
                        <TriangleAlert className="h-5 w-5 text-destructive" />
                        <div className="font-medium text-lg">Xác nhận</div>
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Bạn có chắc chắn muốn xóa dự đoán này không? Hành động này
                        không thể hoàn tác.
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                      <AlertDialogCancel>Hủy</AlertDialogCancel>
                      <AlertDialogAction
                        className={buttonVariants({ variant: "destructive" })}
                        onClick={() => onDelete?.(prediction.id)}
                      >
                        Xóa
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      );
    },
  },
];

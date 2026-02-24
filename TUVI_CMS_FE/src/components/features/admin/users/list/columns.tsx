import { type ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2, TriangleAlert } from "lucide-react";

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { UpgradeUserByTypeRequest, UserItem } from "@/services/types";
import { USER_STATUS_OPTIONS, UserStatus } from "@/shared/constants";
import { UserTypeRenderer } from "./UserTypeRenderer";

export const columns: ColumnDef<UserItem>[] = [
  {
    accessorKey: "id",
    header: "Người dùng",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200"
              alt={`Avatar của ${user.name}`}
            />
            <AvatarFallback>
              {user.name
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{user.name}</div>
            <div className="text-sm text-muted-foreground">ID: {user.id}</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      return <div className="text-sm">{row.getValue("email")}</div>;
    },
  },
  // {
  //   accessorKey: "phoneNumber",
  //   header: "Số điện thoại",
  //   cell: ({ row }) => {
  //     return <div>{row.getValue("phoneNumber")}</div>;
  //   },
  // },
  {
    accessorKey: "servicePlan",
    header: "Loại tài khoản",
    cell: ({ row, table }) => {
      const meta = table.options.meta as {
        onUpdateType?: (data: UpgradeUserByTypeRequest) => Promise<void>;
        onOpenUserUpgrade?: (id: number) => void;
      };

      return (
        <UserTypeRenderer
          type={row.original.userType}
          userId={row.original.id}
          onChange={meta.onUpdateType}
          onOpenUserUpgrade={meta.onOpenUserUpgrade}
          disabled={row.original.status === UserStatus.DELETED}
        />
      );
    },
  },
  {
    accessorKey: "registeredAt",
    header: "Ngày đăng ký",
    cell: ({ row }) => {
      const registeredAt = new Date(row.getValue("registeredAt"));
      return (
        <div>
          {registeredAt.toLocaleDateString("vi-VN")}{" "}
          <span className="text-muted-foreground text-sm">
            {registeredAt.toLocaleTimeString("vi-VN")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const statusItem = USER_STATUS_OPTIONS.find(
        (option) => option.value === status
      );

      return (
        <Badge
          variant="outline"
          className={cn(
            `border-${statusItem?.color}-500`,
            `text-${statusItem?.color}-700`
          )}
        >
          {statusItem?.label}
        </Badge>
      );
    },
  },
  // actions column
  {
    id: "actions",
    header: "Thao tác",
    cell: ({ row, table }) => {
      const user = row.original;

      const meta = table.options.meta as {
        onEdit?: (id: number) => void;
        onDelete?: (id: number) => void;
      };
      const onEdit = meta?.onEdit;
      const onDelete = meta?.onDelete;

      return (
        <div>
          <Button
            size="icon"
            variant="ghost"
            aria-label="edit"
            title="Chỉnh sửa"
            onClick={() => onEdit?.(user.id)}
            disabled={user.status === UserStatus.DELETED}
          >
            <Edit />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="icon" variant="ghost" aria-label="delete" title="Xóa" disabled={user.status === UserStatus.DELETED}>
                <Trash2 color="red" />
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2">
                  <TriangleAlert color="red" />
                  <div className="font-medium text-lg">Xác nhận</div>
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Bạn có chắc chắn muốn xóa người dùng này không?
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Hủy</AlertDialogCancel>
                <AlertDialogAction
                  className={buttonVariants({ variant: "destructive" })}
                  onClick={() => onDelete?.(user.id)}
                >
                  Xóa
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];

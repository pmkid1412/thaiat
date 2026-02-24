import { Link as TLink } from "@tanstack/react-router";
import { Edit, Link, Trash2, TriangleAlert } from "lucide-react";
import type { FC } from "react";

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
import { Button, buttonVariants } from "@/components/ui/button";
import type { EvidenceItem } from "@/services/types";

interface PredictionEvidenceListProps {
  data: EvidenceItem[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export const PredictionEvidenceList: FC<PredictionEvidenceListProps> = ({
  data,
  onDelete,
  onEdit,
}) => {
  return (
    <div className="space-y-2 mt-2">
      <h2 className="font-medium">Danh sách dẫn chứng ({data.length})</h2>
      <div className="space-y-4">
        {data?.map((evidence: EvidenceItem) => (
          <div
            key={evidence.id}
            className="border rounded-xl p-4 flex justify-between items-start gap-2"
          >
            <div className="flex flex-col gap-1">
              <h3
                className="text-lg font-medium line-clamp-2"
                title={evidence.title}
              >
                {evidence.title}
              </h3>

              <div className="flex gap-1 items-center text-muted-foreground">
                <p className="text-sm ">
                  {evidence.source || "Không xác định"}
                </p>
                •<p className="text-sm">{evidence.publishedDate}</p>•
                <p className="text-sm">
                  Độ tin cậy: {evidence.confidenceScore}%
                </p>
              </div>

              <p
                className="mt-2 text-sm text-muted-foreground line-clamp-4"
                title={evidence.quote}
              >
                {evidence.quote}
              </p>

              <TLink
                to={evidence.link}
                target="_blank"
                className="inline-flex items-center text-sm gap-1 font-medium hover:underline mt-2 w-fit"
              >
                <Link size={16} className="shrink-0" />
                {evidence.link}
              </TLink>
            </div>

            <div className="flex flex-col">
              <Button
                size="icon"
                variant="ghost"
                aria-label="edit"
                onClick={() => onEdit?.(evidence.id)}
                title="Chỉnh sửa"
              >
                <Edit className="h-4 w-4" />
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    aria-label="delete"
                    title="Xóa"
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2">
                      <TriangleAlert className="h-5 w-5 text-destructive" />
                      <div className="font-medium text-lg">Xác nhận</div>
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Bạn có chắc chắn muốn xóa dẫn chứng này không? Hành động
                      này không thể hoàn tác.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel>Hủy</AlertDialogCancel>
                    <AlertDialogAction
                      className={buttonVariants({ variant: "destructive" })}
                      onClick={() => onDelete?.(evidence.id)}
                    >
                      Xóa
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

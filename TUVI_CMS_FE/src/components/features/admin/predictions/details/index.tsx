import { useQuery } from "@tanstack/react-query";
import { Crown } from "lucide-react";
import type { FC } from "react";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { predictionKeys } from "@/services/queries/prediction.query";
import type { AreaLocalizedItem } from "@/services/types";
import {
  PREDICTION_STATUSES_OPTIONS,
  PREDICTION_TYPES,
} from "@/shared/constants";

interface PredictionDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id?: number;
  languageId?: number;
}

export const PredictionDetailsDialog: FC<PredictionDetailsDialogProps> = ({
  open,
  onOpenChange,
  id,
  languageId,
}) => {
  const getDetailsByLanguageId = useQuery(
    predictionKeys.getDetailsByLanguageId(id, languageId)
  );

  const data = getDetailsByLanguageId.data;
  const status = PREDICTION_STATUSES_OPTIONS.find(
    (option) => option.value === data?.status
  );

  if (!id) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-6 sm:p-8 overflow-auto max-h-11/12 sm:min-w-xl md:min-w-2xl">
        <DialogHeader className="space-y-0 pr-6">
          <DialogTitle
            className="text-xl sm:text-2xl font-bold text-foreground leading-tight line-clamp-2 wrap-break-word"
            title={data?.predictionData?.[0]?.title}
          >
            {data?.predictionData?.[0]?.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3.5 mt-4">
          <div className="grid grid-cols-2 gap-6">
            <section>
              <h3 className="font-semibold text-foreground mb-1">Loại</h3>
              <div
                className={cn("flex items-center gap-1", {
                  "text-purple-600": data?.type === PREDICTION_TYPES.PRO,
                  "text-gray-600": data?.type === PREDICTION_TYPES.FREE,
                })}
              >
                <Badge
                  variant="outline"
                  className={cn({
                    "border-purple-500 text-purple-600 bg-purple-50":
                      data?.type === PREDICTION_TYPES.PRO,
                  })}
                >
                  {data?.type === PREDICTION_TYPES.PRO && <Crown />}{" "}
                  {data?.type}
                </Badge>
              </div>
            </section>
            <section>
              <h3 className="font-semibold text-foreground mb-1">Phiên bản</h3>
              <Badge
                variant="outline"
                className={cn("border", status?.className)}
              >
                {status?.label}
              </Badge>
            </section>
          </div>

          <section>
            <h3 className="font-semibold text-foreground mb-1">Tóm tắt</h3>
            <p className="text-muted-foreground text-sm leading-relaxed wrap-break-word">
              {data?.predictionData?.[0]?.summary}
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-foreground mb-1">Mô tả</h3>
            <p
              className="text-muted-foreground text-sm leading-relaxed wrap-break-word"
              dangerouslySetInnerHTML={{
                __html: data?.predictionData?.[0]?.description || "",
              }}
            />
          </section>

          <div className="grid grid-cols-2 gap-6">
            <section>
              <h3 className="font-semibold text-foreground mb-1">Thời gian</h3>
              <p className="text-muted-foreground text-sm">
                {data?.startDate &&
                  new Date(data?.startDate).toLocaleDateString("vi-VN")}
                <span> - </span>
                {data?.endDate &&
                  new Date(data?.endDate).toLocaleDateString("vi-VN")}
              </p>
            </section>
            <section>
              <h3 className="font-semibold text-foreground mb-1">Quốc gia</h3>
              <p className="text-muted-foreground text-sm">
                {data?.areas
                  ?.flatMap((area) => area)
                  .filter((area) => area.languageId === languageId)
                  .map((area: AreaLocalizedItem) => area.name)
                  .join(", ")}
              </p>
            </section>
          </div>

          {/* Tags Section */}
          <section
            className={cn({
              hidden: !data?.tags?.length,
            })}
          >
            <h3 className="font-semibold text-foreground mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {data?.tags
                .map((tag) => tag.trim())
                .map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="rounded-full px-3 py-1 text-sm font-normal"
                  >
                    {tag}
                  </Badge>
                ))}
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};

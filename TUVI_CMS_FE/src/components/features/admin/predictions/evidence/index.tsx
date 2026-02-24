import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, type FC } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { evidenceKeys } from "@/services/queries/evidence.query";
import type { EvidenceFormData } from "@/shared/schemas/evidence.schema";
import { EvidenceForm } from "./Form";
import { PredictionEvidenceList } from "./List";

interface PredictionEvidenceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  predictionId?: number;
}

export const PredictionEvidenceDialog: FC<PredictionEvidenceDialogProps> = ({
  open,
  onOpenChange,
  predictionId,
}) => {
  const [selectedEvidenceId, setSelectedEvidenceId] = useState<number>();

  const queryClient = useQueryClient();

  const getEvidencesQuery = useQuery(evidenceKeys.list(predictionId));
  const createEvidenceMutation = useMutation(evidenceKeys.createEvidence());
  const updateEvidenceMutation = useMutation(evidenceKeys.updateEvidence());
  const deleteEvidenceMutation = useMutation(evidenceKeys.deleteEvidence());
  const getEvidencesDetailsQuery = useQuery(
    evidenceKeys.details(selectedEvidenceId)
  );

  const handleDeleteEvidence = async (id: number) => {
    await deleteEvidenceMutation.mutateAsync(id);
    getEvidencesQuery.refetch();
    queryClient.invalidateQueries({ queryKey: ["predictions"] });
  };

  const handleSelectEvidence = (id: number) => {
    setSelectedEvidenceId(id);
  };

  const handleSubmitEvidence = async (data: EvidenceFormData) => {
    if (selectedEvidenceId) {
      await updateEvidenceMutation.mutateAsync({
        id: selectedEvidenceId,
        data,
      });
    } else if (predictionId) {
      await createEvidenceMutation.mutateAsync({ ...data, predictionId });
    }
    getEvidencesQuery.refetch();
    queryClient.invalidateQueries({ queryKey: ["predictions"] });
    setSelectedEvidenceId(undefined);
  };

  const handleCancel = () => {
    setSelectedEvidenceId(undefined);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-xl max-h-4/5 overflow-y-auto overflow-x-hidden">
        <DialogHeader>
          <DialogTitle>Quản lý dẫn chứng</DialogTitle>
          <DialogDescription>
            Thêm, sửa hoặc xóa dẫn chứng cho dự đoán này
          </DialogDescription>
        </DialogHeader>

        <div className="border rounded-xl p-4">
          <EvidenceForm
            mode={selectedEvidenceId ? "edit" : "add"}
            defaultValues={
              selectedEvidenceId
                ? getEvidencesDetailsQuery.data?.data
                : undefined
            }
            loading={
              createEvidenceMutation.isPending ||
              updateEvidenceMutation.isPending
            }
            onSubmit={handleSubmitEvidence}
            onCancel={handleCancel}
          />
        </div>

        {!!getEvidencesQuery.data?.data?.length && (
          <PredictionEvidenceList
            data={getEvidencesQuery.data.data}
            onDelete={handleDeleteEvidence}
            onEdit={handleSelectEvidence}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

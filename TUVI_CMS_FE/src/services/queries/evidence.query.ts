import { mutationOptions, queryOptions } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  createEvidence,
  deleteEvidence,
  getEvidenceDetails,
  getEvidences,
  updateEvidence,
} from "../api/evidence.api";
import type { CreateEvidenceRequest } from "../types";

export const evidenceKeys = {
  all: ["evidences"] as const,
  details: (id?: number) =>
    queryOptions({
      queryKey: ["evidences", id],
      queryFn: () => getEvidenceDetails(id),
      enabled: Boolean(id),
    }),
  createEvidence: () =>
    mutationOptions({
      mutationKey: ["createEvidence"],
      mutationFn: (data: CreateEvidenceRequest) => createEvidence(data),
      onSuccess: () => {
        toast.success("Dẫn chứng được tạo thành công");
      },
    }),
  updateEvidence: () =>
    mutationOptions<
      null,
      null,
      { id: number; data: Partial<CreateEvidenceRequest> }
    >({
      mutationKey: ["updateEvidence"],
      mutationFn: ({ id, data }) => updateEvidence(id, data),
      onSuccess: () => {
        toast.success("Dẫn chứng được cập nhật thành công");
      },
    }),
  deleteEvidence: () =>
    mutationOptions<null, null, number>({
      mutationKey: ["deleteEvidence"],
      mutationFn: (id: number) => deleteEvidence(id),
      onSuccess: () => {
        toast.success("Dẫn chứng được xóa thành công");
      },
    }),
  list: (predictionId?: number) =>
    queryOptions({
      queryKey: ["evidences", `prediction-${predictionId}`],
      queryFn: () => getEvidences(predictionId),
      enabled: Boolean(predictionId),
    }),
};

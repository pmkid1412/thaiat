import { mutationOptions, queryOptions } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createPrediction,
  deletePrediction,
  getDetailsByLanguageId,
  getPredictionOverview,
  getPredictions,
  getPredictionStatsByConfidence,
  getPredictionStatsByDomain,
  getPredictionStatsByStatus,
  getRecentPredictions,
  updatePrediction,
} from "../api/prediction.api";
import type {
  CreatePredictionRequest,
  PredictionSearchParams,
} from "../types/prediction.type";

export const predictionKeys = {
  all: ["predictions"] as const,
  createPrediction: () =>
    mutationOptions({
      mutationKey: ["create-prediction"],
      mutationFn: (data: CreatePredictionRequest) => createPrediction(data),
      onSuccess: () => {
        toast.success("Dự đoán được tạo thành công");
      },
    }),
  getPredictions: (searchParams: PredictionSearchParams) =>
    queryOptions({
      queryKey: ["predictions", searchParams],
      queryFn: () => getPredictions(searchParams),
    }),
  getDetailsByLanguageId: (id?: number, languageId?: number) =>
    queryOptions({
      queryKey: ["prediction", id, languageId] as const,
      queryFn: () => getDetailsByLanguageId(id, languageId),
      enabled: !!id,
    }),
  updatePrediction: () =>
    mutationOptions({
      mutationKey: ["update-prediction"],
      mutationFn: ({
        id,
        data,
      }: {
        id: number;
        data: Partial<CreatePredictionRequest>;
      }) => updatePrediction(id, data),
      onSuccess: () => {
        toast.success("Dự đoán được cập nhật thành công");
      },
    }),
  deletePrediction: () =>
    mutationOptions({
      mutationKey: ["delete-prediction"],
      mutationFn: (id: number) => deletePrediction(id),
      onSuccess: () => {
        toast.success("Dự đoán được xóa thành công");
      },
    }),
  getPredictionOverview: () =>
    queryOptions({
      queryKey: ["prediction-overview"] as const,
      queryFn: getPredictionOverview,
    }),
  getRecentPredictions: (languageId?: number) =>
    queryOptions({
      queryKey: ["recent-predictions", languageId] as const,
      queryFn: () => getRecentPredictions(languageId),
      enabled: !!languageId,
    }),
  getPredictionStatsByDomain: (languageId?: string | number) =>
    queryOptions({
      queryKey: ["prediction-stats-by-domain", languageId] as const,
      queryFn: () => getPredictionStatsByDomain(languageId),
    }),
  getPredictionStatsByStatus: (languageId?: string | number) =>
    queryOptions({
      queryKey: ["prediction-stats-by-status", languageId] as const,
      queryFn: () => getPredictionStatsByStatus(languageId),
    }),
  getPredictionStatsByConfidence: () =>
    queryOptions({
      queryKey: ["prediction-stats-by-confidence"] as const,
      queryFn: getPredictionStatsByConfidence,
    }),
};

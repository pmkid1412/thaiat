import client from "@/lib/axios-config";
import type { SuccessResponse } from "@/shared/types";
import type {
  CreatePredictionRequest,
  PredictionListResponse,
  PredictionSearchParams,
  PredictionDetails,
  PredictionOverviewResponse,
  PredictionItem,
  PredictionStatsDomainItem,
  PredictionStatsStatusItem,
  PredictionStatsConfidenceItem,
} from "../types/prediction.type";

export const createPrediction = async (data: CreatePredictionRequest) => {
  const response = await client.post("/predictions", data);
  return response.data;
};

export const getPredictions = async (params: PredictionSearchParams) => {
  const response = await client.get<SuccessResponse<PredictionListResponse>>(
    "/predictions/manage",
    { params }
  );

  return response.data.data;
};

export const updatePrediction = async (
  id: number,
  data: Partial<CreatePredictionRequest>
) => {
  const response = await client.put(`/predictions/${id}`, data);
  return response.data;
};

export const deletePrediction = async (id: number) => {
  const response = await client.delete(`/predictions/${id}`);
  return response.data;
};

export const getDetailsByLanguageId = async (
  id?: number,
  languageId?: number
) => {
  const response = await client.get<SuccessResponse<PredictionDetails>>(
    `/predictions/${id}`,
    { params: { languageId } }
  );
  return response.data.data;
};

export const getPredictionOverview = async () => {
  const response = await client.get<
    SuccessResponse<PredictionOverviewResponse>
  >(`/predictions/overview`);
  return response.data.data;
};

export const getRecentPredictions = async (languageId?: number) => {
  const response = await client.get<SuccessResponse<PredictionItem[]>>(
    `/predictions/recent`,
    { params: { languageId } }
  );
  return response.data.data;
};

export const getPredictionStatsByDomain = async (
  languageId?: string | number
) => {
  const response = await client.get<
    SuccessResponse<PredictionStatsDomainItem[]>
  >("/predictions/stats/by-domain", {
    params: { languageId },
  });
  return response.data.data;
};

export const getPredictionStatsByStatus = async (
  languageId?: string | number
) => {
  const response = await client.get<
    SuccessResponse<PredictionStatsStatusItem[]>
  >("/predictions/stats/by-status", {
    params: { languageId },
  });
  return response.data.data;
};

export const getPredictionStatsByConfidence = async () => {
  const response = await client.get<
    SuccessResponse<PredictionStatsConfidenceItem[]>
  >(`/predictions/stats/by-confidence`);
  return response.data.data;
};

export const generateTeaser = async (id: number) => {
  const response = await client.post<SuccessResponse<{ teaser: string }>>(
    `/predictions/${id}/generate-teaser`
  );
  return response.data.data;
};

export const uploadPredictionImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await client.post<SuccessResponse<{ url: string }>>(
    "/predictions/upload-image",
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return response.data.data;
};

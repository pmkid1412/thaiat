import client from "@/lib/axios-config";

import type { SuccessResponse } from "@/shared/types";
import type { CreateEvidenceRequest, EvidenceItem } from "../types";

export const createEvidence = async (data: CreateEvidenceRequest) => {
  const response = await client.post("/evidences", data);
  return response.data;
};

export const deleteEvidence = async (id: number) => {
  const response = await client.delete(`/evidences/${id}`);
  return response.data;
};

export const getEvidenceDetails = async (id?: number) => {
  const response = await client.get<SuccessResponse<EvidenceItem>>(
    `/evidences/${id}`
  );
  return response.data;
};

export const updateEvidence = async (
  id: number,
  data: Partial<CreateEvidenceRequest>
) => {
  const response = await client.put(`/evidences/${id}`, data);
  return response.data;
};

export const getEvidences = async (predictionId?: number) => {
  const response = await client.get<SuccessResponse<EvidenceItem[]>>(
    `/evidences`,
    {
      params: { predictionId },
    }
  );
  return response.data;
};

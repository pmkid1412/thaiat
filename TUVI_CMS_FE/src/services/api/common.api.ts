import client from "@/lib/axios-config";
import type { ItemType, SuccessResponse } from "@/shared/types";

export const getLanguages = async () => {
  const response = await client.get<SuccessResponse<ItemType[]>>("/languages");
  return response.data.data;
};

export const getAreas = async (languageId?: number) => {
  const response = await client.get<SuccessResponse<ItemType[]>>("/areas", {
    params: { languageId },
  });
  return response.data.data;
};

export const getDomains = async (languageId?: number) => {
  const response = await client.get<SuccessResponse<ItemType[]>>("/domains", {
    params: { languageId },
  });
  return response.data.data;
};

export const getImpactLevels = async (languageId?: number) => {
  const response = await client.get<SuccessResponse<ItemType[]>>(
    "/impact-levels",
    { params: { languageId } }
  );
  return response.data.data;
};

export const getPredictionStatuses = async (languageId?: number) => {
  const response = await client.get<SuccessResponse<ItemType[]>>(
    "/prediction-status",
    {
      params: { languageId },
    }
  );
  return response.data.data;
};

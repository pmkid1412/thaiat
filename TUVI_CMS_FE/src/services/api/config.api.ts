import client from "@/lib/axios-config";
import type { SuccessResponse } from "@/shared/types";
import type { ConfigResponse, UpdateConfigRequest } from "../types";

export const getConfigs = async () => {
  const response = await client.get<SuccessResponse<ConfigResponse>>("/configs");
  return response.data.data;
};

export const updateConfig = async ({
  code,
  value,
}: UpdateConfigRequest) => {
  const response = await client.put(`/configs/${code}`, { value });
  return response.data;
};

export const uploadConfigFile = async ({
  code,
  file,
}: {
  code: string;
  file: File;
}) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await client.put(`/configs/${code}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const reloadInvestmentData = async () => {
  const response = await client.post("/tools/investment/reload");
  return response.data;
};
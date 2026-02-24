import client from "@/lib/axios-config";
import type { SuccessResponse } from "@/shared/types";
import type { LoginRequest, LoginResponse } from "../types";

export const login = async (data: LoginRequest) => {
  const response = await client.post<SuccessResponse<LoginResponse>>(
    "/auth/login",
    data
  );
  return response.data;
};

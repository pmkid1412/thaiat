import client from "@/lib/axios-config";
import type { SuccessResponse, UserDetails } from "@/shared/types";
import type {
  UserOverview,
  CreateUserRequest,
  CreateUserResponse,
  UserListResponse,
  UserSearchParams,
  UpdateUserRequest,
  UpgradeUserByTypeRequest,
} from "../types";

export const getUsers = async (params: UserSearchParams) => {
  const response = await client.get<SuccessResponse<UserListResponse>>(
    "/users",
    {
      params,
    }
  );
  return response.data.data;
};

export const getUsersOverview = async () => {
  const response = await client.get<SuccessResponse<UserOverview>>(
    "/users/overview"
  );
  return response.data.data;
};

export const createUser = async (data: CreateUserRequest) => {
  const response = await client.post<SuccessResponse<CreateUserResponse>>(
    "/users",
    data
  );
  return response.data.data;
};

export const getUserById = async (id?: number) => {
  const response = await client.get<SuccessResponse<UserDetails>>(
    `/users/${id}`
  );
  return response.data.data;
};

export const updateUser = async (id?: number, data?: UpdateUserRequest) => {
  const response = await client.put<SuccessResponse<null>>(
    `/users/${id}`,
    data
  );
  return response.data.data;
};

export const deleteUser = async (id: number) => {
  const response = await client.delete<SuccessResponse<null>>(`/users/${id}`);
  return response.data.data;
};

export const upgradeUserAccount = async ({ id, data }: UpgradeUserByTypeRequest) => {
  const response = await client.put<SuccessResponse<null>>(
    `/users/change-plan/${id}`,
    data
  );
  return response.data.data;
};

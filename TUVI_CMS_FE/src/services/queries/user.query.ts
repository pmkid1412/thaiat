import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  getUsersOverview,
  updateUser,
  upgradeUserAccount,
} from "../api/user.api";
import type {
  UpdateUserRequest,
  UpgradeUserByTypeRequest,
  UserSearchParams,
} from "../types";

export const useUsersQuery = (searchParams: UserSearchParams) => {
  return useQuery({
    queryKey: ["users", searchParams],
    queryFn: async () => {
      const response = await getUsers(searchParams);
      return response;
    },
  });
};

export const useUsersOverviewQuery = () => {
  return useQuery({
    queryKey: ["user-overview"],
    queryFn: getUsersOverview,
  });
};

export const useUserCreateMutation = () => {
  return useMutation({
    mutationKey: ["create-user"],
    mutationFn: createUser,
    onSuccess: () => {
      toast.success("Tạo người dùng thành công");
    },
  });
};

export const useUserDetailQuery = (id?: number) => {
  return useQuery({
    queryKey: ["user-detail", id],
    queryFn: () => getUserById(id),
    enabled: !!id,
  });
};

export const useUserUpdateMutation = () => {
  return useMutation<null, null, { id: number; data: UpdateUserRequest }>({
    mutationKey: ["update-user"],
    mutationFn: ({ id, data }) => updateUser(id, data),
    onSuccess: () => {
      toast.success("Cập nhật người dùng thành công");
    },
  });
};

export const useUserDeleteMutation = () => {
  return useMutation({
    mutationKey: ["delete-user"],
    mutationFn: (id: number) => {
      return deleteUser(id);
    },
    onSuccess: () => {
      toast.success("Xóa người dùng thành công");
    },
  });
};

export const useUserUpgradeAccountMutation = () => {
  return useMutation({
    mutationKey: ["upgrade-user-account"],
    mutationFn: (payload: UpgradeUserByTypeRequest) =>
      upgradeUserAccount(payload),
    onSuccess: () => {
      toast.success("Nâng cấp tài khoản thành công");
    },
  });
};

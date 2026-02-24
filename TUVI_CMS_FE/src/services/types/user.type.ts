import type { UserApiRequest } from "@/shared/schemas/user.schema";

export type CreateUserRequest = UserApiRequest;

export type UpdateUserRequest = UserApiRequest;

export type CreateUserResponse = {
  password: string;
};

export type UserItem = {
  id: number;
  name: string;
  email: string;
  dateOfBirth: string;
  userType: number;
  language: number;
  registeredAt: string;
  phoneNumber?: string;
  status: string;
};

export type UserListResponse = {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  data: UserItem[];
};

export type UserSearchParams = {
  page?: number;
  pageSize?: number;
  type?: number;
  search?: string;
};

export type UserOverview = {
  totalUsers: number;
  proUsers: number;
  freeUsers: number;
  birthChartUsers: number;
};

export type UpgradeUserByTypeRequest = {
  id: number;
  data: {
    userType: number;
    proPlanType?: string;
    proPlanStartDate?: string;
    proPlanEndDate?: string;
    autoRenew?: boolean;
    upgradePlanReason?: string;
  }
}



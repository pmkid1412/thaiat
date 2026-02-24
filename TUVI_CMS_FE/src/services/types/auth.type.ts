import type { USER_PROVIDER } from "@/shared/constants";

export type UserProvider = (typeof USER_PROVIDER)[keyof typeof USER_PROVIDER];

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};

export type RefreshResponse = {
  accessToken: string;
  refreshToken: string;
};

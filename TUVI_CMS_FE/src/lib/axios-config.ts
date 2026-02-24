import type { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import axios from "axios";
import Cookie from "universal-cookie";

import type { RefreshResponse } from "@/services/types";
import { ROUTES, TOKEN } from "@/shared/constants";
import type { SuccessResponse } from "@/shared/types";

const cookie = new Cookie();

const client: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  // withCredentials: true,
});

// Token refresh state management
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (error: unknown) => void;
}> = [];

class ApiError extends Error {
  response?: AxiosResponse;
  code?: number;
  errors?: Record<string, string[]>;
}

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });

  failedQueue = [];
};

client.interceptors.request.use(
  (config) => {
    const accessToken = cookie.get(TOKEN.ACCESS);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  (response) => {
    if (!response.data.success) {
      const error = new ApiError(response.data.message || "Đã xảy ra lỗi");
      error.response = response;
      error.code = response.data.code;
      error.errors = response.data.errors;
      throw error;
    }
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config;
    if (!originalRequest) return Promise.reject(error);

    if (error.response?.status === 401) {
      if (isRefreshing) {
        // If already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return client(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      const refreshToken = cookie.get(TOKEN.REFRESH);
      if (!refreshToken) {
        // No refresh token, redirect to login
        redirectToLogin();
        return Promise.reject(error);
      }

      isRefreshing = true;

      try {
        const res: AxiosResponse<SuccessResponse<RefreshResponse>> =
          await axios.post(
            `${import.meta.env.VITE_API_ENDPOINT}/auth/refresh`,
            { refreshToken }
          );

        const data = res.data;

        if (!data.success || !data.data) {
          const error = new ApiError(data.message || "Đã xảy ra lỗi");
          error.response = res;
          throw error;
        }

        const { accessToken, refreshToken: newRefreshToken } = data.data;
        const oneYearInSecond = 60 * 60 * 24 * 365;

        // Update tokens
        cookie.set(TOKEN.ACCESS, accessToken, {
          path: ROUTES.HOME,
          maxAge: oneYearInSecond,
        });
        cookie.set(TOKEN.REFRESH, newRefreshToken, {
          path: ROUTES.HOME,
          maxAge: oneYearInSecond,
        });

        // Process queued requests
        processQueue(null, accessToken);

        // Retry original request
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return client(originalRequest);
      } catch (refreshError) {
        // Refresh failed, clear tokens and redirect
        processQueue(refreshError, null);
        cookie.remove(TOKEN.ACCESS);
        cookie.remove(TOKEN.REFRESH);
        redirectToLogin();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

const redirectToLogin = () => {
  const returnUrl = window.location.pathname;

  if (returnUrl === ROUTES.HOME || returnUrl === ROUTES.AUTH.LOGIN) {
    window.location.pathname = ROUTES.AUTH.LOGIN;
    return;
  }

  if (!returnUrl.includes("returnUrl")) {
    const url = new URL(window.location.href);
    url.searchParams.append("returnUrl", returnUrl);
    window.location.href = `${ROUTES.AUTH.LOGIN}?${url.searchParams.toString()}`;
  }
};

export default client;

import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "https://api.thaiatkimhoa.vn";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: { "Content-Type": "application/json" },
    timeout: 15000,
});

// Attach JWT token to requests
api.interceptors.request.use((config) => {
    const token = Cookies.get("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Handle 401 — redirect to login
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 && typeof window !== "undefined") {
            Cookies.remove("accessToken");
            Cookies.remove("refreshToken");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

// ── Auth APIs ──
export const authApi = {
    login: (email: string, password: string) =>
        api.post("/auth/login", { email, password }),

    register: (data: {
        email: string;
        password: string;
        name: string;
        gender?: string;
    }) => api.post("/auth/register", data),

    socialLogin: (provider: string, idToken: string) =>
        api.post("/auth/social-login", { provider, idToken }),

    refresh: (refreshToken: string) =>
        api.post("/auth/refresh", { refreshToken }),

    forgotPassword: (email: string) =>
        api.post("/auth/forgot-password", { email }),

    getProfile: () => api.get("/auth/profile"),
};

// ── Prediction APIs ──
export const predictionApi = {
    list: (params?: {
        page?: number;
        pageSize?: number;
        languageId?: number;
        search?: string;
        predictionType?: number;
        domains?: string;
        status?: string;
    }) => api.get("/predictions", { params }),

    getById: (id: number, languageId?: number) =>
        api.get(`/predictions/${id}`, { params: { languageId } }),

    bookmark: (id: number) => api.post(`/predictions/${id}/bookmark`),

    getBookmarks: (params?: { page?: number; pageSize?: number }) =>
        api.get("/predictions/bookmarks", { params }),
};

// ── Horoscope APIs ──
export const horoscopeApi = {
    get: () => api.get("/horoscopes"),
    create: (data: {
        name: string;
        solarDateOfBirth?: string;
        lunarDateOfBirth?: string;
        isLunarLeapMonth?: boolean;
        timeOfBirth: string;
        timezone: string;
        gender: string;
    }) => api.post("/horoscopes", data),
    update: (data: {
        name: string;
        solarDateOfBirth?: string;
        lunarDateOfBirth?: string;
        isLunarLeapMonth?: boolean;
        timeOfBirth: string;
        timezone: string;
        gender: string;
    }) => api.put("/horoscopes", data),
    getToday: () => api.get("/horoscopes/day"),
    getMonth: () => api.get("/horoscopes/month"),
    getYear: () => api.get("/horoscopes/year"),
    getChart: () => api.get("/horoscopes/chart"),
};

// ── User APIs ──
export const userApi = {
    getMe: () => api.get("/users/me"),
    updateMe: (data: { name?: string; dateOfBirth?: string; timeOfBirth?: string; timezone?: string; placeOfBirth?: string }) =>
        api.put("/users/me", data),
    changePassword: (data: { currentPassword: string; newPassword: string }) =>
        api.post("/users/change-password", data),
};

export default api;

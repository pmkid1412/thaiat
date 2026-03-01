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

    socialLogin: (data: { provider: string; idToken: string }) =>
        api.post("/auth/social-login", data),

    refresh: (refreshToken: string) =>
        api.post("/auth/refresh", { refreshToken }),
};

// ── Prediction APIs ──
export const predictionApi = {
    list: (params?: {
        page?: number;
        limit?: number;
        languageId?: number;
        search?: string;
        predictionType?: number;
    }) => api.get("/predictions", { params }),

    getById: (id: number, languageId?: number) =>
        api.get(`/predictions/${id}`, { params: { languageId } }),

    bookmark: (id: number) => api.post(`/predictions/${id}/bookmark`),
};

// ── Horoscope APIs ──
export const horoscopeApi = {
    get: () => api.get("/horoscopes"),
    getToday: () => api.get("/horoscopes/day"),
    getMonth: () => api.get("/horoscopes/month"),
    getYear: () => api.get("/horoscopes/year"),
    getChart: () => api.get("/horoscopes/chart"),
};

export default api;

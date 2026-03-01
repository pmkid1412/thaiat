"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { authApi } from "@/lib/api";
import Cookies from "js-cookie";

function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get("redirect") || "/";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await authApi.login(email, password);
            const { accessToken, refreshToken } = res.data?.data || res.data;

            Cookies.set("accessToken", accessToken, { expires: 7, sameSite: "lax" });
            Cookies.set("refreshToken", refreshToken, { expires: 30, sameSite: "lax" });

            router.push(redirect);
        } catch (err: unknown) {
            const error = err as { response?: { data?: { errors?: { constraints?: Record<string, string> }[] } } };
            const errors = error.response?.data?.errors;
            if (errors && errors.length > 0) {
                const firstError = errors[0];
                const message = Object.values(firstError.constraints || {})[0];
                setError(message || "Đăng nhập thất bại");
            } else {
                setError("Email hoặc mật khẩu không đúng");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        alert("Google login sẽ được triển khai trong Sprint 3");
    };

    return (
        <div className="w-full max-w-md">
            {/* Logo */}
            <div className="text-center mb-8">
                <Link href="/" className="inline-block">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl">🔮</span>
                    </div>
                </Link>
                <h1 className="font-heading text-2xl font-bold text-text-primary">
                    Đăng nhập
                </h1>
                <p className="text-text-muted text-sm mt-1">
                    Đăng nhập bằng tài khoản app hoặc tạo tài khoản mới
                </p>
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-surface-light p-8">
                {/* Google Login */}
                <button
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-surface-light rounded-xl hover:bg-surface-light transition-colors mb-6"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    <span className="font-medium text-text-primary">Đăng nhập với Google</span>
                </button>

                {/* Divider */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="flex-1 h-px bg-surface-light" />
                    <span className="text-xs text-text-muted">hoặc</span>
                    <div className="flex-1 h-px bg-surface-light" />
                </div>

                {/* Email/Password Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-text-primary mb-1.5">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-3 border border-surface-light rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors bg-surface-cream"
                            placeholder="email@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-text-primary mb-1.5">Mật khẩu</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-3 border border-surface-light rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors bg-surface-cream"
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="text-right">
                        <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                            Quên mật khẩu?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-primary hover:bg-primary-dark text-text-light rounded-xl font-heading font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                    </button>
                </form>
            </div>

            {/* Register link */}
            <p className="text-center text-sm text-text-muted mt-6">
                Chưa có tài khoản?{" "}
                <Link href="/register" className="text-primary font-medium hover:underline">
                    Đăng ký miễn phí
                </Link>
            </p>

            {/* App download */}
            <div className="text-center mt-8 p-4 bg-white rounded-xl border border-surface-light">
                <p className="text-sm text-text-muted mb-2">📱 Tải app để trải nghiệm đầy đủ</p>
                <div className="flex gap-2 justify-center">
                    <a href="#" className="text-xs px-3 py-1.5 bg-surface-dark text-text-light rounded-lg">🍎 App Store</a>
                    <a href="#" className="text-xs px-3 py-1.5 bg-surface-dark text-text-light rounded-lg">▶️ Google Play</a>
                </div>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-surface-cream flex items-center justify-center px-6 py-12">
            <Suspense
                fallback={
                    <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin" />
                }
            >
                <LoginForm />
            </Suspense>
        </div>
    );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authApi } from "@/lib/api";
import Cookies from "js-cookie";

export default function RegisterPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "male",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (form.password !== form.confirmPassword) {
            setError("Mật khẩu xác nhận không khớp");
            return;
        }

        if (form.password.length < 6) {
            setError("Mật khẩu phải ít nhất 6 ký tự");
            return;
        }

        setLoading(true);

        try {
            await authApi.register({
                name: form.name,
                email: form.email,
                password: form.password,
                gender: form.gender,
            });

            setSuccess(true);

            // Auto-login after register
            try {
                const loginRes = await authApi.login(form.email, form.password);
                const { accessToken, refreshToken } = loginRes.data?.data || loginRes.data;
                Cookies.set("accessToken", accessToken, { expires: 7, sameSite: "lax" });
                Cookies.set("refreshToken", refreshToken, { expires: 30, sameSite: "lax" });
                setTimeout(() => router.push("/"), 1500);
            } catch {
                // If auto-login fails, redirect to login page
                setTimeout(() => router.push("/login"), 2000);
            }
        } catch (err: unknown) {
            const error = err as { response?: { data?: { errors?: { constraints?: Record<string, string> }[]; message?: string } } };
            const errors = error.response?.data?.errors;
            if (errors && errors.length > 0) {
                const firstError = errors[0];
                const message = Object.values(firstError.constraints || {})[0];
                setError(message || "Đăng ký thất bại");
            } else {
                setError(error.response?.data?.message || "Đăng ký thất bại. Vui lòng thử lại.");
            }
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-surface-cream flex items-center justify-center px-6">
                <div className="text-center">
                    <div className="text-6xl mb-4">✅</div>
                    <h2 className="font-heading text-2xl font-bold text-text-primary mb-2">
                        Đăng ký thành công!
                    </h2>
                    <p className="text-text-muted">
                        Đang chuyển hướng...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-surface-cream flex items-center justify-center px-6 py-12">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-block">
                        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl">🔮</span>
                        </div>
                    </Link>
                    <h1 className="font-heading text-2xl font-bold text-text-primary">
                        Đăng ký tài khoản
                    </h1>
                    <p className="text-text-muted text-sm mt-1">
                        Dùng chung tài khoản cho cả web và mobile app
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-surface-light p-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-text-primary mb-1.5">
                                Họ và tên
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-surface-light rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors bg-surface-cream"
                                placeholder="Nguyễn Văn A"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text-primary mb-1.5">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-surface-light rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors bg-surface-cream"
                                placeholder="email@example.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text-primary mb-1.5">
                                Giới tính
                            </label>
                            <select
                                name="gender"
                                value={form.gender}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-surface-light rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors bg-surface-cream"
                            >
                                <option value="male">Nam</option>
                                <option value="female">Nữ</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text-primary mb-1.5">
                                Mật khẩu
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                required
                                minLength={6}
                                className="w-full px-4 py-3 border border-surface-light rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors bg-surface-cream"
                                placeholder="Ít nhất 6 ký tự"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text-primary mb-1.5">
                                Xác nhận mật khẩu
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-surface-light rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors bg-surface-cream"
                                placeholder="Nhập lại mật khẩu"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-primary hover:bg-primary-dark text-text-light rounded-xl font-heading font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                        >
                            {loading ? "Đang đăng ký..." : "Đăng ký"}
                        </button>
                    </form>
                </div>

                {/* Login link */}
                <p className="text-center text-sm text-text-muted mt-6">
                    Đã có tài khoản?{" "}
                    <Link href="/login" className="text-primary font-medium hover:underline">
                        Đăng nhập
                    </Link>
                </p>
            </div>
        </div>
    );
}

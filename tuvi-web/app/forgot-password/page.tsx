"use client";

import { useState } from "react";
import Link from "next/link";
import { authApi } from "@/lib/api";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await authApi.forgotPassword(email);
            setSent(true);
        } catch {
            // Always show success to prevent email enumeration
            setSent(true);
        } finally {
            setLoading(false);
        }
    };

    if (sent) {
        return (
            <div className="min-h-screen bg-surface-cream flex items-center justify-center px-6">
                <div className="w-full max-w-md text-center">
                    <div className="text-6xl mb-4">📧</div>
                    <h2 className="font-heading text-2xl font-bold text-text-primary mb-2">
                        Email đã được gửi
                    </h2>
                    <p className="text-text-muted mb-6">
                        Vui lòng kiểm tra hộp thư <strong>{email}</strong> và làm theo hướng dẫn để đặt lại mật khẩu.
                    </p>
                    <Link
                        href="/login"
                        className="text-primary hover:underline font-medium"
                    >
                        ← Quay lại đăng nhập
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-surface-cream flex items-center justify-center px-6 py-12">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <Link href="/" className="inline-block">
                        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl">🔮</span>
                        </div>
                    </Link>
                    <h1 className="font-heading text-2xl font-bold text-text-primary">
                        Quên mật khẩu
                    </h1>
                    <p className="text-text-muted text-sm mt-1">
                        Nhập email để nhận link đặt lại mật khẩu
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-surface-light p-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-text-primary mb-1.5">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-surface-light rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors bg-surface-cream"
                                placeholder="email@example.com"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-primary hover:bg-primary-dark text-text-light rounded-xl font-heading font-semibold transition-colors disabled:opacity-50"
                        >
                            {loading ? "Đang gửi..." : "Gửi email"}
                        </button>
                    </form>
                </div>

                <p className="text-center text-sm text-text-muted mt-6">
                    <Link href="/login" className="text-primary font-medium hover:underline">
                        ← Quay lại đăng nhập
                    </Link>
                </p>
            </div>
        </div>
    );
}

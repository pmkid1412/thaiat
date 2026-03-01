"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";

interface UserInfo {
    name: string;
    email: string;
    type: number;
    gender: string;
    createdAt: string;
}

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState<UserInfo | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = Cookies.get("accessToken");
        if (!token) {
            router.push("/login?redirect=/profile");
            return;
        }

        const fetchUser = async () => {
            try {
                const api = (await import("@/lib/api")).default;
                const res = await api.get("/horoscopes");
                // Extract user info from horoscope or a dedicated endpoint
                const data = res.data?.data;
                setUser({
                    name: data?.name || "User",
                    email: data?.email || "",
                    type: data?.userType ?? 0,
                    gender: data?.gender || "",
                    createdAt: data?.createdAt || "",
                });
            } catch {
                // If can't fetch user data, show basic fallback
                setUser({ name: "User", email: "", type: 0, gender: "", createdAt: "" });
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [router]);

    const handleLogout = () => {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        router.push("/");
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-surface-cream flex items-center justify-center">
                <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="bg-surface-cream min-h-screen">
            <section className="bg-surface-dark ink-divider">
                <div className="mx-auto max-w-[var(--container-max)] px-6 py-12 text-center">
                    <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                        <span className="text-4xl">👤</span>
                    </div>
                    <h1 className="font-heading text-2xl font-bold text-text-light">
                        {user?.name}
                    </h1>
                    <div className="mt-2">
                        <span
                            className={`inline-block px-4 py-1 rounded-full text-sm font-heading font-semibold ${user?.type === 1
                                    ? "bg-gold text-surface-dark"
                                    : "bg-white/10 text-text-light/70"
                                }`}
                        >
                            {user?.type === 1 ? "✨ Pro" : "Free"}
                        </span>
                    </div>
                </div>
            </section>

            <section className="py-10">
                <div className="mx-auto max-w-lg px-6 space-y-4">
                    {/* Email */}
                    {user?.email && (
                        <div className="bg-white rounded-xl p-4 border border-surface-light">
                            <p className="text-xs text-text-muted mb-1">Email</p>
                            <p className="text-text-primary font-medium">{user.email}</p>
                        </div>
                    )}

                    {/* Pro Upsell */}
                    {user?.type !== 1 && (
                        <div className="bg-gradient-to-r from-gold/10 to-primary/10 rounded-xl p-5 border border-gold/20">
                            <h3 className="font-heading font-bold text-text-primary mb-2">
                                ✨ Nâng cấp Pro
                            </h3>
                            <p className="text-sm text-text-muted mb-3">
                                Mở khóa tất cả bài viết chi tiết, bộ lọc nâng cao, và tính năng
                                bookmark.
                            </p>
                            <p className="text-xs text-text-muted">
                                Nâng cấp Pro qua mobile app để sử dụng trên cả web và app.
                            </p>
                        </div>
                    )}

                    {/* Quick Links */}
                    <div className="bg-white rounded-xl border border-surface-light divide-y divide-surface-light">
                        <Link
                            href="/predictions"
                            className="flex items-center justify-between p-4 hover:bg-surface-cream transition-colors"
                        >
                            <span>📊 Bài viết dự đoán</span>
                            <span className="text-text-muted">→</span>
                        </Link>
                        <Link
                            href="/horoscope"
                            className="flex items-center justify-between p-4 hover:bg-surface-cream transition-colors"
                        >
                            <span>🔮 Tử vi cá nhân</span>
                            <span className="text-text-muted">→</span>
                        </Link>
                    </div>

                    {/* Logout */}
                    <button
                        onClick={handleLogout}
                        className="w-full py-3 text-primary border border-primary/30 rounded-xl font-heading font-semibold hover:bg-primary/5 transition-colors"
                    >
                        Đăng xuất
                    </button>
                </div>
            </section>
        </div>
    );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { horoscopeApi } from "@/lib/api";
import Cookies from "js-cookie";

type TabType = "day" | "month" | "year";

export default function HoroscopePage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<TabType>("day");
    const [data, setData] = useState<Record<string, string | null>>({
        day: null,
        month: null,
        year: null,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const token = Cookies.get("accessToken");
        if (!token) {
            router.push("/login?redirect=/horoscope");
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const apiMap = {
                    day: horoscopeApi.getToday,
                    month: horoscopeApi.getMonth,
                    year: horoscopeApi.getYear,
                };
                const res = await apiMap[activeTab]();
                setData((prev) => ({
                    ...prev,
                    [activeTab]: res.data?.data?.content || res.data?.data || JSON.stringify(res.data, null, 2),
                }));
            } catch (err: unknown) {
                const error = err as { response?: { status: number } };
                if (error.response?.status === 401) {
                    router.push("/login?redirect=/horoscope");
                } else {
                    setError("Không thể tải dữ liệu tử vi. Vui lòng thử lại.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [activeTab, router]);

    const tabs = [
        { key: "day" as TabType, label: "📅 Hôm nay", desc: "Tử vi hàng ngày" },
        { key: "month" as TabType, label: "🗓️ Tháng này", desc: "Tử vi hàng tháng" },
        { key: "year" as TabType, label: "📆 Năm nay", desc: "Tử vi hàng năm" },
    ];

    return (
        <div className="bg-surface-cream min-h-screen">
            {/* Header */}
            <section className="bg-surface-dark ink-divider">
                <div className="mx-auto max-w-[var(--container-max)] px-6 py-12 md:py-16 text-center">
                    <h1 className="font-heading text-3xl md:text-4xl font-bold text-text-light mb-3">
                        🔮 Tử vi cá nhân
                    </h1>
                    <p className="text-text-light/60 max-w-xl mx-auto">
                        Xem tử vi dựa trên lá số của bạn
                    </p>
                </div>
            </section>

            <section className="py-10 md:py-14">
                <div className="mx-auto max-w-3xl px-6">
                    {/* Tabs */}
                    <div className="flex gap-2 mb-8 bg-white rounded-xl p-1.5 border border-surface-light">
                        {tabs.map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`flex-1 py-3 px-4 rounded-lg text-sm font-heading font-semibold transition-all ${activeTab === tab.key
                                        ? "bg-primary text-text-light shadow-sm"
                                        : "text-text-muted hover:bg-surface-light"
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Content */}
                    <div className="bg-white rounded-2xl shadow-sm border border-surface-light p-6 md:p-8 min-h-[300px]">
                        {loading ? (
                            <div className="flex items-center justify-center py-16">
                                <div className="text-center">
                                    <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                                    <p className="text-text-muted">Đang tải tử vi...</p>
                                </div>
                            </div>
                        ) : error ? (
                            <div className="text-center py-16">
                                <p className="text-5xl mb-4">⚠️</p>
                                <p className="text-text-muted">{error}</p>
                            </div>
                        ) : (
                            <div>
                                <h2 className="font-heading text-xl font-bold text-text-primary mb-4">
                                    {tabs.find((t) => t.key === activeTab)?.desc}
                                </h2>
                                <div
                                    className="prose prose-lg max-w-none text-text-primary leading-relaxed"
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            typeof data[activeTab] === "string"
                                                ? data[activeTab]!
                                                : "<p class='text-text-muted'>Chưa có dữ liệu tử vi cho kỳ này.</p>",
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Chart link */}
                    <div className="mt-6 text-center">
                        <Link
                            href="/horoscope/chart"
                            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-heading font-semibold transition-colors"
                        >
                            📊 Xem lá số tử vi →
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

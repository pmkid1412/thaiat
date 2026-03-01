"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { horoscopeApi } from "@/lib/api";
import Cookies from "js-cookie";

type TabType = "day" | "month" | "year";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface DailyData {
    date?: string;
    energy_score?: number;
    finance_bar?: string;
    love_bar?: string;
    health_bar?: string;
    daily_quest?: string;
    advice?: { work?: string; love?: string; health?: string };
}

interface MonthlyItem {
    month?: number;
    solar_month?: number;
    theme?: string;
    affirmation?: string;
    advice?: { work?: string; love?: string; health?: string };
}

function EnergyBar({ label, bar }: { label: string; bar?: string }) {
    if (!bar) return null;
    const filled = (bar.match(/▮/g) || []).length;
    const total = filled + (bar.match(/▯/g) || []).length;
    return (
        <div className="flex items-center gap-3">
            <span className="text-sm text-text-muted w-20">{label}</span>
            <div className="flex-1 bg-surface-light rounded-full h-2.5">
                <div
                    className="h-2.5 rounded-full bg-gradient-to-r from-gold to-primary transition-all"
                    style={{ width: total > 0 ? `${(filled / total) * 100}%` : "0%" }}
                />
            </div>
            <span className="text-xs text-text-muted w-8 text-right">{filled}/{total}</span>
        </div>
    );
}

function AdviceSection({ icon, title, text }: { icon: string; title: string; text?: string }) {
    if (!text) return null;
    return (
        <div className="bg-white rounded-xl border border-surface-light p-5">
            <h3 className="font-heading font-bold text-text-primary mb-2 flex items-center gap-2">
                <span>{icon}</span> {title}
            </h3>
            <div className="text-sm text-text-primary leading-relaxed whitespace-pre-line">
                {text}
            </div>
        </div>
    );
}

function DailyView({ data }: { data: DailyData }) {
    return (
        <div className="space-y-5">
            {/* Energy & Bars */}
            <div className="bg-white rounded-xl border border-surface-light p-5">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-heading font-bold text-text-primary">Năng lượng hôm nay</h3>
                    {data.energy_score !== undefined && (
                        <span className="text-2xl font-bold text-primary font-heading">
                            {data.energy_score}/10
                        </span>
                    )}
                </div>
                <div className="space-y-2.5">
                    <EnergyBar label="💰 Tài chính" bar={data.finance_bar} />
                    <EnergyBar label="❤️ Tình cảm" bar={data.love_bar} />
                    <EnergyBar label="🏥 Sức khỏe" bar={data.health_bar} />
                </div>
            </div>

            {/* Daily Quest */}
            {data.daily_quest && (
                <div className="bg-gold/5 border-l-4 border-gold p-4 rounded-r-lg">
                    <p className="text-sm font-heading font-semibold text-text-primary mb-1">🎯 Nhiệm vụ hôm nay</p>
                    <p className="text-sm text-text-primary leading-relaxed">{data.daily_quest}</p>
                </div>
            )}

            {/* Advice Cards */}
            <AdviceSection icon="💼" title="Công việc" text={data.advice?.work} />
            <AdviceSection icon="❤️" title="Tình cảm" text={data.advice?.love} />
            <AdviceSection icon="🏥" title="Sức khỏe" text={data.advice?.health} />
        </div>
    );
}

function MonthlyView({ data }: { data: MonthlyItem[] | MonthlyItem }) {
    const item = Array.isArray(data) ? data[0] : data;
    if (!item) return <p className="text-text-muted text-center py-8">Chưa có dữ liệu tử vi tháng này.</p>;
    return (
        <div className="space-y-5">
            {/* Theme */}
            {item.theme && (
                <div className="bg-primary/5 rounded-xl p-5 border border-primary/10 text-center">
                    <p className="text-xs text-text-muted mb-1 uppercase tracking-wide">Chủ đề tháng</p>
                    <h3 className="font-heading text-lg font-bold text-primary">{item.theme}</h3>
                </div>
            )}

            {/* Affirmation */}
            {item.affirmation && (
                <div className="bg-gold/5 border-l-4 border-gold p-4 rounded-r-lg">
                    <p className="text-sm font-heading font-semibold text-text-primary mb-1">✨ Lời khẳng định</p>
                    <p className="text-sm text-text-primary leading-relaxed italic">{item.affirmation}</p>
                </div>
            )}

            {/* Advice */}
            <AdviceSection icon="💼" title="Công việc" text={item.advice?.work} />
            <AdviceSection icon="❤️" title="Tình cảm" text={item.advice?.love} />
            <AdviceSection icon="🏥" title="Sức khỏe" text={item.advice?.health} />
        </div>
    );
}

function YearlyView({ data }: { data: { html_report?: string } }) {
    if (!data.html_report) {
        return <p className="text-text-muted text-center py-8">Chưa có dữ liệu tử vi năm nay.</p>;
    }
    return (
        <div
            className="prose prose-lg max-w-none text-text-primary leading-relaxed"
            dangerouslySetInnerHTML={{ __html: data.html_report }}
        />
    );
}

function ProGate({ tab }: { tab: string }) {
    return (
        <div className="text-center py-12">
            <p className="text-5xl mb-4">🔒</p>
            <h3 className="font-heading text-lg font-bold text-text-primary mb-2">
                Tử vi {tab === "month" ? "tháng" : "năm"} — Chỉ dành cho Pro
            </h3>
            <p className="text-text-muted text-sm mb-4 max-w-md mx-auto">
                Nâng cấp Pro qua app để xem tử vi {tab === "month" ? "hàng tháng" : "hàng năm"} chi tiết.
            </p>
            <div className="flex gap-2 justify-center">
                <a href="#" className="text-xs px-3 py-1.5 bg-surface-dark text-text-light rounded-lg">🍎 App Store</a>
                <a href="#" className="text-xs px-3 py-1.5 bg-surface-dark text-text-light rounded-lg">▶️ Google Play</a>
            </div>
        </div>
    );
}

function NoHoroscope() {
    return (
        <div className="text-center py-12">
            <p className="text-5xl mb-4">🔮</p>
            <h3 className="font-heading text-lg font-bold text-text-primary mb-2">
                Chưa thiết lập tử vi
            </h3>
            <p className="text-text-muted text-sm mb-4">
                Vui lòng thiết lập thông tin tử vi trong hồ sơ cá nhân trước.
            </p>
            <Link
                href="/profile"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-text-light rounded-lg font-heading font-semibold hover:bg-primary-dark transition-colors"
            >
                Thiết lập ngay →
            </Link>
        </div>
    );
}

export default function HoroscopePage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<TabType>("day");
    const [dailyData, setDailyData] = useState<DailyData | null>(null);
    const [monthlyData, setMonthlyData] = useState<MonthlyItem[] | MonthlyItem | null>(null);
    const [yearlyData, setYearlyData] = useState<{ html_report?: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [proLocked, setProLocked] = useState(false);
    const [noHoroscope, setNoHoroscope] = useState(false);

    useEffect(() => {
        const token = Cookies.get("accessToken");
        if (!token) {
            router.push("/login?redirect=/horoscope");
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            setProLocked(false);
            setNoHoroscope(false);

            try {
                if (activeTab === "day") {
                    const res = await horoscopeApi.getToday();
                    setDailyData(res.data?.data || res.data);
                } else if (activeTab === "month") {
                    const res = await horoscopeApi.getMonth();
                    setMonthlyData(res.data?.data || res.data);
                } else {
                    const res = await horoscopeApi.getYear();
                    setYearlyData(res.data?.data || res.data);
                }
            } catch (err: any) {
                if (err.response?.status === 401) {
                    router.push("/login?redirect=/horoscope");
                } else if (err.response?.status === 404) {
                    // Could be no horoscope setup or PRO required
                    const msg = err.response?.data?.message || "";
                    if (msg.includes("not found") || msg.includes("DATA_NOT_FOUND")) {
                        if (activeTab === "day") {
                            setNoHoroscope(true);
                        } else {
                            setProLocked(true);
                        }
                    } else {
                        setProLocked(true);
                    }
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
        { key: "day" as TabType, label: "📅 Hôm nay" },
        { key: "month" as TabType, label: "🗓️ Tháng này" },
        { key: "year" as TabType, label: "📆 Năm nay" },
    ];

    const renderContent = () => {
        if (loading) {
            return (
                <div className="flex items-center justify-center py-16">
                    <div className="text-center">
                        <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                        <p className="text-text-muted">Đang tải tử vi...</p>
                    </div>
                </div>
            );
        }
        if (noHoroscope) return <NoHoroscope />;
        if (proLocked) return <ProGate tab={activeTab} />;
        if (error) {
            return (
                <div className="text-center py-16">
                    <p className="text-5xl mb-4">⚠️</p>
                    <p className="text-text-muted">{error}</p>
                </div>
            );
        }

        if (activeTab === "day" && dailyData) return <DailyView data={dailyData} />;
        if (activeTab === "month" && monthlyData) return <MonthlyView data={monthlyData} />;
        if (activeTab === "year" && yearlyData) return <YearlyView data={yearlyData} />;

        return <p className="text-text-muted text-center py-8">Chưa có dữ liệu.</p>;
    };

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
                    <div className="min-h-[300px]">
                        {renderContent()}
                    </div>

                    {/* Profile link */}
                    <div className="mt-8 text-center">
                        <Link
                            href="/profile"
                            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-heading font-semibold transition-colors"
                        >
                            👤 Quản lý thông tin tử vi →
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

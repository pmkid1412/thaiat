"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { horoscopeApi } from "@/lib/api";
import Cookies from "js-cookie";

type TabType = "day" | "month" | "year";
type CalendarType = "solar" | "lunar";

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

interface HoroscopeInfo {
    id: number;
    name: string;
    solarDateOfBirth: string | null;
    lunarDateOfBirth: string | null;
    isLunarLeapMonth: boolean;
    timeOfBirth: string;
    timezone: string;
    gender: string;
}

const TIMEZONE_OPTIONS = [
    { value: "-12", label: "UTC-12" }, { value: "-11", label: "UTC-11" },
    { value: "-10", label: "UTC-10" }, { value: "-9", label: "UTC-9" },
    { value: "-8", label: "UTC-8" }, { value: "-7", label: "UTC-7" },
    { value: "-6", label: "UTC-6" }, { value: "-5", label: "UTC-5" },
    { value: "-4", label: "UTC-4" }, { value: "-3", label: "UTC-3" },
    { value: "-2", label: "UTC-2" }, { value: "-1", label: "UTC-1" },
    { value: "0", label: "UTC+0" }, { value: "1", label: "UTC+1" },
    { value: "2", label: "UTC+2" }, { value: "3", label: "UTC+3" },
    { value: "4", label: "UTC+4" }, { value: "5", label: "UTC+5" },
    { value: "5.5", label: "UTC+5:30" }, { value: "6", label: "UTC+6" },
    { value: "7", label: "UTC+7 (Việt Nam)" }, { value: "8", label: "UTC+8" },
    { value: "9", label: "UTC+9" }, { value: "10", label: "UTC+10" },
    { value: "11", label: "UTC+11" }, { value: "12", label: "UTC+12" },
];

/** Convert "yyyy-mm-dd" to "dd/mm/yyyy" for display */
function toDisplayDate(isoDate: string | null | undefined): string {
    if (!isoDate) return "";
    const match = isoDate.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
    if (match) {
        const [, y, m, d] = match;
        return `${d.padStart(2, "0")}/${m.padStart(2, "0")}/${y}`;
    }
    return isoDate;
}

/** Convert "dd/mm/yyyy" input to "yyyy-mm-dd" for API */
function toApiDate(displayDate: string): string {
    const parts = displayDate.split("/");
    if (parts.length === 3) {
        return `${parts[2]}-${parts[1].padStart(2, "0")}-${parts[0].padStart(2, "0")}`;
    }
    return displayDate;
}

function isValidDate(str: string): boolean {
    return /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(str);
}

// ─── Sub-components ───

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
            {data.daily_quest && (
                <div className="bg-gold/5 border-l-4 border-gold p-4 rounded-r-lg">
                    <p className="text-sm font-heading font-semibold text-text-primary mb-1">🎯 Nhiệm vụ hôm nay</p>
                    <p className="text-sm text-text-primary leading-relaxed">{data.daily_quest}</p>
                </div>
            )}
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
            {item.theme && (
                <div className="bg-primary/5 rounded-xl p-5 border border-primary/10 text-center">
                    <p className="text-xs text-text-muted mb-1 uppercase tracking-wide">Chủ đề tháng</p>
                    <h3 className="font-heading text-lg font-bold text-primary">{item.theme}</h3>
                </div>
            )}
            {item.affirmation && (
                <div className="bg-gold/5 border-l-4 border-gold p-4 rounded-r-lg">
                    <p className="text-sm font-heading font-semibold text-text-primary mb-1">✨ Lời khẳng định</p>
                    <p className="text-sm text-text-primary leading-relaxed italic">{item.affirmation}</p>
                </div>
            )}
            <AdviceSection icon="💼" title="Công việc" text={item.advice?.work} />
            <AdviceSection icon="❤️" title="Tình cảm" text={item.advice?.love} />
            <AdviceSection icon="🏥" title="Sức khỏe" text={item.advice?.health} />
        </div>
    );
}

function YearlyView({ data }: { data: { html_report?: string } }) {
    if (!data.html_report) {
        return <p className="text-text-muted text-center py-8">Chưa có dữ liệu tử vi tổng quan.</p>;
    }
    return (
        <div
            className="report-content prose prose-lg max-w-none text-text-primary leading-relaxed"
            dangerouslySetInnerHTML={{ __html: data.html_report }}
        />
    );
}

function ProGate({ tab }: { tab: string }) {
    return (
        <div className="text-center py-12">
            <p className="text-5xl mb-4">🔒</p>
            <h3 className="font-heading text-lg font-bold text-text-primary mb-2">
                Tử vi {tab === "month" ? "tháng" : "tổng quan"} — Chỉ dành cho Pro
            </h3>
            <p className="text-text-muted text-sm mb-4 max-w-md mx-auto">
                Nâng cấp Pro qua app để xem tử vi {tab === "month" ? "hàng tháng" : "tổng quan"} chi tiết.
            </p>
            <div className="flex gap-2 justify-center">
                <a href="#" className="text-xs px-3 py-1.5 bg-surface-dark text-text-light rounded-lg">🍎 App Store</a>
                <a href="#" className="text-xs px-3 py-1.5 bg-surface-dark text-text-light rounded-lg">▶️ Google Play</a>
            </div>
        </div>
    );
}

// ─── Horoscope Form (reusable for create & edit) ───

function HoroscopeForm({
    initialData,
    onSuccess,
    isEdit = false,
    onCancel,
}: {
    initialData?: HoroscopeInfo | null;
    onSuccess: () => void;
    isEdit?: boolean;
    onCancel?: () => void;
}) {
    const [name, setName] = useState(initialData?.name || "");
    const [gender, setGender] = useState(initialData?.gender || "male");
    const [calendarType, setCalendarType] = useState<CalendarType>(
        initialData?.lunarDateOfBirth ? "lunar" : "solar"
    );
    const [dateOfBirth, setDateOfBirth] = useState(
        toDisplayDate(initialData?.solarDateOfBirth || initialData?.lunarDateOfBirth || "")
    );
    const [isLeapMonth, setIsLeapMonth] = useState(initialData?.isLunarLeapMonth || false);
    const [timeOfBirth, setTimeOfBirth] = useState(initialData?.timeOfBirth || "");
    const [timezone, setTimezone] = useState(initialData?.timezone || "7");
    const [submitting, setSubmitting] = useState(false);
    const [msg, setMsg] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) { setMsg("❌ Vui lòng nhập tên"); return; }
        if (!isValidDate(dateOfBirth)) { setMsg("❌ Ngày sinh phải đúng định dạng dd/mm/yyyy"); return; }
        if (!timeOfBirth) { setMsg("❌ Vui lòng chọn giờ sinh"); return; }

        setSubmitting(true);
        setMsg("");

        const apiDate = toApiDate(dateOfBirth);
        const payload: Record<string, unknown> = {
            name, timeOfBirth, timezone, gender,
        };

        if (calendarType === "solar") {
            payload.solarDateOfBirth = apiDate;
        } else {
            payload.lunarDateOfBirth = apiDate;
            payload.isLunarLeapMonth = isLeapMonth;
        }

        try {
            if (isEdit) {
                await horoscopeApi.update(payload as any);
            } else {
                await horoscopeApi.create(payload as any);
            }
            setMsg("✅ Lưu thành công!");
            setTimeout(() => onSuccess(), 500);
        } catch (err: any) {
            setMsg("❌ " + (err.response?.data?.message || "Có lỗi xảy ra"));
        } finally {
            setSubmitting(false);
        }
    };

    const inputClass = "w-full px-3 py-2.5 bg-white border border-surface-light rounded-lg text-sm text-text-primary focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-colors";
    const labelClass = "block text-sm font-heading font-semibold text-text-primary mb-1.5";

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
                <label className={labelClass}>Họ tên</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nhập họ tên"
                    className={inputClass}
                />
            </div>

            {/* Gender */}
            <div>
                <label className={labelClass}>Giới tính</label>
                <div className="flex gap-3">
                    {[
                        { value: "male", label: "👨 Nam" },
                        { value: "female", label: "👩 Nữ" },
                    ].map((g) => (
                        <button
                            key={g.value}
                            type="button"
                            onClick={() => setGender(g.value)}
                            className={`flex-1 py-2.5 rounded-lg text-sm font-medium border transition-all ${gender === g.value
                                ? "bg-primary text-white border-primary"
                                : "bg-white text-text-muted border-surface-light hover:border-primary/30"
                                }`}
                        >
                            {g.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Calendar Type */}
            <div>
                <label className={labelClass}>Loại lịch</label>
                <div className="flex gap-3">
                    {[
                        { value: "solar" as CalendarType, label: "☀️ Dương lịch" },
                        { value: "lunar" as CalendarType, label: "🌙 Âm lịch" },
                    ].map((c) => (
                        <button
                            key={c.value}
                            type="button"
                            onClick={() => setCalendarType(c.value)}
                            className={`flex-1 py-2.5 rounded-lg text-sm font-medium border transition-all ${calendarType === c.value
                                ? "bg-primary text-white border-primary"
                                : "bg-white text-text-muted border-surface-light hover:border-primary/30"
                                }`}
                        >
                            {c.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Date of Birth */}
            <div>
                <label className={labelClass}>
                    Ngày sinh ({calendarType === "solar" ? "dương lịch" : "âm lịch"})
                </label>
                <input
                    type="text"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    placeholder="dd/mm/yyyy"
                    className={inputClass}
                />
                {calendarType === "lunar" && (
                    <label className="flex items-center gap-2 mt-2 text-sm text-text-muted">
                        <input
                            type="checkbox"
                            checked={isLeapMonth}
                            onChange={(e) => setIsLeapMonth(e.target.checked)}
                            className="rounded border-surface-light"
                        />
                        Tháng nhuận
                    </label>
                )}
            </div>

            {/* Time of Birth */}
            <div>
                <label className={labelClass}>Giờ sinh</label>
                <select
                    value={timeOfBirth}
                    onChange={(e) => setTimeOfBirth(e.target.value)}
                    className={inputClass}
                >
                    <option value="">-- Chọn giờ sinh --</option>
                    <option value="Tý (23h-1h)">Tý (23h-1h)</option>
                    <option value="Sửu (1h-3h)">Sửu (1h-3h)</option>
                    <option value="Dần (3h-5h)">Dần (3h-5h)</option>
                    <option value="Mão (5h-7h)">Mão (5h-7h)</option>
                    <option value="Thìn (7h-9h)">Thìn (7h-9h)</option>
                    <option value="Tỵ (9h-11h)">Tỵ (9h-11h)</option>
                    <option value="Ngọ (11h-13h)">Ngọ (11h-13h)</option>
                    <option value="Mùi (13h-15h)">Mùi (13h-15h)</option>
                    <option value="Thân (15h-17h)">Thân (15h-17h)</option>
                    <option value="Dậu (17h-19h)">Dậu (17h-19h)</option>
                    <option value="Tuất (19h-21h)">Tuất (19h-21h)</option>
                    <option value="Hợi (21h-23h)">Hợi (21h-23h)</option>
                </select>
            </div>

            {/* Timezone */}
            <div>
                <label className={labelClass}>Múi giờ</label>
                <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className={inputClass}
                >
                    {TIMEZONE_OPTIONS.map((tz) => (
                        <option key={tz.value} value={tz.value}>{tz.label}</option>
                    ))}
                </select>
            </div>

            {/* Message */}
            {msg && (
                <p className={`text-sm ${msg.startsWith("✅") ? "text-green-600" : "text-red-600"}`}>
                    {msg}
                </p>
            )}

            {/* Buttons */}
            <div className="flex gap-3">
                <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 py-2.5 bg-primary text-white rounded-lg font-heading font-semibold text-sm hover:bg-primary-dark transition-colors disabled:opacity-50"
                >
                    {submitting ? "Đang lưu..." : isEdit ? "💾 Cập nhật" : "🔮 Thiết lập tử vi"}
                </button>
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-5 py-2.5 border border-surface-light rounded-lg text-sm text-text-muted hover:bg-surface-light transition-colors"
                    >
                        Hủy
                    </button>
                )}
            </div>
        </form>
    );
}

// ─── Horoscope Info Card ───

function HoroscopeInfoCard({
    info,
    onEdit,
}: {
    info: HoroscopeInfo;
    onEdit: () => void;
}) {
    const birthDate = info.solarDateOfBirth
        ? `${toDisplayDate(info.solarDateOfBirth)} (DL)`
        : info.lunarDateOfBirth
            ? `${toDisplayDate(info.lunarDateOfBirth)} (ÂL)${info.isLunarLeapMonth ? " - nhuận" : ""}`
            : "—";

    return (
        <div className="bg-white rounded-xl border border-surface-light p-4 mb-6">
            <div className="flex items-center justify-between mb-3">
                <h3 className="font-heading font-bold text-text-primary text-sm">🔮 Lá số tử vi</h3>
                <button
                    onClick={onEdit}
                    className="text-xs text-primary font-medium hover:underline"
                >
                    ✏️ Sửa
                </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div>
                    <span className="text-text-muted text-xs">Họ tên</span>
                    <p className="font-medium text-text-primary">{info.name || "—"}</p>
                </div>
                <div>
                    <span className="text-text-muted text-xs">Giới tính</span>
                    <p className="font-medium text-text-primary">{info.gender === "male" ? "Nam" : "Nữ"}</p>
                </div>
                <div>
                    <span className="text-text-muted text-xs">Ngày sinh</span>
                    <p className="font-medium text-text-primary">{birthDate}</p>
                </div>
                <div>
                    <span className="text-text-muted text-xs">Giờ sinh</span>
                    <p className="font-medium text-text-primary">{info.timeOfBirth || "—"}</p>
                </div>
            </div>
        </div>
    );
}

// ─── Main Page ───

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

    // Horoscope info state
    const [horoscopeInfo, setHoroscopeInfo] = useState<HoroscopeInfo | null>(null);
    const [editingInfo, setEditingInfo] = useState(false);
    const [infoLoading, setInfoLoading] = useState(true);

    // Fetch horoscope info on mount
    useEffect(() => {
        const token = Cookies.get("accessToken");
        if (!token) {
            router.push("/login?redirect=/horoscope");
            return;
        }

        horoscopeApi.get()
            .then((res) => {
                const h = res.data?.data || res.data;
                if (h?.id) setHoroscopeInfo(h);
            })
            .catch(() => { })
            .finally(() => setInfoLoading(false));
    }, [router]);

    // Fetch tab data
    useEffect(() => {
        const token = Cookies.get("accessToken");
        if (!token || !horoscopeInfo) return;

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
    }, [activeTab, horoscopeInfo, router]);

    const tabs = [
        { key: "day" as TabType, label: "📅 Hôm nay" },
        { key: "month" as TabType, label: "🗓️ Tháng này" },
        { key: "year" as TabType, label: "📆 Tổng quan" },
    ];

    const handleFormSuccess = () => {
        // Refetch horoscope info and tab data
        horoscopeApi.get()
            .then((res) => {
                const h = res.data?.data || res.data;
                if (h?.id) {
                    setHoroscopeInfo(h);
                    setEditingInfo(false);
                    setNoHoroscope(false);
                }
            })
            .catch(() => { });
    };

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
        if (noHoroscope) {
            return (
                <div className="text-center py-8">
                    <p className="text-text-muted">Chưa có dữ liệu tử vi. Vui lòng thử lại sau.</p>
                </div>
            );
        }
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

    // Show loading while fetching horoscope info
    if (infoLoading) {
        return (
            <div className="bg-surface-cream min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                    <p className="text-text-muted">Đang tải...</p>
                </div>
            </div>
        );
    }

    // No horoscope info → show inline create form
    if (!horoscopeInfo) {
        return (
            <div className="bg-surface-cream min-h-screen">
                <section className="bg-surface-dark ink-divider">
                    <div className="mx-auto max-w-[var(--container-max)] px-6 py-12 md:py-16 text-center">
                        <h1 className="font-heading text-3xl md:text-4xl font-bold text-text-light mb-3">
                            🔮 Tử vi cá nhân
                        </h1>
                        <p className="text-text-light/60 max-w-xl mx-auto">
                            Thiết lập thông tin lá số để xem tử vi
                        </p>
                    </div>
                </section>

                <section className="py-10 md:py-14">
                    <div className="mx-auto max-w-lg px-6">
                        <div className="bg-white rounded-xl border border-surface-light p-6">
                            <div className="text-center mb-6">
                                <p className="text-4xl mb-3">🔮</p>
                                <h2 className="font-heading text-xl font-bold text-text-primary mb-2">
                                    Thiết lập thông tin tử vi
                                </h2>
                                <p className="text-sm text-text-muted">
                                    Nhập thông tin ngày sinh để xem tử vi cá nhân của bạn
                                </p>
                            </div>
                            <HoroscopeForm onSuccess={handleFormSuccess} />
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    // Has horoscope info → show info card + tabs + content
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
                    {/* Horoscope Info Card or Edit Form */}
                    {editingInfo ? (
                        <div className="bg-white rounded-xl border border-surface-light p-6 mb-6">
                            <h3 className="font-heading font-bold text-text-primary mb-4">✏️ Sửa thông tin tử vi</h3>
                            <HoroscopeForm
                                initialData={horoscopeInfo}
                                isEdit
                                onSuccess={handleFormSuccess}
                                onCancel={() => setEditingInfo(false)}
                            />
                        </div>
                    ) : (
                        <HoroscopeInfoCard info={horoscopeInfo} onEdit={() => setEditingInfo(true)} />
                    )}

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
                </div>
            </section>
        </div>
    );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";
import { userApi, horoscopeApi } from "@/lib/api";

interface UserProfile {
    id: number;
    name: string;
    email: string;
    avatar: string | null;
    dateOfBirth: string | null;
    timeOfBirth: string | null;
    timezone: string | null;
    placeOfBirth: string | null;
    userType: string;
    phoneNumber: string;
    proPlanType: string | null;
    proPlanStartDate: string | null;
    proPlanEndDate: string | null;
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

interface HoroscopeForm {
    name: string;
    solarDateOfBirth: string;
    timeOfBirth: string;
    timezone: string;
    gender: string;
}

interface PasswordForm {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

const TIMEZONE_OPTIONS = [
    { value: "-12", label: "UTC-12" },
    { value: "-11", label: "UTC-11" },
    { value: "-10", label: "UTC-10" },
    { value: "-9", label: "UTC-9" },
    { value: "-8", label: "UTC-8" },
    { value: "-7", label: "UTC-7" },
    { value: "-6", label: "UTC-6" },
    { value: "-5", label: "UTC-5" },
    { value: "-4", label: "UTC-4" },
    { value: "-3", label: "UTC-3" },
    { value: "-2", label: "UTC-2" },
    { value: "-1", label: "UTC-1" },
    { value: "0", label: "UTC+0" },
    { value: "1", label: "UTC+1" },
    { value: "2", label: "UTC+2" },
    { value: "3", label: "UTC+3" },
    { value: "4", label: "UTC+4" },
    { value: "5", label: "UTC+5" },
    { value: "5.5", label: "UTC+5:30" },
    { value: "6", label: "UTC+6" },
    { value: "7", label: "UTC+7 (Việt Nam)" },
    { value: "8", label: "UTC+8" },
    { value: "9", label: "UTC+9" },
    { value: "10", label: "UTC+10" },
    { value: "11", label: "UTC+11" },
    { value: "12", label: "UTC+12" },
];

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState<UserProfile | null>(null);
    const [horoscope, setHoroscope] = useState<HoroscopeInfo | null>(null);
    const [loading, setLoading] = useState(true);

    // Horoscope form
    const [showHoroscopeForm, setShowHoroscopeForm] = useState(false);
    const [horoscopeForm, setHoroscopeForm] = useState<HoroscopeForm>({
        name: "", solarDateOfBirth: "", timeOfBirth: "", timezone: "7", gender: "MALE",
    });
    const [horoscopeSubmitting, setHoroscopeSubmitting] = useState(false);
    const [horoscopeMsg, setHoroscopeMsg] = useState("");

    // Password form
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [passwordForm, setPasswordForm] = useState<PasswordForm>({
        currentPassword: "", newPassword: "", confirmPassword: "",
    });
    const [passwordSubmitting, setPasswordSubmitting] = useState(false);
    const [passwordMsg, setPasswordMsg] = useState("");

    useEffect(() => {
        const token = Cookies.get("accessToken");
        if (!token) {
            router.push("/login?redirect=/profile");
            return;
        }

        const fetchData = async () => {
            try {
                const [meRes, horoRes] = await Promise.allSettled([
                    userApi.getMe(),
                    horoscopeApi.get(),
                ]);
                if (meRes.status === "fulfilled") {
                    setUser(meRes.value.data?.data || meRes.value.data);
                }
                if (horoRes.status === "fulfilled") {
                    const h = horoRes.value.data?.data || horoRes.value.data;
                    if (h?.id) {
                        setHoroscope(h);
                        setHoroscopeForm({
                            name: h.name || "",
                            solarDateOfBirth: h.solarDateOfBirth || "",
                            timeOfBirth: h.timeOfBirth || "",
                            timezone: h.timezone || "7",
                            gender: h.gender || "MALE",
                        });
                    }
                }
            } catch {
                // ignore
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [router]);

    const handleLogout = () => {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        router.push("/");
    };

    const handleHoroscopeSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setHoroscopeSubmitting(true);
        setHoroscopeMsg("");
        try {
            if (horoscope) {
                await horoscopeApi.update(horoscopeForm);
            } else {
                await horoscopeApi.create(horoscopeForm);
            }
            setHoroscopeMsg("✅ Đã lưu thông tin tử vi!");
            // Refresh horoscope data
            const res = await horoscopeApi.get();
            const h = res.data?.data || res.data;
            if (h?.id) setHoroscope(h);
            setShowHoroscopeForm(false);
        } catch {
            setHoroscopeMsg("❌ Lỗi khi lưu. Vui lòng thử lại.");
        } finally {
            setHoroscopeSubmitting(false);
        }
    };

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            setPasswordMsg("❌ Mật khẩu mới không khớp!");
            return;
        }
        if (passwordForm.newPassword.length < 6) {
            setPasswordMsg("❌ Mật khẩu phải ít nhất 6 ký tự!");
            return;
        }
        setPasswordSubmitting(true);
        setPasswordMsg("");
        try {
            await userApi.changePassword({
                currentPassword: passwordForm.currentPassword,
                newPassword: passwordForm.newPassword,
            });
            setPasswordMsg("✅ Đổi mật khẩu thành công!");
            setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
            setShowPasswordForm(false);
        } catch {
            setPasswordMsg("❌ Mật khẩu hiện tại không đúng.");
        } finally {
            setPasswordSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-surface-cream flex items-center justify-center">
                <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const isPro = user?.userType?.toLowerCase() === "pro";

    return (
        <div className="bg-surface-cream min-h-screen">
            {/* Hero Header */}
            <section className="bg-surface-dark ink-divider">
                <div className="mx-auto max-w-[var(--container-max)] px-6 py-12 text-center">
                    <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                        {user?.avatar ? (
                            <img src={user.avatar} alt="Avatar" className="w-20 h-20 rounded-full object-cover" />
                        ) : (
                            <span className="text-4xl">👤</span>
                        )}
                    </div>
                    <h1 className="font-heading text-2xl font-bold text-text-light">
                        {user?.name || "User"}
                    </h1>
                    <p className="text-text-light/60 text-sm mt-1">{user?.email}</p>
                    <div className="mt-3">
                        <span
                            className={`inline-block px-4 py-1 rounded-full text-sm font-heading font-semibold ${isPro
                                ? "bg-gold text-surface-dark"
                                : "bg-white/10 text-text-light/70"
                                }`}
                        >
                            {isPro ? "✨ Pro" : "Free"}
                        </span>
                        {isPro && user?.proPlanEndDate && (
                            <p className="text-text-light/40 text-xs mt-1">
                                Hết hạn: {new Date(user.proPlanEndDate).toLocaleDateString("vi-VN")}
                            </p>
                        )}
                    </div>
                </div>
            </section>

            <section className="py-10">
                <div className="mx-auto max-w-lg px-6 space-y-4">

                    {/* Horoscope Info Card */}
                    <div className="bg-white rounded-xl border border-surface-light overflow-hidden">
                        <div className="p-4 flex items-center justify-between border-b border-surface-light">
                            <h2 className="font-heading font-bold text-text-primary">🔮 Thông tin tử vi</h2>
                            <button
                                onClick={() => setShowHoroscopeForm(!showHoroscopeForm)}
                                className="text-sm text-primary font-medium hover:underline"
                            >
                                {showHoroscopeForm ? "Đóng" : horoscope ? "Sửa" : "Thiết lập"}
                            </button>
                        </div>

                        {horoscope && !showHoroscopeForm ? (
                            <div className="p-4 space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-text-muted">Tên</span>
                                    <span className="text-text-primary font-medium">{horoscope.name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-text-muted">Ngày sinh (DL)</span>
                                    <span className="text-text-primary font-medium">
                                        {horoscope.solarDateOfBirth
                                            ? new Date(horoscope.solarDateOfBirth).toLocaleDateString("vi-VN")
                                            : "—"}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-text-muted">Giờ sinh</span>
                                    <span className="text-text-primary font-medium">{horoscope.timeOfBirth || "—"}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-text-muted">Giới tính</span>
                                    <span className="text-text-primary font-medium">
                                        {horoscope.gender === "MALE" ? "Nam" : "Nữ"}
                                    </span>
                                </div>
                            </div>
                        ) : !horoscope && !showHoroscopeForm ? (
                            <div className="p-6 text-center">
                                <p className="text-text-muted text-sm mb-3">
                                    Bạn chưa thiết lập thông tin tử vi.
                                </p>
                                <button
                                    onClick={() => setShowHoroscopeForm(true)}
                                    className="px-4 py-2 bg-primary text-text-light rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors"
                                >
                                    Thiết lập ngay
                                </button>
                            </div>
                        ) : null}

                        {showHoroscopeForm && (
                            <form onSubmit={handleHoroscopeSubmit} className="p-4 space-y-3">
                                <div>
                                    <label className="block text-xs text-text-muted mb-1">Tên hiển thị</label>
                                    <input
                                        type="text"
                                        required
                                        value={horoscopeForm.name}
                                        onChange={(e) => setHoroscopeForm({ ...horoscopeForm, name: e.target.value })}
                                        className="w-full px-3 py-2 border border-surface-light rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-surface-cream"
                                        placeholder="Nguyễn Văn A"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-text-muted mb-1">Ngày sinh (dương lịch)</label>
                                    <input
                                        type="date"
                                        required
                                        value={horoscopeForm.solarDateOfBirth}
                                        onChange={(e) => setHoroscopeForm({ ...horoscopeForm, solarDateOfBirth: e.target.value })}
                                        className="w-full px-3 py-2 border border-surface-light rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-surface-cream"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-text-muted mb-1">Giờ sinh</label>
                                    <input
                                        type="time"
                                        required
                                        value={horoscopeForm.timeOfBirth}
                                        onChange={(e) => setHoroscopeForm({ ...horoscopeForm, timeOfBirth: e.target.value })}
                                        className="w-full px-3 py-2 border border-surface-light rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-surface-cream"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-text-muted mb-1">Múi giờ</label>
                                    <select
                                        value={horoscopeForm.timezone}
                                        onChange={(e) => setHoroscopeForm({ ...horoscopeForm, timezone: e.target.value })}
                                        className="w-full px-3 py-2 border border-surface-light rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-surface-cream"
                                    >
                                        {TIMEZONE_OPTIONS.map((tz) => (
                                            <option key={tz.value} value={tz.value}>{tz.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs text-text-muted mb-1">Giới tính</label>
                                    <div className="flex gap-4">
                                        <label className="flex items-center gap-2 text-sm cursor-pointer">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="MALE"
                                                checked={horoscopeForm.gender === "MALE"}
                                                onChange={(e) => setHoroscopeForm({ ...horoscopeForm, gender: e.target.value })}
                                                className="accent-primary"
                                            />
                                            Nam
                                        </label>
                                        <label className="flex items-center gap-2 text-sm cursor-pointer">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="FEMALE"
                                                checked={horoscopeForm.gender === "FEMALE"}
                                                onChange={(e) => setHoroscopeForm({ ...horoscopeForm, gender: e.target.value })}
                                                className="accent-primary"
                                            />
                                            Nữ
                                        </label>
                                    </div>
                                </div>
                                {horoscopeMsg && (
                                    <p className={`text-sm ${horoscopeMsg.startsWith("✅") ? "text-green-600" : "text-red-600"}`}>
                                        {horoscopeMsg}
                                    </p>
                                )}
                                <button
                                    type="submit"
                                    disabled={horoscopeSubmitting}
                                    className="w-full py-2.5 bg-primary text-text-light rounded-lg text-sm font-heading font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50"
                                >
                                    {horoscopeSubmitting ? "Đang lưu..." : horoscope ? "Cập nhật" : "Tạo mới"}
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Pro Upsell */}
                    {!isPro && (
                        <div className="bg-gradient-to-r from-gold/10 to-primary/10 rounded-xl p-5 border border-gold/20">
                            <h3 className="font-heading font-bold text-text-primary mb-2">
                                ✨ Nâng cấp Pro
                            </h3>
                            <p className="text-sm text-text-muted mb-3">
                                Mở khóa tử vi tháng, tử vi năm, bộ lọc nâng cao và tính năng bookmark.
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
                        <Link
                            href="/bookmarks"
                            className="flex items-center justify-between p-4 hover:bg-surface-cream transition-colors"
                        >
                            <span>🔖 Đã lưu</span>
                            <span className="text-text-muted">→</span>
                        </Link>
                    </div>

                    {/* Change Password */}
                    <div className="bg-white rounded-xl border border-surface-light overflow-hidden">
                        <button
                            onClick={() => setShowPasswordForm(!showPasswordForm)}
                            className="w-full flex items-center justify-between p-4 hover:bg-surface-cream transition-colors"
                        >
                            <span>🔑 Đổi mật khẩu</span>
                            <span className="text-text-muted">{showPasswordForm ? "−" : "→"}</span>
                        </button>

                        {showPasswordForm && (
                            <form onSubmit={handlePasswordSubmit} className="p-4 pt-0 space-y-3">
                                <div>
                                    <label className="block text-xs text-text-muted mb-1">Mật khẩu hiện tại</label>
                                    <input
                                        type="password"
                                        required
                                        value={passwordForm.currentPassword}
                                        onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                                        className="w-full px-3 py-2 border border-surface-light rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-surface-cream"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-text-muted mb-1">Mật khẩu mới</label>
                                    <input
                                        type="password"
                                        required
                                        value={passwordForm.newPassword}
                                        onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                                        className="w-full px-3 py-2 border border-surface-light rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-surface-cream"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-text-muted mb-1">Xác nhận mật khẩu mới</label>
                                    <input
                                        type="password"
                                        required
                                        value={passwordForm.confirmPassword}
                                        onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                                        className="w-full px-3 py-2 border border-surface-light rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-surface-cream"
                                    />
                                </div>
                                {passwordMsg && (
                                    <p className={`text-sm ${passwordMsg.startsWith("✅") ? "text-green-600" : "text-red-600"}`}>
                                        {passwordMsg}
                                    </p>
                                )}
                                <button
                                    type="submit"
                                    disabled={passwordSubmitting}
                                    className="w-full py-2.5 bg-primary text-text-light rounded-lg text-sm font-heading font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50"
                                >
                                    {passwordSubmitting ? "Đang đổi..." : "Đổi mật khẩu"}
                                </button>
                            </form>
                        )}
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

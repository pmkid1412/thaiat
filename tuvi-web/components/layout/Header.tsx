"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import api from "@/lib/api";

export function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userType, setUserType] = useState("");
    const [zaloNumber, setZaloNumber] = useState("");

    useEffect(() => {
        const token = Cookies.get("accessToken");
        setIsLoggedIn(!!token);

        if (token) {
            // Fetch user type
            api.get("/users/me")
                .then((res) => {
                    const user = res.data?.data || res.data;
                    setUserType((user?.userType || "").toString());
                })
                .catch(() => { });

            // Fetch Zalo number
            api.get("/configs")
                .then((res) => {
                    const configs = res.data?.data || res.data;
                    if (Array.isArray(configs)) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        const zaloConfig = configs.find((c: any) => c.key === "ZALO_NUMBER");
                        if (zaloConfig?.value) setZaloNumber(zaloConfig.value);
                    }
                })
                .catch(() => { });
        }
    }, []);

    const isFree = isLoggedIn && userType.toLowerCase() !== "pro";

    return (
        <header className="bg-surface-dark sticky top-0 z-50 border-b border-white/10">
            <div className="mx-auto max-w-[var(--container-max)] flex items-center justify-between px-6 py-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3">
                    <img
                        src="/assets/images/logo.svg"
                        alt="Thái Ất Kim Hoa"
                        className="h-10 w-auto"
                    />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link
                        href="/predictions"
                        className="text-text-light/80 hover:text-gold transition-colors font-medium"
                    >
                        Dự đoán
                    </Link>
                    <Link
                        href="/horoscope"
                        className="text-text-light/80 hover:text-gold transition-colors font-medium"
                    >
                        Tử vi
                    </Link>
                    {isLoggedIn && (
                        <Link
                            href="/bookmarks"
                            className="text-text-light/80 hover:text-gold transition-colors font-medium"
                        >
                            Đã lưu
                        </Link>
                    )}
                    <Link
                        href="https://thaiatkimhoa.vn"
                        target="_blank"
                        className="text-text-light/80 hover:text-gold transition-colors font-medium"
                    >
                        Giới thiệu
                    </Link>
                </nav>

                {/* Auth Buttons */}
                <div className="hidden md:flex items-center gap-3">
                    {isLoggedIn ? (
                        <>
                            {isFree && zaloNumber && (
                                <a
                                    href={`https://zalo.me/${zaloNumber}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-gradient-to-r from-gold to-primary text-white rounded-lg text-sm font-heading font-semibold hover:opacity-90 transition-opacity shadow-sm"
                                >
                                    ⭐ Nâng cấp Pro
                                </a>
                            )}
                            <Link
                                href="/profile"
                                className="px-5 py-2 text-gold border border-gold/40 rounded-lg hover:bg-gold/10 transition-colors font-medium text-sm"
                            >
                                👤 Tài khoản
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="px-5 py-2 text-gold border border-gold/40 rounded-lg hover:bg-gold/10 transition-colors font-medium text-sm"
                            >
                                Đăng nhập
                            </Link>
                            <Link
                                href="/register"
                                className="px-5 py-2 bg-primary text-text-light rounded-lg hover:bg-primary-dark transition-colors font-medium text-sm"
                            >
                                Đăng ký
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-text-light p-2"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        {menuOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-surface-darker border-t border-white/10 px-6 py-4 space-y-3">
                    <Link
                        href="/predictions"
                        className="block text-text-light/80 hover:text-gold py-2"
                        onClick={() => setMenuOpen(false)}
                    >
                        Dự đoán
                    </Link>
                    <Link
                        href="/horoscope"
                        className="block text-text-light/80 hover:text-gold py-2"
                        onClick={() => setMenuOpen(false)}
                    >
                        Tử vi
                    </Link>
                    {isLoggedIn && (
                        <Link
                            href="/bookmarks"
                            className="block text-text-light/80 hover:text-gold py-2"
                            onClick={() => setMenuOpen(false)}
                        >
                            🔖 Đã lưu
                        </Link>
                    )}
                    <Link
                        href="https://thaiatkimhoa.vn"
                        target="_blank"
                        className="block text-text-light/80 hover:text-gold py-2"
                    >
                        Giới thiệu
                    </Link>
                    <div className="flex flex-col gap-3 pt-2">
                        {isLoggedIn ? (
                            <>
                                {isFree && zaloNumber && (
                                    <a
                                        href={`https://zalo.me/${zaloNumber}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-center px-4 py-2 bg-gradient-to-r from-gold to-primary text-white rounded-lg text-sm font-heading font-semibold"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        ⭐ Nâng cấp Pro
                                    </a>
                                )}
                                <Link
                                    href="/profile"
                                    className="text-center px-4 py-2 text-gold border border-gold/40 rounded-lg text-sm"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    👤 Tài khoản
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="text-center px-4 py-2 text-gold border border-gold/40 rounded-lg text-sm"
                                >
                                    Đăng nhập
                                </Link>
                                <Link
                                    href="/register"
                                    className="text-center px-4 py-2 bg-primary text-text-light rounded-lg text-sm"
                                >
                                    Đăng ký
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}

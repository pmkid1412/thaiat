import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-surface-dark text-text-light/70 mt-auto">
            <div className="mx-auto max-w-[var(--container-max)] px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand */}
                    <div>
                        <img
                            src="/assets/images/logo.svg"
                            alt="Thái Ất Kim Hoa"
                            className="h-10 w-auto mb-3"
                        />
                        <p className="text-sm leading-relaxed">
                            Dự đoán tương lai dựa trên phương pháp Thái Ất Kim Hoa. Kết hợp
                            truyền thống và công nghệ hiện đại.
                        </p>
                        <div className="flex gap-3 mt-4">
                            <a href="#" aria-label="Facebook">
                                <img src="/assets/icons/icon-facebook.svg" className="w-6 h-6 opacity-70 hover:opacity-100 transition-opacity" alt="" />
                            </a>
                            <a href="#" aria-label="YouTube">
                                <img src="/assets/icons/icon-youtube.svg" className="w-6 h-6 opacity-70 hover:opacity-100 transition-opacity" alt="" />
                            </a>
                            <a href="#" aria-label="TikTok">
                                <img src="/assets/icons/icon-tiktok.svg" className="w-6 h-6 opacity-70 hover:opacity-100 transition-opacity" alt="" />
                            </a>
                            <a href="#" aria-label="Zalo">
                                <img src="/assets/icons/icon-zalo.svg" className="w-6 h-6 opacity-70 hover:opacity-100 transition-opacity" alt="" />
                            </a>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-heading font-semibold text-text-light mb-3">
                            Liên kết
                        </h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/predictions" className="hover:text-gold transition-colors">
                                    Bài viết dự đoán
                                </Link>
                            </li>
                            <li>
                                <Link href="/horoscope" className="hover:text-gold transition-colors">
                                    Tử vi cá nhân
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="https://thaiatkimhoa.vn"
                                    target="_blank"
                                    className="hover:text-gold transition-colors"
                                >
                                    Website chính
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Download App */}
                    <div>
                        <h4 className="font-heading font-semibold text-text-light mb-3">
                            Tải ứng dụng
                        </h4>
                        <p className="text-sm mb-3">
                            Trải nghiệm đầy đủ tính năng trên điện thoại
                        </p>
                        <div className="flex gap-2">
                            <a
                                href="#"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg text-sm hover:bg-white/20 transition-colors"
                            >
                                <span>🍎</span> App Store
                            </a>
                            <a
                                href="#"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg text-sm hover:bg-white/20 transition-colors"
                            >
                                <span>▶️</span> Google Play
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 mt-8 pt-6 text-center text-sm text-text-muted">
                    © {new Date().getFullYear()} Thái Ất Kim Hoa. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

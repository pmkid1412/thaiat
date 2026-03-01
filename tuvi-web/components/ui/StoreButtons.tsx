"use client";

import { useState } from "react";

const GOOGLE_PLAY_URL =
    "https://play.google.com/store/apps/details?id=com.thaiat&pcampaignid=web_share";

export function StoreButtons({ className = "" }: { className?: string }) {
    const [showPopup, setShowPopup] = useState(false);

    return (
        <>
            <div className={`flex gap-3 items-center ${className}`}>
                {/* App Store — coming soon popup */}
                <button
                    type="button"
                    onClick={() => setShowPopup(true)}
                    className="transition-opacity hover:opacity-80 focus:outline-none"
                >
                    <img
                        src="/assets/images/appstore.png"
                        alt="Tải trên App Store"
                        className="h-10 w-auto"
                    />
                </button>

                {/* Google Play — real link */}
                <a
                    href={GOOGLE_PLAY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-opacity hover:opacity-80"
                >
                    <img
                        src="/assets/images/googleplay.png"
                        alt="Tải trên Google Play"
                        className="h-10 w-auto"
                    />
                </a>
            </div>

            {/* Coming Soon Popup */}
            {showPopup && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                    onClick={() => setShowPopup(false)}
                >
                    <div
                        className="bg-white rounded-2xl shadow-xl p-6 mx-4 max-w-sm w-full text-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <p className="text-4xl mb-3">🍎</p>
                        <h3 className="font-heading text-lg font-bold text-text-primary mb-2">
                            Sắp ra mắt trên App Store
                        </h3>
                        <p className="text-text-muted text-sm mb-4">
                            Ứng dụng đang được phát triển cho iOS. Vui lòng tải trên Google Play
                            hoặc quay lại sau.
                        </p>
                        <div className="flex gap-3 justify-center">
                            <a
                                href={GOOGLE_PLAY_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-primary text-text-light rounded-xl text-sm font-medium hover:bg-primary-dark transition-colors"
                            >
                                Tải Google Play
                            </a>
                            <button
                                type="button"
                                onClick={() => setShowPopup(false)}
                                className="px-4 py-2 bg-surface-cream text-text-primary rounded-xl text-sm font-medium hover:bg-surface-light transition-colors"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

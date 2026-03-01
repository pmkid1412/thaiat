"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";
import { predictionApi } from "@/lib/api";

interface Bookmark {
    id: number;
    title?: string;
    summary?: string;
    description?: string;
    domainName?: string;
    predictionStatus?: string;
    confidenceScore?: number;
    predictionDate?: string;
    startDate?: string;
    endDate?: string;
    areas?: string[];
}

export default function BookmarksPage() {
    const router = useRouter();
    const [predictions, setPredictions] = useState<Bookmark[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const token = Cookies.get("accessToken");
        if (!token) {
            router.push("/login?redirect=/bookmarks");
            return;
        }

        const fetchBookmarks = async () => {
            try {
                const res = await predictionApi.getBookmarks({ page, pageSize: 12 });
                const responseData = res.data?.data || res.data;
                // API returns { data: [...], total, page, pageSize, totalPages }
                const items = Array.isArray(responseData) ? responseData : (responseData?.data || responseData?.items || []);
                const totalCount = Array.isArray(responseData) ? responseData.length : (responseData?.total || 0);
                setPredictions(items);
                setTotal(totalCount);
            } catch {
                setPredictions([]);
            } finally {
                setLoading(false);
            }
        };

        fetchBookmarks();
    }, [page, router]);

    return (
        <>
            {/* Header */}
            <section className="bg-surface-dark text-text-light py-12">
                <div className="mx-auto max-w-[var(--container-max)] px-6 text-center">
                    <h1 className="font-heading text-3xl font-bold">
                        🔖 Bài viết đã lưu
                    </h1>
                    <p className="text-text-muted mt-2">
                        Danh sách các bài dự đoán bạn đã đánh dấu
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="py-12 bg-surface-cream">
                <div className="mx-auto max-w-[var(--container-max)] px-6">
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : predictions.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="text-6xl mb-4">📭</div>
                            <h2 className="font-heading text-xl font-bold text-text-primary mb-2">
                                Chưa có bài viết nào được lưu
                            </h2>
                            <p className="text-text-muted mb-6">
                                Nhấn biểu tượng 🔖 trên bài viết để lưu lại đọc sau
                            </p>
                            <Link
                                href="/predictions"
                                className="inline-block px-6 py-3 bg-primary text-text-light rounded-xl font-heading font-semibold hover:bg-primary-dark transition-colors"
                            >
                                Khám phá dự đoán
                            </Link>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {predictions.map((p) => (
                                    <Link
                                        key={p.id}
                                        href={`/predictions/${p.id}`}
                                        className="bg-white rounded-2xl border border-surface-light p-6 hover:shadow-lg hover:-translate-y-1 transition-all group"
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            {p.domainName && (
                                                <span className="px-2 py-0.5 text-xs rounded-full font-medium bg-blue-100 text-blue-700">
                                                    {p.domainName}
                                                </span>
                                            )}
                                            <span className="text-gold text-lg ml-auto">🔖</span>
                                        </div>
                                        <h3 className="font-heading font-bold text-text-primary group-hover:text-primary transition-colors line-clamp-2 mb-2">
                                            {p.title || "Dự đoán"}
                                        </h3>
                                        <p className="text-sm text-text-muted line-clamp-3">
                                            {p.summary || p.description}
                                        </p>
                                        {p.confidenceScore != null && (
                                            <div className="mt-4 flex items-center gap-2">
                                                <div className="flex-1 h-1.5 bg-surface-light rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-gold rounded-full"
                                                        style={{ width: `${p.confidenceScore}%` }}
                                                    />
                                                </div>
                                                <span className="text-xs text-text-muted">
                                                    {p.confidenceScore}%
                                                </span>
                                            </div>
                                        )}
                                        {p.predictionDate && (
                                            <p className="text-xs text-text-muted mt-2">
                                                {new Date(p.predictionDate).toLocaleDateString("vi-VN")}
                                            </p>
                                        )}
                                    </Link>
                                ))}
                            </div>

                            {/* Pagination */}
                            {total > 12 && (
                                <div className="flex justify-center gap-2 mt-8">
                                    {Array.from(
                                        { length: Math.ceil(total / 12) },
                                        (_, i) => i + 1
                                    ).map((p) => (
                                        <button
                                            key={p}
                                            onClick={() => setPage(p)}
                                            className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${page === p
                                                ? "bg-primary text-text-light"
                                                : "bg-white border border-surface-light text-text-muted hover:border-primary hover:text-primary"
                                                }`}
                                        >
                                            {p}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
        </>
    );
}

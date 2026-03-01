import Link from "next/link";
import { PredictionCard } from "@/components/prediction/PredictionCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Bài viết dự đoán — Thái Ất Kim Hoa",
    description: "Danh sách bài viết dự đoán về kinh tế, xã hội, thiên nhiên từ Thái Ất Kim Hoa.",
};

interface PredictionItem {
    id: number;
    title: string;
    summary: string;
    domainName: string;
    confidenceScore: number;
    predictionStatus: string;
    predictionDate: string;
    areas: string[];
}

async function getPredictions(page: number = 1) {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL || "https://api.thaiatkimhoa.vn"}/predictions?page=${page}&limit=12`,
            { next: { revalidate: 60 } }
        );
        if (!res.ok) return { data: [], total: 0, page: 1, limit: 12 };
        const json = await res.json();
        return {
            data: json?.data?.data || [],
            total: json?.data?.total || 0,
            page: json?.data?.page || 1,
            limit: json?.data?.limit || 12,
        };
    } catch {
        return { data: [], total: 0, page: 1, limit: 12 };
    }
}

export default async function PredictionsPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string }>;
}) {
    const params = await searchParams;
    const currentPage = parseInt(params.page || "1", 10);
    const { data: predictions, total, limit } = await getPredictions(currentPage);
    const totalPages = Math.ceil(total / limit) || 1;

    return (
        <div className="bg-surface-cream min-h-screen">
            {/* Page Header */}
            <section className="bg-surface-dark ink-divider">
                <div className="mx-auto max-w-[var(--container-max)] px-6 py-12 md:py-16 text-center">
                    <h1 className="font-heading text-3xl md:text-4xl font-bold text-text-light mb-3">
                        Bài viết dự đoán
                    </h1>
                    <p className="text-text-light/60 max-w-xl mx-auto">
                        Phân tích và dự đoán dựa trên phương pháp Thái Ất Kim Hoa
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="py-10 md:py-14">
                <div className="mx-auto max-w-[var(--container-max)] px-6">
                    {predictions.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {predictions.map((p: PredictionItem) => (
                                    <PredictionCard
                                        key={p.id}
                                        id={p.id}
                                        title={p.title}
                                        summary={p.summary}
                                        domainName={p.domainName}
                                        confidenceScore={p.confidenceScore}
                                        predictionStatus={p.predictionStatus}
                                        predictionDate={p.predictionDate}
                                        areas={p.areas}
                                    />
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-3 mt-10">
                                    {currentPage > 1 && (
                                        <Link
                                            href={`/predictions?page=${currentPage - 1}`}
                                            className="px-4 py-2 bg-white border border-surface-light rounded-lg text-sm hover:border-primary transition-colors"
                                        >
                                            ← Trước
                                        </Link>
                                    )}
                                    <span className="text-sm text-text-muted">
                                        Trang {currentPage} / {totalPages}
                                    </span>
                                    {currentPage < totalPages && (
                                        <Link
                                            href={`/predictions?page=${currentPage + 1}`}
                                            className="px-4 py-2 bg-white border border-surface-light rounded-lg text-sm hover:border-primary transition-colors"
                                        >
                                            Tiếp →
                                        </Link>
                                    )}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-16 text-text-muted">
                            <p className="text-5xl mb-4">📊</p>
                            <p className="text-lg">Chưa có bài viết dự đoán nào.</p>
                            <Link href="/" className="text-primary hover:underline mt-2 inline-block">
                                ← Quay về trang chủ
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { predictionApi } from "@/lib/api";
import Cookies from "js-cookie";

interface PredictionData {
    id: number;
    title: string;
    description: string;
    summary: string;
    languageName: string;
}

interface PredictionDetail {
    id: number;
    predictionDate: string;
    startDate: string;
    endDate: string;
    confidenceScore: number;
    tags: string[];
    predictionData: PredictionData[];
    domainData: { id: number; name: string }[];
    impactLevelData: { id: number; name: string }[];
    predictionStatusData: { id: number; name: string }[];
    areas: { areaId: number; name: string }[][];
    predictionStatusId: number;
    domainId: number;
    impactLevelId: number;
}

function getStatusInfo(statusData: { name: string }[]) {
    const name = statusData?.[0]?.name || "Không rõ";
    const colorMap: Record<string, string> = {
        "Đã xảy ra": "bg-green-100 text-green-800 border-green-200",
        "Đang chờ": "bg-amber-100 text-amber-800 border-amber-200",
        "Sai": "bg-red-100 text-red-800 border-red-200",
    };
    return { name, className: colorMap[name] || "bg-gray-100 text-gray-600 border-gray-200" };
}

export default function PredictionDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [prediction, setPrediction] = useState<PredictionDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [bookmarked, setBookmarked] = useState(false);

    useEffect(() => {
        const token = Cookies.get("accessToken");
        if (!token) {
            router.push(`/login?redirect=/predictions/${params.id}`);
            return;
        }

        const fetchPrediction = async () => {
            try {
                const res = await predictionApi.getById(Number(params.id));
                setPrediction(res.data?.data || res.data);
            } catch (err: unknown) {
                const error = err as { response?: { status: number } };
                if (error.response?.status === 401) {
                    router.push(`/login?redirect=/predictions/${params.id}`);
                } else {
                    setError("Không thể tải bài viết. Vui lòng thử lại.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchPrediction();
    }, [params.id, router]);

    const handleBookmark = async () => {
        if (!prediction) return;
        try {
            await predictionApi.bookmark(prediction.id);
            setBookmarked(!bookmarked);
        } catch {
            // Silently fail
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-surface-cream flex items-center justify-center">
                <div className="text-center">
                    <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                    <p className="text-text-muted">Đang tải...</p>
                </div>
            </div>
        );
    }

    if (error || !prediction) {
        return (
            <div className="min-h-screen bg-surface-cream flex items-center justify-center">
                <div className="text-center">
                    <p className="text-5xl mb-4">⚠️</p>
                    <p className="text-text-muted text-lg mb-4">{error || "Không tìm thấy bài viết"}</p>
                    <Link href="/predictions" className="text-primary hover:underline">
                        ← Quay lại danh sách
                    </Link>
                </div>
            </div>
        );
    }

    const viData = prediction.predictionData?.find(
        (d) => d.languageName?.toLowerCase() === "tiếng việt"
    ) || prediction.predictionData?.[0];

    const status = getStatusInfo(prediction.predictionStatusData);
    const domain = prediction.domainData?.[0]?.name || "";
    const impact = prediction.impactLevelData?.[0]?.name || "";
    const allAreas = prediction.areas?.flat()?.map((a) => a.name) || [];

    return (
        <div className="bg-surface-cream min-h-screen">
            {/* Header */}
            <section className="bg-surface-dark">
                <div className="mx-auto max-w-[var(--container-max)] px-6 py-6 flex items-center justify-between">
                    <Link
                        href="/predictions"
                        className="text-text-light/70 hover:text-gold transition-colors flex items-center gap-2"
                    >
                        ← Quay lại
                    </Link>
                    <button
                        onClick={handleBookmark}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${bookmarked
                                ? "bg-gold text-surface-dark"
                                : "border border-gold/40 text-gold hover:bg-gold/10"
                            }`}
                    >
                        {bookmarked ? "🔖 Đã lưu" : "🔖 Lưu lại"}
                    </button>
                </div>
            </section>

            {/* Content */}
            <article className="mx-auto max-w-3xl px-6 py-10">
                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                    <span className="text-lg font-bold text-primary font-heading">
                        📊 {prediction.confidenceScore}%
                    </span>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium border ${status.className}`}>
                        {status.name}
                    </span>
                    {domain && (
                        <span className="text-xs px-3 py-1 bg-surface-light rounded-full text-text-muted">
                            {domain}
                        </span>
                    )}
                    {impact && (
                        <span className="text-xs px-3 py-1 bg-primary/10 rounded-full text-primary">
                            Mức ảnh hưởng: {impact}
                        </span>
                    )}
                </div>

                {/* Confidence Bar */}
                <div className="bg-surface-light rounded-full h-2 mb-6">
                    <div
                        className="confidence-bar h-2"
                        style={{ width: `${Math.min(prediction.confidenceScore, 100)}%` }}
                    />
                </div>

                {/* Date Range */}
                <div className="text-sm text-text-muted mb-4 flex items-center gap-4 flex-wrap">
                    <span>
                        📅 {new Date(prediction.startDate).toLocaleDateString("vi-VN")} →{" "}
                        {new Date(prediction.endDate).toLocaleDateString("vi-VN")}
                    </span>
                    {allAreas.length > 0 && (
                        <span>📍 {allAreas.join(", ")}</span>
                    )}
                </div>

                {/* Title */}
                <h1 className="font-heading text-2xl md:text-3xl font-bold text-text-primary mb-6 leading-tight">
                    {viData?.title}
                </h1>

                {/* Summary */}
                {viData?.summary && (
                    <div className="bg-gold/5 border-l-4 border-gold p-4 rounded-r-lg mb-8">
                        <p className="text-text-primary leading-relaxed italic">{viData.summary}</p>
                    </div>
                )}

                {/* Description / Content */}
                <div
                    className="prose prose-lg max-w-none text-text-primary leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: viData?.description || "" }}
                />

                {/* Tags */}
                {prediction.tags && prediction.tags.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-surface-light">
                        <h3 className="text-sm font-heading font-semibold text-text-muted mb-3">
                            Từ khóa
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {prediction.tags.map((tag, i) => (
                                <span
                                    key={i}
                                    className="px-3 py-1 bg-surface-light rounded-full text-sm text-text-muted"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </article>
        </div>
    );
}

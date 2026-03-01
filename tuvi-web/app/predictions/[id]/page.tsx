"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { predictionApi } from "@/lib/api";
import Cookies from "js-cookie";
import api from "@/lib/api";
import { StoreButtons } from "@/components/ui/StoreButtons";

/* eslint-disable @typescript-eslint/no-explicit-any */

// Convert plain text URLs to clickable links (only if not already inside an <a> tag)
function autoLinkify(html: string): string {
    // Match URLs not preceded by href=" or "> 
    return html.replace(
        /(?<!href=["'])(?<!["'>])(https?:\/\/[^\s<"']+)/gi,
        '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
    );
}

// Matches the flat response from backend findByIdConverted
interface PredictionDetail {
    id: number;
    title: string | null;
    domainName: string | null;
    predictionStatus: string | null;
    startDate: string;
    endDate: string;
    areas: string[];
    confidenceScore: number;
    summary: string | null;
    description: string | null;
    impactLevel: string | null;
    isBookmarked: boolean;
    tags: string[];
    type?: string;
    thumbnailUrl?: string;
    evidences: {
        id: number;
        title: string;
        source: string;
        link: string;
        publishedDate: string;
        confidenceScore: number;
        quote: string;
    }[];
}

interface RelatedPrediction {
    id: number;
    title: string;
    summary: string;
    domainName: string;
    confidenceScore: number;
    predictionStatus: string;
    predictionDate: string;
    areas: string[];
    type?: string;
}

function getStatusInfo(status: string | null) {
    const name = status || "Không rõ";
    const colorMap: Record<string, string> = {
        "Đã xảy ra": "bg-green-100 text-green-800 border-green-200",
        "Đang chờ": "bg-amber-100 text-amber-800 border-amber-200",
        "Sai": "bg-red-100 text-red-800 border-red-200",
    };
    return { name, className: colorMap[name] || "bg-gray-100 text-gray-600 border-gray-200" };
}

/** Truncate HTML at ~ratio of total text length, cutting at the nearest paragraph boundary */
function truncateHtml(html: string, ratio: number): { preview: string; isTruncated: boolean } {
    // Split into top-level blocks (paragraphs, divs, headings, lists, etc.)
    const blockRegex = /<(?:p|div|h[1-6]|ul|ol|li|blockquote|section|table|hr)[^>]*>[\s\S]*?<\/(?:p|div|h[1-6]|ul|ol|li|blockquote|section|table)>|<hr\s*\/?>/gi;
    const blocks: string[] = [];
    let match;
    while ((match = blockRegex.exec(html)) !== null) {
        blocks.push(match[0]);
    }
    // Fallback: if no blocks found, split by <br> or newlines
    if (blocks.length === 0) {
        const lines = html.split(/<br\s*\/?>|\n/).filter(l => l.trim());
        blocks.push(...lines);
    }

    const totalLength = blocks.reduce((sum, b) => sum + b.replace(/<[^>]+>/g, '').length, 0);
    const targetLength = totalLength * ratio;

    let accumulated = 0;
    const previewBlocks: string[] = [];
    for (const block of blocks) {
        const textLen = block.replace(/<[^>]+>/g, '').length;
        previewBlocks.push(block);
        accumulated += textLen;
        if (accumulated >= targetLength) break;
    }

    const isTruncated = previewBlocks.length < blocks.length;
    return { preview: previewBlocks.join(''), isTruncated };
}

export default function PredictionDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [prediction, setPrediction] = useState<PredictionDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isUserPro, setIsUserPro] = useState(true); // default true to avoid flash
    const [zaloNumber, setZaloNumber] = useState("0909000000");
    const [relatedPredictions, setRelatedPredictions] = useState<RelatedPrediction[]>([]);

    useEffect(() => {
        const token = Cookies.get("accessToken");
        if (!token) {
            router.push(`/login?redirect=/predictions/${params.id}`);
            return;
        }

        const fetchData = async () => {
            try {
                // Fetch prediction detail
                const res = await predictionApi.getById(Number(params.id));
                const pred = res.data?.data || res.data;
                setPrediction(pred);

                // Get user profile to check Pro status
                try {
                    const profileRes = await api.get("/users/me");
                    const user = profileRes.data?.data || profileRes.data;
                    const uType = (user?.userType || user?.type || "").toString();
                    setIsUserPro(uType.toLowerCase() === "pro");
                } catch {
                    setIsUserPro(false);
                }

                // Fetch Zalo number from configs
                try {
                    const configRes = await api.get("/configs");
                    const configs = configRes.data?.data || configRes.data;
                    if (Array.isArray(configs)) {
                        const zaloConfig = configs.find((c: any) => c.code === "ZALO_NUMBER");
                        if (zaloConfig?.value) setZaloNumber(zaloConfig.value);
                    }
                } catch {
                    // Use default Zalo number
                }

                // Fetch related predictions
                try {
                    const relatedRes = await predictionApi.list({ pageSize: 4 });
                    const relatedData = relatedRes.data?.data;
                    let items: RelatedPrediction[] = [];
                    const rawData = relatedData?.data;
                    if (rawData && typeof rawData === "object" && !Array.isArray(rawData)) {
                        items = Object.values(rawData).flat() as RelatedPrediction[];
                    } else if (Array.isArray(rawData)) {
                        items = rawData;
                    }
                    // Filter out current article
                    setRelatedPredictions(items.filter(p => p.id !== Number(params.id)).slice(0, 3));
                } catch {
                    // No related predictions
                }
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

        fetchData();
    }, [params.id, router]);

    const handleBookmark = async () => {
        if (!prediction) return;
        try {
            await predictionApi.bookmark(prediction.id);
            setPrediction({ ...prediction, isBookmarked: !prediction.isBookmarked });
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

    const status = getStatusInfo(prediction.predictionStatus);
    const isPro = prediction.type?.toLowerCase() === "pro";
    const isFreeLocked = !isUserPro;

    // Truncate content for free users
    const { preview: previewHtml, isTruncated } = isFreeLocked && prediction.description
        ? truncateHtml(prediction.description, 0.3)
        : { preview: prediction.description || '', isTruncated: false };

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
                    <div className="flex items-center gap-3">
                        {isPro && (
                            <span className="px-3 py-1 bg-gradient-to-r from-gold to-primary text-white text-xs font-bold rounded-full uppercase tracking-wide">
                                PRO
                            </span>
                        )}
                        <button
                            onClick={handleBookmark}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${prediction.isBookmarked
                                ? "bg-gold text-surface-dark"
                                : "border border-gold/40 text-gold hover:bg-gold/10"
                                }`}
                        >
                            {prediction.isBookmarked ? "🔖 Đã lưu" : "🔖 Lưu lại"}
                        </button>
                    </div>
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
                    {prediction.domainName && (
                        <span className="text-xs px-3 py-1 bg-surface-light rounded-full text-text-muted">
                            {prediction.domainName}
                        </span>
                    )}
                    {prediction.impactLevel && (
                        <span className="text-xs px-3 py-1 bg-primary/10 rounded-full text-primary">
                            Mức ảnh hưởng: {prediction.impactLevel}
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
                    {prediction.areas?.length > 0 && (
                        <span>📍 {prediction.areas.join(", ")}</span>
                    )}
                </div>

                {/* Title */}
                <h1 className="font-heading text-2xl md:text-3xl font-bold text-text-primary mb-6 leading-tight">
                    {prediction.title}
                </h1>

                {/* Summary */}
                {prediction.summary && (
                    <div className="bg-gold/5 border-l-4 border-gold p-4 rounded-r-lg mb-8">
                        <p className="text-text-primary leading-relaxed italic">{prediction.summary}</p>
                    </div>
                )}

                {/* Thumbnail Image */}
                {prediction.thumbnailUrl && (
                    <div className="mb-8 rounded-xl overflow-hidden border border-surface-light">
                        <img
                            src={prediction.thumbnailUrl.startsWith('http') ? prediction.thumbnailUrl : `${process.env.NEXT_PUBLIC_API_URL || 'https://api.thaiatkimhoa.vn'}${prediction.thumbnailUrl}`}
                            alt={prediction.title || 'Ảnh minh họa'}
                            className="w-full h-auto object-cover"
                        />
                    </div>
                )}

                {/* Description / Content */}
                <div
                    className="report-content prose prose-lg max-w-none text-text-primary leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: autoLinkify(previewHtml) }}
                />

                {/* Content Lock — inline upgrade CTA for free users */}
                {isFreeLocked && isTruncated && (
                    <div className="relative mt-0">
                        {/* Gradient fade overlay */}
                        <div className="h-24 -mt-24 bg-gradient-to-b from-transparent via-surface-cream/80 to-surface-cream relative z-10" />

                        {/* Lock CTA */}
                        <div className="bg-white border border-surface-light rounded-2xl p-8 text-center shadow-sm relative z-10">
                            <div className="text-4xl mb-3">🔒</div>
                            <h3 className="font-heading text-lg font-bold text-text-primary mb-2">
                                Nội dung chỉ dành cho tài khoản Pro
                            </h3>
                            <p className="text-text-muted text-sm mb-6 max-w-md mx-auto">
                                Nâng cấp tài khoản Pro để đọc toàn bộ bài viết phân tích chuyên sâu và nhận các dự đoán độc quyền.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                                <a
                                    href={`https://zalo.me/${zaloNumber}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-3 bg-[#0068FF] hover:bg-[#0055DD] text-white rounded-xl font-semibold transition-colors flex items-center gap-2"
                                >
                                    💬 Liên hệ Zalo để nâng cấp
                                </a>
                            </div>
                            <div className="mt-5 pt-4 border-t border-surface-light">
                                <p className="text-xs text-text-muted mb-3">Hoặc tải app để trải nghiệm đầy đủ</p>
                                <StoreButtons className="justify-center" />
                            </div>
                        </div>
                    </div>
                )}

                {/* Evidences */}
                {!isFreeLocked && prediction.evidences && prediction.evidences.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-surface-light">
                        <h3 className="text-sm font-heading font-semibold text-text-muted mb-3">
                            Bằng chứng
                        </h3>
                        <div className="space-y-3">
                            {prediction.evidences.map((ev) => (
                                <div key={ev.id} className="p-4 bg-white rounded-xl border border-surface-light">
                                    <div className="flex items-start justify-between gap-2 mb-1">
                                        <p className="font-medium text-text-primary text-sm">{ev.title}</p>
                                        {ev.confidenceScore > 0 && (
                                            <span className="text-xs text-primary font-bold whitespace-nowrap">
                                                {ev.confidenceScore}%
                                            </span>
                                        )}
                                    </div>
                                    {ev.quote && (
                                        <p className="text-sm text-text-muted italic mb-2">&ldquo;{ev.quote}&rdquo;</p>
                                    )}
                                    <div className="flex items-center gap-3 text-xs text-text-muted">
                                        {ev.source && <span>📰 {ev.source}</span>}
                                        {ev.publishedDate && (
                                            <span>📅 {new Date(ev.publishedDate).toLocaleDateString("vi-VN")}</span>
                                        )}
                                        {ev.link && (
                                            <a href={ev.link} target="_blank" rel="noopener noreferrer"
                                                className="text-primary hover:underline">
                                                🔗 Xem nguồn
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Tags */}
                {!isFreeLocked && prediction.tags && prediction.tags.length > 0 && (
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

                {/* Disclaimer Notice */}
                <div className="mt-8 p-5 bg-[#FFF8F0] border border-[#D4A574] rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-base">⚠</span>
                        <span className="font-heading font-bold text-[#8B4513] text-sm">Lưu ý</span>
                    </div>
                    <p className="text-sm text-[#5C3A1E] leading-relaxed">
                        Nội dung là sự kết hợp giữa dữ liệu vĩ mô và tính toán chu kỳ thời vận, không nên dùng làm cơ sở duy nhất cho các quyết định quan trọng. Xem chi tiết{" "}
                        <a
                            href="https://thaiatkimhoa.vn/tuyen-bo-mien-tru-trach-nhiem-disclaimer/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#8B4513] font-semibold underline hover:text-[#5C3A1E] transition-colors"
                        >
                            Miễn trừ trách nhiệm
                        </a>
                        .
                    </p>
                </div>

                {/* Related Predictions */}
                {!isFreeLocked && relatedPredictions.length > 0 && (
                    <div className="mt-10 pt-8 border-t border-surface-light">
                        <h3 className="font-heading text-lg font-bold text-text-primary mb-5">
                            📰 Dự đoán khác
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {relatedPredictions.map((rp) => (
                                <Link key={rp.id} href={`/predictions/${rp.id}`} className="block h-full">
                                    <div className="bg-white rounded-xl p-4 border border-surface-light hover:border-gold/30 hover:shadow-md transition-all group h-full flex flex-col">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-xs font-bold text-primary">
                                                📊 {rp.confidenceScore}%
                                            </span>
                                            {rp.type?.toLowerCase() === "pro" && (
                                                <span className="px-1.5 py-0.5 bg-gradient-to-r from-gold to-primary text-white text-[9px] font-bold rounded-full uppercase">
                                                    PRO
                                                </span>
                                            )}
                                        </div>
                                        <h4 className="font-heading font-semibold text-text-primary text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors flex-1">
                                            {rp.title}
                                        </h4>
                                        {rp.areas && rp.areas.length > 0 && (
                                            <div className="flex gap-1 mt-2">
                                                {rp.areas.slice(0, 2).map((area, i) => (
                                                    <span key={i} className="px-1.5 py-0.5 bg-primary/10 text-primary font-medium rounded text-[10px]">
                                                        {area}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </article>
        </div>
    );
}

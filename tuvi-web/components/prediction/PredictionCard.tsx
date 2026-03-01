import Link from "next/link";

interface PredictionCardProps {
    id: number;
    title: string;
    summary: string;
    domainName: string;
    confidenceScore: number;
    predictionStatus: string;
    predictionDate?: string;
    areas?: string[];
    type?: string;
}

function getStatusColor(status: string) {
    switch (status?.toLowerCase()) {
        case "đã xảy ra":
        case "confirmed":
            return "bg-green-100 text-green-800";
        case "đang chờ":
        case "pending":
            return "bg-amber-100 text-amber-800";
        case "sai":
        case "wrong":
            return "bg-red-100 text-red-800";
        default:
            return "bg-gray-100 text-gray-600";
    }
}

export function PredictionCard({
    id,
    title,
    summary,
    domainName,
    confidenceScore,
    predictionStatus,
    predictionDate,
    areas,
    type,
}: PredictionCardProps) {
    const isPro = type?.toLowerCase() === "pro";

    return (
        <Link href={`/predictions/${id}`} className="block h-full">
            <article className="prediction-card bg-white rounded-xl p-5 shadow-sm border border-surface-light hover:border-gold/30 cursor-pointer h-full flex flex-col">
                {/* Header: Score + Domain + Pro + Status */}
                <div className="flex items-center justify-between mb-3 gap-2">
                    <div className="flex items-center gap-2 flex-wrap min-w-0">
                        <span className="text-sm font-bold text-primary font-heading whitespace-nowrap">
                            📊 {confidenceScore}%
                        </span>
                        <span className="text-xs px-2 py-0.5 bg-surface-light rounded-full text-text-muted truncate">
                            {domainName}
                        </span>
                        {isPro && (
                            <span className="px-2 py-0.5 bg-gradient-to-r from-gold to-primary text-white text-[10px] font-bold rounded-full uppercase tracking-wide shadow-sm whitespace-nowrap">
                                PRO
                            </span>
                        )}
                    </div>
                    <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap shrink-0 ${getStatusColor(predictionStatus)}`}
                    >
                        {predictionStatus}
                    </span>
                </div>

                {/* Title */}
                <h3 className="font-heading font-semibold text-text-primary text-base leading-snug mb-2 line-clamp-2">
                    {title}
                </h3>

                {/* Summary */}
                <p className="text-sm text-text-muted leading-relaxed line-clamp-3 mb-3 flex-1">
                    {summary}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between text-xs text-text-muted mt-auto">
                    {predictionDate && (
                        <span>📅 {new Date(predictionDate).toLocaleDateString("vi-VN")}</span>
                    )}
                    {areas && areas.length > 0 && (
                        <div className="flex gap-1">
                            {areas.slice(0, 2).map((area, i) => (
                                <span
                                    key={i}
                                    className="px-1.5 py-0.5 bg-primary/10 text-primary font-medium rounded text-xs"
                                >
                                    {area}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Confidence Bar */}
                <div className="mt-3 bg-surface-light rounded-full h-1.5">
                    <div
                        className="confidence-bar"
                        style={{ width: `${Math.min(confidenceScore, 100)}%` }}
                    />
                </div>
            </article>
        </Link>
    );
}

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
}: PredictionCardProps) {
    return (
        <Link href={`/predictions/${id}`}>
            <article className="prediction-card bg-white rounded-xl p-5 shadow-sm border border-surface-light hover:border-gold/30 cursor-pointer">
                {/* Header: Score + Domain */}
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-primary font-heading">
                            📊 {confidenceScore}%
                        </span>
                        <span className="text-xs px-2 py-0.5 bg-surface-light rounded-full text-text-muted">
                            {domainName}
                        </span>
                    </div>
                    <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusColor(predictionStatus)}`}
                    >
                        {predictionStatus}
                    </span>
                </div>

                {/* Title */}
                <h3 className="font-heading font-semibold text-text-primary text-base leading-snug mb-2 line-clamp-2">
                    {title}
                </h3>

                {/* Summary */}
                <p className="text-sm text-text-muted leading-relaxed line-clamp-3 mb-3">
                    {summary}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between text-xs text-text-muted">
                    {predictionDate && (
                        <span>📅 {new Date(predictionDate).toLocaleDateString("vi-VN")}</span>
                    )}
                    {areas && areas.length > 0 && (
                        <div className="flex gap-1">
                            {areas.slice(0, 2).map((area, i) => (
                                <span
                                    key={i}
                                    className="px-1.5 py-0.5 bg-gold/10 text-gold rounded text-xs"
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

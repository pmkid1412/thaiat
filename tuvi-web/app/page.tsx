import Link from "next/link";
import { PredictionCard } from "@/components/prediction/PredictionCard";

// Server-side data fetching
async function getFeaturedPredictions() {
  const apiUrl = process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL || "https://api.thaiatkimhoa.vn";
  try {
    const res = await fetch(
      `${apiUrl}/predictions?page=1&pageSize=6`,
      { next: { revalidate: 300 } } // Revalidate every 5 minutes
    );
    if (!res.ok) return [];
    const json = await res.json();
    // API returns data grouped by date: { "2026-03-01": [...], ... }
    const grouped = json?.data?.data;
    if (grouped && typeof grouped === "object" && !Array.isArray(grouped)) {
      return Object.values(grouped).flat();
    }
    return grouped || [];
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const predictions = await getFeaturedPredictions();

  return (
    <div>
      {/* ═══ Hero Section (dark bg) ═══ */}
      <section className="bg-surface-dark relative overflow-hidden">
        {/* Background image */}
        <img
          src="/assets/images/hero-banner.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/50" />
        {/* Accent glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-gold/10" />

        <div className="relative mx-auto max-w-[var(--container-max)] px-6 py-20 md:py-28 text-center">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text-light mb-6 leading-tight">
            Dự đoán tương lai
            <br />
            <span className="text-gold gold-glow">Thái Ất Kim Hoa</span>
          </h1>
          <p className="text-text-light/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Khám phá các bài viết dự đoán chính xác về kinh tế, xã hội, thiên
            nhiên. Xem tử vi cá nhân hàng ngày, hàng tháng, hàng năm.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/predictions"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary hover:bg-primary-dark text-text-light rounded-xl font-heading font-semibold text-base transition-all hover:scale-105"
            >
              📊 Xem dự đoán
            </Link>
            <Link
              href="/horoscope"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-gold/40 text-gold hover:bg-gold/10 rounded-xl font-heading font-semibold text-base transition-all hover:scale-105"
            >
              🔮 Xem tử vi
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ Featured Predictions (cream bg) ═══ */}
      <section className="bg-surface-cream py-16 md:py-20">
        <div className="mx-auto max-w-[var(--container-max)] px-6">
          <div className="text-center mb-10">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary mb-3">
              Dự đoán mới nhất
            </h2>
            <p className="text-text-muted">
              Các bài viết phân tích và dự đoán mới được cập nhật
            </p>
          </div>

          {predictions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {predictions.map(
                (p: {
                  id: number;
                  title: string;
                  summary: string;
                  domainName: string;
                  confidenceScore: number;
                  predictionStatus: string;
                  predictionDate: string;
                  areas: string[];
                }) => (
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
                )
              )}
            </div>
          ) : (
            <div className="text-center py-12 text-text-muted">
              <p className="text-4xl mb-3">📊</p>
              <p>Chưa có bài viết dự đoán nào.</p>
            </div>
          )}

          {predictions.length > 0 && (
            <div className="text-center mt-8">
              <Link
                href="/predictions"
                className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-heading font-semibold transition-colors"
              >
                Xem tất cả bài viết →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ═══ CTA: Login/Horoscope ═══ */}
      <section className="bg-surface-dark py-16">
        <div className="mx-auto max-w-[var(--container-max)] px-6 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-light mb-4">
            Xem tử vi cá nhân
          </h2>
          <p className="text-text-light/60 mb-8 max-w-lg mx-auto">
            Đăng nhập để xem tử vi hàng ngày, hàng tháng, hàng năm dựa trên lá
            số tử vi của bạn.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="px-8 py-3 bg-gold text-surface-dark rounded-xl font-heading font-semibold hover:bg-gold-light transition-colors"
            >
              Đăng nhập
            </Link>
            <Link
              href="/register"
              className="px-8 py-3 border-2 border-text-light/30 text-text-light rounded-xl font-heading font-semibold hover:bg-white/10 transition-colors"
            >
              Đăng ký miễn phí
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

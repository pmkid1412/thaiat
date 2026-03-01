import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import GoogleAuthProvider from "@/components/auth/GoogleAuthProvider";

export const metadata: Metadata = {
  title: {
    default: "Thái Ất Kim Hoa — Dự đoán & Tử vi",
    template: "%s | Thái Ất Kim Hoa",
  },
  description:
    "Đọc bài viết dự đoán chính xác về kinh tế, xã hội, thiên nhiên. Xem tử vi cá nhân hàng ngày, hàng tháng, hàng năm từ Thái Ất Kim Hoa.",
  icons: { icon: "/assets/images/favicon.png" },
  metadataBase: new URL("https://web.thaiatkimhoa.vn"),
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "Thái Ất Kim Hoa",
    title: "Thái Ất Kim Hoa — Dự đoán & Tử vi",
    description:
      "Khám phá các bài viết dự đoán chính xác về kinh tế, xã hội, thiên nhiên. Xem tử vi cá nhân dựa trên lá số của bạn.",
    images: ["/assets/images/hero-banner.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thái Ất Kim Hoa — Dự đoán & Tử vi",
    description: "Dự đoán tương lai & Tử vi cá nhân",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="min-h-screen flex flex-col">
        <GoogleAuthProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </GoogleAuthProvider>
      </body>
    </html>
  );
}

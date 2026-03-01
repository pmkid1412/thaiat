import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Thái Ất Kim Hoa — Dự đoán & Tử vi",
  description:
    "Đọc bài viết dự đoán và xem tử vi cá nhân từ Thái Ất Kim Hoa. Đăng nhập bằng tài khoản app hoặc đăng ký mới.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

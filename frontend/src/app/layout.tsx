import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import RootLayout from "@/components/layout/RootLayout";
import { AuthProvider } from '@/lib/contexts';

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-be-vietnam-pro",
});

export const metadata: Metadata = {
  title: "Kinh Đô Cá Cảnh - Website bán cá cảnh và phụ kiện thủy sinh",
  description: "Chuyên cung cấp cá cảnh, phụ kiện thủy sinh, trang trí bể cá với đa dạng mẫu mã và chất lượng cao",
  keywords: ["cá cảnh", "phụ kiện thủy sinh", "bể cá", "cây thủy sinh", "trang trí bể cá"],
  icons: [
    { rel: 'icon', url: '/favicon.ico' },
    { rel: 'icon', url: '/favicon.svg', type: 'image/svg+xml' }
  ],
  openGraph: {
    title: "Kinh Đô Cá Cảnh - Website bán cá cảnh và phụ kiện thủy sinh",
    description: "Chuyên cung cấp cá cảnh, phụ kiện thủy sinh, trang trí bể cá với đa dạng mẫu mã và chất lượng cao",
    type: "website",
    locale: "vi_VN",
  },
  robots: "index, follow",
  alternates: {
    canonical: "/",
  },
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${beVietnamPro.variable} min-h-screen flex flex-col`}>
        <AuthProvider>
          <RootLayout>{children}</RootLayout>
        </AuthProvider>
      </body>
    </html>
  );
}

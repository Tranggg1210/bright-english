import type { Metadata } from "next";
import ProviderComponent from "./ProviderComponent";
import { Suspense } from "react";
import { Montserrat } from "next/font/google";
import './global.css';

const montserrat = Montserrat({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bright English Admin | Quản trị hệ thống học tiếng Anh",
  description:
    "Trang quản trị hệ thống Bright English – nơi quản lý nội dung học, người dùng, và dữ liệu học tập. Tối ưu hóa trải nghiệm học tiếng Anh hiệu quả.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} antialiased`}
        cz-shortcut-listen="false"
      >
        <Suspense fallback={null}>
          <ProviderComponent main={children} />
        </Suspense>
      </body>
    </html>
  );
}

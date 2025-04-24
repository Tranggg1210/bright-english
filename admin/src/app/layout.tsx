import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./style.global.scss";
import { ConfigProvider, theme as antdTheme } from "antd";

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
        <ConfigProvider
          theme={{
            algorithm: antdTheme.defaultAlgorithm,
            token: {
              colorPrimary: "#43a047", 
              borderRadius: 8,
              fontSize: 14,
            },
          }}
        >
          {children}
        </ConfigProvider>
      </body>
    </html>
  );
}

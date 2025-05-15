import type { Metadata } from "next";
import { Suspense } from "react";
import { Quicksand } from "next/font/google";
import ProviderComponent from "./provider-component";
import "./globals.scss";

const quicksand = Quicksand({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bright English | Nền tảng học tiếng Anh hiệu quả",
  description:
    "Bright English giúp bạn luyện từ vựng, nghe nói, làm bài tập và thi đấu tiếng Anh một cách thú vị và hiệu quả. Cùng chinh phục tiếng Anh mỗi ngày!",
  keywords: [
    "học tiếng Anh",
    "từ vựng tiếng Anh",
    "Bright English",
    "luyện nói tiếng Anh",
    "ứng dụng học tiếng Anh",
  ],
  authors: [{ name: "Nguyễn Thị Trang", url: "https://brightenglish.vn" }],
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/apple-touch-icon.png",
  },
  openGraph: {
    title: "Bright English | Nền tảng học tiếng Anh hiệu quả",
    description:
      "Học tiếng Anh thông minh, vui vẻ và dễ nhớ với Bright English. Từ vựng, bài tập, luyện nghe, luyện nói và hơn thế nữa.",
    url: "https://brightenglish.vn",
    siteName: "Bright English",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Bright English Web",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bright English",
    description:
      "Nền tảng học tiếng Anh toàn diện và thông minh cho người Việt.",
    images: ["/images/logo.png"],
    creator: "@brightenglish",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${quicksand.className} antialiased`}
        cz-shortcut-listen="false"
      >
        <Suspense fallback={null}>
          <ProviderComponent main={children} />
        </Suspense>
      </body>
    </html>
  );
}

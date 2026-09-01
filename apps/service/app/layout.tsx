import type { Metadata } from "next/types";
import type { ReactNode } from "react";
import {
  interTight,
  jetBrainsMono,
  martianMonoCondensed,
  pretendard,
} from "@/styles/fonts";
import { Header } from "@/ui/header";
import "@heiglabs/design-system/styles";
import "@/styles/globals.css";
import { Toaster } from "sonner";
import { Footer } from "@/ui/footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://nullk.us"),
  title: "손지민 - nullk.us",
  description: "손지민의 작업, 생각, 개발 기록을 모아둔 개인 콘텐츠 홈입니다.",

  keywords: [
    "프론트엔드 엔지니어",
    "풀스택 개발자",
    "프로덕트 빌더",
    "손지민",
    "Product Builder",
    "React",
    "TypeScript",
    "Next.js",
  ],

  authors: [{ name: "손지민" }],

  category: "Product Builder",

  openGraph: {
    title: "손지민 - nullk.us",
    description:
      "손지민의 작업, 생각, 개발 기록을 모아둔 개인 콘텐츠 홈입니다.",
    type: "website",
    locale: "ko_KR",
    siteName: "손지민 Portfolio",
    images: [
      {
        url: "/og/nullk-og-image.png",
        width: 1200,
        height: 630,
        alt: "손지민 - Product Builder",
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "/",
  },

  other: {
    "theme-color": "#ffffff",
    "format-detection": "telephone=no",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`relative mx-auto w-full ${pretendard.variable} ${jetBrainsMono.variable} ${interTight.variable} ${martianMonoCondensed.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}

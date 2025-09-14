import { pretendard } from '@/styles/fonts';
import { Header } from '@/ui/header';
import type { Metadata } from 'next/types';
import type { ReactNode } from 'react';
import '@heiglabs/design-system/styles';
import '@/styles/globals.css';
import { Footer } from '@/ui/footer';

export const metadata: Metadata = {
  title: '삼손(Sam Son) - 프론트엔드 엔지니어',
  description:
    '찾을 수 없는 곳에서 보석을 찾는, 5년차 FE 엔지니어, 손지민입니다.',

  keywords: ['프론트엔드 엔지니어', '5년차 FE 엔지니어', '손지민'],

  authors: [{ name: '손지민' }],

  category: '프론트엔드 엔지니어',

  openGraph: {
    title: '삼손(Sam Son) - 프론트엔드 엔지니어',
    description:
      '찾을 수 없는 곳에서 보석을 찾는, 5년차 FE 엔지니어, 손지민입니다.',
    type: 'website',
    locale: 'ko_KR',
    siteName: '삼손(Sam Son)',
    images: [
      {
        url: '/og/nullk-og-image.png',
        width: 1200,
        height: 630,
        alt: 'NULLK',
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  alternates: {
    canonical: 'http://nullk.us/',
  },

  other: {
    'theme-color': '#000000',
    'format-detection': 'telephone=no',
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
        className={`relative w-full ${pretendard.variable} mx-auto antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

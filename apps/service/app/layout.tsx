import localFont from 'next/font/local';
import type { ReactNode } from 'react';
import '@heiglabs/design-system/styles';
import './globals.css';
import type { Metadata } from 'next/types';
import { QueryProvider } from '../lib/providers/query-provider';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
});

const pretendard = localFont({
  variable: '--font-pretendard',
  src: [
    {
      path: './fonts/Pretendard-Thin.subset.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: './fonts/Pretendard-ExtraLight.subset.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: './fonts/Pretendard-Light.subset.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/Pretendard-Regular.subset.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Pretendard-Medium.subset.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/Pretendard-SemiBold.subset.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/Pretendard-Bold.subset.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/Pretendard-ExtraBold.subset.woff2',
      weight: '800',
      style: 'normal',
    },
    {
      path: './fonts/Pretendard-Black.subset.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
});

export const metadata: Metadata = {
  title: "I'm Sam",
  description: '6 years of experience in the Software Engineering',

  keywords: ['Software Engineer', '6 years of experience'],

  authors: [{ name: 'Safethecode' }],

  category: 'Software Engineer',

  openGraph: {
    title: 'NULLK',
    description: '6 years of experience in the Software Engineering',
    type: 'website',
    locale: 'en_US',
    siteName: 'NULLK',
    images: [
      {
        url: '/nullk-og-image.png',
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pretendard.variable} antialiased`}
      >
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}

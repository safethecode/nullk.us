import { pretendard } from '@/styles/fonts';
import { Header } from '@/ui/header';
import type { Metadata } from 'next/types';
import type { ReactNode } from 'react';
import '@heiglabs/design-system/styles';
import '@/styles/globals.css';
import { Footer } from '@/ui/footer';

export const metadata: Metadata = {
  title: "I'm Sam",
  description: '5 years of experience in the Software Engineering',

  keywords: ['Software Engineer', '5 years of experience'],

  authors: [{ name: 'Safethecode' }],

  category: 'Software Engineer',

  openGraph: {
    title: 'NULLK',
    description: '5 years of experience in the Software Engineering',
    type: 'website',
    locale: 'en_US',
    siteName: 'NULLK',
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
    <html lang="en">
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

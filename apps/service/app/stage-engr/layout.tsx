import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next/types';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: '무대예술전문인 자격시험 기출문제집 | 널케이 FOH',
  description:
    '2026년 무대예술전문인 자격시험 음향 분야 합격을 위한 최신 기출문제집. 현직 FOH 엔지니어가 직접 제작한 실전 문제와 상세 해설로 한 번에 합격하세요. 연 1회 시험 완벽 대비.',

  // 검색엔진 최적화를 위한 키워드
  keywords:
    '무대예술전문인, 자격시험, 음향, 기출문제집, FOH 엔지니어, 무대음향, 자격증, 시험대비',

  // 작성자 정보
  authors: [{ name: '널케이 FOH' }],

  // 사이트 분류
  category: '교육/자격증',

  // Open Graph 메타데이터
  openGraph: {
    title: '무대예술전문인 자격시험 음향 분야 기출문제집',
    description:
      '현직 FOH 엔지니어가 만든 무대예술전문인 자격시험 음향 분야 완벽 대비서. 2025년 최신 기출문제와 상세해설 수록.',
    type: 'website',
    locale: 'ko_KR',
    siteName: '널케이 FOH',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '무대예술전문인 자격시험 음향 분야 기출문제집',
      },
    ],
  },

  // Twitter 카드 설정
  twitter: {
    card: 'summary_large_image',
    title: '무대예술전문인 자격시험 음향 분야 기출문제집',
    description: '현직 FOH 엔지니어가 만든 무대예술전문인 자격시험 완벽 대비서',
    images: ['/og-image.jpg'],
  },

  // 추가 SEO 설정
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

  // 정식 URL (중복 콘텐츠 방지)
  alternates: {
    canonical: 'http://stage-eng.nullk.us/',
  },

  // 기타 메타태그
  other: {
    'theme-color': '#000000', // 브랜드 컬러로 수정
    'format-detection': 'telephone=no',
    'naver-site-verification': '79311768fadd2e93e75ebb24f70025d4c0c31f52',
  },
};

export default function StageEngrLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-neutral-50 to-neutral-100">
      {/* Header */}
      <header className="mx-auto w-full max-w-5xl px-4 py-4 sm:px-6 sm:py-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/">
            <Image
              src="/nullk-logo.svg"
              alt="널케이 | 무대예술전문인 자격 시험 문제집 | 음향 엔지니어"
              width={90}
              height={20}
              className="sm:h-[24px] sm:w-[110px]"
            />
          </Link>
          <span className="inline-flex w-fit items-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-2.5 py-0.5 font-medium text-white text-xs">
            FOH
          </span>
          <p className="text-neutral-300 text-sm">|</p>
          <div className="flex items-center gap-4">
            <Link
              className="text-neutral-400! text-sm transition-colors hover:text-neutral-800!"
              href="/qna"
            >
              질문/답변
            </Link>
            <Link
              className="text-neutral-400! text-sm transition-colors hover:text-neutral-800!"
              href="/ask-me"
            >
              문의
            </Link>
          </div>
        </div>
      </header>

      {/* Main content area - grows to fill available space */}
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-4 sm:px-6 sm:pb-6">
        {children}
      </main>

      {/* Footer - always at bottom */}
      <footer className="border-neutral-200 border-t bg-white/50 backdrop-blur-sm">
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
          <div className="flex flex-col items-center justify-center space-y-3 text-center sm:space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-neutral-500 text-xs sm:text-sm">
                Sponsored by
              </span>
            </div>
            <div className="flex items-center">
              <Image
                src="/damascuse-media-logo.svg"
                alt="Damascuse Media"
                width={100}
                height={40}
                className="sm:h-[51px] sm:w-[128px]"
              />
            </div>
            <p className="text-neutral-400 text-xs">
              © 2025 널케이. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

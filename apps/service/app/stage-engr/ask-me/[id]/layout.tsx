import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: '문의 상세 | 무대예술전문인 자격시험 | 널케이 FOH',
  description:
    '무대예술전문인 시험 관련 문의 내용과 답변을 확인하세요. 빠르고 정확한 답변을 제공합니다.',

  keywords: '무대예술전문인, 자격시험, 문의, 문제오류, 시험문의, 기술문의',

  openGraph: {
    title: '문의 상세 | 무대예술전문인 자격시험',
    description: '무대예술전문인 시험 관련 문의 내용과 답변을 확인하세요.',
    type: 'article',
    locale: 'ko_KR',
    siteName: '널케이 FOH',
  },

  twitter: {
    card: 'summary_large_image',
    title: '문의 상세 | 무대예술전문인 자격시험',
    description: '무대예술전문인 시험 관련 문의 상세',
  },
};

export default function AskMeDetailLayout({
  children,
}: { children: ReactNode }) {
  return <>{children}</>;
}

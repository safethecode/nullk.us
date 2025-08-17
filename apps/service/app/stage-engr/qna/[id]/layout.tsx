import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Q&A 상세 | 무대예술전문인 자격시험 | 널케이 FOH',
  description:
    '무대예술전문인 시험 관련 질문과 답변을 확인하세요. 전문가들의 상세한 답변과 해설을 제공합니다.',

  keywords:
    '무대예술전문인, 자격시험, Q&A, 질문답변, 음향, 조명, 기계, 시험문의',

  openGraph: {
    title: 'Q&A 상세 | 무대예술전문인 자격시험',
    description: '무대예술전문인 시험 관련 질문과 답변을 확인하세요.',
    type: 'article',
    locale: 'ko_KR',
    siteName: '널케이 FOH',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Q&A 상세 | 무대예술전문인 자격시험',
    description: '무대예술전문인 시험 관련 질문과 답변',
  },
};

export default function QnaDetailLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

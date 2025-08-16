import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Q&A 게시판 | 무대예술전문인 자격시험 | 널케이 FOH',
  description:
    '무대예술전문인 시험과 관련된 모든 궁금증을 해결해보세요. 익명으로 자유롭게 질문하고 답변할 수 있는 공간입니다.',

  keywords:
    '무대예술전문인, 자격시험, Q&A, 질문답변, 음향, 조명, 기계, 시험문의',

  openGraph: {
    title: 'Q&A 게시판 | 무대예술전문인 자격시험',
    description:
      '무대예술전문인 시험과 관련된 모든 궁금증을 해결해보세요. 익명으로 자유롭게 질문하고 답변할 수 있는 공간입니다.',
    type: 'website',
    locale: 'ko_KR',
    siteName: '널케이 FOH',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Q&A 게시판 | 무대예술전문인 자격시험',
    description: '무대예술전문인 시험 관련 Q&A 게시판',
  },

  alternates: {
    canonical: 'https://stage-engr.nullk.us/qna',
  },
};

export default function QnaLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

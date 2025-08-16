import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: '문의 게시판 | 무대예술전문인 자격시험 | 널케이 FOH',
  description:
    '무대예술전문인 시험 관련 문의사항을 남겨주세요. 문제 오류 제보, 시험 문의, 기술 문의 등 다양한 질문에 답변드립니다.',

  keywords:
    '무대예술전문인, 자격시험, 문의, 문제오류, 시험문의, 기술문의, 일반문의',

  openGraph: {
    title: '문의 게시판 | 무대예술전문인 자격시험',
    description:
      '무대예술전문인 시험 관련 문의사항을 남겨주세요. 문제 오류 제보, 시험 문의, 기술 문의 등 다양한 질문에 답변드립니다.',
    type: 'website',
    locale: 'ko_KR',
    siteName: '널케이 FOH',
  },

  twitter: {
    card: 'summary_large_image',
    title: '문의 게시판 | 무대예술전문인 자격시험',
    description: '무대예술전문인 시험 관련 문의 게시판',
  },

  alternates: {
    canonical: 'https://stage-engr.nullk.us/ask-me',
  },
};

export default function AskMeLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

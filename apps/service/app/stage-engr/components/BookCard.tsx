'use client';

import { memo, useMemo } from 'react';
import { CountdownTimer } from './CountdownTimer';

interface Book {
  title: string;
  subject: string;
  grade: string;
  type: string;
  description: string;
  downloads: number;
  size: string;
  isPublic: boolean;
  publicDate: Date | null;
}

interface BookCardProps {
  book: Book;
}

export const BookCard = memo(function BookCard({ book }: BookCardProps) {
  // 계산된 값들을 useMemo로 메모이제이션
  const { isPublic, shouldShow } = useMemo(() => {
    const isPublic = book.isPublic;
    const isExpired = book.publicDate
      ? new Date() > new Date(book.publicDate)
      : false;
    const shouldShow = isPublic || isExpired;

    return { isPublic, shouldShow };
  }, [book.isPublic, book.publicDate]);

  // 스타일 클래스를 useMemo로 메모이제이션
  const statusBadgeClass = useMemo(() => {
    return `inline-flex w-fit items-center rounded-full px-2 py-1 font-medium text-xs ${
      isPublic
        ? 'border border-green-200 bg-green-100 text-green-800'
        : 'border border-orange-200 bg-orange-100 text-orange-800'
    }`;
  }, [isPublic]);

  const buttonClass = useMemo(() => {
    return `w-full rounded-xl px-6 py-3 font-medium shadow-lg shadow-neutral-300/50 transition-all sm:px-8 lg:ml-6 lg:w-auto ${
      shouldShow
        ? 'cursor-pointer bg-gradient-to-r from-neutral-800 to-neutral-700 text-white hover:from-neutral-700 hover:to-neutral-600'
        : 'cursor-not-allowed bg-neutral-300 text-neutral-500'
    }`;
  }, [shouldShow]);

  const contentClass = useMemo(() => {
    return `flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 ${
      shouldShow ? '' : 'blur-sm'
    }`;
  }, [shouldShow]);

  return (
    <div className="relative rounded-xl border border-neutral-200 bg-white p-4 backdrop-blur-sm sm:p-6 lg:p-8">
      {!shouldShow && (
        <>
          <div
            className="absolute inset-0 z-5 overflow-hidden rounded-xl"
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(5px)',
              WebkitBackdropFilter: 'blur(5px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
            }}
          />
          {book.publicDate && <CountdownTimer targetDate={book.publicDate} />}
        </>
      )}

      <div className={contentClass}>
        <div className="flex-1">
          <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center">
            <h3 className="font-semibold text-lg text-neutral-800 sm:text-xl">
              {book.title}
            </h3>
            <span className={statusBadgeClass}>
              {isPublic ? '공개' : '비공개'}
            </span>
          </div>
          <p className="mb-4 text-neutral-600 text-sm leading-relaxed sm:text-base">
            {book.description}
          </p>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <span className="inline-flex items-center rounded-full border border-neutral-200/50 bg-gradient-to-r from-neutral-100 to-neutral-200 px-2.5 py-1 font-medium text-neutral-700 text-xs sm:px-3 sm:py-1.5 sm:text-sm">
              {book.subject}
            </span>
            <span className="inline-flex items-center rounded-full border border-neutral-200/50 bg-gradient-to-r from-neutral-100 to-neutral-200 px-2.5 py-1 font-medium text-neutral-700 text-xs sm:px-3 sm:py-1.5 sm:text-sm">
              {book.grade}
            </span>
            <span className="inline-flex items-center rounded-full border border-neutral-200/50 bg-gradient-to-r from-neutral-100 to-neutral-200 px-2.5 py-1 font-medium text-neutral-700 text-xs sm:px-3 sm:py-1.5 sm:text-sm">
              {book.type}
            </span>
          </div>
        </div>
        <button type="button" disabled={!shouldShow} className={buttonClass}>
          {shouldShow ? '다운로드' : '비공개'}
        </button>
      </div>
    </div>
  );
});

'use client';

import { memo, useMemo } from 'react';
import type { ProblemBook } from '../../../lib/database.types';
import { CountdownTimer } from './CountdownTimer';

interface BookCardProps {
  book: ProblemBook;
  onDownloadClick: (book: ProblemBook) => void;
}

export const BookCard = memo(function BookCard({
  book,
  onDownloadClick,
}: BookCardProps) {
  // 계산된 값들을 useMemo로 메모이제이션
  const { isPublic, isScheduled, isAvailable } = useMemo(() => {
    const isPublic = book.is_public;
    const now = new Date();
    const publicDate = book.public_date ? new Date(book.public_date) : null;
    
    // 공개 예정인지 확인 (is_public이 false이고 public_date가 있는 경우)
    const isScheduled = !isPublic && publicDate !== null;
    
    // 공개 예정일이 지났는지 확인
    const isDatePassed = publicDate ? now >= publicDate : false;
    
    // 실제로 이용 가능한지 (공개이거나 공개 예정일이 지난 경우)
    const isAvailable = isPublic || isDatePassed;
    
    return { isPublic, isScheduled, isAvailable };
  }, [book.is_public, book.public_date]);

  // 배지 텍스트와 스타일을 useMemo로 메모이제이션
  const { statusText, statusBadgeClass } = useMemo(() => {
    if (isPublic) {
      return {
        statusText: '공개',
        statusBadgeClass: 'border border-green-200 bg-green-100 text-green-800',
      };
    }
    if (isScheduled) {
      return {
        statusText: '공개 예정',
        statusBadgeClass: 'border border-orange-200 bg-orange-100 text-orange-800',
      };
    }
    return {
      statusText: '비공개',
      statusBadgeClass: 'border border-gray-200 bg-gray-100 text-gray-800',
    };
  }, [isPublic, isScheduled]);

  const { buttonText, buttonClass } = useMemo(() => {
    let buttonText = '비공개';
    if (isAvailable) {
      buttonText = '다운로드';
    } else if (isScheduled) {
      buttonText = '공개 예정';
    }
    
    const buttonClass = `w-full rounded-xl px-6 py-3 font-medium shadow-lg shadow-neutral-300/50 transition-all sm:px-8 lg:ml-6 lg:w-auto ${
      isAvailable
        ? 'cursor-pointer bg-gradient-to-r from-neutral-800 to-neutral-700 text-white hover:from-neutral-700 hover:to-neutral-600'
        : 'cursor-not-allowed bg-neutral-300 text-neutral-500'
    }`;
    
    return { buttonText, buttonClass };
  }, [isAvailable, isScheduled]);

  const contentClass = useMemo(() => {
    return `flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 ${
      isScheduled && !isAvailable ? 'blur-sm' : ''
    }`;
  }, [isScheduled, isAvailable]);

  return (
    <div className="relative rounded-xl border border-neutral-200 bg-white p-4 backdrop-blur-sm sm:p-6 lg:p-8">
      {isScheduled && !isAvailable && (
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
          {book.public_date && (
            <CountdownTimer targetDate={new Date(book.public_date)} />
          )}
        </>
      )}

      <div className={contentClass}>
        <div className="flex-1">
          <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center">
            <h3 className="font-semibold text-lg text-neutral-800 sm:text-xl">
              {book.title}
            </h3>
            <span className={`inline-flex w-fit items-center rounded-full px-2 py-1 font-medium text-xs ${statusBadgeClass}`}>
              {statusText}
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
          <div className="mt-2 flex items-center gap-4 text-neutral-500 text-sm">
            <span>다운로드 {book.downloads.toLocaleString()}회</span>
            <span>{book.file_size_mb}MB</span>
          </div>
        </div>
        <button
          type="button"
          disabled={!isAvailable}
          onClick={() => isAvailable && onDownloadClick(book)}
          className={buttonClass}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
});

'use client';
'use subdomain';
import { useEffect, useState } from 'react';
import { getProblemBooks } from '../../lib/api/problem-books';
import type { ProblemBook } from '../../lib/database.types';
import { BookCard } from './components/BookCard';
import { DownloadModal } from './components/DownloadModal';

// 공개 예정 문제집을 위한 타입 (file_path가 제거됨)
type ProblemBookWithoutFilePath = Omit<ProblemBook, 'file_path'>;

// 2026년 5월 31일 시험일 설정 (컴포넌트 외부로 이동)
const EXAM_DATE = new Date('2026-05-31T00:00:00');

export default function StageEngr() {
  const [timeLeft, setTimeLeft] = useState({
    years: 0,
    months: 0,
    days: 0,
    totalDays: 0,
  });

  const [books, setBooks] = useState<
    (ProblemBook | ProblemBookWithoutFilePath)[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 다운로드 모달 상태
  const [selectedBook, setSelectedBook] = useState<
    (ProblemBook | ProblemBookWithoutFilePath) | null
  >(null);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = EXAM_DATE.getTime() - now.getTime();

      if (difference > 0) {
        const totalDays = Math.ceil(difference / (1000 * 60 * 60 * 24));

        // 년, 월, 일 계산
        const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365.25));
        const months = Math.floor(
          (difference % (1000 * 60 * 60 * 24 * 365.25)) /
            (1000 * 60 * 60 * 24 * 30.44)
        );
        const days = Math.floor(
          (difference % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24)
        );

        setTimeLeft({ years, months, days, totalDays });
      } else {
        setTimeLeft({ years: 0, months: 0, days: 0, totalDays: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000 * 60 * 60); // 1시간마다 업데이트

    return () => clearInterval(timer);
  }, []); // EXAM_DATE가 컴포넌트 외부에 있으므로 의존성 배열에서 제거

  // 문제집 데이터 로드
  useEffect(() => {
    const loadBooks = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getProblemBooks();
        setBooks(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : '문제집을 불러오는데 실패했습니다.'
        );
        // Error is already handled by setting error state
      } finally {
        setIsLoading(false);
      }
    };

    loadBooks();
  }, []);

  // 다운로드 클릭 핸들러
  const handleDownloadClick = (
    book: ProblemBook | ProblemBookWithoutFilePath
  ) => {
    setSelectedBook(book);
    setIsDownloadModalOpen(true);
  };

  // 다운로드 모달 닫기
  const handleDownloadModalClose = () => {
    setIsDownloadModalOpen(false);
    setSelectedBook(null);
  };

  // 다운로드 성공 핸들러
  const handleDownloadSuccess = (
    updatedBook: ProblemBook | ProblemBookWithoutFilePath
  ) => {
    // 업데이트된 다운로드 수를 반영
    setBooks((prevBooks) =>
      prevBooks.map((book) => (book.id === updatedBook.id ? updatedBook : book))
    );
  };

  return (
    <>
      <section
        className="mb-4 rounded-xl border border-neutral-200 p-4 sm:p-6 lg:p-8"
        style={{
          background:
            'linear-gradient(-40deg, rgb(9, 29, 84) 0%, rgb(31, 62, 112) 23.2951%, rgb(54, 100, 224) 68.1272%, rgb(121, 158, 255) 100%)',
        }}
      >
        <p className="mb-2 font-bold text-lg text-white sm:text-xl lg:text-2xl">
          무대예술전문인 자격 시험을 앞두고 있나요?
        </p>
        <p className="text-blue-100 text-sm leading-relaxed sm:text-base">
          무대예술전문인 자격을 준비하며, 타 자격 대비 문제집이 없어 문제집을
          만들었어요.
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          현업 FOH 엔지니어가 직접 엄선하여 문제를 만들었어요.
        </p>
      </section>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="mx-auto text-neutral-400 text-sm sm:text-base">
          본 문제집은 검수를 거치지만,{' '}
          <b className="block sm:inline">
            발견하지 못 한 문제 오류 발견 시 문의 게시판을 통해
          </b>{' '}
          제보 부탁드려요 😎
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="lg:col-span-3">
          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4">
              <p className="text-red-800 text-sm">{error}</p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-2 text-red-600 text-sm underline hover:text-red-800"
              >
                다시 시도
              </button>
            </div>
          )}

          {isLoading ? (
            <div className="space-y-6">
              {[...new Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse rounded-xl border border-neutral-200 bg-white p-4 sm:p-6 lg:p-8"
                >
                  <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
                    <div className="flex-1">
                      <div className="mb-3 h-6 w-3/4 rounded bg-neutral-200" />
                      <div className="mb-4 h-4 w-full rounded bg-neutral-200" />
                      <div className="flex gap-2">
                        <div className="h-6 w-16 rounded bg-neutral-200" />
                        <div className="h-6 w-12 rounded bg-neutral-200" />
                        <div className="h-6 w-20 rounded bg-neutral-200" />
                      </div>
                    </div>
                    <div className="h-12 w-32 rounded bg-neutral-200" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {books.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-lg text-neutral-500">
                    등록된 문제집이 없습니다.
                  </p>
                </div>
              ) : (
                books.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onDownloadClick={handleDownloadClick}
                  />
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Exam Schedule Section */}
      <section className="mt-8 mb-8 space-y-6 sm:mt-12 sm:mb-12 sm:space-y-8">
        <div className="text-center">
          <h2 className="mb-2 font-bold text-neutral-800 text-xl sm:text-2xl">
            2025년 무대예술전문인 자격시험 일정
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base">
            시험 일정 및 장소는 사정에 따라 변경될 수 있습니다.
          </p>
        </div>

        {/* Written Exam Table */}
        <h3 className="mb-4 font-semibold text-base text-neutral-800 sm:mb-6 sm:text-lg">
          2025년 필기시험
        </h3>
        <div className="overflow-x-auto">
          <div className="min-w-[800px] overflow-hidden rounded-xl border border-neutral-300">
            <table className="w-full table-fixed">
              <colgroup>
                <col className="w-16" />
                <col className="w-64" />
                <col className="w-24" />
                <col className="w-40" />
                <col className="w-64" />
                <col className="w-24" />
              </colgroup>
              <thead>
                <tr className="bg-gradient-to-r from-neutral-100 to-neutral-200">
                  <th className="border-neutral-300 border-r border-b p-2 text-center font-semibold text-neutral-800 text-xs sm:p-4 sm:text-sm">
                    회차
                  </th>
                  <th className="border-neutral-300 border-r border-b p-2 text-center font-semibold text-neutral-800 text-xs sm:p-4 sm:text-sm">
                    원서 접수기간
                  </th>
                  <th className="border-neutral-300 border-r border-b p-2 text-center font-semibold text-neutral-800 text-xs sm:p-4 sm:text-sm">
                    분야
                  </th>
                  <th className="border-neutral-300 border-r border-b p-2 text-center font-semibold text-neutral-800 text-xs sm:p-4 sm:text-sm">
                    시험일
                  </th>
                  <th className="border-neutral-300 border-r border-b p-2 text-center font-semibold text-neutral-800 text-xs sm:p-4 sm:text-sm">
                    시험장소
                  </th>
                  <th className="border-neutral-300 border-b p-2 text-center font-semibold text-neutral-800 text-xs sm:p-4 sm:text-sm">
                    합격발표
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td
                    className="break-keep border-neutral-300 border-r p-2 text-center font-medium text-neutral-800 text-xs sm:p-4 sm:text-sm"
                    rowSpan={3}
                  >
                    27회
                  </td>
                  <td
                    className="border-neutral-300 border-r p-2 text-center text-neutral-700 text-xs sm:p-4 sm:text-sm"
                    rowSpan={3}
                  >
                    2025년 04.28.(월) 09:00
                    <br />~<br />
                    2025년 05.02.(금) 18:00
                  </td>
                  <td className="border-neutral-300 border-r border-b p-2 sm:p-4">
                    <div className="text-center font-medium text-neutral-800 text-xs sm:text-sm">
                      무대기계
                    </div>
                  </td>
                  <td className="border-neutral-300 border-r border-b p-2 text-center font-medium text-neutral-700 text-xs sm:p-4 sm:text-sm">
                    6.1.(일) 10:00
                  </td>
                  <td
                    className="border-neutral-300 border-r p-2 text-center text-neutral-700 text-xs sm:p-4 sm:text-sm"
                    rowSpan={3}
                  >
                    서울공업고등학교
                    <br />
                    서울성남중고등학교
                    <br />
                    <span className="text-neutral-500 text-xs">
                      (수험표 확인)
                    </span>
                  </td>
                  <td
                    className="p-2 text-center font-medium text-neutral-700 text-xs sm:p-4 sm:text-sm"
                    rowSpan={3}
                  >
                    6.20.(금)
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border-neutral-300 border-r border-b p-2 sm:p-4">
                    <div className="text-center font-medium text-neutral-800 text-xs sm:text-sm">
                      무대조명
                    </div>
                  </td>
                  <td className="border-neutral-300 border-r border-b p-2 text-center font-medium text-neutral-700 text-xs sm:p-4 sm:text-sm">
                    6.1.(일) 10:00
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border-neutral-300 border-r p-2 sm:p-4">
                    <div className="text-center font-medium text-neutral-800 text-xs sm:text-sm">
                      무대음향
                    </div>
                  </td>
                  <td className="border-neutral-300 border-r p-2 text-center font-medium text-neutral-700 text-xs sm:p-4 sm:text-sm">
                    6.1.(일) 10:00
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Practical Exam Table */}
        <h3 className="mb-4 font-semibold text-base text-neutral-800 sm:mb-6 sm:text-lg">
          2025년 실기시험
        </h3>
        <div className="overflow-x-auto">
          <div className="min-w-[800px] overflow-hidden rounded-xl border border-neutral-300">
            <table className="w-full table-fixed">
              <colgroup>
                <col className="w-16" />
                <col className="w-64" />
                <col className="w-24" />
                <col className="w-40" />
                <col className="w-64" />
                <col className="w-24" />
              </colgroup>
              <thead>
                <tr className="bg-gradient-to-r from-neutral-100 to-neutral-200">
                  <th className="border-neutral-300 border-r border-b p-2 text-center font-semibold text-neutral-800 text-xs sm:p-4 sm:text-sm">
                    회차
                  </th>
                  <th className="border-neutral-300 border-r border-b p-2 text-center font-semibold text-neutral-800 text-xs sm:p-4 sm:text-sm">
                    원서 접수기간
                  </th>
                  <th className="border-neutral-300 border-r border-b p-2 text-center font-semibold text-neutral-800 text-xs sm:p-4 sm:text-sm">
                    분야
                  </th>
                  <th className="border-neutral-300 border-r border-b p-2 text-center font-semibold text-neutral-800 text-xs sm:p-4 sm:text-sm">
                    시험일
                  </th>
                  <th className="border-neutral-300 border-r border-b p-2 text-center font-semibold text-neutral-800 text-xs sm:p-4 sm:text-sm">
                    시험장소
                  </th>
                  <th className="border-neutral-300 border-b p-2 text-center font-semibold text-neutral-800 text-xs sm:p-4 sm:text-sm">
                    합격발표
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td
                    className="break-keep border-neutral-300 border-r p-2 text-center font-medium text-neutral-800 text-xs sm:p-4 sm:text-sm"
                    rowSpan={3}
                  >
                    27회
                  </td>
                  <td
                    className="border-neutral-300 border-r p-2 text-center text-neutral-700 text-xs sm:p-4 sm:text-sm"
                    rowSpan={3}
                  >
                    2025년 06.23.(월) 09:00
                    <br />~<br />
                    2025년 06.27.(금) 18:00
                  </td>
                  <td className="border-neutral-300 border-r border-b p-2 sm:p-4">
                    <div className="text-center font-medium text-neutral-800 text-xs sm:text-sm">
                      무대조명
                    </div>
                  </td>
                  <td className="border-neutral-300 border-r border-b p-2 text-neutral-700 sm:p-4">
                    <div className="space-y-1 sm:space-y-2">
                      <div className="text-center font-medium text-neutral-700 text-xs sm:text-sm">
                        3급: 7.29 (화)
                      </div>
                      <div className="text-center font-medium text-neutral-700 text-xs sm:text-sm">
                        2급: 7.30 (수)
                      </div>
                      <div className="text-center font-medium text-neutral-700 text-xs sm:text-sm">
                        1급: 7.31 (목)
                      </div>
                    </div>
                  </td>
                  <td
                    className="border-neutral-300 border-r p-2 text-center text-neutral-700 text-xs sm:p-4 sm:text-sm"
                    rowSpan={3}
                  >
                    국립극장 달오름극장
                  </td>
                  <td
                    className="p-2 text-center font-medium text-neutral-700 text-xs sm:p-4 sm:text-sm"
                    rowSpan={3}
                  >
                    8.27.(수)
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border-neutral-300 border-r border-b p-2 sm:p-4">
                    <div className="text-center font-medium text-neutral-800 text-xs sm:text-sm">
                      무대기계
                    </div>
                  </td>
                  <td className="border-neutral-300 border-r border-b p-2 text-neutral-700 sm:p-4">
                    <div className="space-y-1 sm:space-y-2">
                      <div className="text-center font-medium text-neutral-700 text-xs sm:text-sm">
                        3급: 8.5 (화)
                      </div>
                      <div className="text-center font-medium text-neutral-700 text-xs sm:text-sm">
                        2급: 8.6 (수)
                      </div>
                      <div className="text-center font-medium text-neutral-700 text-xs sm:text-sm">
                        1급: 8.7 (목)
                      </div>
                    </div>
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border-neutral-300 border-r p-2 sm:p-4">
                    <div className="text-center font-medium text-neutral-800 text-xs sm:text-sm">
                      무대음향
                    </div>
                  </td>
                  <td className="border-neutral-300 border-r p-2 text-neutral-700 sm:p-4">
                    <div className="space-y-1 sm:space-y-2">
                      <div className="text-center font-medium text-neutral-700 text-xs sm:text-sm">
                        3급: 8.12 (화)
                      </div>
                      <div className="text-center font-medium text-neutral-700 text-xs sm:text-sm">
                        2급: 8.13 (수)
                      </div>
                      <div className="text-center font-medium text-neutral-700 text-xs sm:text-sm">
                        1급: 8.14 (목)
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section
        className="mb-4 rounded-xl border border-neutral-200 p-4 sm:p-6 lg:p-8"
        style={{
          background:
            'linear-gradient(-40deg, rgb(9, 29, 84) 0%, rgb(31, 62, 112) 23.2951%, rgb(54, 100, 224) 68.1272%, rgb(121, 158, 255) 100%)',
        }}
      >
        <p className="mb-2 font-bold text-lg text-white sm:text-xl lg:text-2xl">
          2026년 시험까지{' '}
          {timeLeft.totalDays === 0
            ? '계산 중...'
            : `${timeLeft.years > 0 ? `${timeLeft.years}년 ` : ''}${timeLeft.months > 0 ? `${timeLeft.months}개월 ` : ''}${timeLeft.days}일`}{' '}
          남았어요.
        </p>
        <p className="text-blue-100 text-sm leading-relaxed sm:text-base">
          2026년 무대예술전문인 자격 시험에서 자격을 얻지 못 하면,
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          오늘 날짜 기준으로{' '}
          <b>
            {timeLeft.totalDays === 0
              ? '계산 중...'
              : `${(timeLeft.totalDays * 2).toLocaleString()}일`}
          </b>
          을 기다려야 해요.
        </p>
      </section>

      {/* 다운로드 모달 */}
      <DownloadModal
        isOpen={isDownloadModalOpen}
        onClose={handleDownloadModalClose}
        book={selectedBook}
        onDownloadSuccess={handleDownloadSuccess}
      />
    </>
  );
}

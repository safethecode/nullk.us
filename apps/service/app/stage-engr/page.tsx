'use client';

import { Button } from '@heiglabs/design-system/button';
import Image from 'next/image';
import { useEffect, useState } from 'react';

// 타이머 컴포넌트
function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // 시험 정보 (실제 시험 날짜와 재시험 대기 기간)
  const examInfo = {
    examDate: new Date('2026-03-15'), // 2026년 3월 15일 시험
    retakeWaitDays: 90, // 재시험 대기 기간 90일
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      const target = new Date(targetDate).getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center">
      <div className="rounded-2xl p-4 sm:p-6">
        <div className="text-center">
          <h4 className="mb-3 font-semibold text-neutral-800 text-sm sm:text-base">
            공개 예정
          </h4>
          <div className="mb-4 flex flex-wrap justify-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1">
              <div className="font-bold text-lg text-neutral-800 sm:text-2xl">
                {timeLeft.days}
              </div>
              <div className="text-neutral-600 text-xs">일</div>
            </div>
            <div className="flex items-center gap-1">
              <div className="font-bold text-lg text-neutral-800 sm:text-2xl">
                {timeLeft.hours}
              </div>
              <div className="text-neutral-600 text-xs">시간</div>
            </div>
            <div className="flex items-center gap-1">
              <div className="font-bold text-lg text-neutral-800 sm:text-2xl">
                {timeLeft.minutes}
              </div>
              <div className="text-neutral-600 text-xs">분</div>
            </div>
            <div className="flex items-center gap-1">
              <div className="font-bold text-lg text-neutral-800 sm:text-2xl">
                {timeLeft.seconds}
              </div>
              <div className="text-neutral-600 text-xs">초</div>
            </div>
          </div>
          <div className="px-2 text-neutral-600 text-xs leading-relaxed sm:text-sm">
            <p className="mb-1">
              2026년 {examInfo.examDate.getMonth() + 1}월{' '}
              {examInfo.examDate.getDate()}일에
            </p>
            <p>
              통과하지 못 하면{' '}
              <span className="font-semibold text-orange-600">
                {examInfo.retakeWaitDays}일
              </span>
              을 기다려야 해요
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// 카드 컴포넌트
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function BookCard({ book }: { book: any }) {
  const isPublic = book.isPublic;
  const isExpired = book.publicDate
    ? new Date() > new Date(book.publicDate)
    : false;
  const shouldShow = isPublic || isExpired;

  return (
    <div className="relative rounded-xl border border-neutral-200 bg-white p-4 backdrop-blur-sm sm:p-6 lg:p-8">
      {!shouldShow && (
        <>
          {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
          <div
            className="absolute inset-0 z-5 overflow-hidden rounded-xl"
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(5px)',
              WebkitBackdropFilter: 'blur(5px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
            }}
          ></div>
          <CountdownTimer targetDate={new Date(book.publicDate)} />
        </>
      )}

      <div
        className={`flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 ${shouldShow ? '' : 'blur-sm'}`}
      >
        <div className="flex-1">
          <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center">
            <h3 className="font-semibold text-lg text-neutral-800 sm:text-xl">
              {book.title}
            </h3>
            <span
              className={`inline-flex w-fit items-center rounded-full px-2 py-1 font-medium text-xs ${
                isPublic
                  ? 'border border-green-200 bg-green-100 text-green-800'
                  : 'border border-orange-200 bg-orange-100 text-orange-800'
              }`}
            >
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
        <button
          type="button"
          disabled={!shouldShow}
          className={`w-full rounded-xl px-6 py-3 font-medium shadow-lg shadow-neutral-300/50 transition-all sm:px-8 lg:ml-6 lg:w-auto ${
            shouldShow
              ? 'cursor-pointer bg-gradient-to-r from-neutral-800 to-neutral-700 text-white hover:from-neutral-700 hover:to-neutral-600'
              : 'cursor-not-allowed bg-neutral-300 text-neutral-500'
          }`}
        >
          {shouldShow ? '다운로드' : '비공개'}
        </button>
      </div>
    </div>
  );
}

export default function StageEngr() {
  const books = [
    {
      title: '무대음향 3급 기출문제집',
      subject: '무대음향',
      grade: '3급',
      type: '기출문제',
      description: '무대음향 3급 자격시험 기출문제 모음집',
      downloads: 1250,
      size: '2.3MB',
      isPublic: true,
      publicDate: null,
    },
    {
      title: '무대조명 3급 실기문제집',
      subject: '무대조명',
      grade: '3급',
      type: '실기문제',
      description: '무대조명 3급 실기 시험 대비 문제집',
      downloads: 890,
      size: '1.8MB',
      isPublic: false,
      publicDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2일 후
    },
    {
      title: '무대음향 2급 이론문제집',
      subject: '무대음향',
      grade: '2급',
      type: '이론문제',
      description: '무대음향 2급 이론 시험 대비 문제집',
      downloads: 756,
      size: '3.1MB',
      isPublic: true,
      publicDate: null,
    },
    {
      title: '무대조명 2급 기출문제집',
      subject: '무대조명',
      grade: '2급',
      type: '기출문제',
      description: '무대조명 2급 자격시험 기출문제 모음집',
      downloads: 634,
      size: '2.7MB',
      isPublic: false,
      publicDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7일 후
    },
    {
      title: '무대음향 1급 종합문제집',
      subject: '무대음향',
      grade: '1급',
      type: '종합문제',
      description: '무대음향 1급 이론+실기 종합 문제집',
      downloads: 445,
      size: '4.2MB',
      isPublic: false,
      publicDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1일 후
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6 sm:py-6">
        <header className="mb-4 flex flex-col gap-2 sm:mb-6 sm:flex-row sm:items-center sm:gap-3">
          <Image
            src="/nullk-logo.svg"
            alt="널케이 | 무대예술전문인 자격 시험 문제집 | 음향 엔지니어"
            width={90}
            height={20}
            className="sm:h-[24px] sm:w-[110px]"
          />
          <span className="inline-flex w-fit items-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-2.5 py-0.5 font-medium text-white text-xs">
            음향
          </span>
        </header>
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
          <p className="text-neutral-400 text-sm sm:text-base">
            본 문제집 내 문제는 검수를 거치지만,{' '}
            <b className="block sm:inline">
              발견하지 못 한 문제 오류 발견 시 오른쪽 메일로
            </b>{' '}
            제보 부탁드려요 👉
          </p>
          <Button
            variant="outline"
            size="sm"
            className="w-full cursor-pointer bg-white sm:w-auto"
          >
            문제 오류 제보
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {/* Problem Book Items */}
              {books.map((book, index) => (
                <BookCard key={index} book={book} />
              ))}
            </div>
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
            2026년 시험까지 OOO0년 00월 00일 남았어요.
          </p>
          <p className="text-blue-100 text-sm leading-relaxed sm:text-base">
            2026년 무대예술전문인 자격 시험에서 자격을 얻지 못 하면,
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            오늘 날짜 기준으로 <b>000일</b>을 기다려야 해요.
          </p>
        </section>
      </div>

      {/* Footer */}
      <footer className="mt-6 border-neutral-200 border-t bg-white/50 backdrop-blur-sm sm:mt-8">
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

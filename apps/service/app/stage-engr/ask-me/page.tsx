'use client';

import { Button } from '@heiglabs/design-system/button';
import { Input } from '@heiglabs/design-system/input';
import Link from 'next/link';
import type React from 'react';
import { useMemo, useState } from 'react';

interface InquiryPost {
  id: number;
  title: string;
  content: string;
  author: string;
  category: string;
  date: string;
  views: number;
  isAnswered: boolean;
  answer?: {
    content: string;
    date: string;
  };
}

export default function AskMe() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [sortBy, setSortBy] = useState('latest');
  const [currentPage, setCurrentPage] = useState(1);

  // 더 많은 예시 문의 데이터
  const allInquiries: InquiryPost[] = [
    {
      id: 15,
      title: '무대음향 3급 문제집 오류 발견',
      content: '7번 문제에서 답이 잘못된 것 같습니다. 확인 부탁드립니다.',
      author: '김**',
      category: '문제오류',
      date: '2025-01-20',
      views: 42,
      isAnswered: true,
      answer: {
        content:
          '확인해보니 문제가 있었습니다. 다음 업데이트에서 수정하겠습니다. 감사합니다!',
        date: '2025-01-21',
      },
    },
    {
      id: 14,
      title: '무대조명 2급 시험 범위 문의',
      content:
        '무대조명 2급 시험에서 LED 조명 관련 내용이 어느 정도 비중을 차지하나요?',
      author: '이**',
      category: '시험문의',
      date: '2025-01-19',
      views: 67,
      isAnswered: false,
    },
    {
      id: 13,
      title: '문제집 다운로드가 안 됩니다',
      content:
        '무대음향 1급 문제집을 다운로드하려고 하는데 계속 오류가 발생합니다.',
      author: '박**',
      category: '기술문의',
      date: '2025-01-18',
      views: 23,
      isAnswered: true,
      answer: {
        content:
          '서버 점검으로 인한 일시적인 문제였습니다. 현재는 정상적으로 다운로드 가능합니다.',
        date: '2025-01-18',
      },
    },
    {
      id: 12,
      title: '무대기계 3급 실기 시험 준비 방법',
      content: '무대기계 3급 실기 시험은 어떻게 준비해야 하나요?',
      author: '최**',
      category: '시험문의',
      date: '2025-01-17',
      views: 156,
      isAnswered: true,
      answer: {
        content:
          '실기 시험은 주로 현장 경험이 중요합니다. 기본 장비 조작법을 숙지하시기 바랍니다.',
        date: '2025-01-17',
      },
    },
    {
      id: 11,
      title: '문제집 PDF 인쇄가 안 됩니다',
      content: 'PDF 파일을 다운로드 받았는데 인쇄가 제한되어 있나요?',
      author: '정**',
      category: '기술문의',
      date: '2025-01-16',
      views: 89,
      isAnswered: true,
      answer: {
        content:
          '저작권 보호를 위해 인쇄가 제한되어 있습니다. 화면으로 학습해주세요.',
        date: '2025-01-16',
      },
    },
    {
      id: 10,
      title: '무대음향 1급 합격 후기',
      content: '무대음향 1급에 합격했습니다. 후기를 남깁니다.',
      author: '윤**',
      category: '일반문의',
      date: '2025-01-15',
      views: 234,
      isAnswered: true,
      answer: {
        content: '축하드립니다! 좋은 정보 공유 감사합니다.',
        date: '2025-01-15',
      },
    },
    {
      id: 9,
      title: '2025년 시험 일정 변경 가능성',
      content: '코로나로 인해 시험 일정이 변경될 가능성이 있나요?',
      author: '강**',
      category: '시험문의',
      date: '2025-01-14',
      views: 178,
      isAnswered: false,
    },
    {
      id: 8,
      title: '무대조명 2급 문제집 언제 나오나요?',
      content: '무대조명 2급 문제집 출시 예정일을 알고 싶습니다.',
      author: '한**',
      category: '일반문의',
      date: '2025-01-13',
      views: 92,
      isAnswered: true,
      answer: {
        content: '2월 중 출시 예정입니다. 조금만 기다려주세요.',
        date: '2025-01-13',
      },
    },
    {
      id: 7,
      title: '문제집 환불 문의',
      content: '잘못 구매한 문제집 환불이 가능한가요?',
      author: '송**',
      category: '기술문의',
      date: '2025-01-12',
      views: 45,
      isAnswered: true,
      answer: {
        content: '구매 후 7일 이내 환불 가능합니다. 고객센터로 연락주세요.',
        date: '2025-01-12',
      },
    },
    {
      id: 6,
      title: '무대음향 3급 필기 시험 난이도',
      content: '올해 무대음향 3급 필기 시험 난이도는 어떤가요?',
      author: '배**',
      category: '시험문의',
      date: '2025-01-11',
      views: 145,
      isAnswered: false,
    },
    {
      id: 5,
      title: '문제집 업데이트 내역',
      content: '문제집이 업데이트되었다고 하는데 어떤 부분이 수정되었나요?',
      author: '오**',
      category: '일반문의',
      date: '2025-01-10',
      views: 76,
      isAnswered: true,
      answer: {
        content: '3급 문제집 7번, 15번 문제 오류를 수정했습니다.',
        date: '2025-01-10',
      },
    },
    {
      id: 4,
      title: '모바일에서 문제집 보기 불편해요',
      content: '스마트폰으로 문제집을 보면 글씨가 너무 작아요.',
      author: '임**',
      category: '기술문의',
      date: '2025-01-09',
      views: 58,
      isAnswered: false,
    },
    {
      id: 3,
      title: '무대조명 1급 실기 준비 팁',
      content: '무대조명 1급 실기는 어떻게 준비하는 게 좋을까요?',
      author: '신**',
      category: '시험문의',
      date: '2025-01-08',
      views: 201,
      isAnswered: true,
      answer: {
        content: '실제 현장 경험과 장비 매뉴얼 숙지가 중요합니다.',
        date: '2025-01-08',
      },
    },
    {
      id: 2,
      title: '문제집 다운로드 링크 만료',
      content: '문제집 다운로드 링크가 만료되었다고 나와요.',
      author: '양**',
      category: '기술문의',
      date: '2025-01-07',
      views: 34,
      isAnswered: true,
      answer: {
        content: '새로운 다운로드 링크를 이메일로 발송해드렸습니다.',
        date: '2025-01-07',
      },
    },
    {
      id: 1,
      title: '무대기계 2급 문제집 오타 발견',
      content: '무대기계 2급 문제집 25페이지에 오타가 있습니다.',
      author: '류**',
      category: '문제오류',
      date: '2025-01-06',
      views: 67,
      isAnswered: false,
    },
  ];

  const categories = ['일반문의', '문제오류', '시험문의', '기술문의', '기타'];
  const ITEMS_PER_PAGE = 10;

  // 필터링 및 정렬된 데이터
  const filteredAndSortedInquiries = useMemo(() => {
    let filtered = allInquiries;

    // 검색 필터
    if (searchTerm) {
      filtered = filtered.filter(
        (inquiry) =>
          inquiry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          inquiry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          inquiry.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 카테고리 필터
    if (selectedCategory !== '전체') {
      filtered = filtered.filter(
        (inquiry) => inquiry.category === selectedCategory
      );
    }

    // 정렬
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'latest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'views':
          return b.views - a.views;
        case 'answered':
          return Number(b.isAnswered) - Number(a.isAnswered);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

  // 페이지네이션
  const totalPages = Math.ceil(
    filteredAndSortedInquiries.length / ITEMS_PER_PAGE
  );
  const paginatedInquiries = filteredAndSortedInquiries.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const pages: React.ReactElement[] = [];
    const maxVisiblePages = 5;
    const startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisiblePages / 2)
    );
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // 이전 페이지
    if (currentPage > 1) {
      pages.push(
        <button
          key="prev"
          type="button"
          onClick={() => handlePageChange(currentPage - 1)}
          className="rounded border border-neutral-300 bg-white px-3 py-1 text-sm hover:bg-neutral-50"
        >
          이전
        </button>
      );
    }

    // 페이지 번호들
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          type="button"
          onClick={() => handlePageChange(i)}
          className={`rounded border px-3 py-1 text-sm ${
            currentPage === i
              ? 'border-neutral-800 bg-neutral-800 text-white'
              : 'border-neutral-300 bg-white hover:bg-neutral-50'
          }`}
        >
          {i}
        </button>
      );
    }

    // 다음 페이지
    if (currentPage < totalPages) {
      pages.push(
        <button
          key="next"
          type="button"
          onClick={() => handlePageChange(currentPage + 1)}
          className="rounded border border-neutral-300 bg-white px-3 py-1 text-sm hover:bg-neutral-50"
        >
          다음
        </button>
      );
    }

    return pages;
  };

  return (
    <>
      {/* Header Section */}
      <section
        className="mb-6 rounded-xl border border-neutral-200 p-4 sm:p-6 lg:p-8"
        style={{
          background:
            'linear-gradient(-40deg, rgb(9, 29, 84) 0%, rgb(31, 62, 112) 23.2951%, rgb(54, 100, 224) 68.1272%, rgb(121, 158, 255) 100%)',
        }}
      >
        <h1 className="mb-2 font-bold text-lg text-white sm:text-xl lg:text-2xl">
          문의하기
        </h1>
        <p className="text-blue-100 text-sm leading-relaxed sm:text-base">
          무대예술전문인 자격시험 관련 문의사항을 남겨주세요.
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          문제집 오류, 시험 정보, 기술적 문제 등 언제든 문의해주시면 빠르게
          답변드리겠습니다.
        </p>
      </section>

      {/* Search and Filter */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-semibold text-lg text-neutral-800">
            문의 게시판
            <span className="ml-2 text-neutral-500 text-sm">
              (총 {filteredAndSortedInquiries.length}건)
            </span>
          </h2>
          <Link href="/ask-me/write">
            <Button className="bg-neutral-800 text-white hover:bg-neutral-700 sm:w-auto">
              문의 작성하기
            </Button>
          </Link>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="제목, 내용, 작성자로 검색..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full border-neutral-300 bg-white focus:border-neutral-400"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="flex h-9 rounded-md border border-neutral-300 bg-white px-3 py-1 text-sm shadow-xs transition-colors focus-visible:border-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/20"
            >
              <option value="전체">전체 카테고리</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="flex h-9 rounded-md border border-neutral-300 bg-white px-3 py-1 text-sm shadow-xs transition-colors focus-visible:border-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/20"
            >
              <option value="latest">최신순</option>
              <option value="oldest">오래된순</option>
              <option value="views">조회수순</option>
              <option value="answered">답변완료순</option>
            </select>
          </div>
        </div>
      </div>

      {/* Board Table */}
      <div className="overflow-x-auto">
        <div className="min-w-[800px] rounded-lg border border-neutral-200 bg-white">
          <table className="w-full">
            <thead>
              <tr className="border-neutral-200 border-b bg-neutral-50">
                <th className="w-16 px-4 py-3 text-left font-medium text-neutral-700 text-sm">
                  번호
                </th>
                <th className="px-4 py-3 text-left font-medium text-neutral-700 text-sm">
                  제목
                </th>
                <th className="w-20 px-4 py-3 text-left font-medium text-neutral-700 text-sm">
                  작성자
                </th>
                <th className="w-20 px-4 py-3 text-left font-medium text-neutral-700 text-sm">
                  조회수
                </th>
                <th className="w-28 px-4 py-3 text-left font-medium text-neutral-700 text-sm">
                  작성일
                </th>
                <th className="w-20 px-4 py-3 text-left font-medium text-neutral-700 text-sm">
                  상태
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedInquiries.length > 0 ? (
                paginatedInquiries.map((inquiry, index) => (
                  <tr
                    key={inquiry.id}
                    className="border-neutral-100 border-b transition-colors hover:bg-neutral-50"
                  >
                    <td className="px-4 py-3 text-neutral-600 text-sm">
                      {filteredAndSortedInquiries.length -
                        (currentPage - 1) * ITEMS_PER_PAGE -
                        index}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/ask-me/${inquiry.id}`}
                        className="text-neutral-800 hover:text-neutral-600 hover:underline"
                      >
                        {inquiry.title}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-neutral-600 text-sm">
                      {inquiry.author}
                    </td>
                    <td className="px-4 py-3 text-neutral-600 text-sm">
                      {inquiry.views}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-neutral-600 text-sm">
                      {inquiry.date}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex w-fit items-center rounded-full px-2 py-0.5 font-medium text-xs ${
                          inquiry.isAnswered
                            ? 'border border-neutral-400 bg-neutral-800 text-white'
                            : 'border border-neutral-300 bg-neutral-200 text-neutral-600'
                        }`}
                      >
                        {inquiry.isAnswered ? '완료' : '대기'}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-8 text-center text-neutral-500"
                  >
                    검색 결과가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center gap-1">
          {renderPagination()}
        </div>
      )}

      {/* Notice Section */}
      <section className="mt-8 rounded-xl border border-neutral-200 bg-neutral-50 p-4 sm:p-6">
        <h3 className="mb-2 font-semibold text-neutral-800">📌 문의 안내</h3>
        <ul className="space-y-1 text-neutral-600 text-sm">
          <li>• 문의 답변은 보통 1-2일 내에 처리됩니다.</li>
          <li>
            • 문제집 오류 신고 시 구체적인 문제 번호와 내용을 명시해주세요.
          </li>
          <li>• 긴급한 문의사항은 이메일로 직접 연락 부탁드립니다.</li>
          <li>• 개인정보가 포함된 내용은 문의하지 말아주세요.</li>
        </ul>
      </section>
    </>
  );
}

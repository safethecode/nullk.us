'use client';

import { Button } from '@heiglabs/design-system/button';
import { Input } from '@heiglabs/design-system/input';
import Link from 'next/link';
import type React from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getInquiries } from '../../../lib/api/inquiries';
import type {
  CategoryType,
  Inquiry,
  SortType,
} from '../../../lib/database.types';

export default function AskMe() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<
    CategoryType | '전체'
  >('전체');
  const [sortBy, setSortBy] = useState<SortType>('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const categories: (CategoryType | '전체')[] = [
    '전체',
    '일반문의',
    '문제오류',
    '시험문의',
    '기술문의',
    '기타',
  ];
  const ITEMS_PER_PAGE = 10;
  const SEARCH_DEBOUNCE_MS = 500;

  // 검색어 debounce 처리
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchTerm]);

  // 검색/필터 변경 시 첫 페이지로 이동
  // biome-ignore lint/correctness/useExhaustiveDependencies: currentPage는 무한 루프를 방지하기 위해 의도적으로 제외
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, selectedCategory, sortBy]);

  // API 요청 함수
  const loadInquiries = useCallback(async () => {
    try {
      // 이전 요청 취소
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // 새로운 AbortController 생성
      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      setLoading(true);
      setError(null);

      const result = await getInquiries({
        searchTerm: debouncedSearchTerm,
        category: selectedCategory,
        sortBy,
        page: currentPage,
        itemsPerPage: ITEMS_PER_PAGE,
      });

      // 요청이 취소되지 않았을 때만 상태 업데이트
      if (!abortController.signal.aborted) {
        setInquiries(result.data);
        setTotalCount(result.total);
        setTotalPages(result.totalPages);
      }
    } catch (error) {
      // AbortError가 아닐 때만 에러 처리
      if (error instanceof Error && error.name !== 'AbortError') {
        setError('문의 목록을 불러오는데 실패했습니다.');
      }
    } finally {
      if (
        abortControllerRef.current &&
        !abortControllerRef.current.signal.aborted
      ) {
        setLoading(false);
      }
    }
  }, [debouncedSearchTerm, selectedCategory, sortBy, currentPage]);

  // 초기 로딩 및 검색/필터 변경 시 데이터 재로딩
  useEffect(() => {
    loadInquiries();

    // 컴포넌트 언마운트 시 요청 취소
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [loadInquiries]);

  // 현재 표시할 데이터 결정
  const currentInquiries = useMemo(() => {
    if (loading || error) {
      return [];
    }
    return inquiries;
  }, [inquiries, loading, error]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const renderPagination = useMemo(() => {
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
  }, [currentPage, totalPages, handlePageChange]);

  return (
    <>
      {/* Header Section */}
      <section
        className="mb-6 rounded-xl border border-neutral-200 p-4 sm:p-6 lg:p-8"
        style={{
          background:
            'linear-gradient(-40deg, rgb(59, 7, 100) 0%, rgb(76, 29, 149) 23.2951%, rgb(124, 58, 237) 68.1272%, rgb(168, 85, 247) 100%)',
        }}
      >
        <h1 className="mb-2 font-bold text-lg text-white sm:text-xl lg:text-2xl">
          문의하기
        </h1>
        <p className="text-purple-100 text-sm leading-relaxed sm:text-base">
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
              (총 {totalCount}건)
            </span>
          </h2>
          <Link href="ask-me/write">
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
              }}
              className="w-full border-neutral-300 bg-white focus:border-neutral-400"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value as CategoryType | '전체');
              }}
              className="flex h-9 rounded-md border border-neutral-300 bg-white px-3 py-1 text-sm shadow-xs transition-colors focus-visible:border-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/20"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === '전체' ? '전체 카테고리' : cat}
                </option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortType)}
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

      {/* Error Message */}
      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-red-600 text-sm">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            className="mt-2 border-red-300 text-red-600 hover:bg-red-100"
          >
            다시 시도
          </Button>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="mb-6 rounded-lg border border-neutral-200 bg-white p-8">
          <div className="flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-neutral-800 border-b-2" />
            <span className="ml-3 text-neutral-600">
              문의 목록을 불러오는 중...
            </span>
          </div>
        </div>
      )}

      {/* Board Table */}
      {!loading && !error && (
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
                {currentInquiries.length > 0 ? (
                  currentInquiries.map((inquiry, index) => (
                    <tr
                      key={inquiry.id}
                      className="border-neutral-100 border-b transition-colors hover:bg-neutral-50"
                    >
                      <td className="px-4 py-3 text-neutral-600 text-sm">
                        {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          href={`ask-me/${inquiry.id}`}
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
                        {new Date(inquiry.created_at).toLocaleDateString(
                          'ko-KR'
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex w-fit items-center rounded-full px-2 py-0.5 font-medium text-xs ${
                            inquiry.is_answered
                              ? 'border border-neutral-400 bg-neutral-800 text-white'
                              : 'border border-neutral-300 bg-neutral-200 text-neutral-600'
                          }`}
                        >
                          {inquiry.is_answered ? '완료' : '대기'}
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
                      {searchTerm || selectedCategory !== '전체'
                        ? '검색 결과가 없습니다.'
                        : '등록된 문의가 없습니다.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination */}
      {!loading && !error && totalPages > 1 && (
        <div className="mt-6 flex justify-center gap-1">{renderPagination}</div>
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

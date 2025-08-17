'use client';

import {
  QNA_CATEGORIES,
  QNA_SORT_OPTIONS,
  createQnaPost,
  getQnaPosts,
} from '@/lib/api/qna';

// 헬퍼 함수: 3일이 지났는지 확인
const isThreeDaysPassed = (createdAt: string): boolean => {
  const questionDate = new Date(createdAt);
  const threeDaysLater = new Date(
    questionDate.getTime() + 3 * 24 * 60 * 60 * 1000
  );
  return new Date() >= threeDaysLater;
};

import type {
  QnaCategoryType,
  QnaPostInsert,
  QnaPostWithPreview,
  QnaSortType,
} from '@/lib/database.types';
import { Button } from '@heiglabs/design-system/button';
import { Input } from '@heiglabs/design-system/input';
import { Textarea } from '@heiglabs/design-system/textarea';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import type { ReactElement } from 'react';
import { type FormEvent, useCallback, useState } from 'react';

interface WriteFormData {
  title: string;
  content: string;
  author: string;
  category: QnaCategoryType;
}

const ITEMS_PER_PAGE = 10;

export default function QnaPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<
    QnaCategoryType | '전체'
  >('전체');
  const [sortBy, setSortBy] = useState<QnaSortType>('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const [showWriteForm, setShowWriteForm] = useState(false);
  const [writeFormData, setWriteFormData] = useState<WriteFormData>({
    title: '',
    content: '',
    author: '',
    category: '일반질문',
  });

  const queryClient = useQueryClient();

  // QnA 게시글 목록 조회
  const {
    data: qnaData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: [
      'qnaPosts',
      {
        page: currentPage,
        search: searchTerm,
        category: selectedCategory,
        sortBy,
      },
    ],
    queryFn: () =>
      getQnaPosts({
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        search: searchTerm,
        category: selectedCategory,
        sortBy,
      }),
    staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
    gcTime: 1000 * 60 * 10, // 10분간 가비지 컬렉션 방지
  });

  // QnA 게시글 작성 뮤테이션
  const createPostMutation = useMutation({
    mutationFn: createQnaPost,
    onSuccess: () => {
      // 작성 완료 후 목록 새로고침
      queryClient.invalidateQueries({ queryKey: ['qnaPosts'] });
      setShowWriteForm(false);
      setWriteFormData({
        title: '',
        content: '',
        author: '',
        category: '일반질문',
      });
    },
    onError: (error) => {
      alert(`게시글 작성 실패: ${error.message}`);
    },
  });

  // 검색어나 필터 변경 시 첫 페이지로 이동
  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  }, []);

  const handleCategoryChange = useCallback(
    (category: QnaCategoryType | '전체') => {
      setSelectedCategory(category);
      setCurrentPage(1);
    },
    []
  );

  const handleSortChange = useCallback((sort: QnaSortType) => {
    setSortBy(sort);
    setCurrentPage(1);
  }, []);

  // 페이지네이션
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // 글쓰기 폼 제출
  const handleWriteSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      if (
        !writeFormData.title.trim() ||
        !writeFormData.content.trim() ||
        !writeFormData.author.trim()
      ) {
        alert('모든 필수 항목을 입력해주세요.');
        return;
      }

      const postData: QnaPostInsert = {
        title: writeFormData.title.trim(),
        content: writeFormData.content.trim(),
        author: writeFormData.author.trim(),
        category: writeFormData.category,
      };

      createPostMutation.mutate(postData);
    },
    [writeFormData, createPostMutation]
  );

  // 페이지네이션 렌더링
  const renderPagination = () => {
    if (!qnaData?.totalPages || qnaData.totalPages <= 1) {
      return null;
    }

    const pages: ReactElement[] = [];
    const maxVisiblePages = 5;
    const startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisiblePages / 2)
    );
    const endPage = Math.min(
      qnaData.totalPages,
      startPage + maxVisiblePages - 1
    );

    // 이전 페이지
    if (currentPage > 1) {
      pages.push(
        <button
          key="prev"
          type="button"
          onClick={() => handlePageChange(currentPage - 1)}
          className="rounded border border-neutral-300 bg-white px-3 py-1 text-sm transition-colors hover:bg-neutral-50"
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
          className={`rounded border px-3 py-1 text-sm transition-colors ${
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
    if (currentPage < qnaData.totalPages) {
      pages.push(
        <button
          key="next"
          type="button"
          onClick={() => handlePageChange(currentPage + 1)}
          className="rounded border border-neutral-300 bg-white px-3 py-1 text-sm transition-colors hover:bg-neutral-50"
        >
          다음
        </button>
      );
    }

    return pages;
  };

  const { posts = [], totalCount = 0 } = qnaData || {};

  return (
    <>
      {/* Header Section */}
      <section
        className="mb-6 rounded-xl border border-neutral-200 p-4 sm:p-6 lg:p-8"
        style={{
          background:
            'linear-gradient(-40deg, rgb(64, 64, 64) 0%, rgb(82, 82, 82) 23.2951%, rgb(115, 115, 115) 68.1272%, rgb(163, 163, 163) 100%)',
        }}
      >
        <h1 className="mb-2 font-bold text-lg text-white sm:text-xl lg:text-2xl">
          Q&A 게시판
        </h1>
        <p className="text-neutral-100 text-sm leading-relaxed sm:text-base">
          무대예술전문인 시험과 관련된 모든 궁금증을 해결해보세요.
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          익명으로 자유롭게 질문하고 답변할 수 있는 공간입니다.
        </p>
      </section>

      {/* Search and Filter */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-semibold text-lg text-neutral-800">
            커뮤니티 Q&A
            <span className="ml-2 text-neutral-500 text-sm">
              (총 {isLoading ? '-' : totalCount}건)
            </span>
          </h2>
          <Button
            onClick={() => setShowWriteForm(!showWriteForm)}
            className="bg-neutral-800 text-white transition-colors hover:bg-neutral-700 sm:w-auto"
            disabled={createPostMutation.isPending}
          >
            {showWriteForm ? '취소' : '질문하기'}
          </Button>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="제목, 내용, 작성자로 검색..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full border-neutral-300 bg-white transition-colors focus:border-neutral-400"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) =>
                handleCategoryChange(e.target.value as QnaCategoryType | '전체')
              }
              className="flex h-9 rounded-md border border-neutral-300 bg-white px-3 py-1 text-sm shadow-xs transition-colors focus-visible:border-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500/20"
            >
              <option value="전체">전체 카테고리</option>
              {QNA_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value as QnaSortType)}
              className="flex h-9 rounded-md border border-neutral-300 bg-white px-3 py-1 text-sm shadow-xs transition-colors focus-visible:border-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500/20"
            >
              {QNA_SORT_OPTIONS.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Write Form */}
      {showWriteForm && (
        <div className="mb-6 rounded-lg border border-neutral-200 bg-white shadow-sm">
          <div className="rounded-t-lg border-neutral-200 border-b bg-neutral-50 px-6 py-3">
            <h3 className="font-semibold text-neutral-800">새 질문 작성</h3>
          </div>
          <div className="p-6">
            <form onSubmit={handleWriteSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="author"
                    className="mb-2 block font-medium text-neutral-700 text-sm"
                  >
                    닉네임 <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="author"
                    type="text"
                    placeholder="닉네임을 입력해주세요"
                    value={writeFormData.author}
                    onChange={(e) =>
                      setWriteFormData((prev) => ({
                        ...prev,
                        author: e.target.value,
                      }))
                    }
                    className="border-neutral-300 bg-white transition-colors focus:border-neutral-400"
                    required
                    maxLength={50}
                  />
                </div>
                <div>
                  <label
                    htmlFor="category"
                    className="mb-2 block font-medium text-neutral-700 text-sm"
                  >
                    카테고리 <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    value={writeFormData.category}
                    onChange={(e) =>
                      setWriteFormData((prev) => ({
                        ...prev,
                        category: e.target.value as QnaCategoryType,
                      }))
                    }
                    className="flex h-9 w-full rounded-md border border-neutral-300 bg-white px-3 py-1 text-sm shadow-xs transition-colors focus-visible:border-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400/20"
                    required
                  >
                    {QNA_CATEGORIES.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label
                  htmlFor="title"
                  className="mb-2 block font-medium text-neutral-700 text-sm"
                >
                  제목 <span className="text-red-500">*</span>
                </label>
                <Input
                  id="title"
                  type="text"
                  placeholder="궁금한 내용을 간단히 요약해주세요"
                  value={writeFormData.title}
                  onChange={(e) =>
                    setWriteFormData((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  className="border-neutral-300 bg-white transition-colors focus:border-neutral-400"
                  required
                  maxLength={200}
                />
              </div>
              <div>
                <label
                  htmlFor="content"
                  className="mb-2 block font-medium text-neutral-700 text-sm"
                >
                  내용 <span className="text-red-500">*</span>
                </label>
                <Textarea
                  id="content"
                  placeholder="구체적인 상황이나 궁금한 점을 자세히 설명해주세요"
                  value={writeFormData.content}
                  onChange={(e) =>
                    setWriteFormData((prev) => ({
                      ...prev,
                      content: e.target.value,
                    }))
                  }
                  className="min-h-32 border-neutral-300 bg-white transition-colors focus:border-neutral-400"
                  required
                  maxLength={5000}
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="border-neutral-300 text-neutral-600 transition-colors hover:bg-neutral-50"
                  onClick={() => setShowWriteForm(false)}
                  disabled={createPostMutation.isPending}
                >
                  취소
                </Button>
                <Button
                  type="submit"
                  className="bg-neutral-800 text-white transition-colors hover:bg-neutral-700"
                  disabled={createPostMutation.isPending}
                >
                  {createPostMutation.isPending ? '등록 중...' : '질문 등록'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Q&A List */}
      <div className="space-y-4">
        {(() => {
          if (isLoading) {
            return (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-neutral-200 border-r-neutral-800 border-solid" />
                  <p className="mt-2 text-neutral-600 text-sm">
                    게시글을 불러오는 중...
                  </p>
                </div>
              </div>
            );
          }

          if (error) {
            return (
              <div className="py-12 text-center">
                <p className="text-lg text-red-600">
                  게시글을 불러오는데 실패했습니다.
                </p>
                <p className="mt-2 text-neutral-500 text-sm">{error.message}</p>
                <Button
                  onClick={() => refetch()}
                  className="mt-4"
                  variant="outline"
                >
                  다시 시도
                </Button>
              </div>
            );
          }

          if (posts.length > 0) {
            return posts.map((qna: QnaPostWithPreview) => (
              <div
                key={qna.id}
                className="rounded-lg border border-neutral-200 bg-white p-6"
              >
                {/* Q&A Header */}
                <div className="mb-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-2">
                        <span className="inline-flex items-center rounded bg-neutral-100 px-2 py-1 font-medium text-neutral-800 text-xs">
                          {qna.category}
                        </span>
                        {qna.acceptedAnswer &&
                          isThreeDaysPassed(qna.created_at) && (
                            <span className="inline-flex items-center rounded bg-green-100 px-2 py-1 font-medium text-green-800 text-xs">
                              ✓ 해결됨
                            </span>
                          )}
                      </div>
                      <Link
                        href={`/qna/${qna.id}`}
                        className="block transition-colors hover:text-neutral-600"
                      >
                        <h3 className="mb-2 line-clamp-2 font-semibold text-lg text-neutral-800 leading-tight">
                          {qna.title}
                        </h3>
                      </Link>
                      <p className="line-clamp-2 text-neutral-600 text-sm leading-relaxed">
                        {qna.content}
                      </p>
                    </div>
                  </div>

                  {/* Meta Info */}
                  <div className="mt-4 flex items-center justify-between text-neutral-500 text-sm">
                    <div className="flex items-center gap-4">
                      <span>
                        작성자:{' '}
                        <strong className="text-neutral-700">
                          {qna.author}
                        </strong>
                      </span>
                      <span>
                        {new Date(qna.created_at).toLocaleDateString('ko-KR')}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span>조회 {qna.views}</span>
                      <span className="font-medium text-neutral-600">
                        답변 {qna.answersCount}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Top Answer Preview */}
                {qna.acceptedAnswer && isThreeDaysPassed(qna.created_at) && (
                  <div className="mt-4 border-neutral-100 border-t pt-4">
                    <div className="rounded-lg bg-green-50 p-4 ring-2 ring-green-200">
                      <div className="mb-2 flex items-center gap-2">
                        <span className="inline-flex items-center rounded bg-blue-100 px-2 py-1 font-medium text-blue-800 text-xs">
                          ✓ 채택됨
                        </span>
                        <span className="font-medium text-neutral-800 text-sm">
                          {qna.acceptedAnswer.author}
                        </span>
                        <span className="text-neutral-500 text-xs">
                          {new Date(
                            qna.acceptedAnswer.created_at
                          ).toLocaleDateString('ko-KR')}
                        </span>
                      </div>
                      <p className="line-clamp-3 text-neutral-700 text-sm leading-relaxed">
                        {qna.acceptedAnswer.content}
                      </p>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-end border-neutral-100 border-t pt-4">
                  <Link href={`/qna/${qna.id}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-neutral-300 text-neutral-600 transition-colors hover:bg-neutral-50"
                    >
                      자세히 보기
                    </Button>
                  </Link>
                </div>
              </div>
            ));
          }

          return (
            <div className="py-12 text-center">
              <p className="text-lg text-neutral-500">
                {searchTerm || selectedCategory !== '전체'
                  ? '검색 결과가 없습니다.'
                  : '아직 등록된 질문이 없습니다.'}
              </p>
              <p className="mt-2 text-neutral-400 text-sm">
                {searchTerm || selectedCategory !== '전체'
                  ? '다른 검색어를 시도해보거나 새로운 질문을 등록해보세요.'
                  : '첫 번째 질문을 등록해보세요!'}
              </p>
            </div>
          );
        })()}
      </div>

      {/* Pagination */}
      {!isLoading && !error && qnaData && qnaData.totalPages > 1 && (
        <div className="mt-8 flex justify-center gap-1">
          {renderPagination()}
        </div>
      )}

      {/* Guidelines Section */}
      <section className="mt-8 rounded-xl border border-neutral-200 bg-neutral-50 p-4 sm:p-6">
        <h3 className="mb-3 font-semibold text-neutral-800">
          📌 Q&A 이용 안내
        </h3>
        <ul className="space-y-2 text-neutral-600 text-sm">
          <li>• 익명으로 자유롭게 질문하고 답변할 수 있습니다.</li>
          <li>• 도움이 된 답변에는 👍을 눌러 추천해주세요.</li>
          <li>• 질문자는 가장 도움이 된 답변을 채택할 수 있습니다.</li>
          <li>• 서로 존중하는 마음으로 건전한 소통을 해주세요.</li>
          <li>• 개인정보나 부적절한 내용은 삼가해주세요.</li>
        </ul>
      </section>
    </>
  );
}

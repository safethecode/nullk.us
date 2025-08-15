'use client';

import { Button } from '@heiglabs/design-system/button';
import { Input } from '@heiglabs/design-system/input';
import { Textarea } from '@heiglabs/design-system/textarea';
import Link from 'next/link';
import type React from 'react';
import { useMemo, useState } from 'react';

interface QnaPost {
  id: number;
  title: string;
  content: string;
  author: string;
  category: string;
  date: string;
  views: number;
  answersCount: number;
  isResolved: boolean;
  answers: Answer[];
}

interface Answer {
  id: number;
  content: string;
  author: string;
  date: string;
  likes: number;
  dislikes: number;
  isAccepted: boolean;
}

export default function QnaPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [sortBy, setSortBy] = useState('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const [showWriteForm, setShowWriteForm] = useState(false);
  const [writeFormData, setWriteFormData] = useState({
    title: '',
    content: '',
    author: '',
    category: '일반질문',
  });

  // 예시 Q&A 데이터
  const allQnas: QnaPost[] = [
    {
      id: 15,
      title: '무대음향 3급 실기 시험에서 믹싱 콘솔 조작 순서가 헷갈려요',
      content:
        '실기 시험에서 믹싱 콘솔을 조작할 때 어떤 순서로 해야 하는지 모르겠어요. 경험자분들 조언 부탁드립니다.',
      author: '음향초보자',
      category: '시험문의',
      date: '2025-01-20',
      views: 142,
      answersCount: 3,
      isResolved: true,
      answers: [
        {
          id: 1,
          content:
            '먼저 게인을 적절히 설정하고, EQ 조정, 다음에 이펙트 적용하는 순서로 하시면 됩니다. 실제 현장에서도 이 순서가 가장 안전해요.',
          author: '음향경력10년',
          date: '2025-01-20',
          likes: 8,
          dislikes: 0,
          isAccepted: true,
        },
        {
          id: 2,
          content:
            '저도 처음엔 헷갈렸는데, 기본적으로 입력단부터 출력단 순서로 설정하시면 됩니다. 시험에서는 특히 피드백 방지가 중요해요.',
          author: '합격자',
          date: '2025-01-20',
          likes: 5,
          dislikes: 1,
          isAccepted: false,
        },
      ],
    },
    {
      id: 14,
      title: '무대조명 2급 필기 공부 방법 추천해주세요',
      content:
        '무대조명 2급 필기 시험을 준비하고 있는데, 어떤 방식으로 공부하는 게 효율적일까요? 합격하신 분들의 경험담 듣고 싶어요.',
      author: '조명준비생',
      category: '공부방법',
      date: '2025-01-19',
      views: 89,
      answersCount: 2,
      isResolved: false,
      answers: [
        {
          id: 4,
          content:
            '저는 이론서 3번 정독하고 기출문제 반복 풀이했어요. 특히 조명 장비별 특성을 정확히 알아두시는 게 중요합니다.',
          author: '2급합격자',
          date: '2025-01-19',
          likes: 12,
          dislikes: 0,
          isAccepted: false,
        },
        {
          id: 5,
          content:
            '실무 경험이 있으시면 이론 위주로, 없으시면 실습 영상을 많이 보시는 걸 추천드려요.',
          author: '조명기사',
          date: '2025-01-20',
          likes: 7,
          dislikes: 1,
          isAccepted: false,
        },
      ],
    },
    {
      id: 13,
      title: '무대기계 실기 시험에서 안전수칙 관련 질문입니다',
      content:
        '무대기계 실기 시험에서 안전수칙을 어디까지 지켜야 하나요? 시험장에서 감점 요소가 궁금합니다.',
      author: '안전제일',
      category: '시험문의',
      date: '2025-01-18',
      views: 156,
      answersCount: 2,
      isResolved: true,
      answers: [
        {
          id: 6,
          content:
            '안전모, 안전화 착용은 기본이고, 장비 점검 절차를 꼭 보여주세요. 이 부분에서 감점이 많이 나요.',
          author: '시험관',
          date: '2025-01-18',
          likes: 15,
          dislikes: 0,
          isAccepted: true,
        },
        {
          id: 7,
          content:
            '작업 전 주변 확인, 장비 상태 점검, 작업 후 정리까지 모든 과정에서 안전수칙을 지켜야 합니다.',
          author: '현장경력자',
          date: '2025-01-18',
          likes: 9,
          dislikes: 0,
          isAccepted: false,
        },
      ],
    },
  ];

  const categories = [
    '일반질문',
    '시험문의',
    '공부방법',
    '시험정보',
    '합격후기',
    '기타',
  ];
  const ITEMS_PER_PAGE = 10;

  // 필터링 및 정렬된 데이터
  const filteredAndSortedQnas = useMemo(() => {
    let filtered = allQnas;

    // 검색 필터
    if (searchTerm) {
      filtered = filtered.filter(
        (qna) =>
          qna.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          qna.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          qna.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 카테고리 필터
    if (selectedCategory !== '전체') {
      filtered = filtered.filter((qna) => qna.category === selectedCategory);
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
        case 'answers':
          return b.answersCount - a.answersCount;
        case 'resolved':
          return Number(b.isResolved) - Number(a.isResolved);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

  // 페이지네이션
  const totalPages = Math.ceil(filteredAndSortedQnas.length / ITEMS_PER_PAGE);
  const paginatedQnas = filteredAndSortedQnas.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleWriteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 여기에 실제 제출 로직 구현
    // console.log('Q&A 제출:', writeFormData);

    // 폼 초기화 및 닫기
    setWriteFormData({
      title: '',
      content: '',
      author: '',
      category: '일반질문',
    });
    setShowWriteForm(false);
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
              (총 {filteredAndSortedQnas.length}건)
            </span>
          </h2>
          <Button
            onClick={() => setShowWriteForm(!showWriteForm)}
            className="bg-neutral-800 text-white hover:bg-neutral-700 sm:w-auto"
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
              className="flex h-9 rounded-md border border-neutral-300 bg-white px-3 py-1 text-sm shadow-xs transition-colors focus-visible:border-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500/20"
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
              className="flex h-9 rounded-md border border-neutral-300 bg-white px-3 py-1 text-sm shadow-xs transition-colors focus-visible:border-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500/20"
            >
              <option value="latest">최신순</option>
              <option value="oldest">오래된순</option>
              <option value="views">조회수순</option>
              <option value="answers">답변많은순</option>
              <option value="resolved">해결된순</option>
            </select>
          </div>
        </div>
      </div>

      {/* Write Form */}
      {showWriteForm && (
        <div className="mb-6 rounded-lg border border-neutral-200 bg-white">
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
                    placeholder="익명닉네임"
                    value={writeFormData.author}
                    onChange={(e) =>
                      setWriteFormData({
                        ...writeFormData,
                        author: e.target.value,
                      })
                    }
                    className="border-neutral-300 bg-white focus:border-neutral-400"
                    required
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
                      setWriteFormData({
                        ...writeFormData,
                        category: e.target.value,
                      })
                    }
                    className="flex h-9 w-full rounded-md border border-neutral-300 bg-white px-3 py-1 text-sm shadow-xs transition-colors focus-visible:border-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400/20"
                    required
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
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
                    setWriteFormData({
                      ...writeFormData,
                      title: e.target.value,
                    })
                  }
                  className="border-neutral-300 bg-white focus:border-neutral-400"
                  required
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
                    setWriteFormData({
                      ...writeFormData,
                      content: e.target.value,
                    })
                  }
                  className="min-h-32 border-neutral-300 bg-white focus:border-neutral-400"
                  required
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="border-neutral-300 text-neutral-600 hover:bg-neutral-50"
                  onClick={() => setShowWriteForm(false)}
                >
                  취소
                </Button>
                <Button
                  type="submit"
                  className="bg-neutral-800 text-white hover:bg-neutral-700"
                >
                  질문 등록
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Q&A List */}
      <div className="space-y-4">
        {paginatedQnas.length > 0 ? (
          paginatedQnas.map((qna) => (
            <div
              key={qna.id}
              className="rounded-lg border border-neutral-200 bg-white p-6 transition-shadow hover:shadow-md"
            >
              {/* Q&A Header */}
              <div className="mb-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="inline-flex items-center rounded bg-neutral-100 px-2 py-1 font-medium text-neutral-800 text-xs">
                        {qna.category}
                      </span>
                      {qna.isResolved && (
                        <span className="inline-flex items-center rounded bg-green-100 px-2 py-1 font-medium text-green-800 text-xs">
                          ✓ 해결됨
                        </span>
                      )}
                    </div>
                    <h3 className="mb-2 font-semibold text-lg text-neutral-800 leading-tight">
                      {qna.title}
                    </h3>
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
                      <strong className="text-neutral-700">{qna.author}</strong>
                    </span>
                    <span>{qna.date}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span>조회 {qna.views}</span>
                    <span className="font-medium text-neutral-600">
                      답변 {qna.answersCount}
                    </span>
                  </div>
                </div>
              </div>

              {/* Recent Answers Preview */}
              {qna.answers.length > 0 && (
                <div className="border-neutral-100 border-t pt-4">
                  <div className="space-y-3">
                    {qna.answers.slice(0, 2).map((answer) => (
                      <div
                        key={answer.id}
                        className={`rounded-lg bg-neutral-50 p-4 ${
                          answer.isAccepted
                            ? 'bg-green-50 ring-2 ring-green-200'
                            : ''
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="mb-2 flex items-center gap-2">
                              <span className="font-medium text-neutral-800 text-sm">
                                {answer.author}
                              </span>
                              {answer.isAccepted && (
                                <span className="inline-flex items-center rounded bg-green-100 px-2 py-1 font-medium text-green-800 text-xs">
                                  ✓ 채택됨
                                </span>
                              )}
                              <span className="text-neutral-500 text-xs">
                                {answer.date}
                              </span>
                            </div>
                            <p className="line-clamp-2 text-neutral-700 text-sm leading-relaxed">
                              {answer.content}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 text-neutral-500 text-xs">
                            <span className="flex items-center gap-1">
                              👍 {answer.likes}
                            </span>
                            <span className="flex items-center gap-1">
                              👎 {answer.dislikes}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                    {qna.answers.length > 2 && (
                      <div className="text-center">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-neutral-300 text-neutral-600 hover:bg-neutral-50"
                        >
                          답변 {qna.answers.length - 2}개 더 보기
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-4 flex items-center justify-between border-neutral-100 border-t pt-4">
                <Link href={`/qna/${qna.id}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-neutral-300 text-neutral-600 hover:bg-neutral-50"
                  >
                    자세히 보기
                  </Button>
                </Link>
                <Link href={`/qna/${qna.id}`}>
                  <Button
                    size="sm"
                    className="bg-neutral-800 text-white hover:bg-neutral-700"
                  >
                    답변하기
                  </Button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="py-12 text-center">
            <p className="text-lg text-neutral-500">검색 결과가 없습니다.</p>
            <p className="mt-2 text-neutral-400 text-sm">
              다른 검색어를 시도해보거나 새로운 질문을 등록해보세요.
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
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

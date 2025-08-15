'use client';

import { Button } from '@heiglabs/design-system/button';
import { Input } from '@heiglabs/design-system/input';
import { Textarea } from '@heiglabs/design-system/textarea';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import type React from 'react';
import { useState } from 'react';

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

export default function QnaDetailPage() {
  const params = useParams();
  const qnaId = Number(params.id);

  const [replyContent, setReplyContent] = useState('');
  const [replyAuthor, setReplyAuthor] = useState('');
  const [answers, setAnswers] = useState<Answer[]>([]);

  // 예시 Q&A 데이터 (실제로는 API에서 가져와야 함)
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
        {
          id: 3,
          content:
            '유튜브에 관련 영상들이 많으니 참고해보세요. 실습이 가장 중요합니다.',
          author: '강사',
          date: '2025-01-21',
          likes: 3,
          dislikes: 0,
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

  const qna = allQnas.find((q) => q.id === qnaId);
  const qnaAnswers = qna ? [...qna.answers, ...answers] : answers;

  if (!qna) {
    return (
      <div className="py-8 text-center">
        <p className="text-neutral-500">질문을 찾을 수 없습니다.</p>
        <Link href="/qna">
          <Button variant="outline" className="mt-4">
            목록으로 돌아가기
          </Button>
        </Link>
      </div>
    );
  }

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim() || !replyAuthor.trim()) {
      return;
    }

    const newAnswer: Answer = {
      id: qnaAnswers.length + 1,
      content: replyContent,
      author: replyAuthor,
      date: new Date().toISOString().split('T')[0],
      likes: 0,
      dislikes: 0,
      isAccepted: false,
    };

    setAnswers([...answers, newAnswer]);
    setReplyContent('');
    setReplyAuthor('');
  };

  const handleLike = (answerId: number) => {
    // 실제로는 API 호출
    // console.log('Like answer:', answerId);
  };

  const handleDislike = (answerId: number) => {
    // 실제로는 API 호출
    // console.log('Dislike answer:', answerId);
  };

  const handleAcceptAnswer = (answerId: number) => {
    // 실제로는 API 호출
    // console.log('Accept answer:', answerId);
  };

  return (
    <>
      {/* Back Button */}
      <div className="mb-6">
        <Link href="/qna">
          <Button
            variant="outline"
            className="border-neutral-300 text-neutral-600 hover:bg-neutral-50"
          >
            ← 목록으로 돌아가기
          </Button>
        </Link>
      </div>

      {/* Question Detail */}
      <div className="mb-8 rounded-lg border border-neutral-200 bg-white">
        {/* Question Header */}
        <div className="rounded-t-lg border-neutral-200 border-b bg-neutral-50 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="font-semibold text-neutral-800 text-xl">
                {qna.title}
              </h1>
              <span className="inline-flex items-center rounded bg-neutral-100 px-2 py-1 font-medium text-neutral-800 text-xs">
                {qna.category}
              </span>
              {qna.isResolved && (
                <span className="inline-flex items-center rounded bg-green-100 px-2 py-1 font-medium text-green-800 text-xs">
                  ✓ 해결됨
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Question Meta Info */}
        <div className="border-neutral-100 border-b bg-white px-6 py-3">
          <div className="flex items-center justify-between text-neutral-600 text-sm">
            <div className="flex items-center gap-4">
              <span>
                작성자:{' '}
                <strong className="text-neutral-700">{qna.author}</strong>
              </span>
              <span>카테고리: {qna.category}</span>
            </div>
            <div className="flex items-center gap-4">
              <span>조회 {qna.views}</span>
              <span className="text-neutral-500 text-xs">{qna.date}</span>
            </div>
          </div>
        </div>

        {/* Question Content */}
        <div className="px-6 py-8">
          <div className="prose max-w-none">
            <p className="whitespace-pre-wrap text-neutral-700 leading-relaxed">
              {qna.content}
            </p>
          </div>
        </div>
      </div>

      {/* Answers Section */}
      <div className="mb-8 rounded-lg border border-neutral-200">
        <div className="rounded-t-lg border-neutral-100 border-b bg-neutral-50 px-6 py-3">
          <h3 className="font-semibold text-neutral-800">
            답변 {qnaAnswers.length}개
          </h3>
        </div>

        <div className="bg-white">
          {qnaAnswers.length > 0 ? (
            qnaAnswers.map((answer, index) => (
              <div
                key={answer.id}
                className={`${
                  index === qnaAnswers.length - 1
                    ? ''
                    : 'border-neutral-100 border-b'
                } ${answer.isAccepted ? 'bg-green-50 ring-2 ring-green-200' : ''}`}
              >
                {/* Answer Header */}
                <div className="border-neutral-50 border-b bg-neutral-25 px-6 py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-neutral-800 text-sm">
                        {answer.author}
                      </span>
                      {answer.isAccepted && (
                        <span className="inline-flex items-center rounded bg-green-100 px-2 py-1 font-medium text-green-800 text-xs">
                          ✓ 채택됨
                        </span>
                      )}
                    </div>
                    <span className="text-neutral-500 text-xs">
                      {answer.date}
                    </span>
                  </div>
                </div>

                {/* Answer Content */}
                <div className="px-6 py-4">
                  <p className="whitespace-pre-wrap text-neutral-700 text-sm leading-relaxed">
                    {answer.content}
                  </p>

                  {/* Answer Actions */}
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => handleLike(answer.id)}
                        className="flex items-center gap-1 rounded px-2 py-1 text-neutral-600 text-xs hover:bg-neutral-100"
                      >
                        👍 {answer.likes}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDislike(answer.id)}
                        className="flex items-center gap-1 rounded px-2 py-1 text-neutral-600 text-xs hover:bg-neutral-100"
                      >
                        👎 {answer.dislikes}
                      </button>
                    </div>
                    {!answer.isAccepted && !qna.isResolved && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleAcceptAnswer(answer.id)}
                        className="border-green-300 text-green-600 hover:bg-green-50"
                      >
                        채택하기
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-8 text-center">
              <p className="text-neutral-500 text-sm">아직 답변이 없습니다.</p>
            </div>
          )}
        </div>
      </div>

      {/* Reply Form */}
      <div className="rounded-lg border border-neutral-200 bg-white">
        <div className="rounded-t-lg border-neutral-200 border-b bg-neutral-50 px-6 py-3">
          <h3 className="font-semibold text-neutral-800">답변 작성</h3>
        </div>
        <div className="p-6">
          <form onSubmit={handleReplySubmit} className="space-y-4">
            <div>
              <label
                htmlFor="replyAuthor"
                className="mb-2 block font-medium text-neutral-700 text-sm"
              >
                닉네임 <span className="text-red-500">*</span>
              </label>
              <Input
                id="replyAuthor"
                type="text"
                placeholder="익명닉네임"
                value={replyAuthor}
                onChange={(e) => setReplyAuthor(e.target.value)}
                className="border-neutral-300 focus:border-neutral-400"
                required
              />
            </div>
            <div>
              <label
                htmlFor="replyContent"
                className="mb-2 block font-medium text-neutral-700 text-sm"
              >
                답변 내용 <span className="text-red-500">*</span>
              </label>
              <Textarea
                id="replyContent"
                placeholder="도움이 되는 답변을 작성해주세요"
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="min-h-32 border-neutral-300 focus:border-neutral-400"
                required
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                className="border-neutral-300 text-neutral-600 hover:bg-neutral-50"
                onClick={() => {
                  setReplyContent('');
                  setReplyAuthor('');
                }}
              >
                취소
              </Button>
              <Button
                type="submit"
                className="bg-neutral-800 text-white hover:bg-neutral-700"
              >
                답변 등록
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Guidelines Section */}
      <section className="mt-8 rounded-xl border border-neutral-200 bg-neutral-50 p-4 sm:p-6">
        <h3 className="mb-3 font-semibold text-neutral-800">
          📌 답변 작성 안내
        </h3>
        <ul className="space-y-2 text-neutral-600 text-sm">
          <li>• 구체적이고 도움이 되는 답변을 작성해주세요.</li>
          <li>• 개인적인 경험이나 노하우를 공유해주시면 더욱 좋습니다.</li>
          <li>• 질문자가 답변을 채택하면 해결된 상태로 변경됩니다.</li>
          <li>• 서로 존중하는 마음으로 건전한 소통을 해주세요.</li>
        </ul>
      </section>
    </>
  );
}

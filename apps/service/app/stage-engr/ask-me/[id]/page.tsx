'use client';

import { Button } from '@heiglabs/design-system/button';
import { Textarea } from '@heiglabs/design-system/textarea';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import type React from 'react';
import { useState } from 'react';

interface InquiryPost {
  id: number;
  title: string;
  content: string;
  author: string;
  category: string;
  date: string;
  isAnswered: boolean;
  answer?: {
    content: string;
    date: string;
  };
}

interface Reply {
  id: number;
  content: string;
  author: string;
  date: string;
  isAdmin: boolean;
}

export default function InquiryDetail() {
  const params = useParams();
  const inquiryId = Number(params.id);

  const [replyContent, setReplyContent] = useState('');
  const [replies, setReplies] = useState<Reply[]>([
    // 답변이 있는 경우의 예시 - 필요에 따라 주석 해제
    // {
    //   id: 1,
    //   content:
    //     '확인해보니 문제가 있었습니다. 다음 업데이트에서 수정하겠습니다. 감사합니다!',
    //   author: '관리자',
    //   date: '2025-01-21',
    //   isAdmin: true,
    // },
  ]);

  // 예시 문의 데이터 (실제로는 API에서 가져와야 함)
  const inquiries: InquiryPost[] = [
    {
      id: 1,
      title: '무대음향 3급 문제집 오류 발견',
      content: '7번 문제에서 답이 잘못된 것 같습니다. 확인 부탁드립니다.',
      author: '김**',
      category: '문제오류',
      date: '2025-01-20',
      isAnswered: true,
      answer: {
        content:
          '확인해보니 문제가 있었습니다. 다음 업데이트에서 수정하겠습니다. 감사합니다!',
        date: '2025-01-21',
      },
    },
    {
      id: 2,
      title: '무대조명 2급 시험 범위 문의',
      content:
        '무대조명 2급 시험에서 LED 조명 관련 내용이 어느 정도 비중을 차지하나요?',
      author: '이**',
      category: '시험문의',
      date: '2025-01-19',
      isAnswered: false,
    },
    {
      id: 3,
      title: '문제집 다운로드가 안 됩니다',
      content:
        '무대음향 1급 문제집을 다운로드하려고 하는데 계속 오류가 발생합니다.',
      author: '박**',
      category: '기술문의',
      date: '2025-01-18',
      isAnswered: true,
      answer: {
        content:
          '서버 점검으로 인한 일시적인 문제였습니다. 현재는 정상적으로 다운로드 가능합니다.',
        date: '2025-01-18',
      },
    },
  ];

  const inquiry = inquiries.find((inq) => inq.id === inquiryId);

  if (!inquiry) {
    return (
      <div className="py-8 text-center">
        <p className="text-neutral-500">문의를 찾을 수 없습니다.</p>
        <Link href="/ask-me">
          <Button variant="outline" className="mt-4">
            목록으로 돌아가기
          </Button>
        </Link>
      </div>
    );
  }

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim()) {
      return;
    }

    const newReply: Reply = {
      id: replies.length + 1,
      content: replyContent,
      author: '관리자', // 실제로는 로그인된 사용자 정보
      date: new Date().toISOString().split('T')[0] || '',
      isAdmin: true, // 실제로는 권한 체크
    };

    setReplies([...replies, newReply]);
    setReplyContent('');
  };

  return (
    <>
      {/* Back Button */}
      <div className="mb-6">
        <Link href="/ask-me">
          <Button
            variant="outline"
            className="border-neutral-300 text-neutral-600 hover:bg-neutral-50"
          >
            ← 목록으로 돌아가기
          </Button>
        </Link>
      </div>

      {/* Board Style Post */}
      <div className="mb-8 border border-neutral-200 bg-white">
        {/* Post Header */}
        <div className="border-neutral-100 border-b bg-neutral-50 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="font-semibold text-neutral-800 text-xl">
                {inquiry.title}
              </h1>
              <span
                className={`inline-flex items-center rounded px-2 py-1 font-medium text-xs ${
                  inquiry.isAnswered
                    ? 'bg-neutral-800 text-white'
                    : 'bg-neutral-200 text-neutral-600'
                }`}
              >
                {inquiry.isAnswered ? '답변완료' : '답변대기'}
              </span>
            </div>
          </div>
        </div>

        {/* Post Meta Info */}
        <div className="border-neutral-100 border-b bg-white px-6 py-3">
          <div className="flex items-center justify-between text-neutral-600 text-sm">
            <div className="flex items-center gap-4">
              <span>
                작성자: <strong>{inquiry.author}</strong>
              </span>
              <span>카테고리: {inquiry.category}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-neutral-500 text-xs">{inquiry.date}</span>
            </div>
          </div>
        </div>

        {/* Post Content */}
        <div className="px-6 py-8">
          <div className="prose max-w-none">
            <p className="whitespace-pre-wrap text-neutral-700 leading-relaxed">
              {inquiry.content}
            </p>
          </div>
        </div>
      </div>

      {/* Replies Section */}
      <div className="mb-8 border border-neutral-200">
        <div className="border-neutral-100 border-b bg-neutral-50 px-6 py-3">
          <h3 className="font-semibold text-neutral-800">
            답변 {replies.length}개
          </h3>
        </div>

        <div className="bg-white">
          {replies.length > 0 ? (
            replies.map((reply, index) => (
              <div
                key={reply.id}
                className={`border-neutral-100 border-b ${index === replies.length - 1 ? 'border-b-0' : ''}`}
              >
                {/* Reply Header */}
                <div className="border-neutral-50 border-b bg-neutral-25 px-6 py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-neutral-800 text-sm">
                        {reply.author}
                      </span>
                      {reply.isAdmin && (
                        <span className="inline-flex items-center rounded bg-neutral-800 px-2 py-1 font-medium text-white text-xs">
                          관리자
                        </span>
                      )}
                    </div>
                    <span className="text-neutral-500 text-xs">
                      {reply.date}
                    </span>
                  </div>
                </div>

                {/* Reply Content */}
                <div className="px-6 py-4">
                  <p className="whitespace-pre-wrap text-neutral-700 text-sm leading-relaxed">
                    {reply.content}
                  </p>
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
      <div className="border border-neutral-200 bg-white">
        <div className="border-neutral-200 border-b bg-neutral-50 px-6 py-3">
          <h3 className="font-semibold text-neutral-800">답변 작성</h3>
        </div>
        <div className="p-6">
          <form onSubmit={handleReplySubmit} className="space-y-4">
            <Textarea
              placeholder="답변 내용을 입력해주세요"
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              className="min-h-32 border-neutral-300 focus:border-neutral-400"
              required
            />
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                className="border-neutral-300 text-neutral-600 hover:bg-neutral-50"
                onClick={() => setReplyContent('')}
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
    </>
  );
}

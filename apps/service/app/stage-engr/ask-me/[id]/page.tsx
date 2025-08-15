'use client';

import { Button } from '@heiglabs/design-system/button';
import { Textarea } from '@heiglabs/design-system/textarea';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import type React from 'react';
import { useEffect, useState } from 'react';
import {
  getInquiryWithReplies,
  incrementInquiryViews,
} from '../../../../lib/api/inquiries';
import { createInquiryReply } from '../../../../lib/api/replies';
import type { InquiryWithReplies } from '../../../../lib/database.types';

export default function InquiryDetail() {
  const params = useParams();
  const inquiryId = Number(params.id);

  const [inquiry, setInquiry] = useState<InquiryWithReplies | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [replyLoading, setReplyLoading] = useState(false);
  const [replyError, setReplyError] = useState<string | null>(null);

  useEffect(() => {
    const loadInquiry = async () => {
      try {
        setLoading(true);
        setError(null);

        // 문의 데이터 로드 (조회수 증가 전)
        const data = await getInquiryWithReplies(inquiryId);
        console.log('Before increment - Views:', data?.views);

        // 조회수 증가 (임시 비활성화 - RLS 정책 문제로 인해)
        try {
          await incrementInquiryViews(inquiryId);
        } catch (viewError) {
          console.warn('Views increment failed, continuing anyway:', viewError);
        }

        // 조회수 증가 후 다시 데이터 로드
        const updatedData = await getInquiryWithReplies(inquiryId);
        console.log('After increment - Views:', updatedData?.views);

        setInquiry(updatedData);
      } catch (err) {
        console.error('Failed to load inquiry:', err);
        setError(`문의를 불러오는데 실패했습니다. ID: ${inquiryId}`);
      } finally {
        setLoading(false);
      }
    };

    if (inquiryId) {
      loadInquiry();
    }
  }, [inquiryId]);

  // 답변 제출
  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!replyContent.trim()) {
      setReplyError('답변 내용을 입력해주세요.');
      return;
    }

    try {
      setReplyLoading(true);
      setReplyError(null);

      const newReply = await createInquiryReply({
        inquiry_id: inquiryId,
        content: replyContent.trim(),
        author: '관리자', // 실제로는 로그인된 사용자 정보
        is_admin: true, // 실제로는 권한 체크
      });

      // 답변 목록에 추가
      if (inquiry) {
        setInquiry({
          ...inquiry,
          is_answered: true,
          inquiry_replies: [...inquiry.inquiry_replies, newReply],
        });
      }

      setReplyContent('');
    } catch {
      setReplyError('답변 등록에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setReplyLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-8">
        <div className="flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-neutral-800 border-b-2" />
          <span className="ml-3 text-neutral-600">문의를 불러오는 중...</span>
        </div>
      </div>
    );
  }

  if (error || !inquiry) {
    return (
      <div className="py-8 text-center">
        <p className="mb-4 text-neutral-500">
          {error || '문의를 찾을 수 없습니다.'}
        </p>
        <Link href="ask-me">
          <Button variant="outline">목록으로 돌아가기</Button>
        </Link>
      </div>
    );
  }

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
                  inquiry.is_answered
                    ? 'bg-neutral-800 text-white'
                    : 'bg-neutral-200 text-neutral-600'
                }`}
              >
                {inquiry.is_answered ? '답변완료' : '답변대기'}
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
              <span>조회수: {inquiry.views}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-neutral-500 text-xs">
                {new Date(inquiry.created_at).toLocaleDateString('ko-KR')}
              </span>
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
            답변 {inquiry.inquiry_replies.length}개
          </h3>
        </div>

        <div className="bg-white">
          {inquiry.inquiry_replies.length > 0 ? (
            inquiry.inquiry_replies.map((reply, index) => (
              <div
                key={reply.id}
                className={`border-neutral-100 border-b ${index === inquiry.inquiry_replies.length - 1 ? 'border-b-0' : ''}`}
              >
                {/* Reply Header */}
                <div className="border-neutral-50 border-b bg-neutral-25 px-6 py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-neutral-800 text-sm">
                        {reply.author}
                      </span>
                      {reply.is_admin && (
                        <span className="inline-flex items-center rounded bg-neutral-800 px-2 py-1 font-medium text-white text-xs">
                          관리자
                        </span>
                      )}
                    </div>
                    <span className="text-neutral-500 text-xs">
                      {new Date(reply.created_at).toLocaleDateString('ko-KR')}
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
          {/* Reply Error */}
          {replyError && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3">
              <p className="text-red-600 text-sm">{replyError}</p>
            </div>
          )}

          <form onSubmit={handleReplySubmit} className="space-y-4">
            <Textarea
              placeholder="답변 내용을 입력해주세요"
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              className="min-h-32 border-neutral-300 focus:border-neutral-400"
              required
              disabled={replyLoading}
            />
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                className="border-neutral-300 text-neutral-600 hover:bg-neutral-50"
                onClick={() => {
                  setReplyContent('');
                  setReplyError(null);
                }}
                disabled={replyLoading}
              >
                취소
              </Button>
              <Button
                type="submit"
                className="bg-neutral-800 text-white hover:bg-neutral-700 disabled:opacity-50"
                disabled={replyLoading}
              >
                {replyLoading ? '등록 중...' : '답변 등록'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

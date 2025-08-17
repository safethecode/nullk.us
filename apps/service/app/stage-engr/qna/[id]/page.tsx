'use client';

import {
  createQnaAnswer,
  getQnaPostWithAnswers,
  incrementQnaViews,
  subscribeToQnaAnswers,
  toggleAnswerVote,
} from '@/lib/api/qna';
import type {
  QnaAnswerInsert,
  QnaAnswerWithVote,
  VoteType,
} from '@/lib/database.types';
import { Button } from '@heiglabs/design-system/button';
import { Input } from '@heiglabs/design-system/input';
import { Textarea } from '@heiglabs/design-system/textarea';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { type FormEvent, useCallback, useEffect, useState } from 'react';

// 헬퍼 함수: 3일이 지났는지 확인
const isThreeDaysPassed = (createdAt: string): boolean => {
  const questionDate = new Date(createdAt);
  const threeDaysLater = new Date(
    questionDate.getTime() + 3 * 24 * 60 * 60 * 1000
  );
  return new Date() >= threeDaysLater;
};

export default function QnaDetailPage() {
  const params = useParams();
  const router = useRouter();
  const qnaId = Number(params.id);
  const queryClient = useQueryClient();

  const [replyContent, setReplyContent] = useState('');
  const [replyAuthor, setReplyAuthor] = useState('');

  // QnA 상세 조회
  const {
    data: qnaData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['qnaDetail', qnaId],
    queryFn: () => getQnaPostWithAnswers(qnaId),
    enabled: !Number.isNaN(qnaId) && qnaId > 0,
    staleTime: 1000 * 60 * 2, // 2분간 캐시 유지
    gcTime: 1000 * 60 * 5, // 5분간 가비지 컬렉션 방지
  });

  // 조회수 증가 뮤테이션
  const incrementViewsMutation = useMutation({
    mutationFn: async () => {
      try {
        return await incrementQnaViews(qnaId);
      } catch (error) {
        console.warn('조회수 증가 API 실패, 클라이언트에서 처리:', error);
        // API 실패 시에도 일단 성공으로 처리하여 UI 업데이트
        return -1; // 실패를 나타내는 특수값
      }
    },
    onSuccess: (newViews) => {
      queryClient.setQueryData(['qnaDetail', qnaId], (oldData: unknown) => {
        if (oldData && typeof oldData === 'object') {
          const data = oldData as { views: number };
          const updatedViews =
            newViews === -1 ? (data.views || 0) + 1 : newViews;
          return { ...oldData, views: updatedViews };
        }
        return oldData;
      });
      // 목록 페이지도 갱신 (API 성공 시에만)
      if (newViews !== -1) {
        queryClient.invalidateQueries({ queryKey: ['qnaPosts'] });
      }
    },
    onError: () => {
      // 이 부분은 실행되지 않을 것 (mutationFn에서 catch하므로)
      console.warn('조회수 증가 완전 실패');
    },
  });

  // 답변 작성 뮤테이션
  const createAnswerMutation = useMutation({
    mutationFn: createQnaAnswer,
    onSuccess: () => {
      // 답변 작성 완료 후 상세 페이지 새로고침
      queryClient.invalidateQueries({ queryKey: ['qnaDetail', qnaId] });
      queryClient.invalidateQueries({ queryKey: ['qnaPosts'] });
      setReplyContent('');
      setReplyAuthor('');
    },
    onError: (error) => {
      alert(`답변 작성 실패: ${error.message}`);
    },
  });

  // 좋아요/싫어요 토글 뮤테이션
  const toggleVoteMutation = useMutation({
    mutationFn: ({
      answerId,
      voteType,
    }: { answerId: number; voteType: VoteType }) =>
      toggleAnswerVote(answerId, voteType),
    onSuccess: (result, variables) => {
      // 낙관적 업데이트
      queryClient.setQueryData(['qnaDetail', qnaId], (oldData: unknown) => {
        if (!oldData) {
          return oldData;
        }

        const typedOldData = oldData as {
          qna_answers: QnaAnswerWithVote[];
          [key: string]: unknown;
        };

        return {
          ...typedOldData,
          qna_answers: typedOldData.qna_answers.map(
            (answer: QnaAnswerWithVote) =>
              answer.id === variables.answerId
                ? {
                    ...answer,
                    likes: result.likes,
                    dislikes: result.dislikes,
                    userVote: result.userVote,
                  }
                : answer
          ),
        };
      });
    },
    onError: (error) => {
      alert(`투표 실패: ${error.message}`);
    },
  });

  // 조회수 증가 (페이지당 한 번만)
  useEffect(() => {
    if (qnaId && qnaId > 0) {
      // 각 qnaId마다 고유한 키로 localStorage에 기록
      const viewKey = `qna_viewed_${qnaId}`;
      const hasViewed = localStorage.getItem(viewKey);

      if (!hasViewed) {
        incrementViewsMutation.mutate();
        localStorage.setItem(viewKey, 'true');
      }
    }
  }, [qnaId, incrementViewsMutation]);

  // 실시간 구독 설정
  useEffect(() => {
    if (!qnaId) {
      return;
    }

    const subscription = subscribeToQnaAnswers(qnaId, () => {
      // 실시간으로 답변이 추가/수정/삭제될 때 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['qnaDetail', qnaId] });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [qnaId, queryClient]);

  // 답변 작성 핸들러
  const handleReplySubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      if (!replyContent.trim() || !replyAuthor.trim()) {
        alert('모든 필수 항목을 입력해주세요.');
        return;
      }

      const answerData: QnaAnswerInsert = {
        qna_post_id: qnaId,
        content: replyContent.trim(),
        author: replyAuthor.trim(),
      };

      createAnswerMutation.mutate(answerData);
    },
    [qnaId, replyContent, replyAuthor, createAnswerMutation]
  );

  // 좋아요/싫어요 핸들러
  const handleVote = useCallback(
    (answerId: number, voteType: VoteType) => {
      toggleVoteMutation.mutate({ answerId, voteType });
    },
    [toggleVoteMutation]
  );

  // 로딩 상태
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

  // 에러 상태
  if (error) {
    return (
      <div className="py-12 text-center">
        <p className="text-lg text-red-600">
          게시글을 불러오는데 실패했습니다.
        </p>
        <p className="mt-2 text-neutral-500 text-sm">{error.message}</p>
        <div className="mt-4 space-x-2">
          <Button onClick={() => refetch()} variant="outline">
            다시 시도
          </Button>
          <Button onClick={() => router.push('/qna')} variant="outline">
            목록으로 돌아가기
          </Button>
        </div>
      </div>
    );
  }

  // 데이터가 없는 경우
  if (!qnaData) {
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

  const { qna_answers: answers = [] } = qnaData;

  return (
    <>
      {/* Back Button */}
      <div className="mb-6">
        <Link href="/qna">
          <Button
            variant="outline"
            className="border-neutral-300 text-neutral-600 transition-colors hover:bg-neutral-50"
          >
            ← 목록으로 돌아가기
          </Button>
        </Link>
      </div>

      {/* Question Detail */}
      <div className="mb-8 rounded-lg border border-neutral-200 bg-white shadow-sm">
        {/* Question Header */}
        <div className="rounded-t-lg border-neutral-200 border-b bg-neutral-50 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="font-semibold text-neutral-800 text-xl">
                {qnaData.title}
              </h1>
              <span className="inline-flex items-center rounded bg-neutral-100 px-2 py-1 font-medium text-neutral-800 text-xs">
                {qnaData.category}
              </span>
              {answers &&
                answers.length > 0 &&
                answers[0] &&
                answers[0].likes > 0 &&
                isThreeDaysPassed(qnaData.created_at) && (
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
                <strong className="text-neutral-700">{qnaData.author}</strong>
              </span>
              <span>카테고리: {qnaData.category}</span>
            </div>
            <div className="flex items-center gap-4">
              <span>조회 {qnaData.views}</span>
              <span className="text-neutral-500 text-xs">
                {new Date(qnaData.created_at).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Question Content */}
        <div className="px-6 py-8">
          <div className="prose max-w-none">
            <p className="whitespace-pre-wrap text-neutral-700 leading-relaxed">
              {qnaData.content}
            </p>
          </div>
        </div>
      </div>

      {/* Answers Section */}
      <div className="mb-8 rounded-lg border border-neutral-200 shadow-sm">
        <div className="rounded-t-lg border-neutral-100 border-b bg-neutral-50 px-6 py-3">
          <h3 className="font-semibold text-neutral-800">
            답변 {answers.length}개
          </h3>
        </div>

        <div className="bg-white">
          {answers.length > 0 ? (
            answers.map((answer, index) => (
              <div
                key={answer.id}
                className={`${
                  index === answers.length - 1
                    ? ''
                    : 'border-neutral-100 border-b'
                } ${
                  index === 0 &&
                  answer.likes > 0 &&
                  isThreeDaysPassed(qnaData.created_at)
                    ? 'bg-blue-50 ring-2 ring-blue-200'
                    : ''
                } transition-all duration-200`}
              >
                {/* Answer Header */}
                <div className="border-neutral-50 border-b bg-neutral-25 px-6 py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-neutral-800 text-sm">
                        {answer.author}
                      </span>
                      {index === 0 &&
                        answer.likes > 0 &&
                        isThreeDaysPassed(qnaData.created_at) && (
                          <span className="inline-flex items-center rounded bg-blue-100 px-2 py-1 font-medium text-blue-800 text-xs">
                            ✓ 채택됨
                          </span>
                        )}
                    </div>
                    <span className="text-neutral-500 text-xs">
                      {new Date(answer.created_at).toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>

                {/* Answer Content */}
                <div className="px-6 py-4">
                  <p className="mb-4 whitespace-pre-wrap text-neutral-700 text-sm leading-relaxed">
                    {answer.content}
                  </p>

                  {/* Answer Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => handleVote(answer.id, 'like')}
                        disabled={toggleVoteMutation.isPending}
                        className={`flex items-center gap-1 rounded px-2 py-1 text-xs transition-all ${
                          answer.userVote === 'like'
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-neutral-600 hover:bg-neutral-100'
                        }`}
                      >
                        👍 {answer.likes}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleVote(answer.id, 'dislike')}
                        disabled={toggleVoteMutation.isPending}
                        className={`flex items-center gap-1 rounded px-2 py-1 text-xs transition-all ${
                          answer.userVote === 'dislike'
                            ? 'bg-red-100 text-red-700'
                            : 'text-neutral-600 hover:bg-neutral-100'
                        }`}
                      >
                        👎 {answer.dislikes}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-8 text-center">
              <p className="text-neutral-500 text-sm">아직 답변이 없습니다.</p>
              <p className="mt-1 text-neutral-400 text-xs">
                첫 번째 답변을 작성해보세요!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Reply Form */}
      <div className="rounded-lg border border-neutral-200 bg-white shadow-sm">
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
                placeholder="닉네임을 입력해주세요"
                value={replyAuthor}
                onChange={(e) => setReplyAuthor(e.target.value)}
                className="border-neutral-300 transition-colors focus:border-neutral-400"
                required
                maxLength={50}
                disabled={createAnswerMutation.isPending}
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
                className="min-h-32 border-neutral-300 transition-colors focus:border-neutral-400"
                required
                maxLength={3000}
                disabled={createAnswerMutation.isPending}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                className="border-neutral-300 text-neutral-600 transition-colors hover:bg-neutral-50"
                onClick={() => {
                  setReplyContent('');
                  setReplyAuthor('');
                }}
                disabled={createAnswerMutation.isPending}
              >
                취소
              </Button>
              <Button
                type="submit"
                className="bg-neutral-800 text-white transition-colors hover:bg-neutral-700"
                disabled={createAnswerMutation.isPending}
              >
                {createAnswerMutation.isPending
                  ? '답변 등록 중...'
                  : '답변 등록'}
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

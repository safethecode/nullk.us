import type {
  QnaAnswer,
  QnaAnswerInsert,
  QnaAnswerUpdate,
  QnaAnswerWithVote,
  QnaCategoryType,
  QnaPost,
  QnaPostInsert,
  QnaPostUpdate,
  QnaPostWithAnswers,
  QnaPostWithPreview,
  QnaSortType,
  VoteResult,
  VoteType,
} from '../database.types';
import { supabase } from '../supabase';

// 유틸리티 함수: 사용자 식별자 생성 (IP 기반)
const getUserIdentifier = (): string => {
  // 클라이언트에서는 브라우저의 fingerprint를 사용
  if (typeof window !== 'undefined') {
    let identifier = localStorage.getItem('user_identifier');
    if (!identifier) {
      identifier = `client_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('user_identifier', identifier);
    }
    return identifier;
  }
  // 서버에서는 IP 주소를 사용해야 하지만 여기서는 임시값
  return `server_${Date.now()}`;
};

// 헬퍼 함수: 게시글에 답변 정보 추가
const processPostsWithAnswers = async (
  posts: (QnaPost & { qna_answers?: unknown[] })[]
): Promise<QnaPostWithPreview[]> => {
  const postsWithPreview: QnaPostWithPreview[] = [];

  for (const post of posts) {
    const answersCount = Array.isArray(post.qna_answers)
      ? post.qna_answers.length
      : 0;

    let acceptedAnswer: {
      id: number;
      content: string;
      author: string;
      created_at: string;
      likes: number;
      dislikes: number;
    } | null = null;

    if (answersCount > 0) {
      // 해당 질문의 모든 답변을 가져와서 좋아요 수가 가장 많은 것을 찾기
      const { data: allAnswers } = await supabase
        .from('qna_answers')
        .select('id, content, author, created_at, likes, dislikes')
        .eq('qna_post_id', post.id)
        .order('likes', { ascending: false })
        .limit(1);

      // 질문 작성일로부터 3일이 지났고 좋아요가 1개 이상인 경우에만 채택
      if (
        allAnswers &&
        allAnswers.length > 0 &&
        allAnswers[0] &&
        allAnswers[0].likes > 0
      ) {
        const questionDate = new Date(post.created_at);
        const threeDaysLater = new Date(
          questionDate.getTime() + 3 * 24 * 60 * 60 * 1000
        );
        const now = new Date();

        if (now >= threeDaysLater) {
          acceptedAnswer = allAnswers[0];
        }
      }
    }

    postsWithPreview.push({
      ...post,
      answersCount,
      acceptedAnswer,
    });
  }

  return postsWithPreview;
};

// QnA 게시글 목록 조회 (페이지네이션, 검색, 정렬, 필터링)
export const getQnaPosts = async (options: {
  page?: number;
  limit?: number;
  search?: string;
  category?: QnaCategoryType | '전체';
  sortBy?: QnaSortType;
}) => {
  const {
    page = 1,
    limit = 10,
    search = '',
    category = '전체',
    sortBy = 'latest',
  } = options;

  let query = supabase.from('qna_posts').select(
    `
      *,
      qna_answers(*)
    `,
    { count: 'exact' }
  );

  // 검색 조건
  if (search) {
    query = query.or(
      `title.ilike.%${search}%,content.ilike.%${search}%,author.ilike.%${search}%`
    );
  }

  // 카테고리 필터
  if (category !== '전체') {
    query = query.eq('category', category);
  }

  // 정렬
  switch (sortBy) {
    case 'latest':
      query = query.order('created_at', { ascending: false });
      break;
    case 'oldest':
      query = query.order('created_at', { ascending: true });
      break;
    case 'views':
      query = query.order('views', { ascending: false });
      break;
    case 'answers':
      // 답변 수로 정렬하려면 별도 쿼리 필요
      query = query.order('created_at', { ascending: false });
      break;
    case 'resolved':
      query = query.order('is_resolved', { ascending: false });
      break;
    default:
      query = query.order('created_at', { ascending: false });
      break;
  }

  // 페이지네이션
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  query = query.range(from, to);

  const { data, error, count } = await query;

  if (error) {
    throw new Error(`QnA 게시글 조회 실패: ${error.message}`);
  }

  const posts = data ? await processPostsWithAnswers(data) : [];

  return {
    posts,
    totalCount: count || 0,
    totalPages: Math.ceil((count || 0) / limit),
    currentPage: page,
  };
};

// QnA 게시글 상세 조회 (답변 포함)
export const getQnaPostWithAnswers = async (
  postId: number,
  userIdentifier?: string
): Promise<QnaPostWithAnswers> => {
  const { data: post, error: postError } = await supabase
    .from('qna_posts')
    .select('*')
    .eq('id', postId)
    .single();

  if (postError) {
    throw new Error(`QnA 게시글 조회 실패: ${postError.message}`);
  }

  // 답변 조회 (좋아요/싫어요 포함)
  const { data: answers, error: answersError } = await supabase
    .from('qna_answers')
    .select(`
      *,
      qna_answer_votes(vote_type, user_identifier)
    `)
    .eq('qna_post_id', postId);

  if (answersError) {
    throw new Error(`답변 조회 실패: ${answersError.message}`);
  }

  const identifier = userIdentifier || getUserIdentifier();

  // 사용자의 투표 정보 포함하여 답변 데이터 가공 및 점수에 따라 정렬
  const answersWithVote: QnaAnswerWithVote[] =
    answers?.map((answer) => {
      const userVote =
        answer.qna_answer_votes?.find(
          (vote: { user_identifier: string; vote_type: string }) =>
            vote.user_identifier === identifier
        )?.vote_type || null;

      return {
        ...answer,
        userVote: userVote as 'like' | 'dislike' | null,
      };
    }) || [];

  // 점수(좋아요 - 싫어요)에 따라 정렬
  // 1순위: 점수 높은 순
  // 2순위: 좋아요 많은 순
  // 3순위: 최신 순
  answersWithVote.sort((a, b) => {
    const scoreA = a.likes - a.dislikes;
    const scoreB = b.likes - b.dislikes;

    if (scoreA !== scoreB) {
      return scoreB - scoreA; // 점수 높은 순
    }

    if (a.likes !== b.likes) {
      return b.likes - a.likes; // 좋아요 많은 순
    }

    // 최신 순
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  return {
    ...post,
    qna_answers: answersWithVote,
    answersCount: answersWithVote.length,
  };
};

// QnA 게시글 작성
export const createQnaPost = async (data: QnaPostInsert): Promise<QnaPost> => {
  const { data: post, error } = await supabase
    .from('qna_posts')
    .insert(data)
    .select()
    .single();

  if (error) {
    throw new Error(`QnA 게시글 작성 실패: ${error.message}`);
  }

  return post;
};

// QnA 답변 작성
export const createQnaAnswer = async (
  data: QnaAnswerInsert
): Promise<QnaAnswer> => {
  const { data: answer, error } = await supabase
    .from('qna_answers')
    .insert(data)
    .select()
    .single();

  if (error) {
    throw new Error(`답변 작성 실패: ${error.message}`);
  }

  return answer;
};

// QnA 게시글 조회수 증가 (inquiries.ts 방식과 동일)
export const incrementQnaViews = async (postId: number): Promise<number> => {
  console.log('Incrementing views for QnA post ID:', postId);

  // 현재 조회수 가져오기
  const { data: currentData, error: selectError } = await supabase
    .from('qna_posts')
    .select('views')
    .eq('id', postId)
    .single();

  if (selectError) {
    console.error('Failed to get current views:', selectError);
    console.error(
      'Select error details:',
      JSON.stringify(selectError, null, 2)
    );
    // 에러가 발생해도 기본값 반환
    return 1;
  }

  const currentViews = currentData?.views || 0;
  console.log('Current views:', currentViews);

  // 조회수 직접 업데이트
  const { data: updateData, error: updateError } = await supabase
    .from('qna_posts')
    .update({
      views: currentViews + 1,
      updated_at: new Date().toISOString(),
    })
    .eq('id', postId)
    .select('views');

  if (updateError) {
    console.error('Failed to increment views:', updateError);
    console.error(
      'Update error details:',
      JSON.stringify(updateError, null, 2)
    );
    console.error('Update error code:', updateError.code);
    console.error('Update error message:', updateError.message);
    // 에러가 발생해도 예상 값 반환
    return currentViews + 1;
  }

  console.log('Views updated successfully:', updateData);
  console.log('New views count:', updateData?.[0]?.views);
  return updateData?.[0]?.views || currentViews + 1;
};

// 답변 좋아요/싫어요 토글
export const toggleAnswerVote = async (
  answerId: number,
  voteType: VoteType,
  userIdentifier?: string
): Promise<VoteResult> => {
  const identifier = userIdentifier || getUserIdentifier();

  const { data, error } = await supabase.rpc('toggle_answer_vote', {
    p_answer_id: answerId,
    p_user_identifier: identifier,
    p_vote_type: voteType,
  });

  if (error) {
    throw new Error(`투표 실패: ${error.message}`);
  }

  return data as VoteResult;
};

// 답변 채택
export const acceptAnswer = async (answerId: number): Promise<void> => {
  const { error } = await supabase
    .from('qna_answers')
    .update({ is_accepted: true })
    .eq('id', answerId);

  if (error) {
    throw new Error(`답변 채택 실패: ${error.message}`);
  }
};

// QnA 게시글 수정
export const updateQnaPost = async (
  postId: number,
  data: QnaPostUpdate
): Promise<QnaPost> => {
  const { data: post, error } = await supabase
    .from('qna_posts')
    .update(data)
    .eq('id', postId)
    .select()
    .single();

  if (error) {
    throw new Error(`QnA 게시글 수정 실패: ${error.message}`);
  }

  return post;
};

// QnA 답변 수정
export const updateQnaAnswer = async (
  answerId: number,
  data: QnaAnswerUpdate
): Promise<QnaAnswer> => {
  const { data: answer, error } = await supabase
    .from('qna_answers')
    .update(data)
    .eq('id', answerId)
    .select()
    .single();

  if (error) {
    throw new Error(`답변 수정 실패: ${error.message}`);
  }

  return answer;
};

// QnA 게시글 삭제
export const deleteQnaPost = async (postId: number): Promise<void> => {
  const { error } = await supabase.from('qna_posts').delete().eq('id', postId);

  if (error) {
    throw new Error(`QnA 게시글 삭제 실패: ${error.message}`);
  }
};

// QnA 답변 삭제
export const deleteQnaAnswer = async (answerId: number): Promise<void> => {
  const { error } = await supabase
    .from('qna_answers')
    .delete()
    .eq('id', answerId);

  if (error) {
    throw new Error(`답변 삭제 실패: ${error.message}`);
  }
};

// QnA 카테고리 목록
export const QNA_CATEGORIES: QnaCategoryType[] = [
  '일반질문',
  '시험문의',
  '공부방법',
  '시험정보',
  '합격후기',
  '기타',
];

// QnA 정렬 옵션
export const QNA_SORT_OPTIONS = [
  { value: 'latest' as QnaSortType, label: '최신순' },
  { value: 'oldest' as QnaSortType, label: '오래된순' },
  { value: 'views' as QnaSortType, label: '조회수순' },
  { value: 'answers' as QnaSortType, label: '답변많은순' },
  { value: 'resolved' as QnaSortType, label: '해결된순' },
];

// 실시간 구독 관련 함수들
export const subscribeToQnaPosts = (callback: (payload: unknown) => void) => {
  return supabase
    .channel('qna_posts_changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'qna_posts',
      },
      callback
    )
    .subscribe();
};

export const subscribeToQnaAnswers = (
  postId: number,
  callback: (payload: unknown) => void
) => {
  return supabase
    .channel(`qna_answers_${postId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'qna_answers',
        filter: `qna_post_id=eq.${postId}`,
      },
      callback
    )
    .subscribe();
};

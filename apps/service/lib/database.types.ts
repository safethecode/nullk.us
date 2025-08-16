export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      inquiries: {
        Row: {
          id: number;
          title: string;
          content: string;
          author: string;
          phone: string | null;
          category: string;
          views: number;
          is_answered: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          title: string;
          content: string;
          author: string;
          phone?: string | null;
          category?: string;
          views?: number;
          is_answered?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          title?: string;
          content?: string;
          author?: string;
          phone?: string | null;
          category?: string;
          views?: number;
          is_answered?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      inquiry_replies: {
        Row: {
          id: number;
          inquiry_id: number;
          content: string;
          author: string;
          is_admin: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          inquiry_id: number;
          content: string;
          author: string;
          is_admin?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          inquiry_id?: number;
          content?: string;
          author?: string;
          is_admin?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'inquiry_replies_inquiry_id_fkey';
            columns: ['inquiry_id'];
            isOneToOne: false;
            referencedRelation: 'inquiries';
            referencedColumns: ['id'];
          },
        ];
      };
      qna_posts: {
        Row: {
          id: number;
          title: string;
          content: string;
          author: string;
          category: string;
          views: number;
          is_resolved: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          title: string;
          content: string;
          author: string;
          category?: string;
          views?: number;
          is_resolved?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          title?: string;
          content?: string;
          author?: string;
          category?: string;
          views?: number;
          is_resolved?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      qna_answers: {
        Row: {
          id: number;
          qna_post_id: number;
          content: string;
          author: string;
          likes: number;
          dislikes: number;
          is_accepted: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          qna_post_id: number;
          content: string;
          author: string;
          likes?: number;
          dislikes?: number;
          is_accepted?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          qna_post_id?: number;
          content?: string;
          author?: string;
          likes?: number;
          dislikes?: number;
          is_accepted?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'qna_answers_qna_post_id_fkey';
            columns: ['qna_post_id'];
            isOneToOne: false;
            referencedRelation: 'qna_posts';
            referencedColumns: ['id'];
          },
        ];
      };
      qna_answer_votes: {
        Row: {
          id: number;
          answer_id: number;
          user_identifier: string;
          vote_type: string;
          created_at: string;
        };
        Insert: {
          id?: number;
          answer_id: number;
          user_identifier: string;
          vote_type: string;
          created_at?: string;
        };
        Update: {
          id?: number;
          answer_id?: number;
          user_identifier?: string;
          vote_type?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'qna_answer_votes_answer_id_fkey';
            columns: ['answer_id'];
            isOneToOne: false;
            referencedRelation: 'qna_answers';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      increment_qna_views: {
        Args: {
          qna_id: number;
        };
        Returns: void;
      };
      toggle_answer_vote: {
        Args: {
          p_answer_id: number;
          p_user_identifier: string;
          p_vote_type: string;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

// 앱에서 사용할 타입들
export type Inquiry = Database['public']['Tables']['inquiries']['Row'];
export type InquiryInsert = Database['public']['Tables']['inquiries']['Insert'];
export type InquiryUpdate = Database['public']['Tables']['inquiries']['Update'];

export type InquiryReply =
  Database['public']['Tables']['inquiry_replies']['Row'];
export type InquiryReplyInsert =
  Database['public']['Tables']['inquiry_replies']['Insert'];
export type InquiryReplyUpdate =
  Database['public']['Tables']['inquiry_replies']['Update'];

// QnA 타입들
export type QnaPost = Database['public']['Tables']['qna_posts']['Row'];
export type QnaPostInsert = Database['public']['Tables']['qna_posts']['Insert'];
export type QnaPostUpdate = Database['public']['Tables']['qna_posts']['Update'];

export type QnaAnswer = Database['public']['Tables']['qna_answers']['Row'];
export type QnaAnswerInsert =
  Database['public']['Tables']['qna_answers']['Insert'];
export type QnaAnswerUpdate =
  Database['public']['Tables']['qna_answers']['Update'];

export type QnaAnswerVote =
  Database['public']['Tables']['qna_answer_votes']['Row'];
export type QnaAnswerVoteInsert =
  Database['public']['Tables']['qna_answer_votes']['Insert'];
export type QnaAnswerVoteUpdate =
  Database['public']['Tables']['qna_answer_votes']['Update'];

// 조인된 데이터 타입
export type InquiryWithReplies = Inquiry & {
  inquiry_replies: InquiryReply[];
};

export type QnaPostWithAnswers = QnaPost & {
  qna_answers: (QnaAnswer & {
    userVote?: 'like' | 'dislike' | null;
  })[];
  answersCount: number;
};

export type QnaPostWithPreview = QnaPost & {
  answersCount: number;
  acceptedAnswer?: {
    id: number;
    content: string;
    author: string;
    created_at: string;
    likes: number;
    dislikes: number;
  } | null;
};

export type QnaAnswerWithVote = QnaAnswer & {
  userVote?: 'like' | 'dislike' | null;
};

// 카테고리 타입
export type CategoryType =
  | '일반문의'
  | '문제오류'
  | '시험문의'
  | '기술문의'
  | '기타';

export type QnaCategoryType =
  | '일반질문'
  | '시험문의'
  | '공부방법'
  | '시험정보'
  | '합격후기'
  | '기타';

// 정렬 타입
export type SortType = 'latest' | 'oldest' | 'views' | 'answered';
export type QnaSortType =
  | 'latest'
  | 'oldest'
  | 'views'
  | 'answers'
  | 'resolved';

// 투표 타입
export type VoteType = 'like' | 'dislike';

// API 응답 타입
export type VoteResult = {
  likes: number;
  dislikes: number;
  userVote: VoteType | null;
};

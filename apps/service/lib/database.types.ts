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
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
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

// 조인된 데이터 타입
export type InquiryWithReplies = Inquiry & {
  inquiry_replies: InquiryReply[];
};

// 카테고리 타입
export type CategoryType =
  | '일반문의'
  | '문제오류'
  | '시험문의'
  | '기술문의'
  | '기타';

// 정렬 타입
export type SortType = 'latest' | 'oldest' | 'views' | 'answered';

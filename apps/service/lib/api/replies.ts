import type {
  InquiryReply,
  InquiryReplyInsert,
  InquiryReplyUpdate,
} from '../database.types';
import { supabase } from '../supabase';

// 특정 문의의 답변 목록 조회
export async function getInquiryReplies(
  inquiryId: number
): Promise<InquiryReply[]> {
  const { data, error } = await supabase
    .from('inquiry_replies')
    .select('*')
    .eq('inquiry_id', inquiryId)
    .order('created_at', { ascending: true });

  if (error) {
    throw error;
  }

  return data as InquiryReply[];
}

// 새 답변 생성
export async function createInquiryReply(
  reply: InquiryReplyInsert
): Promise<InquiryReply> {
  const { data, error } = await supabase
    .from('inquiry_replies')
    .insert(reply)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as InquiryReply;
}

// 답변 수정
export async function updateInquiryReply(
  id: number,
  updates: InquiryReplyUpdate
): Promise<InquiryReply> {
  const { data, error } = await supabase
    .from('inquiry_replies')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as InquiryReply;
}

// 답변 삭제
export async function deleteInquiryReply(id: number): Promise<void> {
  const { error } = await supabase
    .from('inquiry_replies')
    .delete()
    .eq('id', id);

  if (error) {
    throw error;
  }
}

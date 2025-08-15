import type {
  CategoryType,
  Inquiry,
  InquiryInsert,
  InquiryUpdate,
  InquiryWithReplies,
  SortType,
} from '../database.types';
import { supabase } from '../supabase';

// 문의 목록 조회 (검색, 필터링, 정렬 포함)
export async function getInquiries({
  searchTerm = '',
  category = '전체',
  sortBy = 'latest' as SortType,
  page = 1,
  itemsPerPage = 10,
}: {
  searchTerm?: string;
  category?: CategoryType | '전체';
  sortBy?: SortType;
  page?: number;
  itemsPerPage?: number;
} = {}) {
  let query = supabase.from('inquiries').select('*');

  // 검색 조건
  if (searchTerm) {
    query = query.or(
      `title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%,author.ilike.%${searchTerm}%`
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
    case 'answered':
      query = query.order('is_answered', { ascending: false });
      break;
    default:
      query = query.order('created_at', { ascending: false });
      break;
  }

  // 페이지네이션
  const from = (page - 1) * itemsPerPage;
  const to = from + itemsPerPage - 1;

  const { data, error, count } = await query
    .range(from, to)
    .select('*', { count: 'exact' });

  if (error) {
    throw error;
  }

  return {
    data: data as Inquiry[],
    total: count || 0,
    page,
    totalPages: Math.ceil((count || 0) / itemsPerPage),
  };
}

// 특정 문의 조회 (답변 포함)
export async function getInquiryWithReplies(
  id: number
): Promise<InquiryWithReplies | null> {
  const { data, error } = await supabase
    .from('inquiries')
    .select(`
      *,
      inquiry_replies (*)
    `)
    .eq('id', id)
    .order('created_at', {
      referencedTable: 'inquiry_replies',
      ascending: true,
    })
    .maybeSingle();

  if (error) {
    console.error('Supabase error:', error);
    throw error;
  }

  if (!data) {
    throw new Error(`Inquiry with ID ${id} not found`);
  }

  return data as InquiryWithReplies;
}

// 문의 조회수 증가
export async function incrementInquiryViews(id: number) {
  console.log('Incrementing views for inquiry ID:', id);

  // 현재 조회수 가져오기
  const { data: currentData, error: selectError } = await supabase
    .from('inquiries')
    .select('views')
    .eq('id', id)
    .single();

  if (selectError) {
    console.error('Failed to get current views:', selectError);
    console.error(
      'Select error details:',
      JSON.stringify(selectError, null, 2)
    );
    return;
  }

  const currentViews = currentData?.views || 0;
  console.log('Current views:', currentViews);

  // 조회수 직접 업데이트
  const { data: updateData, error: updateError } = await supabase
    .from('inquiries')
    .update({
      views: currentViews + 1,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select('views');

  if (updateError) {
    console.error('Failed to increment views:', updateError);
    console.error(
      'Update error details:',
      JSON.stringify(updateError, null, 2)
    );
    console.error('Update error code:', updateError.code);
    console.error('Update error message:', updateError.message);
  } else {
    console.log('Views updated successfully:', updateData);
    console.log('New views count:', updateData?.[0]?.views);
  }
}

// 새 문의 생성
export async function createInquiry(inquiry: InquiryInsert): Promise<Inquiry> {
  const { data, error } = await supabase
    .from('inquiries')
    .insert(inquiry)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as Inquiry;
}

// 문의 수정
export async function updateInquiry(
  id: number,
  updates: InquiryUpdate
): Promise<Inquiry> {
  const { data, error } = await supabase
    .from('inquiries')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as Inquiry;
}

// 문의 삭제
export async function deleteInquiry(id: number): Promise<void> {
  const { error } = await supabase.from('inquiries').delete().eq('id', id);

  if (error) {
    throw error;
  }
}

import type {
  BookType,
  DownloadLogInsert,
  GradeType,
  ProblemBook,
  ProblemBookInsert,
  SubjectType,
} from '../database.types';
import { supabase } from '../supabase';

// 문제집 목록 조회 (공개된 것 + 공개 예정인 것)
export async function getProblemBooks(): Promise<ProblemBook[]> {
  // 모든 문제집을 한 번에 조회 (RLS 우회)
  const { data: allBooks, error } = await supabase
    .from('problem_books')
    .select('*');

  if (error) {
    console.error('Error fetching all books:', error);
    throw new Error('문제집 목록을 가져오는데 실패했습니다.');
  }

  console.log('Raw data from DB:', allBooks);

  // 클라이언트에서 필터링
  const filteredBooks = (allBooks || []).filter((book) => {
    // 공개된 것 또는 공개 예정인 것 (public_date가 null이 아닌 것)
    return book.is_public === true || book.public_date !== null;
  });

  // 공개 예정인 것들의 file_path 제거
  const processedBooks = filteredBooks.map((book) => {
    if (book.is_public === false && book.public_date !== null) {
      // 공개 예정인 경우 file_path 제거
      const { file_path, ...bookWithoutFilePath } = book;
      return bookWithoutFilePath;
    }
    return book;
  });

  // 정렬: 공개된 것 먼저, 공개 예정은 공개일 빠른 순
  processedBooks.sort((a, b) => {
    // 1. 공개 상태로 먼저 정렬 (공개된 것이 위로)
    if (a.is_public !== b.is_public) {
      return b.is_public ? 1 : -1; // true가 false보다 우선
    }

    // 2. 공개된 것들 내에서는 최신순
    if (a.is_public && b.is_public) {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }

    // 3. 공개 예정 것들 내에서는 공개일 빠른 순
    if (!a.is_public && !b.is_public) {
      return (
        new Date(a.public_date).getTime() - new Date(b.public_date).getTime()
      );
    }

    return 0;
  });

  console.log('Filtered books:', processedBooks);

  return processedBooks;
}

// 특정 문제집 조회
export async function getProblemBook(id: number): Promise<ProblemBook | null> {
  const { data, error } = await supabase
    .from('problem_books')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null; // 데이터가 없는 경우
    }
    // console.error('Error fetching problem book:', error);
    throw new Error('문제집 정보를 가져오는데 실패했습니다.');
  }

  // 공개된 것이거나 공개 예정인 것만 반환
  if (data && (data.is_public || data.public_date !== null)) {
    return data;
  }

  return null;
}

// 필터링된 문제집 목록 조회
export async function getFilteredProblemBooks(filters: {
  subject?: SubjectType;
  grade?: GradeType;
  type?: BookType;
}): Promise<ProblemBook[]> {
  // 모든 문제집을 가져온 후 클라이언트에서 필터링
  const allBooks = await getProblemBooks();

  return allBooks.filter((book) => {
    if (filters.subject && book.subject !== filters.subject) {
      return false;
    }
    if (filters.grade && book.grade !== filters.grade) {
      return false;
    }
    if (filters.type && book.type !== filters.type) {
      return false;
    }
    return true;
  });
}

// Supabase Storage에서 파일 다운로드 URL 생성
export async function getDownloadUrl(filePath: string): Promise<string> {
  const { data, error } = await supabase.storage
    .from('problem-books')
    .createSignedUrl(filePath, 3600); // 1시간 유효

  if (error) {
    // console.error('Error creating download URL:', error);
    throw new Error('다운로드 링크 생성에 실패했습니다.');
  }

  return data.signedUrl;
}

// 다운로드 로그 기록 및 다운로드 카운트 증가
export async function recordDownload(
  bookId: number,
  userInfo: {
    name: string;
    organization: string;
    email: string;
    phone?: string;
  }
): Promise<{ downloadUrl: string; book: ProblemBook }> {
  // 1. 문제집 정보 확인
  const book = await getProblemBook(bookId);
  if (!book) {
    throw new Error('존재하지 않는 문제집입니다.');
  }

  // 2. 다운로드 로그 기록
  const downloadLog: DownloadLogInsert = {
    book_id: bookId,
    name: userInfo.name,
    organization: userInfo.organization,
    email: userInfo.email,
    phone: userInfo.phone || null,
  };

  const { error: logError } = await supabase
    .from('download_logs')
    .insert([downloadLog]);

  if (logError) {
    // console.error('Error recording download log:', logError);
    throw new Error('다운로드 기록에 실패했습니다.');
  }

  // 3. 다운로드 카운트 증가
  const { error: countError } = await supabase.rpc('increment_book_downloads', {
    book_id: bookId,
  });

  if (countError) {
    // console.error('Error incrementing download count:', countError);
    // 다운로드 카운트 실패는 중요하지 않으므로 에러를 throw하지 않음
  }

  // 4. 다운로드 URL 생성
  const downloadUrl = await getDownloadUrl(book.file_path);

  return {
    downloadUrl,
    book: {
      ...book,
      downloads: book.downloads + 1, // 클라이언트에서 즉시 반영
    },
  };
}

// 문제집 추가 (관리자용)
export async function createProblemBook(
  bookData: ProblemBookInsert
): Promise<ProblemBook> {
  const { data, error } = await supabase
    .from('problem_books')
    .insert([bookData])
    .select()
    .single();

  if (error) {
    // console.error('Error creating problem book:', error);
    throw new Error('문제집 생성에 실패했습니다.');
  }

  return data;
}

// 문제집 수정 (관리자용)
export async function updateProblemBook(
  id: number,
  updates: Partial<ProblemBookInsert>
): Promise<ProblemBook> {
  const { data, error } = await supabase
    .from('problem_books')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    // console.error('Error updating problem book:', error);
    throw new Error('문제집 수정에 실패했습니다.');
  }

  return data;
}

// 문제집 삭제 (관리자용)
export async function deleteProblemBook(id: number): Promise<void> {
  const { error } = await supabase.from('problem_books').delete().eq('id', id);

  if (error) {
    // console.error('Error deleting problem book:', error);
    throw new Error('문제집 삭제에 실패했습니다.');
  }
}

// 다운로드 통계 조회 (관리자용)
export async function getDownloadStats(bookId?: number) {
  let query = supabase.from('download_logs').select(`
      *,
      problem_books (
        title,
        subject,
        grade,
        type
      )
    `);

  if (bookId) {
    query = query.eq('book_id', bookId);
  }

  const { data, error } = await query.order('downloaded_at', {
    ascending: false,
  });

  if (error) {
    // console.error('Error fetching download stats:', error);
    throw new Error('다운로드 통계를 가져오는데 실패했습니다.');
  }

  return data || [];
}

// 파일 업로드 (관리자용)
export async function uploadProblemBookFile(
  file: File,
  fileName: string
): Promise<string> {
  const filePath = `${Date.now()}-${fileName}`;

  const { data, error } = await supabase.storage
    .from('problem-books')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    // console.error('Error uploading file:', error);
    throw new Error('파일 업로드에 실패했습니다.');
  }

  return data.path;
}

// 파일 삭제 (관리자용)
export async function deleteProblemBookFile(filePath: string): Promise<void> {
  const { error } = await supabase.storage
    .from('problem-books')
    .remove([filePath]);

  if (error) {
    // console.error('Error deleting file:', error);
    throw new Error('파일 삭제에 실패했습니다.');
  }
}

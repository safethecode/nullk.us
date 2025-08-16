'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { type ReactNode, useState } from 'react';

// React Query 기본 설정
const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // 5분간 캐시 유지
        staleTime: 1000 * 60 * 5,
        // 10분간 가비지 컬렉션 방지
        gcTime: 1000 * 60 * 10,
        // 네트워크 에러 시 재시도 (3번)
        retry: 3,
        // 백그라운드에서 포커스 시 재검증
        refetchOnWindowFocus: false,
        // 마운트 시 재검증
        refetchOnMount: true,
        // 재연결 시 재검증
        refetchOnReconnect: true,
      },
      mutations: {
        // 뮤테이션 에러 시 재시도 안함
        retry: false,
      },
    },
  });
};

interface QueryProviderProps {
  children: ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  // useState를 사용하여 클라이언트마다 새로운 QueryClient 인스턴스 생성
  const [queryClient] = useState(() => createQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* 개발 환경에서만 React Query DevTools 표시 */}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-left"
        />
      )}
    </QueryClientProvider>
  );
}

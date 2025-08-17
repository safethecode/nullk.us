import { getInquiries } from '@/lib/api/inquiries';
import { getQnaPosts } from '@/lib/api/qna';
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://stage-engr.nullk.us';
  const currentDate = new Date();

  // 기본 페이지들
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/qna`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ask-me`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ];

  try {
    // 동적 QnA 페이지들
    const qnaPosts = await getQnaPosts({
      page: 1,
      limit: 1000, // 모든 게시글 가져오기
      sortBy: 'latest',
    });

    const qnaRoutes: MetadataRoute.Sitemap = qnaPosts.posts.map((post) => ({
      url: `${baseUrl}/qna/${post.id}`,
      lastModified: new Date(post.updated_at || post.created_at),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));

    // 동적 문의 페이지들
    const inquiries = await getInquiries({
      page: 1,
      itemsPerPage: 1000, // 모든 문의 가져오기
      sortBy: 'latest',
    });

    const inquiryRoutes: MetadataRoute.Sitemap = inquiries.data.map(
      (inquiry) => ({
        url: `${baseUrl}/ask-me/${inquiry.id}`,
        lastModified: new Date(inquiry.updated_at || inquiry.created_at),
        changeFrequency: 'weekly' as const,
        priority: 0.5,
      })
    );

    return [...staticRoutes, ...qnaRoutes, ...inquiryRoutes];
  } catch {
    // API 호출 실패 시 기본 라우트만 반환
    return staticRoutes;
  }
}

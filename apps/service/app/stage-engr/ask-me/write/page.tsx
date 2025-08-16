'use client';

import { Button } from '@heiglabs/design-system/button';
import { Input } from '@heiglabs/design-system/input';
import { Textarea } from '@heiglabs/design-system/textarea';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type React from 'react';
import { useState } from 'react';
import { createInquiry } from '../../../../lib/api/inquiries';
import type { CategoryType } from '../../../../lib/database.types';

export default function WriteInquiry() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    phone: '',
    category: '일반문의' as CategoryType,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const categories: CategoryType[] = [
    '일반문의',
    '문제오류',
    '시험문의',
    '기술문의',
    '기타',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 필수 필드 검증
    if (
      !formData.title.trim() ||
      !formData.content.trim() ||
      !formData.author.trim()
    ) {
      setError('필수 항목을 모두 입력해주세요.');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const newInquiry = await createInquiry({
        title: formData.title.trim(),
        content: formData.content.trim(),
        author: formData.author.trim(),
        phone: formData.phone.trim() || null,
        category: formData.category,
      });

      // 성공 시 생성된 문의 상세 페이지로 이동
      router.push(`/ask-me/${newInquiry.id}`);
    } catch (err) {
      setError('문의 등록에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <>
      {/* Header */}
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

      {/* Page Title */}
      <div className="mb-8 border border-neutral-200 bg-white">
        <div className="border-neutral-100 border-b bg-neutral-50 px-6 py-4">
          <h1 className="font-semibold text-neutral-800 text-xl">문의 작성</h1>
        </div>
        <div className="px-6 py-4">
          <p className="text-neutral-600 text-sm leading-relaxed">
            무대예술전문인 자격시험 관련 문의사항을 작성해주세요.
            <br />
            문제집 오류, 시험 정보, 기술적 문제 등 언제든 문의해주시면 빠르게
            답변드리겠습니다.
          </p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* Write Form */}
      <div className="border border-neutral-200 bg-white">
        <div className="border-neutral-200 border-b bg-neutral-50 px-6 py-3">
          <h2 className="font-semibold text-neutral-800">문의 정보</h2>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="author"
                  className="mb-2 block font-medium text-neutral-700 text-sm"
                >
                  작성자 <span className="text-red-500">*</span>
                </label>
                <Input
                  id="author"
                  type="text"
                  placeholder="닉네임을 입력하세요"
                  value={formData.author}
                  onChange={(e) =>
                    setFormData({ ...formData, author: e.target.value })
                  }
                  className="border-neutral-300 bg-white focus:border-neutral-400"
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block font-medium text-neutral-700 text-sm"
                >
                  전화번호
                </label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="010-0000-0000"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="border-neutral-300 bg-white focus:border-neutral-400"
                  disabled={loading}
                />
                <p className="mt-1 text-neutral-500 text-xs">
                  답변 알림을 받을 전화번호를 입력해주세요 (선택사항)
                </p>
              </div>
            </div>
            <div>
              <label
                htmlFor="category"
                className="mb-2 block font-medium text-neutral-700 text-sm"
              >
                카테고리 <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value as CategoryType,
                  })
                }
                className="flex h-9 w-full rounded-md border border-neutral-300 bg-white px-3 py-1 text-sm shadow-xs transition-colors focus-visible:border-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400/20"
                required
                disabled={loading}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="title"
                className="mb-2 block font-medium text-neutral-700 text-sm"
              >
                제목 <span className="text-red-500">*</span>
              </label>
              <Input
                id="title"
                type="text"
                placeholder="문의 제목을 입력하세요"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="border-neutral-300 bg-white focus:border-neutral-400"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label
                htmlFor="content"
                className="mb-2 block font-medium text-neutral-700 text-sm"
              >
                내용 <span className="text-red-500">*</span>
              </label>
              <Textarea
                id="content"
                placeholder="문의 내용을 자세히 입력해주세요"
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                className="min-h-40 border-neutral-300 bg-white focus:border-neutral-400"
                required
                disabled={loading}
              />
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                className="border-neutral-300 text-neutral-600 hover:bg-neutral-50"
                onClick={handleCancel}
                disabled={loading}
              >
                취소
              </Button>
              <Button
                type="submit"
                className="bg-neutral-800 text-white hover:bg-neutral-700 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? '등록 중...' : '문의 등록'}
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Guidelines */}
      <div className="mt-8 border border-neutral-200 bg-neutral-50">
        <div className="px-6 py-4">
          <h3 className="mb-3 font-semibold text-neutral-800">
            📌 문의 작성 안내
          </h3>
          <ul className="space-y-2 text-neutral-600 text-sm">
            <li>• 문의 답변은 보통 1-2일 내에 처리됩니다.</li>
            <li>
              • 문제집 오류 신고 시 구체적인 문제 번호와 내용을 명시해주세요.
            </li>
            <li>• 답변 알림은 입력하신 전화번호로 SMS를 발송합니다.</li>
            <li>• 긴급한 문의사항은 이메일로 직접 연락 부탁드립니다.</li>
            <li>• 개인정보가 포함된 내용은 문의하지 말아주세요.</li>
          </ul>
        </div>
      </div>
    </>
  );
}

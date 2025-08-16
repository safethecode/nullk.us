'use client';

import { Button } from '@heiglabs/design-system/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@heiglabs/design-system/dialog';
import { Input } from '@heiglabs/design-system/input';
import { Label } from '@heiglabs/design-system/label';
import { useState } from 'react';
import { recordDownload } from '../../../lib/api/problem-books';
import type { ProblemBook } from '../../../lib/database.types';

// 유효성 검사 패턴
const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const PHONE_PATTERN = /^[0-9-+\s()]{10,}$/;

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: ProblemBook | null;
  onDownloadSuccess?: (book: ProblemBook) => void;
}

interface UserInfo {
  name: string;
  organization: string;
  email: string;
  phone: string;
}

const INITIAL_USER_INFO: UserInfo = {
  name: '',
  organization: '',
  email: '',
  phone: '',
};

export function DownloadModal({
  isOpen,
  onClose,
  book,
  onDownloadSuccess,
}: DownloadModalProps) {
  const [userInfo, setUserInfo] = useState<UserInfo>(INITIAL_USER_INFO);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<UserInfo>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<UserInfo> = {};

    if (!userInfo.name.trim()) {
      newErrors.name = '이름을 입력해주세요.';
    }

    if (!userInfo.organization.trim()) {
      newErrors.organization = '소속을 입력해주세요.';
    }

    if (!userInfo.email.trim()) {
      newErrors.email = '이메일을 입력해주세요.';
    } else if (!EMAIL_PATTERN.test(userInfo.email)) {
      newErrors.email = '올바른 이메일 형식을 입력해주세요.';
    }

    // 전화번호는 선택사항이지만, 입력한 경우 유효성 검사
    if (
      userInfo.phone.trim() &&
      !PHONE_PATTERN.test(userInfo.phone.replace(/\s/g, ''))
    ) {
      newErrors.phone = '올바른 전화번호 형식을 입력해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDownload = async () => {
    if (!book || !validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const result = await recordDownload(book.id, {
        name: userInfo.name.trim(),
        organization: userInfo.organization.trim(),
        email: userInfo.email.trim(),
        phone: userInfo.phone.trim() || undefined,
      });

      // 새 탭에서 다운로드 시작
      window.open(result.downloadUrl, '_blank');

      // 성공 콜백 호출
      onDownloadSuccess?.(result.book);

      // 모달 닫기 및 폼 초기화
      handleClose();
    } catch (error) {
      // Error handling without console
      alert(
        error instanceof Error ? error.message : '다운로드에 실패했습니다.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setUserInfo(INITIAL_USER_INFO);
    setErrors({});
    onClose();
  };

  const updateUserInfo = (field: keyof UserInfo, value: string) => {
    setUserInfo((prev) => ({ ...prev, [field]: value }));
    // 해당 필드의 에러 제거
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  if (!book) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-neutral-800">
            문제집 다운로드
          </DialogTitle>
          <DialogDescription className="text-neutral-600">
            <span className="font-medium text-neutral-800">{book.title}</span>
            <br />
            다운로드를 위해 정보를 입력해주세요.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-neutral-700">
              이름 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              value={userInfo.name}
              onChange={(e) => updateUserInfo('name', e.target.value)}
              placeholder="홍길동"
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="organization" className="text-neutral-700">
              소속 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="organization"
              value={userInfo.organization}
              onChange={(e) => updateUserInfo('organization', e.target.value)}
              placeholder="예: 서울대학교, 삼성전자, 개인"
              className={errors.organization ? 'border-red-500' : ''}
            />
            {errors.organization && (
              <p className="text-red-500 text-sm">{errors.organization}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-neutral-700">
              이메일 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={userInfo.email}
              onChange={(e) => updateUserInfo('email', e.target.value)}
              placeholder="example@email.com"
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-neutral-700">
              전화번호 <span className="text-neutral-400">(선택)</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              value={userInfo.phone}
              onChange={(e) => updateUserInfo('phone', e.target.value)}
              placeholder="010-1234-5678"
              className={errors.phone ? 'border-red-500' : ''}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>

          <div className="rounded-md bg-blue-50 p-3">
            <p className="text-blue-800 text-sm">
              📋 수집된 정보는 다운로드 통계 및 문제집 개선을 위해서만
              사용됩니다.
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isLoading}
            className="text-neutral-600"
          >
            취소
          </Button>
          <Button
            onClick={handleDownload}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isLoading ? '처리 중...' : '다운로드'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

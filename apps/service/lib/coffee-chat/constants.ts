import type { FormData } from './types';

// Form configuration
export const FORM_FIELDS = {
  name: {
    label: '이름',
    placeholder: '이름을 입력해주세요',
    required: true,
  },
  company: {
    label: '소속',
    placeholder: '회사 또는 팀명을 입력해주세요',
    required: true,
  },
  email: {
    label: '이메일',
    placeholder: '이메일 주소를 입력해주세요',
    type: 'email' as const,
    required: true,
  },
  message: {
    label: '메시지',
    placeholder: '간단한 자기소개나 궁금한 점을 적어주세요',
    type: 'textarea' as const,
  },
} as const;

export const MEETING_TYPES = [
  { value: 'remote', label: '원격 (온라인)' },
  { value: 'in-person', label: '대면 (오프라인)' },
] as const;

export const INITIAL_FORM_DATA: FormData = {
  name: '',
  company: '',
  email: '',
  meetingType: 'remote',
  message: '',
};

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const MEETING_TYPE_VALUES = ['remote', 'in-person'] as const;

export const EMAIL_CONFIG = {
  FROM: '커피챗 요청 <noreply@coffee.nullk.us>',
  TO: 'sam@nullk.us',
  SUBJECT_PREFIX: '[삼손]',
} as const;

export const ERROR_MESSAGES = {
  MISSING_FIELDS: '필수 필드가 누락되었습니다.',
  INVALID_EMAIL: '올바른 이메일 형식이 아닙니다.',
  INVALID_MEETING_TYPE: '올바른 미팅 형태를 선택해주세요.',
  EMAIL_SEND_FAILED: '이메일 전송에 실패했습니다.',
  SERVER_ERROR: '서버 오류가 발생했습니다.',
} as const;

export const SUCCESS_MESSAGES = {
  COFFEE_CHAT_SENT: '커피챗 요청이 성공적으로 전송되었습니다.',
} as const;

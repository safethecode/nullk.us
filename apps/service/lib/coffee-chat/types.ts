import type { MEETING_TYPE_VALUES } from './constants';

export type MeetingType = (typeof MEETING_TYPE_VALUES)[number];

export interface FormData {
  name: string;
  company: string;
  email: string;
  meetingType: MeetingType;
  message: string;
}

export interface CoffeeChatRequest {
  name: string;
  company: string;
  email: string;
  meetingType: MeetingType;
  message?: string;
}

export interface ApiResponse {
  message: string;
  data?: {
    id: string;
    requesterName: string;
    requesterEmail: string;
  };
}

export interface ApiError {
  error: string;
  details?: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface SuccessResponseData {
  id?: string;
  requesterName: string;
  requesterEmail: string;
}

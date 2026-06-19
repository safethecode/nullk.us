import type { MEETING_TYPE_VALUES } from "./constants";

export type MeetingType = (typeof MEETING_TYPE_VALUES)[number];

export interface FormData {
  company: string;
  email: string;
  meetingType: MeetingType;
  message: string;
  name: string;
}

export interface CoffeeChatRequest {
  company: string;
  email: string;
  meetingType: MeetingType;
  message?: string;
  name: string;
}

export interface ApiResponse {
  data?: {
    id: string;
    requesterName: string;
    requesterEmail: string;
  };
  message: string;
}

export interface ApiError {
  details?: ValidationError[];
  error: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface SuccessResponseData {
  id?: string;
  requesterEmail: string;
  requesterName: string;
}

import { EMAIL_REGEX, ERROR_MESSAGES, MEETING_TYPE_VALUES } from "./constants";
import type { CoffeeChatRequest, MeetingType, ValidationError } from "./types";

export function validateRequiredFields(
  data: Partial<CoffeeChatRequest>
): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!data.name?.trim()) {
    errors.push({ field: "name", message: "이름을 입력해주세요." });
  }

  if (!data.company?.trim()) {
    errors.push({ field: "company", message: "회사명을 입력해주세요." });
  }

  if (!data.email?.trim()) {
    errors.push({ field: "email", message: "이메일을 입력해주세요." });
  }

  if (!data.meetingType) {
    errors.push({ field: "meetingType", message: "미팅 형태를 선택해주세요." });
  }

  return errors;
}

export function validateEmail(email: string): ValidationError[] {
  if (!EMAIL_REGEX.test(email)) {
    return [{ field: "email", message: ERROR_MESSAGES.INVALID_EMAIL }];
  }
  return [];
}

export function validateMeetingType(meetingType: string): ValidationError[] {
  if (!MEETING_TYPE_VALUES.includes(meetingType as MeetingType)) {
    return [
      { field: "meetingType", message: ERROR_MESSAGES.INVALID_MEETING_TYPE },
    ];
  }
  return [];
}

export function validateRequest(data: CoffeeChatRequest): ValidationError[] {
  const errors: ValidationError[] = [];

  errors.push(...validateRequiredFields(data));

  if (data.email) {
    errors.push(...validateEmail(data.email));
  }

  if (data.meetingType) {
    errors.push(...validateMeetingType(data.meetingType));
  }

  return errors;
}

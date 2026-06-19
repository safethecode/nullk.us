import { NextResponse } from "next/server";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "./constants";
import type { SuccessResponseData, ValidationError } from "./types";

export function createErrorResponse(errors: ValidationError[], status = 400) {
  return NextResponse.json(
    {
      error:
        errors.length === 1
          ? errors[0]?.message
          : ERROR_MESSAGES.MISSING_FIELDS,
      details: errors.length > 1 ? errors : undefined,
    },
    { status }
  );
}

export function createSuccessResponse(data: SuccessResponseData) {
  return NextResponse.json(
    {
      message: SUCCESS_MESSAGES.COFFEE_CHAT_SENT,
      data: {
        id: data.id,
        requesterName: data.requesterName,
        requesterEmail: data.requesterEmail,
      },
    },
    { status: 200 }
  );
}

export function formatKoreanDate(): string {
  return new Date().toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });
}

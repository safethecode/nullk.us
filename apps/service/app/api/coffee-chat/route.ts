import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { EMAIL_CONFIG, ERROR_MESSAGES } from "@/lib/coffee-chat/constants";
import type { CoffeeChatRequest } from "@/lib/coffee-chat/types";
import {
  createErrorResponse,
  createSuccessResponse,
  formatKoreanDate,
} from "@/lib/coffee-chat/utils";
import { validateRequest } from "@/lib/coffee-chat/validation";
import { CoffeeChatEmail } from "@/lib/resend/templates/coffee-chat-email";

export async function POST(request: NextRequest) {
  try {
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.EMAIL_SEND_FAILED },
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);
    const body: CoffeeChatRequest = await request.json();

    const validationErrors = validateRequest(body);

    if (validationErrors.length > 0) {
      return createErrorResponse(validationErrors);
    }

    const { name, company, email, meetingType, message } = body;

    const { data, error } = await resend.emails.send({
      from: EMAIL_CONFIG.FROM,
      to: EMAIL_CONFIG.TO,
      subject: `${EMAIL_CONFIG.SUBJECT_PREFIX} ${name}님이 커피챗을 요청하셨습니다`,
      react: CoffeeChatEmail({
        requesterName: name,
        requesterCompany: company,
        requesterEmail: email,
        meetingType,
        requestDate: formatKoreanDate(),
        message: message || "",
      }),
    });

    if (error) {
      return NextResponse.json(
        { error: `${error.message}, ${ERROR_MESSAGES.EMAIL_SEND_FAILED}` },
        { status: 500 }
      );
    }

    return createSuccessResponse({
      id: data?.id,
      requesterName: name,
      requesterEmail: email,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: `${error instanceof Error ? error.message : "Unknown error"}, ${ERROR_MESSAGES.SERVER_ERROR}`,
      },
      { status: 500 }
    );
  }
}

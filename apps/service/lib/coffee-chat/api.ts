import type { ApiError, ApiResponse, FormData } from "./types";

export async function submitCoffeeChatRequest(
  formData: FormData
): Promise<ApiResponse> {
  const response = await fetch("/api/coffee-chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (response.ok) {
    return data as ApiResponse;
  }

  const errorData = data as ApiError;
  throw new Error(errorData.error || "요청 전송에 실패했습니다.");
}

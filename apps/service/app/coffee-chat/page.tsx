"use client";

import confetti from "canvas-confetti";
import type React from "react";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { submitCoffeeChatRequest } from "@/lib/coffee-chat/api";
import { FORM_FIELDS, INITIAL_FORM_DATA } from "@/lib/coffee-chat/constants";
import type { FormData } from "@/lib/coffee-chat/types";
import { AnimatedActionButton } from "@/ui/animated-action-button";
import { FormField } from "@/ui/form-field";
import { MeetingTypeField } from "@/ui/meeting-type-field";

export default function CoffeeChatPage() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value } = e.target;

      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM_DATA);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      setIsSubmitting(true);

      try {
        const response = await submitCoffeeChatRequest(formData);

        toast.success(
          response.message || "커피챗 요청이 성공적으로 전송되었습니다!"
        );

        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: [
            "#FFD700",
            "#FFA500",
            "#FF6347",
            "#32CD32",
            "#1E90FF",
            "#9370DB",
          ],
        });

        resetForm();
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "요청 전송 중 오류가 발생했습니다.";

        toast.error(errorMessage);
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, resetForm]
  );

  return (
    <main className="mx-auto w-full max-w-[52rem] px-6 py-16 sm:px-8 lg:py-20">
      <h1 className="mb-2 font-bold text-[2rem] text-neutral-900 tracking-tight sm:text-4xl">
        커피챗
      </h1>
      <p className="mb-12 text-[15px] text-neutral-400">
        어떤 이야기라도 좋습니다. 서로의 경험과 인사이트를 나눠요.
      </p>

      <form className="space-y-5" noValidate onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField
            label={FORM_FIELDS.name.label}
            name="name"
            onChange={handleInputChange}
            placeholder={FORM_FIELDS.name.placeholder}
            required={FORM_FIELDS.name.required}
            value={formData.name}
          />
          <FormField
            label={FORM_FIELDS.company.label}
            name="company"
            onChange={handleInputChange}
            placeholder={FORM_FIELDS.company.placeholder}
            required={FORM_FIELDS.company.required}
            value={formData.company}
          />
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField
            label={FORM_FIELDS.email.label}
            name="email"
            onChange={handleInputChange}
            placeholder={FORM_FIELDS.email.placeholder}
            required={FORM_FIELDS.email.required}
            type={FORM_FIELDS.email.type}
            value={formData.email}
          />
          <MeetingTypeField
            onChange={handleInputChange}
            value={formData.meetingType}
          />
        </div>
        <FormField
          label={FORM_FIELDS.message.label}
          name="message"
          onChange={handleInputChange}
          placeholder={FORM_FIELDS.message.placeholder}
          type={FORM_FIELDS.message.type}
          value={formData.message}
        />
        <div className="pt-2">
          <AnimatedActionButton type="submit">
            {isSubmitting ? "전송 중..." : "커피챗 신청하기"}
          </AnimatedActionButton>
        </div>
      </form>
    </main>
  );
}

'use client';

import {
  FORM_FIELDS,
  type FormData,
  INITIAL_FORM_DATA,
  submitCoffeeChatRequest,
} from '@/lib/coffee-chat';
import { AnimatedActionButton } from '@/ui/animated-action-button';
import { FormField } from '@/ui/form-field';
import { MeetingTypeField } from '@/ui/meeting-type-field';
import confetti from 'canvas-confetti';
import type React from 'react';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';

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
          response.message || '커피챗 요청이 성공적으로 전송되었습니다!'
        );

        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: [
            '#FFD700',
            '#FFA500',
            '#FF6347',
            '#32CD32',
            '#1E90FF',
            '#9370DB',
          ],
        });

        resetForm();
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : '요청 전송 중 오류가 발생했습니다.';

        toast.error(errorMessage);
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, resetForm]
  );
  return (
    <main className="mx-auto max-w-4xl px-8 py-12">
      <div className="mb-8 text-left">
        <h1 className="mb-4 font-bold text-4xl text-gray-900">커피챗 요청</h1>
        <p className="text-gray-600 text-lg">
          어떤 이야기라도 좋습니다 ⎯ 서로의 경험과 인사이트를 공유하고 싶습니다.
        </p>
      </div>
      <section className="mx-auto w-full">
        <div className="rounded-3xl border border-gray-100 bg-gradient-to-br from-neutral-50 to-white p-8">
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                name="name"
                label={FORM_FIELDS.name.label}
                placeholder={FORM_FIELDS.name.placeholder}
                required={FORM_FIELDS.name.required}
                value={formData.name}
                onChange={handleInputChange}
              />
              <FormField
                name="company"
                label={FORM_FIELDS.company.label}
                placeholder={FORM_FIELDS.company.placeholder}
                required={FORM_FIELDS.company.required}
                value={formData.company}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                name="email"
                label={FORM_FIELDS.email.label}
                placeholder={FORM_FIELDS.email.placeholder}
                type={FORM_FIELDS.email.type}
                required={FORM_FIELDS.email.required}
                value={formData.email}
                onChange={handleInputChange}
              />
              <MeetingTypeField
                value={formData.meetingType}
                onChange={handleInputChange}
              />
            </div>
            <FormField
              name="message"
              label={FORM_FIELDS.message.label}
              placeholder={FORM_FIELDS.message.placeholder}
              type={FORM_FIELDS.message.type}
              value={formData.message}
              onChange={handleInputChange}
            />
            <div className="w-full pt-4">
              <AnimatedActionButton type="submit">
                {isSubmitting ? '전송 중...' : '커피(☕️) 마시기'}
              </AnimatedActionButton>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

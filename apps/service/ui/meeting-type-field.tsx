import { MEETING_TYPES } from '@/lib/coffee-chat';
import type React from 'react';

interface MeetingTypeFieldProps {
  value: 'remote' | 'in-person';
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function MeetingTypeField({ value, onChange }: MeetingTypeFieldProps) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor="meetingType"
        className="flex items-center gap-1 text-[13px] font-medium text-neutral-700"
      >
        미팅 형태
        <span className="text-red-400" aria-label="필수">
          *
        </span>
      </label>
      <select
        id="meetingType"
        name="meetingType"
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 text-[14px] text-neutral-900 transition-colors focus:border-neutral-400 focus:outline-none"
        aria-describedby="meetingType-description"
      >
        {MEETING_TYPES.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}

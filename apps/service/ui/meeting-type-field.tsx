import { MEETING_TYPES } from '@/lib/coffee-chat';
import type React from 'react';

interface MeetingTypeFieldProps {
  value: 'remote' | 'in-person';
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function MeetingTypeField({ value, onChange }: MeetingTypeFieldProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor="meetingType"
        className="flex items-center gap-1 font-semibold text-neutral-900"
      >
        미팅 형태
        <span className="text-red-500" aria-label="필수">
          *
        </span>
      </label>
      <select
        id="meetingType"
        name="meetingType"
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-neutral-900 transition-colors focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
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

import type React from "react";
import { MEETING_TYPES } from "@/lib/coffee-chat/constants";

interface MeetingTypeFieldProps {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: "remote" | "in-person";
}

export function MeetingTypeField({ value, onChange }: MeetingTypeFieldProps) {
  return (
    <div className="space-y-1.5">
      <label
        className="flex items-center gap-1 font-medium text-[13px] text-neutral-700"
        htmlFor="meetingType"
      >
        미팅 형태
        <span aria-hidden="true" className="text-red-400">
          *
        </span>
      </label>
      <select
        aria-describedby="meetingType-description"
        className="w-full rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 text-[14px] text-neutral-900 transition-colors focus:border-neutral-400 focus:outline-none"
        id="meetingType"
        name="meetingType"
        onChange={onChange}
        value={value}
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

import type React from "react";

interface FormFieldProps {
  label: string;
  name: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder: string;
  required?: boolean;
  type?: "text" | "email" | "textarea";
  value: string;
}

export function FormField({
  name,
  label,
  placeholder,
  required = false,
  type = "text",
  value,
  onChange,
}: FormFieldProps) {
  return (
    <div className="space-y-1.5">
      <label
        className="flex items-center gap-1 font-medium text-[13px] text-neutral-700"
        htmlFor={name}
      >
        {label}
        {required && (
          <span aria-hidden="true" className="text-red-400">
            *
          </span>
        )}
      </label>
      {type === "textarea" ? (
        <textarea
          aria-describedby={`${name}-description`}
          className="w-full resize-none rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 text-[14px] text-neutral-900 placeholder-neutral-300 transition-colors focus:border-neutral-400 focus:outline-none"
          id={name}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows={4}
          value={value}
        />
      ) : (
        <input
          aria-describedby={`${name}-description`}
          className="w-full rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 text-[14px] text-neutral-900 placeholder-neutral-300 transition-colors focus:border-neutral-400 focus:outline-none"
          id={name}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          type={type}
          value={value}
        />
      )}
    </div>
  );
}

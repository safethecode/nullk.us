import type React from 'react';

interface FormFieldProps {
  name: string;
  label: string;
  placeholder: string;
  required?: boolean;
  type?: 'text' | 'email' | 'textarea';
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export function FormField({
  name,
  label,
  placeholder,
  required = false,
  type = 'text',
  value,
  onChange,
}: FormFieldProps) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={name}
        className="flex items-center gap-1 text-[13px] font-medium text-neutral-700"
      >
        {label}
        {required && (
          <span className="text-red-400" aria-label="필수">
            *
          </span>
        )}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          rows={4}
          required={required}
          className="w-full resize-none rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 text-[14px] text-neutral-900 placeholder-neutral-300 transition-colors focus:border-neutral-400 focus:outline-none"
          placeholder={placeholder}
          aria-describedby={`${name}-description`}
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 text-[14px] text-neutral-900 placeholder-neutral-300 transition-colors focus:border-neutral-400 focus:outline-none"
          placeholder={placeholder}
          aria-describedby={`${name}-description`}
        />
      )}
    </div>
  );
}

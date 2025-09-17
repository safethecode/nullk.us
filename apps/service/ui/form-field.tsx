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
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="flex items-center gap-1 font-semibold text-neutral-900"
      >
        {label}
        {required && (
          <span className="text-red-500" aria-label="필수">
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
          className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-neutral-900 placeholder-neutral-500 transition-colors focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
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
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-neutral-900 placeholder-neutral-500 transition-colors focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
          placeholder={placeholder}
          aria-describedby={`${name}-description`}
        />
      )}
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Eye, EyeClosed } from 'lucide-react';

export interface AuthInputProps {
  label: string;
  id: string;
  name: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel';
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
}

export default function AuthInput({
  label,
  id,
  name,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  autoComplete,
  required,
}: AuthInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  const inputType = isPassword
    ? showPassword
      ? 'text'
      : 'password'
    : type;

  return (
    <div>
      <label htmlFor={id} className="block font-sans text-white/90 text-sm mb-1.5">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`
            w-full h-13 px-5 rounded-full bg-[rgba(255,255,255,0.85)] 
            text-[#061D46] placeholder-[#6B8AA4] border border-white/20 
            outline-none focus:outline-none focus:ring-2 focus:ring-offset-0
            transition-colors duration-200
            ${error 
              ? 'border-[#FFB4B4] focus:ring-[#FFB4B4]' 
              : 'focus:ring-[#3B6FD4]'}
            ${isPassword ? 'pr-12' : ''}
          `}
        />
        {isPassword && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B8AA4] hover:text-[#061D46] transition-colors"
            aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
          >
            {showPassword ? <EyeClosed size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="text-[#FFB4B4] text-xs mt-1.5">
          {error}
        </p>
      )}
    </div>
  );
}
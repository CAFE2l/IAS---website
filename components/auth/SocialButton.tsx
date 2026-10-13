'use client';

import { ReactNode } from 'react';

interface SocialButtonProps {
  label: string;
  icon: ReactNode;
}

export default function SocialButton({ label, icon }: SocialButtonProps) {
  return (
    <div className="relative w-full">
      <button
        type="button"
        disabled
        aria-label={`${label} — em breve`}
        className="
          auth-social w-full h-13 px-6 rounded-full
          border border-white/60 text-white font-sans text-sm font-medium
          outline-none cursor-not-allowed
          transition-colors duration-150
          hover:bg-white/15
        "
      >
        <span className="inline-flex items-center justify-center w-5 h-5 mr-2 flex-shrink-0">{icon}</span>
        {label}
      </button>
      <span className="auth-tooltip absolute">Em breve</span>
    </div>
  );
}
'use client';

import { motion, useReducedMotion } from 'framer-motion';

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  type?: 'submit' | 'button';
}

export default function PrimaryButton({
  children,
  onClick,
  disabled,
  isLoading,
  type = 'submit',
}: PrimaryButtonProps) {
  const reduced = useReducedMotion();
  const canAnimate = !reduced && !(disabled || isLoading);

  return (
    <motion.button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      whileHover={canAnimate ? { y: -2, scale: 1.02 } : undefined}
      whileTap={canAnimate ? { scale: 0.98 } : undefined}
      className="
        relative isolate w-full h-13 px-6 rounded-full 
        bg-[#06122B] text-white font-sans font-semibold text-base
        outline-none transition-all duration-200
        hover:shadow-[0_38px_76px_rgba(2,10,40,0.55)]
        active:translate-y-0
        disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none
      "
    >
      {isLoading && (
        <span className="absolute left-5 top-1/2 -translate-y-1/2">
          <span className="block w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
        </span>
      )}
      <span className={isLoading ? 'ml-7' : ''}>{children}</span>
    </motion.button>
  );
}
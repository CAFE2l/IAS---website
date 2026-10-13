'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useLayoutEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface AuthLayoutProps {
  children: React.ReactNode;
  backLink?: string;
  backText?: string;
}

export default function AuthLayout({ children, backLink = '/', backText = '← Voltar para o início' }: AuthLayoutProps) {
  const prefersReduced = useReducedMotion();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useLayoutEffect(() => {
    if (prefersReduced) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 15;
      const y = (e.clientY / window.innerHeight - 0.5) * 15;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [prefersReduced]);

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center px-4 sm:px-6">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-800 via-navy-700 to-navy-500" />

      {/* Back Link */}
      <Link
        href={backLink}
        className="absolute top-6 left-6 text-white/80 hover:text-white transition-colors duration-200 font-sans text-sm z-10"
      >
        {backText}
      </Link>

      {/* Premium Auth Card */}
      <motion.div
        className="auth-glass-card relative w-full max-w-md mx-auto px-6 sm:px-8 md:px-12 py-8 sm:py-10"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {/* Top Logo Badge */}
        <div className="flex justify-center mb-8">
          <motion.div
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center"
            animate={prefersReduced ? {} : {
              y: [0, -4, 0],
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {/* Frosted Glass Circular Badge */}
            <div
              className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center overflow-hidden"
              style={{
                background: 'rgba(255, 255, 255, 0.12)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                boxShadow: '0 8px 20px rgba(0, 43, 104, 0.25)',
              }}
            >
              <Image
                src="/3D.png"
                alt="Icone do Instituto de Aprendizado Social"
                width={48}
                height={48}
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* Form Content */}
        {children}
      </motion.div>
    </div>
  );
}
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

      {/* Refined Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Premium Glass Sphere - Subtly positioned to guide attention */}
        <motion.div
          className="absolute top-24 left-1/4 -translate-x-1/4 w-48 h-48 sm:w-56 sm:h-56 rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(147, 176, 255, 0.08) 0%, rgba(8, 43, 104, 0.05) 40%, transparent 70%)',
            backdropFilter: 'blur(40px)',
            WebkitBackdropFilter: 'blur(40px)',
            boxShadow: '0 0 40px rgba(2, 10, 40, 0.1), inset 0 0 20px rgba(255, 255, 255, 0.03)',
          }}
          animate={prefersReduced ? {} : {
            y: [0, -6, 0],
            scale: [1, 1.03, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Soft Geometric Form - Bottom Right */}
        <motion.div
          className="absolute bottom-32 right-1/4 -translate-x-1/4 w-64 h-64 sm:w-80 sm:h-80 rounded-3xl"
          style={{
            background: 'radial-gradient(circle at 40% 40%, rgba(79, 163, 255, 0.06) 0%, rgba(8, 43, 104, 0.08) 50%, transparent 70%)',
            backdropFilter: 'blur(40px)',
            WebkitBackdropFilter: 'blur(40px)',
            boxShadow: '0 0 50px rgba(2, 10, 40, 0.08), inset 0 0 25px rgba(255, 255, 255, 0.02)',
          }}
          animate={prefersReduced ? {} : {
            y: [0, 8, 0],
            scale: [1, 0.97, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </div>

      {/* Back Link */}
      <Link
        href={backLink}
        className="absolute top-6 left-6 text-white/80 hover:text-white transition-colors duration-200 font-sans text-sm z-10"
      >
        {backText}
      </Link>

      {/* Premium Auth Card - Expanded for Desktop */}
      <motion.div
        className="auth-glass-card relative w-full max-w-[1040px] mx-auto px-6 sm:px-8 md:px-12 py-10 md:py-12"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          transform: prefersReduced ? 'none' : `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`,
        }}
      >
        {/* Premium Logo Badge - Centered at Top */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 z-20"
          animate={prefersReduced ? {} : {
            y: [0, -6, 0],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {/* Frosted Glass Circular Badge - Single visual container for logo */}
          <div
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3), 0 8px 20px rgba(0, 40, 120, 0.25)',
            }}
          >
            {/* Subtle Inner Glow */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle at 30% 30%, rgba(147, 176, 255, 0.25) 0%, transparent 60%)',
              }}
            />

            {/* Logo with Clean Container */}
            <div
              className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center overflow-hidden"
              style={{
                background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.15) 0%, transparent 60%)',
              }}
            >
              <Image
                src="/3D.png"
                alt="I.A.S. Icon"
                width={48}
                height={48}
                className="w-12 h-12 sm:w-14 sm:h-14 object-contain"
                priority
              />
            </div>

            {/* Top-Left Light Highlight */}
            <div
              className="absolute top-0 left-0 w-full h-full rounded-full pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, transparent 50%)',
              }}
            />

            {/* Bottom-Right Depth Shadow */}
            <div
              className="absolute bottom-0 right-0 w-1/2 h-1/2 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle at 30% 30%, rgba(0, 40, 120, 0.3) 0%, transparent 60%)',
              }}
            />
          </div>
        </motion.div>

        {/* Content - Extra-Large Layout for Desktop */}
        <div className="pt-16 md:pt-20 pb-10 md:pb-12">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
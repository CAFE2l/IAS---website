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

      {/* Frosted Glass Geometric Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Left Frosted Glass Plane */}
        <motion.div
          className="absolute top-1/3 left-[-10%] w-96 h-80 bg-white/5 backdrop-blur-2xl rounded-3xl"
          style={{
            boxShadow: '0 8px 32px rgba(2, 10, 40, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          }}
          animate={prefersReduced ? {} : {
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Right Frosted Glass Plane */}
        <motion.div
          className="absolute top-2/3 right-[-10%] w-80 h-64 bg-white/5 backdrop-blur-2xl rounded-3xl"
          style={{
            boxShadow: '0 8px 32px rgba(2, 10, 40, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          }}
          animate={prefersReduced ? {} : {
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />

        {/* Soft Blurred Sphere - Top Center */}
        <motion.div
          className="absolute top-16 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(147, 176, 255, 0.15) 0%, rgba(8, 43, 104, 0.1) 40%, transparent 70%)',
            backdropFilter: 'blur(60px)',
            WebkitBackdropFilter: 'blur(60px)',
            boxShadow: '0 0 80px rgba(2, 10, 40, 0.15), inset 0 0 30px rgba(255, 255, 255, 0.05)',
          }}
          animate={prefersReduced ? {} : {
            y: [0, -8, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Soft Blurred Sphere - Bottom Left */}
        <motion.div
          className="absolute bottom-32 left-1/4 -translate-x-1/4 w-72 h-72 rounded-full"
          style={{
            background: 'radial-gradient(circle at 40% 40%, rgba(79, 163, 255, 0.12) 0%, rgba(8, 43, 104, 0.12) 50%, transparent 70%)',
            backdropFilter: 'blur(50px)',
            WebkitBackdropFilter: 'blur(50px)',
            boxShadow: '0 0 60px rgba(2, 10, 40, 0.1), inset 0 0 25px rgba(255, 255, 255, 0.03)',
          }}
          animate={prefersReduced ? {} : {
            y: [0, 6, 0],
            scale: [1, 0.95, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Back Link */}
      <Link
        href={backLink}
        className="absolute top-6 left-6 text-white/80 hover:text-white transition-colors duration-200 font-sans text-sm z-10"
      >
        {backText}
      </Link>

      {/* Glass Card */}
      <motion.div
        className="auth-glass-card relative w-full max-w-md mx-auto px-6 sm:px-8 md:px-12 py-10 md:py-12"
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
          {/* Frosted Glass Circular Badge */}
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

            {/* Logo with Inner Glow */}
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

        {/* Content */}
        <div className="pt-8 md:pt-6 pb-10 md:pb-12">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
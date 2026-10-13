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
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [prefersReduced]);

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center px-4 sm:px-6">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-800 via-navy-700 to-navy-500" />

      {/* Blurred Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-[100px]"
          style={{ 
            animation: prefersReduced ? 'none' : 'float-shape 8s ease-in-out infinite',
            animationDelay: '0s'
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-navy-400/25 rounded-full blur-[120px]"
          style={{ 
            animation: prefersReduced ? 'none' : 'float-shape 10s ease-in-out infinite',
            animationDelay: '2s'
          }}
        />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-300/15 rounded-full blur-[80px]"
          style={{ 
            animation: prefersReduced ? 'none' : 'float-shape 9s ease-in-out infinite',
            animationDelay: '4s'
          }}
        />
      </div>

      {/* CSS 3D Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Glossy Sphere - Top Left */}
        <motion.div
          className="absolute top-[8%] left-[10%] w-24 h-24 rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, rgba(59,111,212,0.3) 50%, rgba(8,43,104,0.4) 100%)',
            boxShadow: '0 8px 32px rgba(8,43,104,0.3), inset 0 -4px 12px rgba(0,0,0,0.2), inset 0 4px 12px rgba(255,255,255,0.1)',
          }}
          animate={prefersReduced ? {} : {
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Rounded Cube (Tilted Square) - Top Right */}
        <motion.div
          className="absolute top-[12%] right-[8%] w-20 h-20"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(59,111,212,0.2) 50%, rgba(8,43,104,0.35) 100%)',
            borderRadius: '16px',
            boxShadow: '0 12px 40px rgba(8,43,104,0.35), inset 0 -6px 16px rgba(0,0,0,0.25), inset 0 6px 16px rgba(255,255,255,0.12)',
          }}
          animate={prefersReduced ? {} : {
            y: [0, -25, 0],
            rotate: [0, -8, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />

        {/* Torus/Ring - Bottom Left */}
        <motion.div
          className="absolute bottom-[15%] left-[12%] w-28 h-28"
          style={{
            borderRadius: '50%',
            border: '12px solid',
            borderColor: 'transparent',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(59,111,212,0.15) 50%, rgba(8,43,104,0.3) 100%)',
            boxShadow: '0 10px 36px rgba(8,43,104,0.3), inset 0 -4px 14px rgba(0,0,0,0.2), inset 0 4px 14px rgba(255,255,255,0.08)',
            mask: 'radial-gradient(transparent 45%, black 46%)',
            WebkitMask: 'radial-gradient(transparent 45%, black 46%)',
          }}
          animate={prefersReduced ? {} : {
            y: [0, -18, 0],
            rotate: [0, 6, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />

        {/* Small Sphere - Bottom Right */}
        <motion.div
          className="absolute bottom-[20%] right-[15%] w-16 h-16 rounded-full"
          style={{
            background: 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.35) 0%, rgba(59,111,212,0.25) 50%, rgba(8,43,104,0.35) 100%)',
            boxShadow: '0 6px 24px rgba(8,43,104,0.25), inset 0 -3px 10px rgba(0,0,0,0.2), inset 0 3px 10px rgba(255,255,255,0.1)',
          }}
          animate={prefersReduced ? {} : {
            y: [0, -15, 0],
            rotate: [0, -4, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 3,
          }}
        />
      </div>

      {/* Back Link */}
      <Link
        href={backLink}
        className="absolute top-6 left-6 text-white hover:text-white/80 transition-colors duration-200 font-sans text-sm z-20"
      >
        {backText}
      </Link>

      {/* Glass Card */}
      <motion.div
        className="auth-glass-card relative w-full max-w-[960px] mx-auto px-6 sm:px-8 md:px-12 py-10 md:py-12"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          transform: prefersReduced ? 'none' : `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
        }}
      >
        {/* 3D Icon on Top Edge */}
        <motion.div
          className="absolute -top-10 left-1/2 -translate-x-1/2 z-10"
          animate={prefersReduced ? {} : {
            y: [0, -14, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="relative">
            <Image
              src="/icon-3d.png"
              alt="I.A.S. Icon"
              width={96}
              height={96}
              className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
              priority
            />
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15) 0%, transparent 60%)',
                pointerEvents: 'none',
              }}
            />
          </div>
        </motion.div>

        {/* Content */}
        <div className="mt-8 md:mt-6">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

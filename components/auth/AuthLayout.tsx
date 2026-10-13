'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';
import { useState, useEffect, CSSProperties, ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import AuthBackground from './AuthBackground';

interface AuthLayoutProps {
  title: string;
  backHref?: string;
  left: ReactNode;
  right: ReactNode;
}

export default function AuthLayout({
  title,
  backHref = '/',
  left,
  right,
}: AuthLayoutProps) {
  const reduced = useReducedMotion();

  // Mouse-parallax effect for the 3D shapes and blobs
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (reduced) return;

    let raf: number | null = null;

    const onMove = (e: MouseEvent) => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 18;
        const y = (e.clientY / window.innerHeight - 0.5) * 18;
        setParallax({ x, y });
      });
    };

    window.addEventListener('mousemove', onMove, { passive: true } as AddEventListenerOptions);
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  const parallaxStyle: CSSProperties = reduced
    ? {}
    : { transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0)` };

  // Entry animation: fade + slide up + slight scale
  const cardInitial = reduced
    ? { opacity: 1, y: 0, scale: 1 }
    : { opacity: 0, y: 40, scale: 0.93 };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Animated background with shapes */}
      <AuthBackground parallaxStyle={parallaxStyle} />

      {/* "Back to home" link at top left */}
      <Link
        href={backHref}
        className="fixed top-6 left-6 z-30 flex items-center text-white/85 hover:text-white transition-colors duration-200"
        aria-label="Voltar para o início"
      >
        <span className="mr-1 text-base">←</span>
        <span className="hidden sm:inline">Voltar para o início</span>
      </Link>

      {/* Main glass card */}
      <motion.div
        className="relative w-full max-w-[60rem] mx-auto"
        initial={cardInitial}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="auth-glass-card">
          {/* 3D icon floating at the top edge of the card (half overlapping) */}
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
            animate={reduced ? undefined : { y: [-14, 14, -14] }}
            transition={reduced ? undefined : { duration: 5, ease: 'ease-in-out', repeat: Infinity }}
          >
            <div className="w-28 h-28 rounded-2xl bg-[#06122B]/70 flex items-center justify-center shadow-[0_0_0_2px_rgba(255,255,255,0.18)] overflow-hidden">
              <Image
                src="/icon-3d.png"
                alt="Ícone 3D do Instituto de Aprendizado Social"
                width={80}
                height={80}
                className="object-contain drop-shadow-[0_8px_18px_rgba(0,0,0,0.45)]"
              />
            </div>
          </motion.div>

          {/* Card content: grid layout */}
          <div className="grid grid-cols-1 gap-6 px-6 pt-24 pb-8 sm:px-8 md:grid-cols-2">
            {/* Left column: title + form fields */}
            <div className="flex flex-col gap-4">{left}</div>

            {/* Right column: actions, links, social buttons (vertically centered) */}
            <div className="flex flex-col justify-center gap-4">{right}</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
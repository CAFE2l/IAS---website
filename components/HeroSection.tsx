'use client';

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type Star = { x: number; y: number; size: number; delay: number };

export default function HeroSection() {
  const prefersReduced = useReducedMotion();

  // Scroll-driven values live outside React state, so scrolling no longer re-renders the whole hero.
  const { scrollY } = useScroll();
  const parallaxRotate = useTransform(scrollY, (v) => v * 0.02);
  const float1X = useTransform(scrollY, (v) => Math.sin(v * 0.01) * 20);
  const float2X = useTransform(scrollY, (v) => Math.cos(v * 0.008) * 30);
  const float3X = useTransform(scrollY, (v) => Math.cos(v * 0.012) * 40);

  // FIX for the hydration error: the stars are random, so they are created
  // only on the client, after mount. The server renders an empty list and
  // the client fills it in, so the two HTML outputs always match.
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    setStars(
      Array.from({ length: 30 }, (_, i) => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        delay: i * 0.1,
      }))
    );
  }, []);

  return (
    <section 
      id="hero" 
      data-theme="dark"
      className="relative h-screen min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-navy-800 via-navy-700 to-navy-500">
      {/* Starfield (client-only) */}
      <div className="absolute inset-0">
          {stars.map((star, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.3, scale: 1 }}
              transition={{ duration: 1, delay: star.delay }}
              style={{
                position: 'absolute',
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: star.size,
                height: star.size,
                background: 'radial-gradient(circle, rgba(19, 154, 205, 0.6) 0%, transparent 70%)',
                borderRadius: '50%',
              }}
            />
          ))}
        </div>

        {/* Atmospheric Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        />

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        {/* Logo/Brand */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="flex items-center space-x-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3, type: 'spring', stiffness: 100 }}
              className="relative w-16 h-16 rounded-full border-2 border-ivory/30 overflow-hidden"
            >
              <Image
                src="/favicon.png"
                alt="Logo do Instituto de Aprendizado Social"
                fill
                sizes="64px"
                className="object-cover"
                priority
              />
            </motion.div>
            <span className="font-serif text-ivory text-xl font-bold leading-tight">Instituto de Aprendizado Social</span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-serif text-ivory text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
        >
          <span className="block mb-2">Aprender transforma.</span>
          <span className="text-navy-300">Compartilhar multiplica.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-sans text-navy-200 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Um ponto de encontro para transformar conhecimento em experiência, conectar pessoas e
          construir possibilidades por meio da colaboração.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/cadastro"
              className="inline-flex items-center justify-center px-8 py-4 bg-navy-800 hover:bg-navy-700 text-ivory font-sans font-semibold rounded-full transition-colors duration-200 shadow-lg"
            >
              Experimentar
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/login"
              className="inline-flex items-center justify-center px-8 py-4 border border-ivory/30 rounded-full bg-ivory/20 hover:bg-ivory/30 text-ivory font-sans font-semibold transition-colors duration-200"
            >
              Entrar
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* 3D-inspired Visual Centerpiece */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-br from-navy-600 to-navy-800 opacity-20"
          style={{ rotate: parallaxRotate }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.2, 0.15],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        {/* Central Orbital Ring */}
        {prefersReduced ? null : (
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border-2 border-navy-500/20 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, ease: 'linear', repeat: Infinity }}
          >
            <motion.div
              className="absolute top-4 -left-4 w-8 h-8 rounded-full bg-blue-400/40"
              style={{ boxShadow: '0 0 8px rgba(19, 154, 205, 0.4)' }}
              animate={{
                x: [0, 40, 0],
                y: [0, -40, 0],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-4 -right-4 w-8 h-8 rounded-full bg-blue-400/40"
              style={{ boxShadow: '0 0 8px rgba(19, 154, 205, 0.4)' }}
              animate={{
                x: [0, -40, 0],
                y: [0, 40, 0],
              }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            />
          </motion.div>
        )}

        {/* Floating Elements.
            Scroll movement uses x (style) and the float animation uses y (animate),
            so the two no longer fight over the same property. */}
        {prefersReduced ? null : (
          <>
            <motion.div
              className="absolute top-1/4 left-1/4 w-12 h-12 rounded-full bg-blue-500/30 flex items-center justify-center"
              style={{ x: float1X }}
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
            />
            <motion.div
              className="absolute top-3/4 right-1/4 w-8 h-8 rounded-full bg-blue-400/40"
              style={{ x: float2X }}
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity, delay: 1 }}
            />
            <motion.div
              className="absolute bottom-1/4 left-1/3 w-10 h-10 border-2 border-blue-300/50 rounded-full flex items-center justify-center"
              style={{ x: float3X }}
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity, delay: 1.5 }}
            >
              <div className="w-2 h-2 bg-blue-300 rounded-full" />
            </motion.div>
          </>
        )}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center"
      >
        <span className="text-navy-300 font-sans text-xs mb-2">Role para descobrir</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-navy-500/30 rounded-full flex justify-center"
        >
          <motion.div
            className="w-2 h-2 bg-navy-400 rounded-full mt-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

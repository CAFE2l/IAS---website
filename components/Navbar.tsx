'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const navItems = [
  { name: 'A proposta', href: '#proposta' },
  { name: 'Como funciona', href: '#como-funciona' },
  { name: 'Experiências', href: '#experiencias' },
  { name: 'Princípios', href: '#principios' },
];

const authItems = [
  { name: 'Entrar', href: '/login' },
  { name: 'Experimentar', href: '/cadastro', primary: true },
];

export default function Navbar() {
  const [isDarkSection, setIsDarkSection] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Track section visibility to determine navbar text color
    const sections = document.querySelectorAll('section[id]');
    
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = entry.target as HTMLElement;
            // Check if section has dark background
            const isDark = section.classList.contains('bg-navy-800') || 
                          section.classList.contains('bg-navy-900') ||
                          section.classList.contains('from-navy-800') ||
                          section.classList.contains('to-navy-500') ||
                          section.classList.contains('from-[#041B3F]') ||
                          section.classList.contains('to-[#06122B]');
            
            // If the section taking up most of the viewport is dark, use white text
            if (entry.intersectionRatio > 0.3) {
              setIsDarkSection(isDark);
            }
          }
        });
      },
      {
        threshold: [0.1, 0.3, 0.5],
        rootMargin: '-80px 0px -50% 0px', // Top of viewport detection
      }
    );

    sections.forEach((section) => {
      observerRef.current?.observe(section);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const textColor = isDarkSection ? '#FFFBF3' : '#082B68';
  const navbarBg = 'bg-navy-900/95 backdrop-blur-md shadow-md';

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${navbarBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 rounded-full bg-navy-800 flex items-center justify-center overflow-hidden"
            >
              <Image
                src="/favicon.png"
                alt="IAS Logo"
                width={40}
                height={40}
                className="object-cover"
              />
            </motion.div>
            <span className="hidden sm:block font-serif text-xl font-bold transition-colors duration-300" style={{ color: textColor }}>
              Instituto de Aprendizado Social
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="font-sans transition-colors duration-300 hover:opacity-80"
                style={{ color: textColor }}
              >
                {item.name}
              </Link>
            ))}
            {/* Entrar link */}
            <Link
              href="/login"
              className="font-sans text-sm transition-colors duration-200 hover:opacity-80"
              style={{ color: textColor }}
            >
              Entrar
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{ stroke: textColor }}
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: isMenuOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-navy-900/95 backdrop-blur-md"
      >
        <nav className="px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block text-white hover:text-white/80 font-sans transition-colors duration-200 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <Link
            key="entrar"
            href="/login"
            className="block text-white hover:text-white/80 font-sans transition-colors duration-200 py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Entrar
          </Link>
        </nav>
      </motion.div>
    </header>
  );
}
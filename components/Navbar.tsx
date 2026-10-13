'use client';

import { useState, useEffect } from 'react';
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
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-ivory/95 backdrop-blur-md shadow-md' : 'bg-gradient-to-b from-black/30 to-transparent'}`}>
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
            <span className="hidden sm:block font-serif text-xl font-bold transition-colors duration-300" style={{ color: scrolled ? '#082B68' : '#FFFBF3' }}>
              Instituto de Aprendizado Social
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`font-sans transition-colors duration-300`}
                style={{ color: scrolled ? '#082B68' : '#FFFBF3' }}
              >
                {item.name}
              </Link>
            ))}
            {/* Entrar link */}
            <Link
              href="/login"
              className="font-sans text-sm transition-colors duration-300"
              style={{ color: scrolled ? '#082B68' : '#FFFBF3' }}
            >
              Entrar
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-navy-100/50 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{ stroke: scrolled ? '#082B68' : '#FFFBF3' }}
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
        className="md:hidden overflow-hidden bg-ivory/95 backdrop-blur-md"
      >
        <nav className="px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block text-navy-900 hover:text-navy-600 font-sans transition-colors duration-200 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <Link
            key="entrar"
            href="/login"
            className="block text-navy-900 hover:text-navy-600 font-sans transition-colors duration-200 py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Entrar
          </Link>
        </nav>
      </motion.div>
    </header>
  );
}
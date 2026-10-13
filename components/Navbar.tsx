'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

// Navigation items
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

// Dark sections - sections with dark backgrounds that need light header theme
const DARK_SECTIONS = new Set(['hero', 'principios', 'final', 'rodape']);

// Header theme type
type HeaderTheme = 'dark' | 'light';

// CSS transition duration in ms (250-400ms range as per requirements)
const TRANSITION_DURATION = 350;

// Helper: Get section position from top of document
function getSectionTopOffset(sectionId: string): number | null {
  const section = document.querySelector(`section[id="${sectionId}"]`);
  if (section) {
    return section.getBoundingClientRect().top + window.scrollY;
  }
  return null;
}

export default function Navbar() {
  // Theme state: 'dark' means we're over a dark section (use light header), 'light' means light section (use dark header)
  const [headerTheme, setHeaderTheme] = useState<HeaderTheme>('light');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Reference for the observer
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sectionsRef = useRef<HTMLElement[]>([]);

  // Determine theme for a section based on its ID and background
  const getSectionTheme = useCallback((sectionId: string): HeaderTheme => {
    return DARK_SECTIONS.has(sectionId) ? 'dark' : 'light';
  }, []);

  // Determine theme based on current scroll position and section positions
  const getThemeFromScrollPosition = useCallback(() => {
    const scrollTop = window.scrollY;
    const headerHeight = 80; // Approximate header height
    
    // Find which section we're currently in
    const sectionsWithPositions = sectionsRef.current.map(section => ({
      id: section.id,
      top: section.getBoundingClientRect().top + scrollTop,
      bottom: section.getBoundingClientRect().bottom + scrollTop,
    }));
    
    // Find the section that contains the header position (middle of viewport)
    const viewportMiddle = scrollTop + window.innerHeight / 2;
    
    for (const section of sectionsWithPositions) {
      // Check if viewport middle is within this section
      if (viewportMiddle >= section.top && viewportMiddle <= section.bottom) {
        return getSectionTheme(section.id);
      }
    }
    
    // Default to light theme if we can't determine
    return 'light';
  }, [getSectionTheme]);

  // Initialize observer
  useEffect(() => {
    // Mark body for header styling
    if (typeof document !== 'undefined') {
      document.body.classList.add('header-ready');
    }

    // Find all sections with IDs
    const sections = document.querySelectorAll<HTMLElement>('section[id]');
    sectionsRef.current = Array.from(sections);

    // Determine initial theme based on scroll position (handles mid-page refresh)
    const initialTheme = getThemeFromScrollPosition();
    setHeaderTheme(initialTheme);
    
    if (typeof document !== 'undefined') {
      document.body.classList.remove('header-on-dark', 'header-on-light');
      if (initialTheme === 'dark') {
        document.body.classList.add('header-on-dark');
      } else {
        document.body.classList.add('header-on-light');
      }
    }

    // Create observer with proper configuration
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the section with the highest intersection ratio
        let mostVisibleSection: HTMLElement | null = null;
        let highestRatio = 0;

        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > highestRatio) {
            highestRatio = entry.intersectionRatio;
            mostVisibleSection = entry.target as HTMLElement;
          }
        });

        // For very fast scrolling, also check sections near the viewport
        if (!mostVisibleSection && entries.length > 0) {
          const sortedByPosition = [...entries].sort((a, b) => 
            (a.boundingClientRect.top || 0) - (b.boundingClientRect.top || 0)
          );
          const topmostIntersecting = sortedByPosition.find(e => 
            e.isIntersecting && (e.boundingClientRect.top || 0) < 200
          );
          
          if (topmostIntersecting) {
            mostVisibleSection = topmostIntersecting.target as HTMLElement;
          }
        }

        if (mostVisibleSection) {
          const sectionId = mostVisibleSection.id;
          const theme = getSectionTheme(sectionId);
          
          // Update theme state
          setHeaderTheme(theme);
          
          // Update body class for CSS-based theming
          if (typeof document !== 'undefined') {
            document.body.classList.remove('header-on-dark', 'header-on-light');
            if (theme === 'dark') {
              document.body.classList.add('header-on-dark');
            } else {
              document.body.classList.add('header-on-light');
            }
          }
        }
      },
      {
        threshold: [0, 0.1, 0.3, 0.5, 0.7, 1],
        rootMargin: '-100px 0px 0px 0px', // Detect sections 100px before they enter viewport
      }
    );

    // Observe all sections
    sections.forEach((section) => {
      observerRef.current?.observe(section);
    });

    // Handle hash changes (anchor links, browser back/forward)
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        const section = document.querySelector(`section[id="${hash}"]`);
        if (section) {
          const theme = getSectionTheme(hash);
          setHeaderTheme(theme);
          document.body.classList.remove('header-on-dark', 'header-on-light');
          if (theme === 'dark') {
            document.body.classList.add('header-on-dark');
          } else {
            document.body.classList.add('header-on-light');
          }
        }
      }
    };

    // Also handle scroll events for fast scrolling edge cases
    const handleScroll = () => {
      // Debounce scroll to avoid excessive updates
      const theme = getThemeFromScrollPosition();
      if (theme !== headerTheme) {
        setHeaderTheme(theme);
        document.body.classList.remove('header-on-dark', 'header-on-light');
        if (theme === 'dark') {
          document.body.classList.add('header-on-dark');
        } else {
          document.body.classList.add('header-on-light');
        }
      }
    };

    // Throttled scroll handler
    let scrollThrottle: number | undefined;
    const throttledHandleScroll = () => {
      if (scrollThrottle) clearTimeout(scrollThrottle);
      scrollThrottle = window.setTimeout(handleScroll, 50);
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('scroll', throttledHandleScroll);

    return () => {
      observerRef.current?.disconnect();
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('scroll', throttledHandleScroll);
      if (scrollThrottle) clearTimeout(scrollThrottle);
      
      if (typeof document !== 'undefined') {
        document.body.classList.remove('header-ready', 'header-on-dark', 'header-on-light');
      }
    };
  }, [getSectionTheme, getThemeFromScrollPosition, headerTheme]);

  // Handle resize for edge cases (orientation changes on mobile)
  useEffect(() => {
    const handleResize = () => {
      const theme = getThemeFromScrollPosition();
      setHeaderTheme(theme);
      document.body.classList.remove('header-on-dark', 'header-on-light');
      if (theme === 'dark') {
        document.body.classList.add('header-on-dark');
      } else {
        document.body.classList.add('header-on-light');
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getThemeFromScrollPosition]);

  // Theme-specific styles
  const isDarkTheme = headerTheme === 'dark';

  // Transition style for smooth animations
  const transitionStyle = {
    transition: `all ${TRANSITION_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`,
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 header ${
        isDarkTheme ? 'header--dark' : 'header--light'
      }`}
      style={transitionStyle}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden"
              style={transitionStyle}
            >
              <Image
                src="/favicon.png"
                alt="Logo do Instituto de Aprendizado Social"
                width={40}
                height={40}
                className="object-cover"
                priority
              />
            </motion.div>
            <span 
              className="hidden sm:block font-serif text-xl font-bold header-text"
              style={{
                ...transitionStyle,
                color: isDarkTheme ? '#FFFBF3' : '#082B68',
              }}
            >
              Instituto de Aprendizado Social
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`font-sans header-link hover:opacity-80`}
                style={{
                  ...transitionStyle,
                  color: isDarkTheme ? '#FFFBF3' : '#082B68',
                }}
              >
                {item.name}
              </Link>
            ))}
            {/* Entrar & Experimentar links */}
            {authItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`font-sans text-sm header-link hover:opacity-80 ${
                  item.primary ? 'font-semibold' : ''
                }`}
                style={{
                  ...transitionStyle,
                  color: isDarkTheme ? '#FFFBF3' : '#082B68',
                }}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 rounded-lg`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            style={transitionStyle}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
      viewBox="0 0 24 24"
      style={{ color: isDarkTheme ? '#FFFBF3' : '#082B68' }}
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

      {/* Mobile Menu - AnimatePresence for smooth enter/exit */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`md:hidden overflow-hidden rounded-b-2xl ${
              isDarkTheme ? 'header--dark' : 'header--light'
            }`}
          >
            <nav className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block header-text header-link transition-colors duration-200 py-2`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-white/10 mt-2 pt-2">
                <Link
                  href="/login"
                  className={`block header-text header-link transition-colors duration-200 py-2`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Entrar
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
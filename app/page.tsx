'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ProposalSection from '../components/ProposalSection';
import LearningJourney from '../components/LearningJourney';
import ExperienceEcosystem from '../components/ExperienceEcosystem';
import PlatformPreview from '../components/PlatformPreview';
import PortfolioSection from '../components/PortfolioSection';
import ResponsibleAISection from '../components/ResponsibleAISection';
import RoadmapSection from '../components/RoadmapSection';
import ClosingSection from '../components/ClosingSection';
import Footer from '../components/Footer';

export default function HomePage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showToTop, setShowToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
      
      setShowToTop(scrollTop > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Smooth Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 w-full h-1 bg-navy-800 z-50"
        style={{ height: 4 }}
      >
        <motion.div
          className="h-full bg-navy-600"
          style={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </motion.div>

      <Navbar />

      {/* Sections */}
      <main>
        <HeroSection />
        <ProposalSection />
        <LearningJourney />
        <ExperienceEcosystem />
        <PlatformPreview />
        <PortfolioSection />
        <ResponsibleAISection />
        <RoadmapSection />
        <ClosingSection />
      </main>

      <Footer />

      {/* Scroll to Top Button */}
      {showToTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-navy-800 text-ivory rounded-full shadow-lg hover:bg-navy-700 transition-colors duration-200 z-40 flex items-center justify-center"
          aria-label="Voltar ao topo"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </motion.button>
      )}
    </>
  );
}
'use client';

import { motion, useReducedMotion, useRef, useState } from 'framer-motion';
import Link from 'next/link';

const footerNavItems = [
  { name: 'A proposta', href: '#proposta' },
  { name: 'Como funciona', href: '#como-funciona' },
  { name: 'Experiências', href: '#experiencias' },
  { name: 'Princípios', href: '#principios' },
  { name: 'Experimentar', href: '/cadastro' },
  { name: 'Entrar', href: '/login' },
];

export default function Footer() {
  const prefersReduced = useReducedMotion();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <footer className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#041B3F] to-[#06122B]" />

      {/* Blurred Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/15 rounded-full blur-[100px]"
          style={{ 
            animation: prefersReduced ? 'none' : 'float-shape 12s ease-in-out infinite',
            animationDelay: '0s'
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-navy-400/20 rounded-full blur-[120px]"
          style={{ 
            animation: prefersReduced ? 'none' : 'float-shape 15s ease-in-out infinite',
            animationDelay: '3s'
          }}
        />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-300/10 rounded-full blur-[80px]"
          style={{ 
            animation: prefersReduced ? 'none' : 'float-shape 10s ease-in-out infinite',
            animationDelay: '6s'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* LED Line at Top */}
        <div className="relative h-1 mb-8 overflow-hidden">
          <div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-[#4FA3FF] to-white via-[#4FA3FF] to-transparent opacity-60"
            style={{
              backgroundSize: '200% 100%',
            }}
          />
          {!prefersReduced && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-80 blur-sm"
              animate={{ 
                backgroundPosition: ['0% 0%', '200% 0%'],
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: 'linear' 
              }}
              style={{
                backgroundSize: '50% 100%',
              }}
            />
          )}
        </div>

        {/* Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Column 1: Brand (md:col-span-5) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-5"
          >
            <GlassCard index={0} hoveredCard={hoveredCard} setHoveredCard={setHoveredCard} prefersReduced={prefersReduced}>
              <h2 className="font-serif text-white text-xl sm:text-2xl font-bold mb-4 leading-tight">
                Instituto de Aprendizado Social
              </h2>
              <p className="font-sans text-white/75 text-sm leading-relaxed">
                Um ponto de encontro para transformar conhecimento em experiência, conectar pessoas e construir possibilidades por meio da colaboração.
              </p>
            </GlassCard>
          </motion.div>

          {/* Column 2: Navegar (md:col-span-3) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="md:col-span-3"
          >
            <GlassCard index={1} hoveredCard={hoveredCard} setHoveredCard={setHoveredCard} prefersReduced={prefersReduced}>
              <nav aria-label="Navegar no rodapé">
                <h3 className="font-serif text-white text-lg font-semibold mb-4">Navegar</h3>
                <ul className="space-y-1">
                  {footerNavItems.map((item) => (
                    <li key={item.name}>
                      <NavLink item={item} prefersReduced={prefersReduced} />
                    </li>
                  ))}
                </ul>
              </nav>
            </GlassCard>
          </motion.div>

          {/* Column 3: Sobre (md:col-span-4) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="md:col-span-4"
          >
            <GlassCard index={2} hoveredCard={hoveredCard} setHoveredCard={setHoveredCard} prefersReduced={prefersReduced}>
              <h3 className="font-serif text-white text-lg font-semibold mb-4">Sobre</h3>
              <div className="space-y-3">
                <StatusBadge text="Projeto em desenvolvimento" hasDot={true} prefersReduced={prefersReduced} />
                <StatusBadge text="Experiência educacional colaborativa" hasDot={false} prefersReduced={prefersReduced} />
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 pt-6 border-t border-white/10"
        >
          <p className="font-sans text-white/60 text-sm">
            © 2026 Instituto de Aprendizado Social. Todos os direitos reservados.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

// Glass Card Component with 3D Tilt
function GlassCard({ 
  children, 
  index, 
  hoveredCard, 
  setHoveredCard, 
  prefersReduced 
}: { 
  children: React.ReactNode; 
  index: number; 
  hoveredCard: number | null; 
  setHoveredCard: (index: number | null) => void; 
  prefersReduced: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced || !cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Calculate rotation (max 6 degrees)
    const newRotateY = (mouseX / (rect.width / 2)) * 6;
    const newRotateX = -(mouseY / (rect.height / 2)) * 6;
    
    setRotateX(newRotateX);
    setRotateY(newRotateY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setHoveredCard(null);
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative p-6 h-full"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHoveredCard(index)}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: prefersReduced ? 0 : rotateX,
        rotateY: prefersReduced ? 0 : rotateY,
        scale: hoveredCard === index && !prefersReduced ? 1.02 : 1,
      }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
    >
      <div 
        className="glass-footer-card h-full rounded-2xl p-6"
        style={{
          background: 'rgba(255, 255, 255, 0.06)',
          backdropFilter: 'blur(20px) saturate(140%)',
          WebkitBackdropFilter: 'blur(20px) saturate(140%)',
          border: '1px solid rgba(255, 255, 255, 0.14)',
          borderRadius: '24px',
          boxShadow: hoveredCard === index && !prefersReduced
            ? '0 25px 70px rgba(2, 10, 40, 0.6), 0 5px 15px rgba(2, 10, 40, 0.3)'
            : '0 20px 60px rgba(2, 10, 40, 0.5)',
        }}
      >
        {/* Inner highlight */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
        
        <div className="relative z-10 h-full flex flex-col">
          {children}
        </div>
      </div>
    </motion.div>
  );
}

// Navigation Link with LED Underline
function NavLink({ item, prefersReduced }: { item: { name: string; href: string }; prefersReduced: boolean }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={item.href}
      className="block group relative min-h-[40px] flex items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="font-sans text-white/75 group-hover:text-white transition-colors duration-200 text-sm relative z-10">
        {item.name}
      </span>
      {/* LED Underline */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#4FA3FF] to-white opacity-0 group-hover:opacity-100"
        initial={{ width: 0 }}
        animate={{ width: isHovered ? '100%' : 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{
          boxShadow: '0 0 8px rgba(79, 163, 255, 0.6)',
        }}
      />
      {/* Text Glow on Hover */}
      {isHovered && !prefersReduced && (
        <motion.div
          className="absolute inset-0 blur-md bg-[#4FA3FF]/20 opacity-0 group-hover:opacity-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </Link>
  );
}

// Status Badge with LED Dot
function StatusBadge({ text, hasDot, prefersReduced }: { text: string; hasDot: boolean; prefersReduced: boolean }) {
  return (
    <div className="flex items-center space-x-2">
      {hasDot && (
        <motion.div
          className="w-2 h-2 rounded-full bg-[#4FA3FF]"
          animate={prefersReduced ? {} : {
            opacity: [0.4, 0.8, 0.4],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            boxShadow: '0 0 8px rgba(79, 163, 255, 0.6)',
          }}
        />
      )}
      <span className="font-sans text-white/70 text-sm px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
        {text}
      </span>
    </div>
  );
}
'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { BookOpen, TestTube, Users, Share2 } from 'lucide-react';

const journeySteps = [
  {
    id: 1,
    title: 'Conhecer',
    description: 'Explore ideias e desenvolva compreensão sobre novos conceitos e possibilidades.',
    icon: BookOpen,
  },
  {
    id: 2,
    title: 'Experimentar',
    description: 'Aplique o conhecimento por meio de atividades práticas e desafios colaborativos.',
    icon: TestTube,
  },
  {
    id: 3,
    title: 'Colaborar',
    description: 'Troque perspectivas e construa projetos juntos ao longo de feedback contínuo.',
    icon: Users,
  },
  {
    id: 4,
    title: 'Compartilhar',
    description: 'Documente sua jornada e torne suas contribuições visíveis e acessíveis.',
    icon: Share2,
  },
];

export default function LearningJourney() {
  const prefersReduced = useReducedMotion();

  return (
    <section 
      id="como-funciona" 
      className="py-24 px-4 bg-ivory relative overflow-hidden"
      style={{ scrollMarginTop: '100px' }}
    >
      {/* Background gradient orbs for glass effect visibility */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-navy-200/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-block mb-4"
          >
            <span className="text-sm font-sans text-navy-600 tracking-wider uppercase">
              Como funciona
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-serif text-4xl sm:text-5xl text-navy-900 mb-6"
          >
            <span className="block mb-2">Não basta saber.</span>
            <span className="text-navy-600">É preciso experimentar, colaborar e construir.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-sans text-navy-700 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            O conhecimento ganha mais valor quando transformado em experiência, feedback e compartilhamento.
          </motion.p>
        </motion.div>

        {/* Journey Diagram */}
        <div className="relative">
          {/* Mobile: Vertical Line on left */}
          <div className="md:hidden absolute left-8 top-16 bottom-16 w-0.5 bg-gradient-to-b from-navy-300/50 via-blue-400/50 to-navy-300/50 z-0" />
          
          {/* Animated pulse on mobile line */}
          {!prefersReduced && (
            <motion.div
              className="md:hidden absolute left-8 w-0.5 bg-blue-400/80 z-0"
              style={{ top: '16%', height: '2px' }}
              animate={{ top: ['16%', '84%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}

          {/* Desktop: Horizontal Connector Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 z-0 transform -translate-y-1/2">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />
            
            {/* Animated pulse traveling along the line */}
            {!prefersReduced && (
              <motion.div
                className="absolute top-1/2 w-12 h-0.5 bg-blue-400/80 blur-sm"
                style={{ transform: 'translateY(-50%)' }}
                animate={{ left: ['0%', '100%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {journeySteps.map((step, index) => {
              const Icon = step.icon;
              
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="relative"
                >
                  {/* Glass Card */}
                  <motion.div
                    className="glass rounded-2xl p-6 h-full flex flex-col items-center text-center relative overflow-hidden"
                    initial={{ rotateX: 0, rotateY: 0 }}
                    whileHover={prefersReduced ? {} : {
                      rotateX: 2,
                      rotateY: 2,
                      scale: 1.02,
                      boxShadow: '0 15px 40px rgba(8, 43, 104, 0.15), 0 4px 12px rgba(8, 43, 104, 0.1)',
                    }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    style={{
                      transformStyle: 'preserve-3d',
                      perspective: '1000px',
                    }}
                  >
                    {/* Inner highlight for 3D effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
                    
                    {/* Step Number Badge */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.1, type: 'spring' }}
                      className="w-8 h-8 rounded-full bg-navy-800 text-ivory flex items-center justify-center font-bold text-sm mb-4 shadow-lg"
                      style={{ 
                        boxShadow: '0 0 12px rgba(8, 43, 104, 0.4)',
                      }}
                    >
                      {step.id}
                    </motion.div>

                    {/* Icon Container */}
                    <motion.div
                      className="w-16 h-16 rounded-full bg-gradient-to-br from-navy-700 to-navy-900 flex items-center justify-center mb-4 relative"
                      style={{
                        boxShadow: '0 4px 16px rgba(8, 43, 104, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.1)',
                      }}
                      whileHover={prefersReduced ? {} : {
                        boxShadow: '0 0 20px rgba(19, 154, 205, 0.5), 0 4px 16px rgba(8, 43, 104, 0.3)',
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon className="w-8 h-8 text-ivory" aria-hidden="true" />
                      
                      {/* LED glow ring */}
                      {!prefersReduced && (
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-blue-400/30"
                          animate={{ 
                            boxShadow: ['0 0 0px rgba(19, 154, 205, 0)', '0 0 8px rgba(19, 154, 205, 0.3)', '0 0 0px rgba(19, 154, 205, 0)'],
                          }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                        />
                      )}
                    </motion.div>

                    {/* Content */}
                    <h3 className="font-serif text-navy-900 text-xl mb-3">{step.title}</h3>
                    <p className="font-sans text-navy-600 text-sm leading-relaxed flex-1">
                      {step.description}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
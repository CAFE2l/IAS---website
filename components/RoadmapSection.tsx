'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Calendar, TestTube, Users, ArrowUpRight } from 'lucide-react';

const roadmapSteps = [
  {
    id: 1,
    title: 'Planejar',
    description: 'Entender a comunidade e definir objetivos, responsabilidades e recursos disponíveis.',
    icon: Calendar,
  },
  {
    id: 2,
    title: 'Experimentar',
    description: 'Realizar pequenos workshops ou atividades colaborativas para testar a proposta.',
    icon: TestTube,
  },
  {
    id: 3,
    title: 'Conectar',
    description: 'Organizar experiências, compartilhar aprendizados e reunir feedback da comunidade.',
    icon: Users,
  },
  {
    id: 4,
    title: 'Evoluir',
    description: 'Melhorar a proposta com base em experiências reais e novas habilidades.',
    icon: ArrowUpRight,
  },
];

export default function RoadmapSection() {
  const prefersReduced = useReducedMotion();

  return (
    <section 
      id="caminho" 
      className="py-24 px-4 bg-ivory relative overflow-hidden"
      style={{ scrollMarginTop: '100px' }}
    >
      {/* Background gradient orbs for glass effect visibility */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-navy-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl" />
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
              O caminho
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-serif text-4xl sm:text-5xl text-navy-900 mb-6"
          >
            <span className="block mb-2">Começar com intenção.</span>
            <span className="text-navy-600">Evoluir com evidências.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-sans text-navy-700 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Uma proposta que cresce gradualmente com colaboração e feedback.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Mobile: Vertical Connector Line */}
          <div className="lg:hidden absolute left-8 top-16 bottom-24 w-0.5 bg-gradient-to-b from-navy-300/50 via-blue-400/50 to-navy-300/50 z-0" />
          
          {/* Animated pulse on mobile line */}
          {!prefersReduced && (
            <motion.div
              className="lg:hidden absolute left-8 w-0.5 bg-blue-400/80 z-0"
              style={{ top: '16%', height: '2px' }}
              animate={{ top: ['16%', '84%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}

          {/* Desktop: Horizontal Connector Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 z-0 transform -translate-y-1/2">
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
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 relative z-10">
            {roadmapSteps.map((step, index) => {
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
                    className="glass rounded-2xl p-6 h-full flex flex-col relative overflow-hidden"
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
                    
                    {/* Card Header: Icon + Number Badge */}
                    <div className="flex items-center space-x-4 mb-4">
                      {/* Icon */}
                      <motion.div
                        className="w-12 h-12 rounded-full bg-gradient-to-br from-navy-700 to-navy-900 flex items-center justify-center relative flex-shrink-0"
                        style={{
                          boxShadow: '0 4px 16px rgba(8, 43, 104, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.1)',
                        }}
                        whileHover={prefersReduced ? {} : {
                          boxShadow: '0 0 20px rgba(19, 154, 205, 0.5), 0 4px 16px rgba(8, 43, 104, 0.3)',
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <Icon className="w-6 h-6 text-ivory" aria-hidden="true" />
                        
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

                      {/* Number Badge */}
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.4 + index * 0.1, type: 'spring' }}
                        className="w-10 h-10 rounded-full bg-navy-800 text-ivory flex items-center justify-center font-bold text-lg shadow-lg"
                        style={{ 
                          boxShadow: '0 0 12px rgba(8, 43, 104, 0.4)',
                        }}
                      >
                        {step.id}
                      </motion.div>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-navy-900 text-xl mb-3">{step.title}</h3>

                    {/* Description */}
                    <p className="font-sans text-navy-600 text-sm leading-relaxed flex-1">
                      {step.description}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Accessibility Note - Glass Panel with Soft Glow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-16 text-center"
        >
          <motion.div
            className="glass-dark rounded-2xl p-6 max-w-2xl mx-auto relative overflow-hidden"
            whileHover={prefersReduced ? {} : {
              boxShadow: '0 0 30px rgba(19, 154, 205, 0.2), 0 8px 32px rgba(8, 43, 104, 0.2)',
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Subtle inner glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/10 to-transparent pointer-events-none" />
            
            <p className="font-sans text-ivory text-sm leading-relaxed relative z-10">
              Este caminho é guiado pela colaboração, participação acessível e supervisão apropriada. 
              Cada etapa pode ser adaptada conforme as necessidades da comunidade.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
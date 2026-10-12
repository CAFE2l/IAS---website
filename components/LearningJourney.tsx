'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
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

const stepColors = ['bg-navy-700', 'bg-navy-600', 'bg-navy-500', 'bg-navy-400'];

export default function LearningJourney() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section id="como-funciona" className="py-24 px-4 bg-ivory">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4">
            <span className="text-sm font-sans text-navy-600 tracking-wider uppercase">
              Como funciona
            </span>
          </div>
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
          {/* Mobile: Vertical Line */}
          <div className="md:hidden">
            <div className="absolute left-1/2 top-12 bottom-12 w-1 bg-navy-300/50 transform -translate-x-1/2 z-0" />
          </div>

          {/* Desktop: Horizontal Line - positioned based on icon center */}
          <div className="hidden md:block">
            {/* Line container that spans from icon center to icon center */}
            <div className="absolute top-1/2 left-12 right-12 h-1 bg-navy-300/50 transform -translate-y-1/2 z-0" />
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {journeySteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="text-center"
                  onMouseEnter={() => setActiveStep(step.id)}
                  onMouseLeave={() => setActiveStep(null)}
                >
                  {/* Icon Container */}
                  <motion.div
                    className={`w-20 h-20 mx-auto rounded-full ${stepColors[index]} flex items-center justify-center transition-all duration-300`}
                    style={{
                      boxShadow: activeStep === step.id 
                        ? '0 0 20px rgba(19, 154, 205, 0.6)'
                        : '0 4px 16px rgba(8, 43, 104, 0.2)',
                    }}
                  >
                    <Icon className="w-8 h-8 text-ivory" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="font-serif text-navy-900 text-2xl mb-3 mt-4">{step.title}</h3>
                  <motion.p
                    className="font-sans text-navy-600 text-sm leading-relaxed px-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  >
                    {step.description}
                  </motion.p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
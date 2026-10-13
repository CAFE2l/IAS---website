'use client';

import { motion } from 'framer-motion';
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
    description: 'Melhorar a proposta baseado em experiências reais e novas habilidades.',
    icon: ArrowUpRight,
  },
];

export default function RoadmapSection() {
  return (
    <section id="caminho" className="py-24 px-4 bg-ivory">
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
              O caminho
            </span>
          </div>
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

        {/* Timeline with Horizontal Line */}
        <div className="relative">
          {/* Horizontal Connector Line - centered vertically through cards */}
          <div className="hidden lg:block absolute top-1/2 left-16 right-16 h-1 bg-navy-300/50 transform -translate-y-1/2 z-0" />

          {/* Mobile: Vertical Line on left side */}
          <div className="hidden lg:block">
            {/* Step markers on the line */}
            {roadmapSteps.map((step, index) => {
              const Icon = step.icon;
              const leftPercent = 16 + (index * 25) + 12.5; // Center of each card
              
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  className="absolute_top-1/2 -translate-y-1/2 z-10"
                  style={{ left: `${leftPercent}%` }}
                >
                  <div className="w-10 h-10 bg-navy-800 text-ivory rounded-full border-2 border-ivory/30 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile vertical line */}
          <div className="lg:hidden absolute left-1/2 -translate-x-1/2 top-20 bottom-20 w-1 bg-navy-300/30 z-0" />

          {/* Steps Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
            {roadmapSteps.map((step, index) => {
              const Icon = step.icon;
              const isMobile = index % 2 === 0;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="bg-ivory rounded-2xl p-6 shadow-lg border border-navy-100/50"
                >
                  {/* Number Badge + Title + Icon Row */}
                  <div className="flex items-center space-x-3 mb-3">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                      className="w-10 h-10 bg-navy-800 text-ivory rounded-full flex items-center justify-center font-bold text-base"
                    >
                      {step.id}
                    </motion.div>
                    <h3 className="font-serif text-navy-900 text-lg flex-1">{step.title}</h3>
                  </div>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    className="font-sans text-navy-600 text-sm leading-relaxed"
                  >
                    {step.description}
                  </motion.p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Accessibility Note - High Contrast */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-16 text-center"
        >
          <div className="bg-navy-800 rounded-2xl p-6 max-w-2xl mx-auto">
            <p className="font-sans text-ivory text-sm leading-relaxed">
              Este caminho é guiado pela colaboração, participação acessível e supervisão apropriada. 
              Cada etapa pode ser adaptada conforme as necessidades da comunidade.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
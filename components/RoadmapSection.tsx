'use client';

import { motion } from 'framer-motion';
import { Calendar, TestTube, Users, ArrowUpRight } from 'lucide-react';

const roadmapSteps = [
  {
    id: 1,
    title: 'Planejar',
    description: 'Entender a comunidade, definir objetivos, responsabilidades e recursos disponíveis.',
    icon: Calendar,
  },
  {
    id: 2,
    title: 'Experimentar',
    description: 'Realizar um pequeno workshop ou atividade colaborativa para testar a proposta.',
    icon: TestTube,
  },
  {
    id: 3,
    title: 'Conectar',
    description: 'Organizar a experiência, compartilhar aprendizados e reunir feedback.',
    icon: Users,
  },
  {
    id: 4,
    title: 'Evoluir',
    description: 'Melhorar a proposta com base em experiências, ajustes e novas habilidades.',
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

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute left-1/2 top-20 bottom-20 w-1 bg-navy-300/30 transform -translate-x-1/2 z-0"
          />

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {roadmapSteps.map((step, index) => {
              const Icon = step.icon;
              const isOdd = index % 2 === 0;
              
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="flex items-center md:h-auto"
                >
                  {/* Step Content */}
                  <div className={`w-full ${isOdd ? 'md:pr-20 md:pl-0' : 'md:pl-20 md:pr-0'}`}>
                    <div className="bg-ivory rounded-2xl p-6 shadow-lg border border-navy-100/50">
                      <div className="flex items-start space-x-4">
                        {/* Step Number */}
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                          className="w-10 h-10 bg-navy-800 text-ivory rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0"
                        >
                          {step.id}
                        </motion.div>

                        {/* Content */}
                        <div>
                          <h3 className="font-serif text-navy-900 text-xl mb-2 flex items-center">
                            {step.title}
                            <motion.div
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                              className="ml-2 p-1 bg-navy-100 rounded-full"
                            >
                              <Icon className="w-4 h-4 text-navy-700" />
                            </motion.div>
                          </h3>
                          <p className="font-sans text-navy-600 text-sm leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>

                      {/* Step Circle - Position on timeline */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                        className="absolute -top-5 w-10 h-10 bg-ivory border-2 border-navy-800 rounded-full flex items-center justify-center"
                      >
                        <div className="w-4 h-4 bg-navy-800 rounded-full" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Accessibility Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-16 text-center"
        >
          <div className="bg-navy-800/30 rounded-2xl p-6 max-w-2xl mx-auto">
            <p className="font-sans text-navy-300 text-sm leading-relaxed">
              Este caminho é guiado pela colaboração, participação acessível e supervisão apropriada. 
              Cada etapa pode ser adaptada conforme as necessidades da comunidade.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
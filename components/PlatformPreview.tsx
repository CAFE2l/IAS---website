'use client';

import { motion } from 'framer-motion';
import { Play, MessageCircle, GitBranch, Activity } from 'lucide-react';

interface MockupElementProps {
  children: React.ReactNode;
  className?: string;
}

function MockupElement({ children, className = '' }: MockupElementProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={`bg-ivory/80 border border-navy-200 rounded-xl p-4 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default function PlatformPreview() {
  return (
    <section id="plataforma" className="py-24 px-4 bg-ivory">
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
              A plataforma
            </span>
          </div>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-serif text-4xl sm:text-5xl text-navy-900 mb-6"
          >
            <span className="block mb-2">Uma visão do futuro</span>
            <span className="text-navy-600">digital</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-sans text-navy-700 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Conceito de interface que conecta aprendizado, colaboração e crescimento juntos.
          </motion.p>
        </motion.div>

        {/* Mockup Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
          whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, type: 'spring', stiffness: 100 }}
          className="relative mx-auto"
        >
          {/* Perspective Frame */}
          <div className="relative [perspective:1000px] transform-gpu">
            {/* Device Frame */}
            <div className="absolute inset-0 bg-navy-900/20 rounded-3xl p-1">
              <div className="w-full h-full bg-ivory rounded-2xl overflow-hidden shadow-2xl">
                {/* Mockup Content */}
                <div className="grid grid-cols-4 gap-4 p-6">
                  {/* Left Sidebar */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="space-y-4"
                  >
                    <MockupElement className="glass">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-navy-800 flex items-center justify-center">
                          <span className="text-ivory font-bold text-sm">I</span>
                        </div>
                        <div>
                          <div className="font-serif text-navy-900 text-sm">I.A.S.</div>
                          <div className="text-xs text-navy-500">Dashboard</div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-3 bg-navy-300/30 rounded-full w-3/4" />
                        <div className="h-3 bg-navy-300/30 rounded-full w-1/2" />
                        <div className="h-3 bg-navy-300/30 rounded-full w-2/3" />
                      </div>
                    </MockupElement>
                  </motion.div>

                  {/* Main Content Area */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="col-span-3 space-y-6"
                  >
                    {/* Hero Banner */}
                    <MockupElement className="mb-4">
                      <div className="font-serif text-navy-900 text-xl mb-2">Bem-vindo(a) à sua jornada</div>
                      <div className="text-navy-600 text-sm">Descubra, colabore e cresça juntos</div>
                    </MockupElement>

                    {/* Workshop Highlight */}
                    <MockupElement className="mb-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-navy-800 rounded-full flex items-center justify-center">
                          <Play className="w-5 h-5 text-ivory" />
                        </div>
                        <div>
                          <div className="font-serif text-navy-900 text-base">Workshop: Python para Ciência de Dados</div>
                          <div className="text-xs text-navy-500">Hoje, 14h - 16h</div>
                        </div>
                      </div>
                      <div className="h-2 bg-navy-300/30 rounded-full w-full" />
                    </MockupElement>

                    {/* Community Discussion */}
                    <MockupElement className="mb-4">
                      <div className="font-serif text-navy-900 text-sm mb-2 flex items-center">
                        <MessageCircle className="w-4 h-4 mr-2 text-navy-600" />
                        Discussão recente
                      </div>
                      <div className="text-navy-600 text-xs space-y-1">
                        <div className="bg-navy-100/30 p-2 rounded">
                          <div className="font-sans text-navy-900 text-xs mb-1">Maria S.:</div>
                          <div className="text-navy-700 text-xs">Ótima apresentação sobre algoritmos!</div>
                        </div>
                        <div className="bg-navy-100/30 p-2 rounded">
                          <div className="font-sans text-navy-900 text-xs mb-1">Carlos R.:</div>
                          <div className="text-navy-700 text-xs">Alguém tem dúvidas sobre o exercício 3?</div>
                        </div>
                      </div>
                    </MockupElement>

                    {/* Progress Visualization */}
                    <MockupElement className="mb-4">
                      <div className="font-serif text-navy-900 text-sm mb-3">Seu progresso</div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-navy-600">Conhecimento</span>
                          <span className="text-xs text-navy-900 font-sans">75%</span>
                        </div>
                        <div className="h-2 bg-navy-300/20 rounded-full overflow-hidden">
                          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '75%' }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8 }}
                            className="h-full bg-navy-600 rounded-full"
                          />
                        </div>
                      </div>
                    </MockupElement>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Blue Edge Highlights */}
            <motion.div
              className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-blue-400/30" />
              <div className="absolute top-0 right-0 w-2 h-full bg-blue-400/30" />
              <div className="absolute left-0 top-0 h-2 w-full bg-blue-400/30" />
              <div className="absolute bottom-0 left-0 h-2 w-full bg-blue-400/30" />
            </motion.div>
          </div>
        </motion.div>

        {/* Hover Interaction */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5 }}
          className="text-center mt-12"
        >
          <span className="text-navy-600 font-sans text-sm">
            Interaja com a interface ao passar o mouse
          </span>
        </motion.div>
      </div>
    </section>
  );
}
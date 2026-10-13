'use client';

import { motion } from 'framer-motion';
import { Brain, Shield, GitBranch, Lock, Copyright } from 'lucide-react';

const principles = [
  {
    id: 1,
    title: 'Verificar informações e fontes',
    description: 'Sempre questionar a origem, credibilidade e atualização das informações acessadas.',
    icon: Shield,
  },
  {
    id: 2,
    title: 'Reconhecer vieses e limitações',
    description: 'Entender que os algoritmos carregam premissas e que nenhum sistema é neutro por completo.',
    icon: GitBranch,
  },
  {
    id: 3,
    title: 'Proteger dados e respeitar a privacidade',
    description: 'Tratar informações pessoais com cuidado e respeitar os limites do compartilhamento.',
    icon: Lock,
  },
  {
    id: 4,
    title: 'Respeitar autoria e propriedade intelectual',
    description: 'Reconhecer e citar fontes, evitando reprodução indevida de conteúdo protegido.',
    icon: Copyright,
  },
  {
    id: 5,
    title: 'Declarar o uso de IA quando apropriado',
    description: 'Ser transparente sobre contribuições geradas por IA e possíveis limitações.',
    icon: Brain,
  },
];

export default function ResponsibleAISection() {
  return (
    <section 
      id="principios" 
      data-theme="dark"
      className="py-24 px-4 bg-navy-800 text-ivory">
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
            <span className="text-sm font-sans text-ivory/80 tracking-wider uppercase">
              Inteligência Artificial
            </span>
          </div>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-serif text-4xl sm:text-5xl text-ivory mb-6"
          >
            <span className="block mb-2">Tecnologia para ampliar possibilidades.</span>
            <span className="text-navy-300">Responsabilidade para orientar escolhas.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-sans text-navy-300 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            A tecnologia pode apoiar o aprendizado, mas as decisões e avaliações são sempre humanas.
          </motion.p>
        </motion.div>

        {/* Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Central AI Symbol */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, type: 'spring' }}
            className="lg:col-span-1 flex justify-center lg:justify-start"
          >
            <div className="w-24 h-24 rounded-full bg-blue-500/30 flex items-center justify-center border-2 border-blue-400/50">
              <Brain className="w-12 h-12 text-ivory" />
            </div>
          </motion.div>

          {/* Principles List */}
          <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            {principles.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <motion.div
                  key={principle.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="bg-navy-700/30 rounded-xl p-6 border border-navy-600/30"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-navy-600 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-ivory" />
                    </div>
                    <div>
                      <h3 className="font-serif text-ivory text-lg mb-2">{principle.title}</h3>
                      <p className="font-sans text-navy-300 text-sm">{principle.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Orbital Connection Visual */}
        <div className="mt-16 relative h-64 flex items-center justify-center">
          <motion.div
            className="absolute w-64 h-64 rounded-full border-2 border-navy-500/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute w-48 h-48 rounded-full border-2 border-navy-400/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear', direction: 'reverse' }}
          />
          <motion.div
            className="absolute w-32 h-32 bg-blue-500/20 rounded-full flex items-center justify-center"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Brain className="w-10 h-10 text-ivory" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
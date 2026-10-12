'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MessageCircle, FolderOpen, Network } from 'lucide-react';

interface ExperienceCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  delay: number;
  isHover: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

function ExperienceCard({ title, description, icon: Icon, delay, isHover, onMouseEnter, onMouseLeave }: ExperienceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5 }}
      className="group"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="bg-ivory rounded-2xl p-8 shadow-lg border border-navy-100/50 transition-all duration-300 h-full">
        {/* Icon */}
        <motion.div
          className="w-16 h-16 bg-navy-800 rounded-full flex items-center justify-center mb-6"
          animate={isHover ? { scale: [1, 1.05, 1] } : { scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Icon className="w-8 h-8 text-ivory" />
        </motion.div>

        {/* Content */}
        <h3 className="font-serif text-navy-900 text-xl mb-3">{title}</h3>
        <p className="font-sans text-navy-600 text-sm leading-relaxed">
          {description}
        </p>

        {/* Hover Indicator */}
        <motion.div
          className="mt-4 h-1 w-8 bg-navy-600"
          initial={{ width: 0 }}
          animate={{ width: isHover ? 32 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
}

export default function ExperienceEcosystem() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const experiences = [
    {
      id: 'workshops',
      title: 'Workshop e Experiências',
      description: 'Atividades práticas, sessões de aprendizagem guiada e desafios colaborativos com ilustrações de hackathons.',
      icon: Calendar,
    },
    {
      id: 'community',
      title: 'Comunidade e Fórum',
      description: 'Um espaço para discussões, perguntas, troca de ideias e compartilhamento de descobertas.',
      icon: MessageCircle,
    },
    {
      id: 'projects',
      title: 'Projetos e Portfólios',
      description: 'Documentação de projetos, contribuições, experimentos e lições aprendidas ao longo do tempo.',
      icon: FolderOpen,
    },
    {
      id: 'mentorship',
      title: 'Mentoria e Parcerias',
      description: 'Experiências supervisadas com orientação, colaboração institucional e atividades com responsabilidades definidas.',
      icon: Network,
    },
  ];

  return (
    <section id="experiencias" className="py-24 px-4 bg-ivory/50">
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
              A experiência
            </span>
          </div>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-serif text-4xl sm:text-5xl text-navy-900 mb-6"
          >
            <span className="block mb-2">Quatro áreas conectadas</span>
            <span className="text-navy-600">de experiência colaborativa</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-sans text-navy-700 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Um ecossistema pensado para colaboração, aprendizagem e contribuição.
          </motion.p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {experiences.map((exp, index) => (
            <ExperienceCard
              key={exp.id}
              title={exp.title}
              description={exp.description}
              icon={exp.icon}
              delay={index * 0.1}
              isHover={hoveredCard === exp.id}
              onMouseEnter={() => setHoveredCard(exp.id)}
              onMouseLeave={() => setHoveredCard(null)}
            />
          ))}
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute -top-40 -right-40 w-60 h-60 rounded-full bg-navy-500/10"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-40 h-40 rounded-full bg-navy-400/10"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          />
        </div>
      </div>
    </section>
  );
}
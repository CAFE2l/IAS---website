'use client';

import { motion } from 'framer-motion';

interface ProjectCardProps {
  title: string;
  description: string;
  category: string;
  imageSrc?: string;
  delay: number;
}

const placeholderProjects = [
  {
    id: 1,
    title: 'Mapeamento de Rotas Sustentáveis',
    description: 'Projeto de análise de impacto ambiental para redes de ônibus urbanas, desenvolvido durante o Workshop de Dados Sustentáveis.',
    category: 'Sustentabilidade',
    imageSrc: '/placeholder1',
  },
  {
    id: 2,
    title: 'Jardim Comunitário Digital',
    description: 'Plataforma colaborativa para gestão de hortas urbanas, facilitando o compartilhamento de sementes e conhecimentos.',
    category: 'Comunidade',
    imageSrc: '/placeholder2',
  },
  {
    id: 3,
    title: 'Narrativas da Resistência',
    description: 'Coletânea de histórias orais sobre educação popular, compilada e disseminada por meio de podcast e webdocumentário.',
    category: 'Cultura',
    imageSrc: '/placeholder3',
  },
];

function ProjectCard({ title, description, category, imageSrc, delay }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8 }}
      className="group cursor-pointer"
    >
      <div className="bg-ivory rounded-2xl overflow-hidden shadow-lg border border-navy-100/50 transition-all duration-300">
        {/* Image Area */}
        <div className="relative h-48 bg-gradient-to-br from-navy-100 via-navy-200 to-navy-300 flex items-center justify-center">
          <div className="text-navy-600 font-serif text-sm text-center px-4">
            <span className="block mb-2">[Imagem do projeto]</span>
            <span className="text-navy-800 font-bold">{title}</span>
          </div>
          
          {/* Overlay on hover */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-navy-900/40 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className="w-12 h-12 bg-ivory/20 rounded-full flex items-center justify-center"
            >
              <div className="w-6 h-6 border-2 border-ivory rounded-full" />
            </motion.div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-3">
            <span className="text-xs font-sans text-navy-600 uppercase tracking-wider">{category}</span>
          </div>
          <h3 className="font-serif text-navy-900 text-xl mb-3 group-hover:text-navy-700 transition-colors">
            {title}
          </h3>
          <p className="font-sans text-navy-600 text-sm leading-relaxed">
            {description}
          </p>
          
          {/* Read More Indicator */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: delay + 0.2 }}
            className="mt-4 flex items-center text-navy-500 text-xs font-sans"
          >
            <span>Ver detalhes</span>
            <motion.div
              className="ml-2 w-2 h-2 bg-navy-500 rounded-full"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="py-24 px-4 bg-ivory">
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
              Portfólio
            </span>
          </div>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-serif text-4xl sm:text-5xl text-navy-900 mb-6"
          >
            <span className="block mb-2">O aprendizado ganha forma</span>
            <span className="text-navy-600">quando você coloca ideias em prática.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-sans text-navy-700 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Projetos, experimentos e contribuições que documentam a jornada de aprendizado.
          </motion.p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {placeholderProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              category={project.category}
              imageSrc={project.imageSrc}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <span className="text-navy-600 font-sans text-sm">
            Projetos futuros poderão ser visualizados e contribuídos com a plataforma completa.
          </span>
        </motion.div>
      </div>
    </section>
  );
}
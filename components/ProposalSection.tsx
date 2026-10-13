'use client';

import { motion } from 'framer-motion';
import { Rocket, Globe, Users, BookOpen, Code, Share2 } from 'lucide-react';

const proposalPoints = [
  {
    id: 1,
    title: 'Aprendizagem colaborativa',
    description: 'Conectando pessoas interessadas em transformar conhecimento em experiência prática.',
    icon: Users,
  },
  {
    id: 2,
    title: 'Acesso aberto',
    description: 'Comunidade acolhedora que valoriza diversidade de experiências e perspectivas.',
    icon: Globe,
  },
  {
    id: 3,
    title: 'Experimentação guiada',
    description: 'Atividades práticas supervisadas que transformam ideias em projetos concretos.',
    icon: Rocket,
  },
  {
    id: 4,
    title: 'Documentação compartilhada',
    description: 'Portfólios e reflexões que visibilizam o aprendizado acumulado ao longo do tempo.',
    icon: BookOpen,
  },
  {
    id: 5,
    title: 'Tecnologia responsável',
    description: 'Ferramentas que apoiam a colaboração, sempre com ética e transparência.',
    icon: Code,
  },
  {
    id: 6,
    title: 'Contribuição visible',
    description: 'Experiências que podem ser compartilhadas, aprendidas e celebradas coletivamente.',
    icon: Share2,
  },
];

export default function ProposalSection() {
  return (
    <section 
      id="proposta" 
      data-theme="light"
      className="py-24 px-4 bg-ivory">
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
              A proposta
            </span>
          </div>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-serif text-4xl sm:text-5xl text-navy-900 mb-6"
          >
            <span className="block mb-2">Quem somos e o que proponemos</span>
            <span className="text-navy-600">para o futuro do aprendizado</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-sans text-navy-700 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            O Instituto de Aprendizado Social propõe um espaço digital para conectar 
            conhecimento, experiências e pessoas interessadas em transformar ideias em contribuições significativas.
          </motion.p>
        </motion.div>

        {/* Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {proposalPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={point.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="bg-ivory rounded-2xl p-6 shadow-lg border border-navy-100/50 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-navy-800 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-ivory" />
                  </div>
                  <div>
                    <h3 className="font-serif text-navy-900 text-xl mb-2">{point.title}</h3>
                    <p className="font-sans text-navy-600 text-sm leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Vision Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-navy-800/30 rounded-2xl p-8 max-w-4xl mx-auto border border-navy-700/30">
            <h3 className="font-serif text-navy-900 text-2xl mb-4">Nossa visão</h3>
            <p className="font-sans text-navy-700 text-base leading-relaxed">
              Um ambiente onde o aprendizado é vivido como experiência, onde o conhecimento 
              adquirido é compartilhado, e onde pessoas se conectam para transformar ideias 
              em contributions que podem ser docentes, criativas e significativas.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
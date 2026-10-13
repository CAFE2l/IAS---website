'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function ClosingSection() {
  return (
    <section id="final" className="relative py-24 px-4 bg-navy-900 text-ivory overflow-hidden">
      {/* Background with subtle animation */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-navy-600/20"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-60 h-60 rounded-full bg-navy-700/20"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 25, repeat: Infinity, delay: 5 }}
        />
        
        {/* Blue LED Pattern */}
        <div className="absolute top-0 left-0 right-0 h-20">
          <div className="flex justify-center space-x-4 mt-4">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-3 h-3 rounded-full bg-blue-400/50"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Brand - with icon */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="flex items-center space-x-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3, type: 'spring', stiffness: 100 }}
              className="w-16 h-16 rounded-full bg-navy-800 flex items-center justify-center border-2 border-ivory/30 overflow-hidden"
            >
              <Image
                src="/favicon.png"
                alt="IAS Logo"
                width={48}
                height={48}
                className="object-cover"
              />
            </motion.div>
            <span className="font-serif text-ivory text-xl font-bold leading-tight">Instituto de Aprendizado Social</span>
          </div>
        </motion.div>

        {/* Closing Headline - WHITE text */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-serif text-ivory text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight"
        >
          <span className="block mb-2">O próximo passo do aprendizado</span>
          <span className="text-navy-300">pode ser construído em conjunto.</span>
        </motion.h2>

        {/* Supporting Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-sans text-ivory/80 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          O I.A.S. propõe um espaço para conectar conhecimento, experiências e pessoas 
          interessadas em transformar ideias em contribuições significativas.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/cadastro"
              className="inline-flex items-center justify-center px-8 py-4 bg-navy-800 hover:bg-navy-700 text-ivory font-sans font-semibold rounded-full transition-colors duration-200 shadow-lg"
            >
              Experimentar
            </Link>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/login"
              className="inline-flex items-center justify-center px-8 py-4 border border-ivory/30 rounded-full bg-ivory/20 hover:bg-ivory/30 text-ivory font-sans font-semibold transition-colors duration-200"
            >
              Entrar
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
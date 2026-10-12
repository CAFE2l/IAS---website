'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-900 text-ivory py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Mission */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-navy-800 flex items-center justify-center border-2 border-ivory/30 overflow-hidden">
                <Image
                  src="/images/logo-escuro.png"
                  alt="IAS Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <span className="font-serif text-ivory text-2xl font-bold">
                Instituto de Aprendizado Social
              </span>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-sans text-navy-300 text-sm leading-relaxed"
            >
              Um ponto de encontro para transformar conhecimento em experiência, 
              conectar pessoas e construir possibilidades por meio da colaboração.
            </motion.p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="font-serif text-ivory text-lg font-semibold mb-4">Navegar</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#proposta" 
                  className="font-sans text-navy-300 hover:text-ivory transition-colors duration-200 text-sm"
                >
                  A proposta
                </a>
              </li>
              <li>
                <a 
                  href="#como-funciona" 
                  className="font-sans text-navy-300 hover:text-ivory transition-colors duration-200 text-sm"
                >
                  Como funciona
                </a>
              </li>
              <li>
                <a 
                  href="#experiencias" 
                  className="font-sans text-navy-300 hover:text-ivory transition-colors duration-200 text-sm"
                >
                  Experiências
                </a>
              </li>
              <li>
                <a 
                  href="#principios" 
                  className="font-sans text-navy-300 hover:text-ivory transition-colors duration-200 text-sm"
                >
                  Princípios
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Legal/Attribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="font-serif text-ivory text-lg font-semibold mb-4">Sobre</h3>
            <ul className="space-y-2">
              <li className="font-sans text-navy-300 text-sm">
                Projeto em desenvolvimento
              </li>
              <li className="font-sans text-navy-300 text-sm">
                Experiência educacional colaborativa
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="border-t border-navy-700/30 my-8"
        />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-navy-400">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            © {currentYear} Instituto de Aprendizado Social. Todos os direitos reservados.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center space-x-4 mt-4 md:mt-0"
          >
            <span className="font-sans text-navy-400">Construído com</span>
            <motion.div
              className="w-4 h-4 text-navy-500"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ♥
            </motion.div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
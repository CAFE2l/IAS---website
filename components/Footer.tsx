'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-900 text-ivory py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="border-t border-navy-700/30 my-8"
        />

        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand - Text only, no icon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="mb-4">
              <span className="font-serif text-ivory text-xl font-bold leading-tight">Instituto de Aprendizado Social</span>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-sans text-ivory/70 text-sm leading-relaxed max-w-xs"
            >
              Um ponto de encontro para transformar conhecimento em experiência, 
              conectar pessoas e construir possibilidades por meio da colaboração.
            </motion.p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="font-serif text-ivory text-lg font-semibold mb-4">Navegar</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#proposta" 
                  className="font-sans text-ivory/70 hover:text-ivory transition-colors duration-200 text-sm"
                >
                  A proposta
                </a>
              </li>
              <li>
                <a 
                  href="#como-funciona" 
                  className="font-sans text-ivory/70 hover:text-ivory transition-colors duration-200 text-sm"
                >
                  Como funciona
                </a>
              </li>
              <li>
                <a 
                  href="#experiencias" 
                  className="font-sans text-ivory/70 hover:text-ivory transition-colors duration-200 text-sm"
                >
                  Experiências
                </a>
              </li>
              <li>
                <a 
                  href="#principios" 
                  className="font-sans text-ivory/70 hover:text-ivory transition-colors duration-200 text-sm"
                >
                  Princípios
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Sobre */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="font-serif text-ivory text-lg font-semibold mb-4">Sobre</h3>
            <ul className="space-y-2">
              <li className="font-sans text-ivory/70 text-sm">
                Projeto em desenvolvimento
              </li>
              <li className="font-sans text-ivory/70 text-sm">
                Experiência educacional colaborativa
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-center text-sm text-ivory/70 mt-8 pt-4 border-t border-navy-700/30"
        >
          <span>
            © {currentYear} Instituto de Aprendizado Social. Todos os direitos reservados.
          </span>
        </motion.div>
      </div>
    </footer>
  );
}
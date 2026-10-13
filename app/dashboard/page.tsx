'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { supabase } from '../../lib/supabase';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error || !user) {
        router.push('/login');
        return;
      }
      
      setUser(user);
      setLoading(false);
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session?.user) {
        router.push('/login');
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy-800 via-navy-700 to-navy-500 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-800 via-navy-700 to-navy-500 text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/15 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-navy-400/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-300/10 rounded-full blur-[80px]" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-navy-900/95 backdrop-blur-md px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-full bg-navy-800 flex items-center justify-center overflow-hidden">
            <img src="/favicon.png" alt="Logo do Instituto de Aprendizado Social" className="w-7 h-7 object-contain" />
          </div>
          <span className="hidden sm:block font-serif text-xl font-bold">Instituto de Aprendizado Social</span>
        </Link>
        
        <div className="flex items-center space-x-6">
          <Link href="/dashboard" className="text-white/80 hover:text-white transition-colors">Dashboard</Link>
          <button 
            onClick={() => supabase.auth.signOut()}
            className="px-4 py-2 rounded-full bg-navy-800 hover:bg-navy-700 text-white font-sans text-sm transition-colors"
          >
            Sair
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Bem-vindo, {user?.user_metadata?.name || user?.email?.split('@')[0]}!
            </h1>
            <p className="text-white/80 font-sans text-lg max-w-2xl">
              Você agora está dentro da comunidade do Instituto de Aprendizado Social. 
              Explore as próximas seções e comece sua jornada de aprendizado colaborativa.
            </p>
          </motion.div>

          {/* Placeholder Modules */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Upcoming Events */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Link href="/eventos" className="block">
                <div className="auth-glass-card p-6 hover:scale-[1.02] transition-transform duration-300">
                  <h2 className="font-serif text-xl font-bold mb-2">Eventos em breve</h2>
                  <p className="text-white/60 font-sans text-sm">Eventos comunitários e workshops educacionais</p>
                </div>
              </Link>
            </motion.div>

            {/* Community */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link href="/comunidade" className="block">
                <div className="auth-glass-card p-6 hover:scale-[1.02] transition-transform duration-300">
                  <h2 className="font-serif text-xl font-bold mb-2">Comunidade</h2>
                  <p className="text-white/60 font-sans text-sm">Participe de discussões e projetas colaborativos</p>
                </div>
              </Link>
            </motion.div>

            {/* Profile */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link href="/perfil" className="block">
                <div className="auth-glass-card p-6 hover:scale-[1.02] transition-transform duration-300">
                  <h2 className="font-serif text-xl font-bold mb-2">Perfil</h2>
                  <p className="text-white/60 font-sans text-sm">Gerencie suas credenciais e preferências</p>
                </div>
              </Link>
            </motion.div>

            {/* Portfolio */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link href="/portfólio" className="block">
                <div className="auth-glass-card p-6 hover:scale-[1.02] transition-transform duration-300">
                  <h2 className="font-serif text-xl font-bold mb-2">Portfólio</h2>
                  <p className="text-white/60 font-sans text-sm">Mostre suas contribuições e projetos</p>
                </div>
              </Link>
            </motion.div>

            {/* Opportunities */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Link href="/oportunidades" className="block">
                <div className="auth-glass-card p-6 hover:scale-[1.02] transition-transform duration-300">
                  <h2 className="font-serif text-xl font-bold mb-2">Oportunidades</h2>
                  <p className="text-white/60 font-sans text-sm">Encontre oportunidades de colaboração e aprendizado</p>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="fixed bottom-0 left-0 right-0 bg-navy-900/95 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-4 border-t border-white/10"
      >
        <div className="max-w-6xl mx-auto flex justify-center">
          <Link href="/cadastro" className="text-white/60 hover:text-white font-sans text-sm transition-colors">
            Experimentar nova funcionalidade
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
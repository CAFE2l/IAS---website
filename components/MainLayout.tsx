'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '../lib/supabase';
import { 
  Home, 
  Calendar, 
  Users, 
  MessageSquare, 
  Briefcase, 
  FileText, 
  Settings,
  LogOut,
  Menu
} from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Eventos', href: '/eventos', icon: Calendar },
  { name: 'Comunidade', href: '/comunidade', icon: MessageSquare },
  { name: 'Empresas', href: '/empresas', icon: Users },
  { name: 'Oportunidades', href: '/oportunidades', icon: Briefcase },
  { name: 'Portfólio', href: '/portfólio', icon: FileText },
];

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user: authUser }, error } = await supabase.auth.getUser();
      
      if (error || !authUser) {
        router.push('/login');
        return;
      }

      // Get user profile
      const { data: dbUser } = await supabase
        .from('users')
        .select('*, role:roles(*)')
        .eq('auth_user_id', authUser.id)
        .single();

      setUser(dbUser || authUser);
      setLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event: any, session: any) => {
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

  if (!user) {
    return null;
  }

  const isActive = (href: string) => pathname === href;

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-800 via-navy-700 to-navy-500 text-white">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-6 left-6 z-50 md:hidden p-3 rounded-full bg-navy-800/80 hover:bg-navy-700 transition-colors duration-200"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <div 
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.3 }}
              className="fixed left-0 top-0 h-full w-64 bg-navy-800 z-50 p-6 pt-20 flex flex-col"
            >
              <Link href="/dashboard" className="flex items-center space-x-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-navy-700 flex items-center justify-center overflow-hidden">
                  <img src="/favicon.png" alt="IAS" className="w-7 h-7 object-contain" />
                </div>
                <span className="font-serif text-xl font-bold">I.A.S.</span>
              </Link>
              
              <nav className="flex-1 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-sans transition-colors ${
                      isActive(item.href)
                        ? 'bg-[#06122B] text-white'
                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:fixed md:inset-y-0 md:left-0 md:w-64 md:group">
        <nav className="flex flex-col w-full bg-navy-800/80 backdrop-blur-md border-r border-white/10 pt-20">
          <div className="px-4 mb-8">
            <Link href="/dashboard" className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-navy-700 flex items-center justify-center overflow-hidden">
                <img src="/favicon.png" alt="IAS" className="w-7 h-7 object-contain" />
              </div>
              <span className="font-serif text-xl font-bold">I.A.S.</span>
            </Link>
          </div>
          
          <div className="flex-1 px-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-sans transition-colors ${
                  isActive(item.href)
                    ? 'bg-[#06122B] text-white'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          <div className="p-4 border-t border-white/10">
            <button
              onClick={() => supabase.auth.signOut()}
              className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-sans text-white/70 hover:bg-white/10 hover:text-white transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Sair</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <main className="md:ml-64">
        <div className="pt-20">
          {children}
        </div>
      </main>
    </div>
  );
}
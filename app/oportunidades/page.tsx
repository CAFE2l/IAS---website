'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, Clock, Users } from 'lucide-react';

interface Opportunity {
  id: string;
  title: string;
  description?: string;
  type: 'internship' | 'job' | 'mentorship' | 'challenge';
  company_id?: string;
  location?: string;
  remote: boolean;
  start_date?: string;
  end_date?: string;
  status: 'open' | 'closed' | 'filled';
  application_count: number;
  created_at: string;
  company?: any;
}

export default function OpportunitiesPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [filters, setFilters] = useState<{
    type: Opportunity['type'] | 'all';
    status: Opportunity['status'] | 'all';
  }>({ type: 'all', status: 'all' });
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      
      if (!authUser) {
        router.push('/login');
        return;
      }

      setUser(authUser);

      // Fetch opportunities
      let query = supabase
        .from('opportunities')
        .select('*, company:companies(*)')
        .order('created_at', { ascending: false });

      if (filters.type !== 'all') {
        query = query.eq('type', filters.type);
      }

      if (filters.status !== 'all') {
        query = query.eq('status', filters.status);
      }

      const { data: oppsData, error } = await query.limit(50);

      if (!error && oppsData) {
        setOpportunities(oppsData as Opportunity[]);
      }

      setLoading(false);
    };

    getData();
  }, [router, filters]);

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

  const getTypeLabel = (type: Opportunity['type']) => {
    return {
      internship: 'Estágio',
      job: 'Emprego',
      mentorship: 'Mentoria',
      challenge: 'Desafio'
    }[type];
  };

  const getTypeColor = (type: Opportunity['type']) => {
    return {
      internship: 'bg-blue-500/20 text-blue-300',
      job: 'bg-green-500/20 text-green-300',
      mentorship: 'bg-purple-500/20 text-purple-300',
      challenge: 'bg-yellow-500/20 text-yellow-300'
    }[type];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-800 via-navy-700 to-navy-500 text-white pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-serif text-3xl md:text-4xl mb-4">Oportunidades</h1>
          <p className="text-white/80">Encontre estágios, empregos e mentorias</p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-glass-card rounded-2xl p-4 mb-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-2 text-white/60">
              <Briefcase className="w-5 h-5" />
              <span className="font-sans text-sm">Filtrar por tipo:</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {(['all', 'internship', 'job', 'mentorship', 'challenge'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setFilters(f => ({ ...f, type }))}
                  className={`px-3 py-1 rounded-full text-xs font-sans transition-colors ${
                    filters.type === type
                      ? 'bg-[#06122B] text-white'
                      : 'bg-white/10 text-white/60 hover:bg-white/15'
                  }`}
                >
                  {type === 'all' ? 'Todas' : getTypeLabel(type)}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Opportunities List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {opportunities.length === 0 ? (
            <div className="text-center py-12 bg-glass-card rounded-2xl">
              <Briefcase className="w-12 h-12 text-white/30 mx-auto mb-4" />
              <h3 className="font-serif text-xl mb-2">Nenhuma oportunidade disponível</h3>
              <p className="text-white/60 mb-4">
                Volte em breve para ver novas oportunidades da comunidade.
              </p>
            </div>
          ) : (
            opportunities.map((opp, index) => (
              <motion.div
                key={opp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-glass-card rounded-2xl p-6 hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-6 h-6 text-white/40" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className={`px-2 py-1 text-xs font-sans rounded ${getTypeColor(opp.type)}`}>
                        {getTypeLabel(opp.type)}
                      </span>
                      <span className="text-xs text-white/50">
                        Status: {opp.status}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-bold mb-2">{opp.title}</h3>
                    
                    {opp.company?.name && (
                      <p className="text-blue-300 text-sm mb-2">{opp.company.name}</p>
                    )}

                    {opp.description && (
                      <p className="text-white/70 text-sm mb-3 line-clamp-2">{opp.description}</p>
                    )}

                    <div className="flex items-center flex-wrap gap-4 text-sm text-white/50 mb-3">
                      {opp.location && (
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{opp.location}</span>
                        </div>
                      )}
                      {opp.remote && (
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>Remoto</span>
                        </div>
                      )}
                      {opp.start_date && (
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>Início: {new Date(opp.start_date).toLocaleDateString('pt-BR')}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{opp.application_count} candidaturas</span>
                      </div>
                    </div>

                    <button className="px-4 py-2 rounded-full bg-[#06122B] text-white font-sans text-sm font-semibold hover:bg-[#051D3D] transition-colors">
                      Aplicar
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </div>
  );
}
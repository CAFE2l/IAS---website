'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';
import { Event, EventType, EventStatus } from '../../lib/models';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, Filter } from 'lucide-react';

interface EventsPageProps {}

export default function EventsPage({}: EventsPageProps) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [filters, setFilters] = useState<{
    type: EventType | 'all';
    status: EventStatus | 'all';
    search: string;
  }>({ type: 'all', status: 'all', search: '' });
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      // Check auth
      const { data: { user: authUser } } = await supabase.auth.getUser();
      
      if (!authUser) {
        router.push('/login');
        return;
      }

      setUser(authUser);

      // Get user profile
      const { data: dbUser } = await supabase
        .from('users')
        .select('*, role:roles(*)')
        .eq('auth_user_id', authUser.id)
        .single();

      // Fetch events
      const { data: eventsData, error } = await supabase
        .from('events')
        .select('*, organizer:users(*)')
        .neq('status', 'cancelled')
        .order('date', { ascending: true });

      if (!error && eventsData) {
        setEvents(eventsData as Event[]);
      }

      setLoading(false);
    };

    getData();
  }, [router]);

  useEffect(() => {
    let result = events;

    // Apply type filter
    if (filters.type !== 'all') {
      result = result.filter(e => e.type === filters.type);
    }

    // Apply status filter
    if (filters.status !== 'all') {
      result = result.filter(e => e.status === filters.status);
    }

    // Apply search
    if (filters.search.trim()) {
      result = result.filter(e => 
        e.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        (e.description && e.description.toLowerCase().includes(filters.search.toLowerCase()))
      );
    }

    setFilteredEvents(result);
  }, [events, filters]);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-800 via-navy-700 to-navy-500 text-white pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-serif text-3xl md:text-4xl mb-4">Eventos</h1>
          <p className="text-white/80">
            Workshop, hackathons e oportunidades de aprendizado
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-glass-card p-4 rounded-2xl mb-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-2 text-white/80">
              <Filter className="w-5 h-5" />
              <span className="font-sans text-sm">Filtrar por:</span>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 gap-3">
              {/* Type Filter */}
              <select
                value={filters.type}
                onChange={(e) => setFilters(f => ({ ...f, type: e.target.value as EventType | 'all' }))}
                className="bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm font-sans focus:ring-2 focus:ring-white/40"
              >
                <option value="all">Todos os tipos</option>
                <option value="workshop">Workshops</option>
                <option value="hackathon">Hackathons</option>
              </select>

              {/* Status Filter */}
              <select
                value={filters.status}
                onChange={(e) => setFilters(f => ({ ...f, status: e.target.value as EventStatus | 'all' }))}
                className="bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm font-sans focus:ring-2 focus:ring-white/40"
              >
                <option value="all">Todos os status</option>
                <option value="published">Publicados</option>
                <option value="registration_open">Abertas inscrições</option>
                <option value="ongoing">Em andamento</option>
              </select>
            </div>
          </div>

          {/* Search */}
          <div className="mt-4">
            <input
              type="text"
              placeholder="Buscar eventos..."
              value={filters.search}
              onChange={(e) => setFilters(f => ({ ...f, search: e.target.value }))}
              className="w-full sm:max-w-md bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm font-sans placeholder-white/50 focus:ring-2 focus:ring-white/40"
            />
          </div>
        </motion.div>

        {/* Events List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {filteredEvents.length === 0 ? (
            <div className="text-center py-12 bg-glass-card rounded-2xl">
              <p className="text-white/60 font-sans">Nenhum evento encontrado.</p>
            </div>
          ) : (
            filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-glass-card rounded-2xl p-6 hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="px-3 py-1 text-xs font-sans font-semibold rounded-full bg-blue-500/20 text-blue-300">
                        {event.type === 'workshop' ? 'Workshop' : 'Hackathon'}
                      </span>
                      <span className="text-white/50 text-xs font-sans">
                        Status: {event.status.replace('_', ' ')}
                      </span>
                    </div>
                    
                    <h3 className="font-serif text-xl mb-2">
                      {event.title}
                    </h3>
                    
                    <p className="text-white/70 text-sm mb-4 line-clamp-2">
                      {event.description}
                    </p>
                    
                    <div className="flex items-center flex-wrap gap-4 text-sm text-white/60">
                      {event.date && (
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(event.date).toLocaleDateString('pt-BR')}</span>
                        </div>
                      )}
                      {event.start_time && (
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span>{event.start_time}</span>
                        </div>
                      )}
                      {event.location && (
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                      )}
                      {event.capacity && (
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4" />
                          <span>{event.capacity} vagas</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {event.status === 'registration_open' && (
                    <Link
                      href={`/eventos/${event.id}`}
                      className="ml-4 px-4 py-2 rounded-full bg-[#06122B] text-white font-sans text-sm font-semibold hover:bg-[#051D3D] transition-colors duration-200"
                    >
                      Inscrever-se
                    </Link>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </div>
  );
}
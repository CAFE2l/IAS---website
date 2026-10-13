'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '../../../lib/supabase';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, Target, Trophy, Users as People } from 'lucide-react';
import Link from 'next/link';

interface Event {
  id: string;
  title: string;
  description?: string;
  type: 'workshop' | 'hackathon';
  category?: string;
  date?: string;
  start_time?: string;
  end_time?: string;
  location?: string;
  campus?: string;
  room?: string;
  registration_deadline?: string;
  capacity?: number;
  organizer_id?: string;
  featured_image_url?: string;
  rules?: string[];
  requirements?: string[];
  evaluation_criteria?: string[];
  rewards?: string[];
  sponsors?: string[];
  mentors?: string[];
  status: string;
  is_featured: boolean;
  created_at: string;
  organizer?: any;
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function EventDetailPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState<Event | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const router = useRouter();
  const params = useParams();
  const eventId = params.id as string;

  useEffect(() => {
    const getData = async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      
      if (!authUser) {
        router.push('/login');
        return;
      }

      setUser(authUser);

      // Fetch event
      const { data: eventData, error } = await supabase
        .from('events')
        .select('*, organizer:users(*)')
        .eq('id', eventId)
        .single();

      if (!error && eventData) {
        setEvent(eventData as Event);
        
        // Check registration status
        const { data: regData } = await supabase
          .from('event_registrations')
          .select('*')
          .eq('event_id', eventId)
          .eq('user_id', authUser.id)
          .single();
        
        setIsRegistered(!!regData);
      }

      setLoading(false);
    };

    getData();
  }, [router, eventId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy-800 via-navy-700 to-navy-500 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || !event) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-800 via-navy-700 to-navie-500 text-white pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link href="/eventos" className="text-white/60 hover:text-white text-sm font-sans transition-colors">
            ← Voltar aos eventos
          </Link>
        </motion.div>

        {/* Event Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-glass-card rounded-2xl p-8 mb-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <span className="px-3 py-1 text-xs font-sans rounded-full bg-blue-500/20 text-blue-300">
              {event.type === 'workshop' ? 'Workshop' : 'Hackathon'}
            </span>
            <span className="text-xs text-white/50">Status: {event.status.replace('_', ' ')}</span>
          </div>

          <h1 className="font-serif text-3xl md:text-4xl mb-4">{event.title}</h1>
          
          {event.description && (
            <p className="text-white/80 text-lg mb-6">{event.description}</p>
          )}

          <div className="flex flex-wrap items-center gap-6 text-sm text-white/60 mb-6">
            {event.date && (
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(event.date).toLocaleDateString('pt-BR')}</span>
              </div>
            )}
            {event.start_time && (
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{event.start_time} - {event.end_time}</span>
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

          {event.organizer && (
            <div className="pt-4 border-t border-white/10">
              <p className="text-sm text-white/60">Organizado por:</p>
              <p className="font-sans">{event.organizer.name || event.organizer.email}</p>
            </div>
          )}
        </motion.div>

        {/* Event Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Requirements */}
          <div className="lg:col-span-1 bg-glass-card rounded-2xl p-6">
            <h3 className="font-serif text-lg font-bold mb-4 flex items-center space-x-2">
              <Target className="w-5 h-5" />
              <span>Requisitos</span>
            </h3>
            {event.requirements && event.requirements.length > 0 ? (
              <ul className="space-y-2">
                {event.requirements.map((req, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-green-400">•</span>
                    <span className="text-sm text-white/80">{req}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-white/50 text-sm">Nenhum requisito especificado</p>
            )}
          </div>

          {/* Rules */}
          <div className="lg:col-span-1 bg-glass-card rounded-2xl p-6">
            <h3 className="font-serif text-lg font-bold mb-4 flex items-center space-x-2">
              <People className="w-5 h-5" />
              <span>Regras</span>
            </h3>
            {event.rules && event.rules.length > 0 ? (
              <ul className="space-y-2">
                {event.rules.map((rule, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-white/40">•</span>
                    <span className="text-sm text-white/80">{rule}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-white/50 text-sm">Nenhuma regra especificada</p>
            )}
          </div>

          {/* About */}
          <div className="lg:col-span-1 bg-glass-card rounded-2xl p-6">
            <h3 className="font-serif text-lg font-bold mb-4 flex items-center space-x-2">
              <Trophy className="w-5 h-5" />
              <span>Sobre</span>
            </h3>
            {event.evaluation_criteria && event.evaluation_criteria.length > 0 ? (
              <ul className="space-y-2">
                {event.evaluation_criteria.map((crit, i) => (
                  <li key={i} className="text-sm text-white/80">{i + 1}. {crit}</li>
                ))}
              </ul>
            ) : (
              <p className="text-white/50 text-sm">Detalhes sobre avaliação não especificados</p>
            )}
          </div>
        </motion.div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6"
        >
          {!isRegistered && event.status === 'registration_open' ? (
            <button className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#06122B] text-white font-sans font-semibold hover:bg-[#051D3D] transition-colors duration-200">
              Inscrever-se
            </button>
          ) : isRegistered ? (
            <button className="w-full sm:w-auto px-8 py-3 rounded-full bg-green-500/20 text-green-300 font-sans font-semibold" disabled>
              Inscrito
            </button>
          ) : (
            <button className="w-full sm:w-auto px-8 py-3 rounded-full bg-white/10 text-white/60 font-sans font-semibold" disabled>
              Inscrições encerradas
            </button>
          )}
        </motion.div>
      </div>
    </div>
  );
}
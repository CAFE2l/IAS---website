'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';
import { Company } from '../../lib/models';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Building, Globe, Mail, Phone, Badge } from 'lucide-react';

interface CompaniesPageProps {}

export default function CompaniesPage({}: CompaniesPageProps) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [search, setSearch] = useState('');
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

      // Fetch companies
      const { data: companiesData, error } = await supabase
        .from('companies')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (!error && companiesData) {
        setCompanies(companiesData as Company[]);
      }

      setLoading(false);
    };

    getData();
  }, [router]);

  const filteredCompanies = companies.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.industry?.toLowerCase().includes(search.toLowerCase())
  );

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
          <h1 className="font-serif text-3xl md:text-4xl mb-4">Parceiros</h1>
          <p className="text-white/80">
            Empresas que apoiam nosso ecossistema de aprendizado
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Buscar empresas..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-full px-5 py-3 text-sm font-sans placeholder-white/50 focus:ring-2 focus:ring-white/40"
            />
            <Building className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          </div>
        </motion.div>

        {/* Companies Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredCompanies.length === 0 ? (
            <div className="col-span-full text-center py-12 bg-glass-card rounded-2xl">
              <p className="text-white/60 font-sans">Nenhuma empresa encontrada.</p>
            </div>
          ) : (
            filteredCompanies.map((company, index) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-glass-card rounded-2xl p-6 hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="flex items-start space-x-4">
                  {/* Logo or Icon */}
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    {company.logo_url ? (
                      <img src={company.logo_url} alt={company.name} className="w-12 h-12 object-contain rounded-full" />
                    ) : (
                      <Building className="w-8 h-8 text-white/40" />
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-serif text-lg font-bold mb-1">{company.name}</h3>
                    
                    {company.industry && (
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className="w-4 h-4 text-white/40" />
                        <span className="text-white/60 text-sm font-sans">{company.industry}</span>
                      </div>
                    )}

                    {company.partnership_level && (
                      <div className="mb-3">
                        <span className="px-2 py-1 text-xs font-sans font-semibold rounded-full bg-yellow-500/20 text-yellow-300">
                          Nível: {company.partnership_level}
                        </span>
                      </div>
                    )}

                    {company.description && (
                      <p className="text-white/70 text-sm mb-3 line-clamp-3">
                        {company.description}
                      </p>
                    )}

                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm text-white/60">
                      {company.website && (
                        <a href={company.website} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 hover:text-white transition-colors">
                          <Globe className="w-4 h-4" />
                          <span>Site</span>
                        </a>
                      )}
                      {company.email && (
                        <a href={`mailto:${company.email}`} className="flex items-center space-x-1 hover:text-white transition-colors">
                          <Mail className="w-4 h-4" />
                          <span>Email</span>
                        </a>
                      )}
                      {company.phone && (
                        <div className="flex items-center space-x-1">
                          <Phone className="w-4 h-4" />
                          <span>Telefone</span>
                        </div>
                      )}
                    </div>
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
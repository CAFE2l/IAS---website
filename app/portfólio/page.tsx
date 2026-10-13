'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';
import { motion } from 'framer-motion';
import { Folder, Plus, ExternalLink, Github, Code, Tag } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description?: string;
  image_url?: string;
  github_url?: string;
  live_url?: string;
  tech_stack?: string[];
  role?: string;
  duration?: string;
  created_at: string;
}

export default function PortfolioPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      
      if (!authUser) {
        router.push('/login');
        return;
      }

      setUser(authUser);

      // Fetch user's portfolio projects
      const { data: projectsData, error } = await supabase
        .from('portfolio_projects')
        .select('*')
        .eq('user_id', authUser.id)
        .order('created_at', { ascending: false });

      if (!error && projectsData) {
        setProjects(projectsData as Project[]);
      }

      setLoading(false);
    };

    getData();
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-800 via-navy-700 to-navy-500 text-white pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between"
        >
          <div>
            <h1 className="font-serif text-3xl md:text-4xl mb-2">Meu Portfólio</h1>
            <p className="text-white/80">Mostre seus projetos e contribuições</p>
          </div>
          <button className="px-4 py-2 rounded-full bg-[#06122B] text-white font-sans text-sm font-semibold hover:bg-[#051D3D] transition-colors flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Adicionar projeto</span>
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-glass-card rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center space-x-8">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{projects.length}</p>
              <p className="text-sm text-white/60">Projetos</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">0</p>
              <p className="text-sm text-white/60">Visualizações</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">0</p>
              <p className="text-sm text-white/60">Mentores</p>
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {projects.length === 0 ? (
            <div className="text-center py-12 bg-glass-card rounded-2xl">
              <Folder className="w-12 h-12 text-white/30 mx-auto mb-4" />
              <h3 className="font-serif text-xl mb-2">Seu portfólio está vazio</h3>
              <p className="text-white/60 mb-4">
                Comece adicionando seus melhores projetos para mostrar à comunidade.
              </p>
              <button className="px-6 py-3 rounded-full bg-[#06122B] text-white font-sans font-semibold hover:bg-[#051D3D] transition-colors">
                Adicionar primeiro projeto
              </button>
            </div>
          ) : (
            projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-glass-card rounded-2xl p-6 hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="flex items-start space-x-6">
                  {/* Project Image/Icon */}
                  <div className="w-20 h-20 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                    {project.image_url ? (
                      <img src={project.image_url} alt={project.title} className="w-16 h-16 object-cover rounded-lg" />
                    ) : (
                      <Code className="w-8 h-8 text-white/40" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-serif text-xl font-bold">{project.title}</h3>
                      {project.role && (
                        <span className="px-2 py-1 text-xs font-sans rounded bg-yellow-500/20 text-yellow-300">
                          {project.role}
                        </span>
                      )}
                    </div>
                    
                    {project.description && (
                      <p className="text-white/70 text-sm mb-3">{project.description}</p>
                    )}

                    {/* Tech Stack */}
                    {project.tech_stack && project.tech_stack.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.tech_stack.map((tech) => (
                          <span key={tech} className="px-2 py-1 text-xs font-sans rounded bg-blue-500/20 text-blue-300">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Links */}
                    <div className="flex items-center space-x-4 text-sm text-white/50">
                      {project.live_url && (
                        <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 hover:text-white transition-colors">
                          <ExternalLink className="w-4 h-4" />
                          <span>Visitar</span>
                        </a>
                      )}
                      {project.github_url && (
                        <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 hover:text-white transition-colors">
                          <Github className="w-4 h-4" />
                          <span>Código</span>
                        </a>
                      )}
                      {project.duration && (
                        <span className="flex items-center space-x-1">
                          <Tag className="w-4 h-4" />
                          <span>{project.duration}</span>
                        </span>
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
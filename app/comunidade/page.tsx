'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';
import { ForumCategory, ForumPost, ForumCategoryType } from '../../lib/models';
import { motion } from 'framer-motion';
import { MessageSquare, Clock, User, Search, Hash } from 'lucide-react';
import Link from 'next/link';

interface ForumPageProps {}

// Forum categories
const FORUM_CATEGORIES: { id: string; name: string; slug: string; icon: string; color: string }[] = [
  { id: 'tech', name: 'Tecnologia', slug: 'tecnologia', icon: '💻', color: 'bg-blue-500/20 text-blue-300' },
  { id: 'ai', name: 'Inteligência Artificial', slug: 'inteligencia-artificial', icon: '🤖', color: 'bg-purple-500/20 text-purple-300' },
  { id: 'career', name: 'Carreira', slug: 'carreira', icon: '💼', color: 'bg-green-500/20 text-green-300' },
  { id: 'portfolio', name: 'Portfólio', slug: 'portfólio', icon: '📁', color: 'bg-cyan-500/20 text-cyan-300' },
  { id: 'hackathons', name: 'Hackathons', slug: 'hackathons', icon: '🏆', color: 'bg-yellow-500/20 text-yellow-300' },
  { id: 'workshops', name: 'Workshops', slug: 'workshops', icon: '📚', color: 'bg-indigo-500/20 text-indigo-300' },
  { id: 'first-job', name: 'Primeiro Emprego', slug: 'primeiro-emprego', icon: '🚀', color: 'bg-emerald-500/20 text-emerald-300' },
  { id: 'projects', name: 'Projetos', slug: 'projetos', icon: '🔧', color: 'bg-rose-500/20 text-rose-300' },
];

export default function ForumPage({}: ForumPageProps) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      
      if (!authUser) {
        router.push('/login');
        return;
      }

      setUser(authUser);

      // Fetch posts
      let query = supabase
        .from('forum_posts')
        .select('*, user:users(*)')
        .order('created_at', { ascending: false });

      if (selectedCategory !== 'all') {
        query = query.eq('category', selectedCategory);
      }

      if (search.trim()) {
        query = query.ilike('title', `%${search}%`);
      }

      const { data: postsData, error } = await query.limit(50);

      if (!error && postsData) {
        setPosts(postsData as ForumPost[]);
      }

      setLoading(false);
    };

    getData();
  }, [router, selectedCategory, search]);

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
          <h1 className="font-serif text-3xl md:text-4xl mb-4">Comunidade</h1>
          <p className="text-white/80">
            Participe de discussões, compartilhe experiências e aprenda com a comunidade
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
              placeholder="Buscar posts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-full px-5 py-3 text-sm font-sans placeholder-white/50 focus:ring-2 focus:ring-white/40"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-sans transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-[#06122B] text-white'
                  : 'bg-white/10 text-white/60 hover:bg-white/15'
              }`}
            >
              Todos
            </button>
            {FORUM_CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-sans transition-colors flex items-center space-x-2 ${
                  selectedCategory === category.id
                    ? 'bg-[#06122B] text-white'
                    : 'bg-white/10 text-white/60 hover:bg-white/15'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Posts List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {posts.length === 0 ? (
            <div className="text-center py-12 bg-glass-card rounded-2xl">
              <MessageSquare className="w-12 h-12 text-white/30 mx-auto mb-4" />
              <p className="text-white/60 font-sans mb-4">Nenhum post encontrado na comunidade.</p>
              <Link
                href="/comunidade/criar-post"
                className="inline-block px-6 py-3 rounded-full bg-[#06122B] text-white font-sans font-semibold hover:bg-[#051D3D] transition-colors duration-200"
              >
                Criar primeiro post
              </Link>
            </div>
          ) : (
            posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-glass-card rounded-2xl p-6 hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="flex items-start space-x-4">
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    {post.user?.avatar_url ? (
                      <img src={post.user.avatar_url} alt={post.user.name || 'User'} className="w-8 h-8 rounded-full object-cover" />
                    ) : (
                      <User className="w-5 h-5 text-white/40" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-serif text-lg font-bold">
                        <Link 
                          href={`/comunidade/${post.slug || post.id}`}
                          className="hover:text-blue-300 transition-colors"
                        >
                          {post.title}
                        </Link>
                      </h3>
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex items-center space-x-1">
                          <Hash className="w-3 h-3 text-white/40" />
                          <span className="text-xs text-white/50">
                            {post.tags.slice(0, 2).join(', ')}
                          </span>
                        </div>
                      )}
                    </div>

                    <p className="text-white/70 text-sm mb-3 line-clamp-2">
                      {post.content}
                    </p>

                    <div className="flex items-center space-x-4 text-xs text-white/50">
                      <div className="flex items-center space-x-1">
                        <User className="w-3 h-3" />
                        <span>{post.user?.name || post.user?.email?.split('@')[0]}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{new Date(post.created_at).toLocaleDateString('pt-BR')}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="w-3 h-3" />
                        <span>{post.comment_count || 0} comentários</span>
                      </div>
                      {post.votes && (
                        <div className="flex items-center space-x-1">
                          <span>👍 {post.votes > 0 ? `+${post.votes}` : post.votes}</span>
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
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '../../../lib/supabase';
import { motion } from 'framer-motion';
import { MessageSquare, Clock, User, Reply, ThumbsUp, Smile } from 'lucide-react';

interface ForumPost {
  id: string;
  title: string;
  slug?: string;
  content: string;
  category_id?: string;
  user_id?: string;
  created_at: string;
  updated_at?: string;
  votes: number;
  view_count: number;
  comment_count: number;
  tags?: string[];
  user?: any;
  comments?: Comment[];
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface Comment {
  id: string;
  content: string;
  user_id: string;
  post_id: string;
  parent_id?: string;
  created_at: string;
  user?: any;
  replies?: Comment[];
}

export default function ForumPostPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<ForumPost | null>(null);
  const [newComment, setNewComment] = useState('');
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  useEffect(() => {
    const getData = async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      
      if (!authUser) {
        router.push('/login');
        return;
      }

      setUser(authUser);

      // Fetch post by slug or id
      const { data: postData, error } = await supabase
        .from('forum_posts')
        .select('*, user:users(*), comments:comments(*, user:users(*))')
        .eq('slug', slug)
        .single();

      if (!error && postData) {
        setPost(postData as any);
      } else if (!error) {
        // Fallback to id if slug doesn't match
        const { data: postById } = await supabase
          .from('forum_posts')
          .select('*, user:users(*), comments:comments(*, user:users(*))')
          .eq('id', slug)
          .single();
        
        if (postById) {
          setPost(postById as any);
        }
      }

      setLoading(false);
    };

    getData();
  }, [router, slug]);

  const handleAddComment = async () => {
    if (!newComment.trim() || !user) return;

    const { error } = await supabase.from('comments').insert({
      content: newComment,
      user_id: user.id,
      post_id: post?.id,
    });

    if (!error) {
      setNewComment('');
      // Refresh post data
      const { data } = await supabase
        .from('forum_posts')
        .select('*, user:users(*), comments:comments(*, user:users(*))')
        .eq('id', post?.id)
        .single();
      setPost(data as any);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy-800 via-navy-700 to-navy-500 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || !post) {
    return null;
  }

  const renderComments = (comments: any[] = [], depth = 0) => {
    if (!comments) return null;
    
    return comments.map((comment) => (
      <div key={comment.id} className={`mt-3 ml-${depth * 4} ${depth > 0 ? 'border-l border-white/5 pl-4' : ''}`}>
        <div className="bg-white/5 rounded-lg p-3">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
              {comment.user?.avatar_url ? (
                <img src={comment.user.avatar_url} alt={comment.user.name} className="w-6 h-6 rounded-full object-cover" />
              ) : (
                <User className="w-4 h-4 text-white/40" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-sans text-sm font-bold">{comment.user?.name || comment.user?.email?.split('@')[0]}</span>
                <span className="text-xs text-white/40">·</span>
                <span className="text-xs text-white/50">
                  {new Date(comment.created_at).toLocaleString('pt-BR')}
                </span>
              </div>
              <p className="text-sm text-white/80 mb-2">{comment.content}</p>
              <div className="flex items-center space-x-4 text-xs text-white/50">
                <button className="flex items-center space-x-1 hover:text-white transition-colors">
                  <ThumbsUp className="w-3 h-3" />
                  <span>Gostar</span>
                </button>
                <button className="flex items-center space-x-1 hover:text-white transition-colors">
                  <Reply className="w-3 h-3" />
                  <span>Responder</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        {comment.replies && comment.replies.length > 0 && renderComments(comment.replies, depth + 1)}
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-800 via-navy-700 to-navy-500 text-white pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button 
            onClick={() => router.back()}
            className="text-white/60 hover:text-white text-sm font-sans transition-colors"
          >
            ← Voltar
          </button>
        </motion.div>

        {/* Post */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-glass-card rounded-2xl p-8 mb-6"
        >
          <h1 className="font-serif text-3xl mb-4">{post.title}</h1>
          
          <div className="flex items-center space-x-4 text-sm text-white/60 mb-4">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>{post.user?.name || post.user?.email?.split('@')[0]}</span>
            </div>
            <span className="text-white/40">·</span>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>{new Date(post.created_at).toLocaleString('pt-BR')}</span>
            </div>
          </div>

          <div className="flex items-center space-x-6 text-sm text-white/60 mb-4">
            <span className="flex items-center space-x-1">
              <Smile className="w-4 h-4" />
              <span>{post.votes} gostos</span>
            </span>
            <span className="flex items-center space-x-1">
              <MessageSquare className="w-4 h-4" />
              <span>{post.comment_count} comentários</span>
            </span>
            <span className="flex items-center space-x-1">
              <User className="w-4 h-4" />
              <span>{post.view_count} visualizações</span>
            </span>
          </div>

          <div className="bg-white/5 rounded-lg p-4 mb-6">
            <p className="text-white/90 whitespace-pre-wrap">{post.content}</p>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag: string) => (
                <span key={tag} className="px-2 py-1 text-xs font-sans rounded bg-blue-500/20 text-blue-300">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </motion.div>

        {/* Comments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-glass-card rounded-2xl p-6 mb-6"
        >
          <h3 className="font-serif text-lg font-bold mb-4">Comentários ({post.comment_count || (post.comments?.length || 0)})</h3>
          
          <div className="space-y-4">
            {post.comments && post.comments.length > 0 ? (
              <>
                {post.comments.slice(0, 10).map((comment) => (
                  <div key={comment.id} className="bg-white/5 rounded-lg p-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                        {comment.user?.avatar_url ? (
                          <img src={comment.user.avatar_url} alt={comment.user.name} className="w-6 h-6 rounded-full object-cover" />
                        ) : (
                          <User className="w-4 h-4 text-white/40" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-sans text-sm font-bold">
                            {comment.user?.name || comment.user?.email?.split('@')[0]}
                          </span>
                        </div>
                        <p className="text-sm text-white/80 mb-2">{comment.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {post.comments.length > 10 && (
                  <button className="text-sm text-blue-300 hover:text-blue-200 font-sans">
                    Ver mais comentários
                  </button>
                )}
              </>
            ) : (
              <p className="text-white/50 text-sm">Nenhum comentário ainda. Seja o primeiro a comentar!</p>
            )}
          </div>
        </motion.div>

        {/* Add Comment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-glass-card rounded-2xl p-6"
        >
          <h4 className="font-serif text-lg font-bold mb-3">Adicionar comentário</h4>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Escreva seu comentário..."
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-sm font-sans placeholder-white/50 focus:ring-2 focus:ring-white/40 mb-3"
            rows={4}
          />
          <button
            onClick={handleAddComment}
            disabled={!newComment.trim()}
            className="px-4 py-2 rounded-full bg-[#06122B] text-white font-sans text-sm font-semibold hover:bg-[#051D3D] transition-colors duration-200 disabled:opacity-50"
          >
            Comentar
          </button>
        </motion.div>
      </div>
    </div>
  );
}
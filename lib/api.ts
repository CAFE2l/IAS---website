/**
 * I.A.S. - Instituto de Aprendizado Social
 * API Client for Supabase Backend
 */

import { supabase } from './supabase';
import { 
  User, 
  Event, 
  Company, 
  ForumPost, 
  ForumComment,
  PortfolioProject,
  UserCertification,
  Opportunity,
  MentorshipRequest,
  Notification,
  EventType,
  EventStatus,
  EventCategory,
  ForumCategory,
  OpportunityType,
  OpportunityStatus
} from './models';

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const transformUser = (user: any): User => ({
  id: user.id,
  auth_user_id: user.auth_user_id,
  email: user.email,
  name: user.name,
  avatar_url: user.avatar_url,
  bio: user.bio,
  role_id: user.role_id,
  company_id: user.company_id,
  is_verified: user.is_verified,
  created_at: user.created_at,
  updated_at: user.updated_at,
});

const transformEvent = (event: any): Event => ({
  id: event.id,
  title: event.title,
  description: event.description,
  type: event.type,
  category: event.category,
  date: event.date,
  start_time: event.start_time,
  end_time: event.end_time,
  location: event.location,
  campus: event.campus,
  room: event.room,
  registration_deadline: event.registration_deadline,
  capacity: event.capacity,
  organizer_id: event.organizer_id,
  featured_image_url: event.featured_image_url,
  rules: event.rules,
  requirements: event.requirements,
  evaluation_criteria: event.evaluation_criteria,
  rewards: event.rewards,
  sponsors: event.sponsors,
  mentors: event.mentors,
  status: event.status,
  is_featured: event.is_featured,
  created_at: event.created_at,
  updated_at: event.updated_at,
});

// ============================================================================
// EVENTS API
// ============================================================================

export const EventsAPI = {
  // Get all events with optional filters
  async list(filters?: {
    type?: EventType;
    status?: EventStatus;
    category?: EventCategory;
    limit?: number;
    offset?: number;
    search?: string;
  }) {
    let query = supabase.from('events').select('*, organizer:users(*)');
    
    if (filters?.type) {
      query = query.eq('type', filters.type);
    }
    
    if (filters?.status) {
      query = query.eq('status', filters.status);
    }
    
    if (filters?.category) {
      query = query.eq('category', filters.category);
    }
    
    if (filters?.search) {
      query = query.ilike('title', `%${filters.search}%`);
    }
    
    if (filters?.limit) {
      query = query.limit(filters.limit);
    }
    
    if (filters?.offset) {
      query = query.range(filters.offset, (filters.offset || 0) + (filters.limit || 10) - 1);
    }
    
    const { data, error } = await query.order('date', { ascending: false });
    
    if (error) throw error;
    return data?.map(transformEvent) || [];
  },

  // Get single event
  async get(id: string) {
    const { data, error } = await supabase
      .from('events')
      .select('*, organizer:users(*), companies(*)')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return transformEvent(data);
  },

  // Register for event
  async register(eventId: string, userId: string, additionalData?: Record<string, any>) {
    const { data, error } = await supabase
      .from('event_registrations')
      .insert({
        event_id: eventId,
        user_id: userId,
        registration_data: additionalData,
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Cancel registration
  async cancelRegistration(registrationId: string) {
    const { data, error } = await supabase
      .from('event_registrations')
      .update({ status: 'cancelled' })
      .eq('id', registrationId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Get user's registrations
  async getUserRegistrations(userId: string) {
    const { data, error } = await supabase
      .from('event_registrations')
      .select('*, event:events(*)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },
};

// ============================================================================
// COMPANIES API
// ============================================================================

export const CompaniesAPI = {
  async list(activeOnly = true) {
    let query = supabase.from('companies').select('*');
    
    if (activeOnly) {
      query = query.eq('is_active', true);
    }
    
    const { data, error } = await query.order('name');
    
    if (error) throw error;
    return data || [];
  },

  async get(id: string) {
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async getSponsorsForEvent(eventId: string) {
    const { data, error } = await supabase
      .from('events')
      .select('sponsors')
      .eq('id', eventId)
      .single();
    
    if (error) throw error;
    
    if (!data?.sponsors || data.sponsors.length === 0) {
      return [];
    }
    
    const { data: companies, error: companiesError } = await supabase
      .from('companies')
      .select('*')
      .in('id', data.sponsors);
    
    if (companiesError) throw companiesError;
    return companies || [];
  },
};

// ============================================================================
// FORUM API
// ============================================================================

export const ForumAPI = {
  async getCategories() {
    const { data, error } = await supabase
      .from('forum_categories')
      .select('*, post_count')
      .order('name');
    
    if (error) throw error;
    return data || [];
  },

  async getPosts(filters?: {
    categoryId?: string;
    search?: string;
    limit?: number;
    offset?: number;
  }) {
    let query = supabase.from('forum_posts').select('*, user:users(*)');
    
    if (filters?.categoryId) {
      query = query.eq('category_id', filters.categoryId);
    }
    
    if (filters?.search) {
      query = query.ilike('title', `%${filters.search}%`);
    }
    
    if (filters?.limit) {
      query = query.limit(filters.limit);
    }
    
    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async getPost(id: string) {
    const { data, error } = await supabase
      .from('forum_posts')
      .select('*, user:users(*), comments:forum_comments(*, user:users(*))')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async createPost(userId: string, postData: {
    category_id: string;
    title: string;
    content?: string;
    tags?: string[];
    author_signature?: string;
  }) {
    const { data, error } = await supabase
      .from('forum_posts')
      .insert({
        ...postData,
        user_id: userId,
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async addComment(postId: string, userId: string, content: string, parentId?: string) {
    const { data, error } = await supabase
      .from('forum_comments')
      .insert({
        post_id: postId,
        user_id: userId,
        content,
        parent_id: parentId,
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async votePost(postId: string, userId: string, voteType: 1 | -1) {
    // Remove existing vote
    await supabase
      .from('forum_post_votes')
      .delete()
      .eq('post_id', postId)
      .eq('user_id', userId);
    
    // Add new vote
    const { error } = await supabase
      .from('forum_post_votes')
      .insert({
        post_id: postId,
        user_id: userId,
        vote_type: voteType,
      });
    
    if (error) throw error;
    
    // Update post votes count
    const { error: updateError } = await supabase.rpc('update_post_votes', {
      post_id: postId,
    });
    
    // Fallback: manual update
    if (updateError) {
      const { data: votes } = await supabase
        .from('forum_post_votes')
        .select('vote_type')
        .eq('post_id', postId);
      
      const total = votes?.reduce((sum: any, v: any) => sum + v.vote_type, 0) || 0;
      await supabase
        .from('forum_posts')
        .update({ votes: total })
        .eq('id', postId);
    }
    
    return true;
  },
};

// ============================================================================
// USERS API
// ============================================================================

export const UsersAPI = {
  async getProfile(userId: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*, user_profiles(*), role:roles(*), company:companies(*)')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateProfile(userId: string, updates: Partial<User> & Partial<any>) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getUserRole(userId: string) {
    const { data, error } = await supabase
      .from('users')
      .select('role:roles(*)')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    return data?.role;
  },
};

// ============================================================================
// OPPORTUNITIES API
// ============================================================================

export const OpportunitiesAPI = {
  async list(filters?: {
    type?: OpportunityType;
    status?: OpportunityStatus;
    company_id?: string;
    search?: string;
    limit?: number;
  }) {
    let query = supabase.from('opportunities').select('*, company:companies(*)');
    
    if (filters?.type) {
      query = query.eq('type', filters.type);
    }
    
    if (filters?.status) {
      query = query.eq('status', filters.status);
    }
    
    if (filters?.company_id) {
      query = query.eq('company_id', filters.company_id);
    }
    
    if (filters?.search) {
      query = query.ilike('title', `%${filters.search}%`);
    }
    
    if (filters?.limit) {
      query = query.limit(filters.limit);
    }
    
    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async get(id: string) {
    const { data, error } = await supabase
      .from('opportunities')
      .select('*, company:companies(*)')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },
};

// ============================================================================
// NOTIFICATIONS API
// ============================================================================

export const NotificationsAPI = {
  async list(userId: string, readOnly?: boolean) {
    let query = supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId);
    
    if (readOnly !== undefined) {
      query = query.eq('is_read', readOnly);
    }
    
    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async markAsRead(id: string) {
    const { data, error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async markAllAsRead(userId: string) {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('user_id', userId)
      .eq('is_read', false);
    
    if (error) throw error;
    return true;
  },
};

// ============================================================================
// PORTFOLIO API
// ============================================================================

export const PortfolioAPI = {
  async getUserProjects(userId: string) {
    const { data, error } = await supabase
      .from('portfolio_projects')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async createProject(userId: string, project: {
    title: string;
    description?: string;
    image_url?: string;
    github_url?: string;
    live_url?: string;
    tech_stack?: string[];
    role?: string;
    duration?: string;
    start_date?: string;
    end_date?: string;
    is_featured?: boolean;
  }) {
    const { data, error } = await supabase
      .from('portfolio_projects')
      .insert({
        ...project,
        user_id: userId,
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
};

// ============================================================================
// CERTIFICATIONS API
// ============================================================================

export const CertificationsAPI = {
  async getAvailable() {
    const { data, error } = await supabase
      .from('certifications')
      .select('*')
      .order('title');
    
    if (error) throw error;
    return data || [];
  },

  async getUserCertifications(userId: string) {
    const { data, error } = await supabase
      .from('user_certifications')
      .select('*, certification:certifications(*)')
      .eq('user_id', userId);
    
    if (error) throw error;
    return data || [];
  },
};
/**
 * I.A.S. - Instituto de Aprendizado Social
 * Data Models and Types
 */

// ============================================================================
// USER ROLES
// ============================================================================

export type UserRole = 'student' | 'mentor' | 'professor' | 'partner_company' | 'moderator' | 'administrator';

export interface Role {
  id: string;
  name: UserRole;
  description?: string;
  created_at: string;
  updated_at: string;
}

// ============================================================================
// USER
// ============================================================================

export interface User {
  id: string;
  auth_user_id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  bio?: string;
  role_id?: string;
  company_id?: string;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
  role?: Role;
  company?: Company;
}

export interface UserProfile {
  user_id: string;
  phone?: string;
  location?: string;
  website?: string;
  linkedin_url?: string;
  github_url?: string;
  portfolio_url?: string;
  skills?: string[];
  interests?: string[];
  resume_url?: string;
  timezone?: string;
  created_at: string;
  updated_at: string;
}

// ============================================================================
// COMPANY
// ============================================================================

export type PartnershipLevel = 'bronze' | 'silver' | 'gold' | 'platinum';

export interface Company {
  id: string;
  name: string;
  logo_url?: string;
  description?: string;
  website?: string;
  email?: string;
  phone?: string;
  industry?: string;
  partnership_level?: PartnershipLevel;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// ============================================================================
// EVENTS (Workshops & Hackathons)
// ============================================================================

export type EventType = 'workshop' | 'hackathon';
export type EventStatus = 'draft' | 'published' | 'registration_open' | 'registration_closed' | 'ongoing' | 'completed' | 'cancelled';
export type EventCategory = 
  | 'technology' 
  | 'business' 
  | 'design' 
  | 'law' 
  | 'engineering' 
  | 'health' 
  | 'ai' 
  | 'data_science' 
  | 'entrepreneurship' 
  | 'other';

export interface Event {
  id: string;
  title: string;
  description?: string;
  type: EventType;
  category?: EventCategory;
  date?: string; // ISO date
  start_time?: string; // ISO time
  end_time?: string; // ISO time
  location?: string;
  campus?: string;
  room?: string;
  registration_deadline?: string; // ISO timestamp
  capacity?: number;
  organizer_id?: string;
  featured_image_url?: string;
  rules?: string[];
  requirements?: string[];
  evaluation_criteria?: string[];
  rewards?: string[];
  sponsors?: string[]; // Array of company IDs
  mentors?: string[]; // Array of user IDs
  status: EventStatus;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  organizer?: User;
  companies?: Company[];
}

export type RegistrationStatus = 'registered' | 'cancelled' | 'attended';

export interface EventRegistration {
  id: string;
  event_id: string;
  user_id: string;
  status: RegistrationStatus;
  registration_data?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

// ============================================================================
// FORUM (Community Discussions)
// ============================================================================

export type ForumCategoryType = 
  | 'technology' 
  | 'business' 
  | 'design' 
  | 'law' 
  | 'engineering' 
  | 'health' 
  | 'ai' 
  | 'portfolio' 
  | 'career' 
  | 'first_internship' 
  | 'first_job' 
  | 'opportunities' 
  | 'projects' 
  | 'general';

export interface ForumCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  icon?: string;
  post_count: number;
  created_at: string;
}

export interface ForumPost {
  id: string;
  category_id: string;
  user_id: string;
  title: string;
  content?: string;
  slug: string;
  votes: number;
  comment_count: number;
  is_resolved: boolean;
  is_pinned: boolean;
  is_locked: boolean;
  viewed_count: number;
  tags?: string[];
  author_signature?: string;
  created_at: string;
  updated_at: string;
  category?: ForumCategory;
  user?: User;
}

export interface ForumComment {
  id: string;
  post_id: string;
  parent_id?: string;
  user_id: string;
  content: string;
  votes: number;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  user?: User;
  replies?: ForumComment[];
}

export type VoteType = -1 | 1;

export interface PostVote {
  id: string;
  post_id: string;
  user_id: string;
  vote_type: VoteType;
  created_at: string;
}

export interface CommentVote {
  id: string;
  comment_id: string;
  user_id: string;
  vote_type: VoteType;
  created_at: string;
}

// ============================================================================
// PORTFOLIO
// ============================================================================

export interface PortfolioProject {
  id: string;
  user_id: string;
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
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

// ============================================================================
// CERTIFICATIONS
// ============================================================================

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  description?: string;
  credential_url?: string;
  icon_url?: string;
  issued_at?: string;
  expires_at?: string;
  certificate_template?: string;
}

export interface UserCertification {
  id: string;
  user_id: string;
  certification_id: string;
  certificate_url?: string;
  earned_at: string;
  verified_at?: string;
  certification?: Certification;
}

// ============================================================================
// OPPORTUNITIES
// ============================================================================

export type OpportunityType = 'internship' | 'job' | 'mentorship' | 'challenge';
export type OpportunityStatus = 'open' | 'closed' | 'filled';

export interface Opportunity {
  id: string;
  title: string;
  description?: string;
  type: OpportunityType;
  company_id?: string;
  location?: string;
  remote: boolean;
  start_date?: string;
  end_date?: string;
  requirements?: string[];
  benefits?: string[];
  stipend?: string;
  status: OpportunityStatus;
  application_count: number;
  created_at: string;
  updated_at: string;
  company?: Company;
}

// ============================================================================
// MENTORSHIPS
// ============================================================================

export type MentorshipStatus = 'requested' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';

export interface MentorshipRequest {
  id: string;
  mentor_id: string;
  mentee_id: string;
  status: MentorshipStatus;
  requested_at: string;
  accepted_at?: string;
  completed_at?: string;
  mentor?: User;
  mentee?: User;
}

// ============================================================================
// NOTIFICATIONS
// ============================================================================

export type NotificationType = 
  | 'event_registration' 
  | 'event_update' 
  | 'new_post' 
  | 'new_comment' 
  | 'mentorship_request'
  | 'opportunity';

export interface Notification {
  id: string;
  user_id: string;
  type: NotificationType;
  title: string;
  content?: string;
  data?: Record<string, any>;
  is_read: boolean;
  created_at: string;
}
-- I.A.S. - Instituto de Aprendizado Social Database Schema
-- This schema defines the core data models for the platform

-- ============================================================================
-- USER ROLES
-- ============================================================================

CREATE TABLE roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE, -- 'student', 'mentor', 'professor', 'partner_company', 'moderator', 'administrator'
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- USERS
-- ============================================================================

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  -- Supabase Auth user ID
  auth_user_id UUID UNIQUE,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  avatar_url TEXT,
  bio TEXT,
  role_id UUID REFERENCES roles(id),
  company_id UUID REFERENCES companies(id), -- For partner companies
  professor_id UUID, -- For professors (department, etc.)
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- USER PROFILES (Extended profile data)
-- ============================================================================

CREATE TABLE user_profiles (
  user_id UUID PRIMARY KEY REFERENCES users(id),
  phone TEXT,
  location TEXT,
  website TEXT,
  linkedin_url TEXT,
  github_url TEXT,
  portfolio_url TEXT,
  skills TEXT[], -- Array of skills
  interests TEXT[], -- Array of interests
  resume_url TEXT,
  timezone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- COMPANIES (Partners)
-- ============================================================================

CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  logo_url TEXT,
  description TEXT,
  website TEXT,
  email TEXT,
  phone TEXT,
  industry TEXT,
  partnership_level TEXT, -- 'bronze', 'silver', 'gold', 'platinum'
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- EVENTS (Workshops & Hackathons)
-- ============================================================================

CREATE TYPE event_type AS ENUM ('workshop', 'hackathon');

CREATE TYPE event_status AS ENUM ('draft', 'published', 'registration_open', 'registration_closed', 'ongoing', 'completed', 'cancelled');

CREATE TYPE event_category AS ENUM (
  'technology', 'business', 'design', 'law', 'engineering', 
  'health', 'ai', 'data_science', 'entrepreneurship', 'other'
);

CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  type event_type NOT NULL,
  category event_category,
  date DATE,
  start_time TIME,
  end_time TIME,
  location TEXT,
  campus TEXT,
  room TEXT,
  registration_deadline TIMESTAMP WITH TIME ZONE,
  capacity INTEGER,
  organizer_id UUID REFERENCES users(id),
  featured_image_url TEXT,
  rules TEXT[],
  requirements TEXT[],
  evaluation_criteria TEXT[],
  rewards TEXT[],
  sponsors INTEGER[], -- Array of company IDs
  mentors INTEGER[], -- Array of user IDs
  status event_status DEFAULT 'draft',
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- EVENT REGISTRATION
-- ============================================================================

CREATE TABLE event_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'registered', -- 'registered', 'cancelled', 'attended'
  registration_data JSONB, -- Additional data collected at registration
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(event_id, user_id)
);

-- ============================================================================
-- FORUM (Community Discussions)
-- ============================================================================

CREATE TYPE forum_category AS ENUM (
  'technology', 'business', 'design', 'law', 'engineering', 
  'health', 'ai', 'portfolio', 'career', 'first_internship', 
  'first_job', 'opportunities', 'projects', 'general'
);

CREATE TABLE forum_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  color TEXT DEFAULT '#3B82F6', -- Tailwind color
  icon TEXT, -- Icon name for later use
  post_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE forum_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID REFERENCES forum_categories(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT,
  slug TEXT NOT NULL UNIQUE,
  votes INTEGER DEFAULT 0,
  comment_count INTEGER DEFAULT 0,
  is_resolved BOOLEAN DEFAULT false,
  is_pinned BOOLEAN DEFAULT false,
  is_locked BOOLEAN DEFAULT false,
  viewed_count INTEGER DEFAULT 0,
  tags TEXT[], -- Array of tags
  author_signature TEXT, -- Optional signature
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE forum_comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID REFERENCES forum_posts(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES forum_comments(id), -- For nested replies
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  votes INTEGER DEFAULT 0,
  is_deleted BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE forum_post_votes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID REFERENCES forum_posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  vote_type INTEGER NOT NULL CHECK (vote_type IN (-1, 1)), -- -1 for downvote, 1 for upvote
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(post_id, user_id)
);

CREATE TABLE forum_comment_votes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  comment_id UUID REFERENCES forum_comments(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  vote_type INTEGER NOT NULL CHECK (vote_type IN (-1, 1)),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(comment_id, user_id)
);

-- ============================================================================
-- PORTFOLIO
-- ============================================================================

CREATE TABLE portfolio_projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  github_url TEXT,
  live_url TEXT,
  tech_stack TEXT[],
  role TEXT, -- Your role in the project
  duration TEXT, -- Project duration
  start_date DATE,
  end_date DATE,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- CERTIFICATIONS
-- ============================================================================

CREATE TABLE certifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  description TEXT,
  credential_url TEXT,
  icon_url TEXT,
  issued_at DATE,
  expires_at DATE,
  certificate_template TEXT -- How to display certificates
);

CREATE TABLE user_certifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  certification_id UUID REFERENCES certifications(id) ON DELETE CASCADE,
  certificate_url TEXT,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  verified_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id, certification_id)
);

-- ============================================================================
-- OPPORTUNITIES (Internships, Jobs, Mentorship)
-- ============================================================================

CREATE TYPE opportunity_type AS ENUM ('internship', 'job', 'mentorship', 'challenge');

CREATE TYPE opportunity_status AS ENUM ('open', 'closed', 'filled');

CREATE TABLE opportunities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  type opportunity_type NOT NULL,
  company_id UUID REFERENCES companies(id),
  location TEXT,
  remote BOOLEAN DEFAULT false,
  start_date DATE,
  end_date DATE,
  requirements TEXT[],
  benefits TEXT[],
  stipend TEXT,
  status opportunity_status DEFAULT 'open',
  application_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- MENTORSHIPS
-- ============================================================================

CREATE TYPE mentorship_status AS ENUM ('requested', 'accepted', 'in_progress', 'completed', 'cancelled');

CREATE TABLE mentorship_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  mentor_id UUID REFERENCES users(id) ON DELETE CASCADE,
  mentee_id UUID REFERENCES users(id) ON DELETE CASCADE,
  status mentorship_status DEFAULT 'requested',
  requested_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  accepted_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(mentor_id, mentee_id)
);

-- ============================================================================
-- MATERIALS (Course Content)
-- ============================================================================

CREATE TABLE materials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  url TEXT,
  type TEXT, -- 'video', 'article', 'pdf', 'code', 'interactive'
  duration_minutes INTEGER,
  order_index INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- COMMENTS (General)
-- ============================================================================

CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  parent_id UUID REFERENCES comments(id), -- For threaded comments
  content_type TEXT, -- 'event', 'post', 'project'
  content_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- NOTIFICATIONS
-- ============================================================================

CREATE TYPE notification_type AS ENUM (
  'event_registration', 
  'event_update', 
  'new_post', 
  'new_comment', 
  'mentorship_request',
  'opportunity'
);

CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type notification_type NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  data JSONB, -- Additional data for the notification
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- INDEXES
-- ============================================================================

-- Users indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role_id);
CREATE INDEX idx_users_company ON users(company_id);

-- Events indexes
CREATE INDEX idx_events_date ON events(date);
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_events_type ON events(type);
CREATE INDEX idx_events_category ON events(category);
CREATE INDEX idx_events_organizer ON events(organizer_id);

-- Event registrations indexes
CREATE INDEX idx_event_registrations_user ON event_registrations(user_id);
CREATE INDEX idx_event_registrations_event ON event_registrations(event_id);

-- Forum indexes
CREATE INDEX idx_forum_posts_category ON forum_posts(category_id);
CREATE INDEX idx_forum_posts_user ON forum_posts(user_id);
CREATE INDEX idx_forum_posts_created ON forum_posts(created_at DESC);
CREATE INDEX idx_forum_comments_post ON forum_comments(post_id);
CREATE INDEX idx_forum_comments_user ON forum_comments(user_id);

-- Portfolio indexes
CREATE INDEX idx_portfolio_projects_user ON portfolio_projects(user_id);

-- Opportunities indexes
CREATE INDEX idx_opportunities_company ON opportunities(company_id);
CREATE INDEX idx_opportunities_status ON opportunities(status);
CREATE INDEX idx_opportunities_type ON opportunities(type);

-- Notifications indexes
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(is_read);

-- ============================================================================
-- TRIGGERS FOR AUTOMATED UPDATES
-- ============================================================================

create or replace function update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for roles
CREATE TRIGGER update_roles_updated_at BEFORE UPDATE ON roles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Triggers for users
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Triggers for companies
CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON companies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Triggers for events
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Triggers for forum categories
CREATE TRIGGER update_forum_categories_updated_at BEFORE UPDATE ON forum_categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Triggers for forum posts
CREATE TRIGGER update_forum_posts_updated_at BEFORE UPDATE ON forum_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
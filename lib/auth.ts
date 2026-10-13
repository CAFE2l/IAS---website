/**
 * I.A.S. - Instituto de Aprendizado Social
 * Authentication & Authorization Helpers
 */

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { User, UserRole } from './models';
import { supabase } from './supabase';

// ============================================================================
// SERVER-SIDE AUTH
// ============================================================================

export async function getUser(): Promise<User | null> {
  const cookieStore = await cookies();
  
  const supabaseClient = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user: authUser }, error } = await supabaseClient.auth.getUser();
  
  if (error || !authUser) {
    return null;
  }

  // Get user profile from database
  const { data: dbUser, error: dbError } = await supabaseClient
    .from('users')
    .select('*, role:roles(*), company:companies(*)')
    .eq('auth_user_id', authUser.id)
    .single();

  if (dbError || !dbUser) {
    return null;
  }

  return dbUser as User;
}

// ============================================================================
// CLIENT-SIDE AUTH
// ============================================================================

export async function getCurrentUser(): Promise<User | null> {
  const { data: { user: authUser }, error } = await supabase.auth.getUser();
  
  if (error || !authUser) {
    return null;
  }

  // Get user profile from database
  const { data: dbUser, error: dbError } = await supabase
    .from('users')
    .select('*, role:roles(*), company:companies(*)')
    .eq('auth_user_id', authUser.id)
    .single();

  if (dbError || !dbUser) {
    return null;
  }

  return dbUser as User;
}

// ============================================================================
// PROTECTED ROUTE GUARDS
// ============================================================================

/**
 * Guard for server components - redirects to login if not authenticated
 */
export async function requireAuth(): Promise<User> {
  const user = await getUser();
  
  if (!user) {
    redirect('/login');
  }
  
  return user;
}

/**
 * Guard for server components - requires specific role
 */
export async function requireRole(requiredRole: UserRole | UserRole[]): Promise<User> {
  const user = await getUser();
  
  if (!user) {
    redirect('/login');
  }
  
  const userRole = user.role?.name as UserRole | undefined;
  
  if (!userRole || 
      (Array.isArray(requiredRole) && !requiredRole.includes(userRole)) ||
      (!Array.isArray(requiredRole) && userRole !== requiredRole)) {
    redirect('/unauthorized');
  }
  
  return user;
}

// ============================================================================
// CLIENT-SIDE REDIRECTS
// ============================================================================

/**
 * Hook to check auth status and redirect appropriately
 */
export function useAuthRedirect() {
  // This would be implemented in a client component
  // For now, we provide the redirect logic here
  return {
    redirectToLogin: () => redirect('/login'),
    redirectToDashboard: () => redirect('/dashboard'),
    redirectToSignup: () => redirect('/cadastro'),
  };
}

// ============================================================================
// AUTH STATE LISTENERS
// ============================================================================

export function onAuthStateChange(callback: (user: User | null) => void) {
  const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
      const user = await getCurrentUser();
      callback(user);
    } else if (event === 'SIGNED_OUT') {
      callback(null);
    }
  });

  return subscription;
}

// ============================================================================
// USER ROLE CHECKS
// ============================================================================

export function hasRole(user: User | null, role: UserRole): boolean {
  if (!user?.role) return false;
  return user.role.name === role;
}

export function hasAnyRole(user: User | null, roles: UserRole[]): boolean {
  if (!user?.role) return false;
  return roles.includes(user.role.name);
}

export function isStudent(user: User | null): boolean {
  return hasRole(user, 'student');
}

export function isMentor(user: User | null): boolean {
  return hasRole(user, 'mentor');
}

export function isProfessor(user: User | null): boolean {
  return hasRole(user, 'professor');
}

export function isPartnerCompany(user: User | null): boolean {
  return hasRole(user, 'partner_company');
}

export function isModerator(user: User | null): boolean {
  return hasRole(user, 'moderator');
}

export function isAdmin(user: User | null): boolean {
  return hasRole(user, 'administrator');
}

// ============================================================================
// AUTH PROVIDER CONTEXT (for client components)
// ============================================================================

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signInWithGoogle: () => Promise<{ error: any }>;
  signUp: (email: string, password: string, name: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  userRole: UserRole | null;
  hasRole: (role: UserRole) => boolean;
}

// ============================================================================
// ROLE-BASED REDIRECT
// ============================================================================

/**
 * Redirect user to their appropriate dashboard based on role
 */
export function getRoleBasedDashboardPath(role: UserRole): string {
  const rolePaths: Record<UserRole, string> = {
    student: '/dashboard',
    mentor: '/dashboard',
    professor: '/dashboard',
    partner_company: '/dashboard',
    moderator: '/dashboard',
    administrator: '/dashboard',
  };
  
  return rolePaths[role] || '/dashboard';
}

/**
 * Get the appropriate landing page after login based on role
 */
export function getPostLoginPath(user: User | null): string {
  if (!user?.role?.name) {
    return '/login';
  }
  
  return getRoleBasedDashboardPath(user.role.name);
}
/**
 * I.A.S. - Instituto de Aprendizado Social
 * Role-Based Access Control (RBAC) Utilities
 */

import { UserRole, User } from './models';

// ============================================================================
// ROLE PERMISSIONS
// ============================================================================

export type Permission = 
  | 'view_events'
  | 'create_event'
  | 'edit_event'
  | 'delete_event'
  | 'view_company'
  | 'create_company'
  | 'edit_company'
  | 'delete_company'
  | 'view_forum'
  | 'create_post'
  | 'edit_post'
  | 'delete_post'
  | 'delete_any_post'
  | 'view_portfolio'
  | 'create_portfolio_item'
  | 'edit_portfolio_item'
  | 'delete_portfolio_item'
  | 'view_certifications'
  | 'add_certification'
  | 'manage_users'
  | 'moderate_content'
  | 'admin_panel';

// Role to permissions mapping
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  student: [
    'view_events',
    'view_company',
    'view_forum',
    'create_post',
    'view_portfolio',
    'create_portfolio_item',
    'edit_portfolio_item',
    'view_certifications',
    'add_certification',
  ],
  mentor: [
    'view_events',
    'create_event',
    'view_company',
    'view_forum',
    'create_post',
    'edit_post',
    'delete_post',
    'view_portfolio',
    'create_portfolio_item',
    'view_certifications',
    'add_certification',
  ],
  professor: [
    'view_events',
    'create_event',
    'edit_event',
    'view_company',
    'view_forum',
    'create_post',
    'edit_post',
    'delete_post',
    'view_portfolio',
    'create_portfolio_item',
    'edit_portfolio_item',
    'view_certifications',
    'add_certification',
  ],
  partner_company: [
    'view_events',
    'create_event',
    'edit_event',
    'view_company',
    'create_company',
    'edit_company',
    'view_forum',
    'create_post',
    'view_portfolio',
    'create_portfolio_item',
  ],
  moderator: [
    'view_events',
    'view_company',
    'view_forum',
    'create_post',
    'edit_post',
    'delete_post',
    'delete_any_post',
    'view_portfolio',
    'view_certifications',
    'manage_users',
    'moderate_content',
  ],
  administrator: [
    'view_events',
    'create_event',
    'edit_event',
    'delete_event',
    'view_company',
    'create_company',
    'edit_company',
    'delete_company',
    'view_forum',
    'create_post',
    'edit_post',
    'delete_post',
    'view_portfolio',
    'create_portfolio_item',
    'edit_portfolio_item',
    'delete_portfolio_item',
    'view_certifications',
    'add_certification',
    'manage_users',
    'moderate_content',
    'admin_panel',
  ],
};

// Role hierarchy for inheritance
export const ROLE_HIERARCHY: UserRole[] = [
  'student',
  'mentor',
  'professor',
  'partner_company',
  'moderator',
  'administrator',
];

// ============================================================================
// PERMISSION CHECK FUNCTIONS
// ============================================================================

/**
 * Check if a user role has a specific permission
 */
export function hasPermission(role: UserRole | undefined, permission: Permission): boolean {
  if (!role) return false;
  
  const permissions = ROLE_PERMISSIONS[role] || [];
  return permissions.includes(permission);
}

/**
 * Check if a user role has all of the specified permissions
 */
export function hasAllPermissions(role: UserRole | undefined, permissions: Permission[]): boolean {
  if (!role) return false;
  return permissions.every(p => hasPermission(role, p));
}

/**
 * Check if a user role has any of the specified permissions
 */
export function hasAnyPermission(role: UserRole | undefined, permissions: Permission[]): boolean {
  if (!role) return false;
  return permissions.some(p => hasPermission(role, p));
}

/**
 * Check if a user has a specific permission based on their role
 */
export function userCan(user: User | null, permission: Permission): boolean {
  if (!user) return false;
  
  // Get user's direct role
  const userRole = user.role?.name as UserRole | undefined;
  
  return hasPermission(userRole || 'student', permission);
}

// ============================================================================
// EVENT ACCESS
// ============================================================================

/**
 * Check if a user can register for an event
 */
export function canRegisterForEvent(user: User | null, event: { organizer_id?: string; capacity?: number; status?: string }): boolean {
  if (!user) return false;
  
  // Check if event has capacity
  if (event.capacity !== undefined && event.capacity <= 0) {
    return false;
  }
  
  return true;
}

/**
 * Check if a user can view an event
 */
export function canViewEvent(user: User | null): boolean {
  return user !== null;
}

/**
 * Check if a user can manage an event (create/edit/delete)
 */
export function canManageEvent(user: User | null, isOrganizer: boolean = false): boolean {
  if (!user) return false;
  
  const userRole = user.role?.name as UserRole | undefined;
  
  // Admins and organizers can manage
  if (userRole === 'administrator' || isOrganizer) {
    return true;
  }
  
  // Professors and mentors can create events
  return hasPermission(userRole || 'student', 'create_event');
}

// ============================================================================
// COMPANY ACCESS
// ============================================================================

/**
 * Check if a user can view companies
 */
export function canViewCompanies(user: User | null): boolean {
  return user !== null;
}

/**
 * Check if a user can manage companies (create/edit/delete)
 */
export function canManageCompanies(user: User | null): boolean {
  if (!user) return false;
  
  const userRole = user.role?.name as UserRole | undefined;
  return hasPermission(userRole || 'student', 'create_company');
}

// ============================================================================
// FORUM ACCESS
// ============================================================================

/**
 * Check if a user can create posts
 */
export function canCreatePost(user: User | null): boolean {
  return user !== null;
}

/**
 * Check if a user can edit/delete their own posts
 */
export function canEditOwnPost(user: User | null, postId: string, userId: string): boolean {
  if (!user) return false;
  
  // Users can edit their own posts if they have edit permissions
  if (user.id === userId) {
    return true;
  }
  
  // Moderators and admins can edit any post
  const userRole = user.role?.name as UserRole | undefined;
  return userRole === 'moderator' || userRole === 'administrator';
}

/**
 * Check if a user can delete any post
 */
export function canDeletePost(user: User | null): boolean {
  if (!user) return false;
  
  const userRole = user.role?.name as UserRole | undefined;
  return userRole === 'moderator' || userRole === 'administrator';
}

// ============================================================================
// PORTFOLIO ACCESS
// ============================================================================

/**
 * Check if a user can view portfolios
 */
export function canViewPortfolios(user: User | null): boolean {
  return user !== null;
}

/**
 * Check if a user can manage their own portfolio
 */
export function canManagePortfolio(user: User | null): boolean {
  return user !== null;
}

export function canEditOwnPortfolioItem(user: User | null, itemId: string, ownerId: string): boolean {
  if (!user) return false;
  return user.id === ownerId;
}

export function canDeleteOwnPortfolioItem(user: User | null, itemId: string, ownerId: string): boolean {
  if (!user) return false;
  return user.id === ownerId;
}
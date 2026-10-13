import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

// Check if we have valid Supabase configuration
const hasValidConfig = supabaseUrl && supabasePublishableKey && 
  supabaseUrl !== '' && supabasePublishableKey !== '';

// Create a comprehensive mock for build time or when not configured
const createMockClient = () => {
  const mockAuth = {
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    signInWithPassword: async () => ({ data: { user: null, session: null }, error: new Error('Supabase not configured') }),
    signInWithOAuth: async () => ({ data: null, error: new Error('Supabase not configured') }),
    signUp: async () => ({ data: { user: null, session: null }, error: new Error('Supabase not configured') }),
    signOut: async () => ({ error: null }),
    updateUser: async () => ({ data: null, error: new Error('Supabase not configured') }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
  };

  return {
    from: () => ({
      select: () => ({ limit: () => ({ data: [], error: new Error('Supabase not configured') }) }),
      insert: () => ({ data: [], error: new Error('Supabase not configured') }),
      update: () => ({ data: [], error: new Error('Supabase not configured') }),
      delete: () => ({ data: [], error: new Error('Supabase not configured') }),
      eq: () => ({ single: () => ({ data: null, error: new Error('Supabase not configured') }) }),
    }),
    RPC: () => ({ data: null, error: new Error('Supabase not configured') }),
    auth: mockAuth,
    storage: {
      from: () => ({
        upload: () => ({ data: null, error: new Error('Supabase not configured') }),
        download: () => ({ data: null, error: new Error('Supabase not configured') }),
        list: () => ({ data: [], error: new Error('Supabase not configured') }),
      })
    },
    function: {
      invoke: async () => ({ data: null, error: new Error('Supabase not configured') }),
    },
  };
};

// Create a client that can be created when env vars are available
export const createClient = (): ReturnType<typeof createBrowserClient> => {
  if (!hasValidConfig) {
    // Return a mock client for build time or when not configured
    return createMockClient() as unknown as ReturnType<typeof createBrowserClient>;
  }
  return createBrowserClient(
    supabaseUrl as string,
    supabasePublishableKey as string
  );
};

// Export a singleton instance for use in components
export const supabase = createClient();
import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

// Create a client that can be created when env vars are available
export const createClient = () => {
  if (!supabaseUrl || !supabasePublishableKey) {
    // Return a mock client for build time or when not configured
    return {
      from: () => ({
        select: () => ({
          limit: () => ({ data: [], error: new Error('Supabase not configured') })
        })
      }),
      RPC: () => ({ data: null, error: new Error('Supabase not configured') }),
      auth: {
        getUser: () => ({ data: { user: null }, error: null }),
        getSession: () => ({ data: { session: null }, error: null })
      },
      storage: {
        from: () => ({
          upload: () => ({ data: null, error: new Error('Supabase not configured') }),
          download: () => ({ data: null, error: new Error('Supabase not configured') }),
          list: () => ({ data: [], error: new Error('Supabase not configured') })
        })
      }
    };
  }
  return createBrowserClient(supabaseUrl, supabasePublishableKey);
};

// Export a singleton instance for use in components
export const supabase = createClient();
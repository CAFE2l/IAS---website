import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

export const createClient = () => {
  return createBrowserClient(supabaseUrl, supabasePublishableKey);
};

// Export a singleton instance for use in components
export const supabase = createClient();
import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  // Create server-side Supabase client
  const cookieStore = await cookies();
  
  const supabase = createServerClient(
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

  // Check authentication
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Get query parameters
  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get('search');
  const industry = searchParams.get('industry');
  const activeOnly = searchParams.get('active_only') !== 'false';

  // Build query
  let query = supabase.from('companies').select('*');
  
  if (activeOnly) {
    query = query.eq('is_active', true);
  }
  
  if (search) {
    query = query.ilike('name', `%${search}%`);
  }
  
  if (industry) {
    query = query.eq('industry', industry);
  }

  // Execute query
  const { data, error } = await query.order('name');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export const dynamic = 'force-dynamic';
export const revalidate = false;
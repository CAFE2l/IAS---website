import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../../lib/database';
import { supabase } from '../../../lib/supabase';
import { auth } from '../../../lib/firebase';

export async function GET(request: NextRequest) {
  const results: Record<string, any> = {};
  
  // Test PostgreSQL Database Connection
  try {
    const dbResult = await query('SELECT 1 as test, NOW() as timestamp');
    results.database = {
      status: 'connected',
      result: dbResult.rows[0],
    };
  } catch (error) {
    results.database = {
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }

  // Test Supabase Connection
  try {
    const { data, error } = await supabase.from('_').select('*').limit(1);
    results.supabase = error 
      ? { status: 'error', error: error.message }
      : { status: 'connected', message: 'Supabase client initialized successfully' };
  } catch (error) {
    results.supabase = {
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }

  // Test Firebase Auth
  try {
    results.firebase = auth 
      ? { status: 'connected', message: 'Firebase Auth initialized successfully', projectId: auth.app.options.projectId }
      : { status: 'error', message: 'Firebase Auth not initialized' };
  } catch (error) {
    results.firebase = {
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }

  return NextResponse.json(results, { status: 200 });
}

export const dynamic = 'force-dynamic';
export const revalidate = false;
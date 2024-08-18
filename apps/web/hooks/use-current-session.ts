'use client';

import { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

import useSupabase from '@/hooks/use-supabase';

export default function useCurrentSession(): Session | null {
  const [session, setSession] = useState<Session | null>(null);
  const supabase = useSupabase();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  return session;
}

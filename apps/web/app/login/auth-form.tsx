'use client';
import { env } from '@/env';
import { getSupabaseClientComponentClient } from '@/lib/supabase/client-component';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

export default function AuthForm() {
  const supabase = getSupabaseClientComponentClient();

  return (
    <Auth
      supabaseClient={supabase}
      appearance={{ theme: ThemeSupa }}
      showLinks={false}
      providers={[]}
      redirectTo={env.NEXT_PUBLIC_SUPABASE_URL}
    />
  );
}

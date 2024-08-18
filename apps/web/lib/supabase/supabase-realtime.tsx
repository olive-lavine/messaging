'use client';

import useSupabaseRealtime from '@/hooks/use-supabase-realtime';
import {
  REALTIME_POSTGRES_CHANGES_LISTEN_EVENT,
  User,
} from '@supabase/supabase-js';
import { ReactNode } from 'react';

type SupabaseRealtimeProps = {
  children?: ReactNode;
  user: User;
};

export const SupabaseRealtime = ({ children, user }: SupabaseRealtimeProps) => {
  useSupabaseRealtime({
    subscriptions: [
      {
        event: REALTIME_POSTGRES_CHANGES_LISTEN_EVENT.ALL,
        table: 'calls',
        filter: `user_id=eq.${user.id}`,
        queryKeyFilter: { active: 'true' }, // OR payload access via callback
      },
      {
        event: REALTIME_POSTGRES_CHANGES_LISTEN_EVENT.ALL,
        table: 'conversations',
        filter: `user_id=eq.${user.id}`,
        queryKeyFilter: { status: 'active' },
      },
    ],
  });

  return <>{children}</>;
};

import { env } from '@/env';
import type { Database } from '@/schema/database.types';
import { createClient } from '@supabase/supabase-js';

export const supabaseWebhookClient = createClient<Database>(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY
);

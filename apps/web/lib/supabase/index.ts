import { Database } from '@/schema/database.types';
import { SupabaseClient } from '@supabase/supabase-js';

export * from './errors';
export * from './utils';

export type TLSupabaseClient = SupabaseClient<Database>;

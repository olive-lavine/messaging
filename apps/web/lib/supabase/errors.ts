import { type PostgrestError } from '@supabase/postgrest-js';

export class TLSupabaseClientError extends Error {
  error: PostgrestError;

  constructor(error: PostgrestError) {
    super(error.message);
    this.error = error;
    this.name = 'TLSupabaseClientError';
  }
}

import { getSupabaseClientComponentClient } from '@/lib/supabase/client-component';
import { useMemo } from 'react';

function useSupabase() {
  return useMemo(getSupabaseClientComponentClient, []);
}

export default useSupabase;

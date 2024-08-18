import { TableNames, ViewNames } from '@/schema/database.types';
import { PostgrestBuilder } from '@supabase/postgrest-js';
import { TLSupabaseClientError } from './errors';

export async function unwrapResponse<T>(
  builder: PostgrestBuilder<T>
): Promise<{ body: T | null; status: number; statusText: string }> {
  const { data, status, statusText, error } = await builder;
  if (error) {
    throw new TLSupabaseClientError(error);
  }
  return { body: data, status, statusText };
}

export function prepareQuery<T>(
  tableName: TableNames | ViewNames,
  select: string,
  builder: PostgrestBuilder<T>,
  filters: Record<string, string>[],
  enabled: boolean
) {
  return {
    queryKey: buildQueryKey(tableName, filters, select),
    queryFn: async () => {
      return unwrapResponse<T>(builder);
    },
    enabled,
  };
}

export function buildQueryKey(
  tableName: TableNames | ViewNames,
  filters: Record<string, string>[],
  select: string
) {
  return ['supabase', tableName, ...filters, `select:${select}`];
}

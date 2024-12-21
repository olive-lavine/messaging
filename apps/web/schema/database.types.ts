import { Database as DatabaseGenerated } from '@messaging/supabase/schema/database-generated.types';
import { MergeDeep } from 'type-fest';

export type Database = MergeDeep<
  DatabaseGenerated,
  {
    // Add custom types tweaks here
  }
>;

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];
export type Enums<T extends keyof Database['public']['Enums']> =
  Database['public']['Enums'][T];
export type Views<T extends keyof Database['public']['Views']> =
  Database['public']['Views'][T]['Row'];
export type CompositeTypes<
  T extends keyof Database['public']['CompositeTypes'],
> = Database['public']['CompositeTypes'][T]['Row'];

export type TableNames = keyof Database['public']['Tables'];
export type EnumNames = keyof Database['public']['Enums'];
export type ViewNames = keyof Database['public']['Views'];
export type FunctionNames = keyof Database['public']['Functions'];
export type CompositeTypeNames = keyof Database['public']['CompositeTypes'];

export type Contact = Database['public']['Tables']['contacts']['Row'];

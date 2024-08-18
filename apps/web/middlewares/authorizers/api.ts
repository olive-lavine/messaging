import { type MiddlewareProps, type MiddlewareResponse } from '../base';

// URL shape: /api/some-endpoint

export default async function ({
  supabase,
  req,
}: MiddlewareProps): Promise<MiddlewareResponse> {
  // do authorization checks here
  return; // authorized
}

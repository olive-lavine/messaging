import { type MiddlewareProps, type MiddlewareResponse } from '../base';

export default async function ({
  supabase,
  req,
}: MiddlewareProps): Promise<MiddlewareResponse> {
  // do authorization checks here
  return; // authorized
}

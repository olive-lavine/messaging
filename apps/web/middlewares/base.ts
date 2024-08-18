import { type SupabaseClient } from '@supabase/supabase-js';
import { type NextRequest, NextResponse } from 'next/server';

export interface MiddlewareProps {
  supabase: SupabaseClient;
  req: NextRequest;
}
export type MiddlewareResponse = NextResponse<unknown> | void;
export interface MiddlewareHandler {
  (props: MiddlewareProps): Promise<MiddlewareResponse>;
}

export const forbiddenResponse = (): MiddlewareResponse => {
  return new NextResponse(null, {
    status: 403,
    statusText: 'Forbidden',
  });
};

export function getRequestPathnamePart(
  request: NextRequest,
  index: number
): string | null {
  return request.nextUrl.pathname.split('/').filter(Boolean)[index] || null;
}

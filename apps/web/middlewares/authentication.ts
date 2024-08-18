import { NextResponse } from 'next/server';
import {
  type MiddlewareHandler,
  type MiddlewareProps,
  type MiddlewareResponse,
} from './base';

export const authenticationMiddleware: MiddlewareHandler = async ({
  supabase,
  req,
}: MiddlewareProps): Promise<MiddlewareResponse> => {
  const {
    data: { session },
  } = await supabase.auth.getSession(); // Refreshes session if expired - required for Server Components

  console.log(`session user: ${session?.user?.email}`);

  // Redirect to login if no session
  if (!session) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
};

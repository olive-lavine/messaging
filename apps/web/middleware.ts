import { TLSupabaseClientError } from '@/lib/supabase/errors';
import { AuthError, FunctionsError } from '@supabase/supabase-js';
import { NextResponse, type NextRequest } from 'next/server';
import { ZodError } from 'zod';

import { getSupabaseMiddlewareClient } from '@/lib/supabase/middleware';
import { authenticationMiddleware } from '@/middlewares/authentication';
import { authorizationMiddleware } from '@/middlewares/authorization';
import {
  supabaseAuthErrorHandler,
  supabaseFunctionsErrorHandler,
  supabaseQueryErrorHandler,
  unknownErrorHandler,
  zodErrorHandler,
} from '@/middlewares/errors';

/*
  behavior of this middleware handler
  - if the user is not authenticated, redirect to /login
  - if the user is authenticated, but not authorized, redirect to / (home page)
  - if the user is authenticated and authorized, continue to the requested route

  the order of the middleware handlers is important
  - authenticationMiddleware must be first
  - authorizationMiddleware must be second
  - any other middleware handlers can be added after that

  For a route to be authorized, either:
  - unauthenticated routes must be added to the matcher in middleware.ts
  - authenticated routes handlers must be added to the authorizers in middlewares/authorizers/index.ts
    - the handler must be named after the route
    - the handler must return undefined if authorized
    - the handler must return a NextResponse if not authorized
*/

const middlewareHandlers = [authenticationMiddleware, authorizationMiddleware]; // applied in order

export async function middleware(req: NextRequest) {
  try {
    const res = NextResponse.next();

    console.log(
      `request: ${req.nextUrl.pathname}, ${req.nextUrl.searchParams.get(
        'access_token'
      )}`
    );

    // Create a Supabase client configured to use cookies
    const supabase = getSupabaseMiddlewareClient(req, res);

    // Run all middlewares

    for (const handler of middlewareHandlers) {
      const middlewareResponse = await handler({ supabase, req });
      if (middlewareResponse) {
        console.log(`middleware response: ${middlewareResponse.status}`);
        return middlewareResponse;
      }
    }

    console.log('authenticated and authorized');

    return res;
  } catch (error: any) {
    // supabase query error do not implement the Error constructor, so they will be handled after the typed ones
    if (error instanceof Error) {
      const asError = error as Error;
      switch (asError.constructor) {
        case ZodError:
          return zodErrorHandler(asError as ZodError, req);

        case TLSupabaseClientError:
          return supabaseQueryErrorHandler(
            asError as TLSupabaseClientError,
            req
          );

        case AuthError:
          return supabaseAuthErrorHandler(asError as AuthError, req);

        case FunctionsError:
          return supabaseFunctionsErrorHandler(asError as FunctionsError, req);
      }
    }

    // default return 500
    return unknownErrorHandler(error, req);
  }
}

export const config = {
  matcher: [
    // we match all routes except the unauthenticated routes below
    '/((?!login|crons|webhooks|sign-up|auth|_next/static|_next/image|fonts|images|favicon.ico|public/fonts|public/images).*)',
  ],
};

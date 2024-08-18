import { TLSupabaseClientError } from '@/lib/supabase/errors';
import { AuthError, FunctionsError } from '@supabase/supabase-js';
import { NextResponse, type NextRequest } from 'next/server';
import { ZodError } from 'zod';

export const zodErrorHandler = (
  error: ZodError,
  req: NextRequest
): NextResponse => {
  console.warn(
    error,
    `[ZodError] Invalid request parameters for url [${req.nextUrl.pathname}] - [${error.toString()}]'`
  );

  return new NextResponse(null, {
    status: 400,
    statusText: 'Invalid request parameters.',
  });
};

export const supabaseAuthErrorHandler = (
  error: AuthError,
  req: NextRequest
): NextResponse => {
  console.error(
    `[AuthError] A Supabase Auth failed when accessing [${req.nextUrl.pathname}] - [${error.toString()}]'`
  );

  return new NextResponse(null, {
    status: error.status ?? 401,
    statusText: error.name,
  });
};

export const supabaseQueryErrorHandler = (
  error: TLSupabaseClientError,
  req: NextRequest
): NextResponse => {
  console.error(
    error,
    `A Supabase Query failed when accessing [${req.nextUrl.pathname}] - [${error.message}]'`
  );

  return new NextResponse(null, {
    status: 500, // https://postgrest.org/en/stable/references/errors.html#errors => codes from postgres are.... peculiar
    statusText: error.error?.message ?? error.message ?? error.name,
  });
};

export const supabaseFunctionsErrorHandler = (
  error: FunctionsError,
  req: NextRequest
): NextResponse => {
  console.error(
    error,
    `[FunctionsError] A Supabase Function call failed when accessing [${req.nextUrl.pathname}] - [${error.toString()}]'`
  );

  return new NextResponse(null, {
    status: 500,
    statusText: 'An unexpected error during execution occurred.',
  });
};

export const unknownErrorHandler = (
  error: Error,
  req: NextRequest
): NextResponse => {
  console.error(
    error,
    `A unknown error was encountered when accessing [${req.nextUrl.pathname}] - [${error.message}]'`
  );

  return new NextResponse(null, {
    status: 500,
    statusText: 'An unexpected error during execution occurred.',
  });
};

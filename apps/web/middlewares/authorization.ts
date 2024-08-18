import {
  type MiddlewareHandler,
  type MiddlewareProps,
  type MiddlewareResponse,
} from './base';

import { authorizers } from './authorizers';
import { type NextRequest, NextResponse } from 'next/server';

export const authorizationMiddleware: MiddlewareHandler = async ({
  supabase,
  req,
}: MiddlewareProps): Promise<MiddlewareResponse> => {
  const basePath = getBasePath(req);
  if (basePath === '/') {
    console.log('skipping authorization for home page');
    return; // skip authorization for home page
  }

  const authorizer = authorizers[basePath];
  if (authorizer) {
    return await authorizer({ supabase, req });
  } else {
    console.log(`No authorizer found for ${basePath}`);
    return NextResponse.redirect(new URL('/', req.url)); // redirect to home page when not authorized
  }
};

function getBasePath(req: NextRequest): string {
  const pathname = req.nextUrl.pathname;
  return pathname === '/' ? pathname : pathname.split('/').filter(Boolean)[0];
}

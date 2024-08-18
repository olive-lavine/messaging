import { type MiddlewareHandler } from '../base';

import authorizeApi from './api';
import dashboard from './dashboard';
import authorizeSetup from './setup';

export const authorizers: Record<string, MiddlewareHandler> = {
  api: authorizeApi,
  setup: authorizeSetup,
  dashboard: dashboard,
};

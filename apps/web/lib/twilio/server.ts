import { env } from '@/env';
import twilio from 'twilio';

export function getTwilioServerClient() {
  return new twilio.Twilio(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN);
}

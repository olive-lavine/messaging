'use server';

import { env } from '@/env';
import { TLSupabaseClientError } from '@/lib/supabase';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { getTwilioServerClient } from '@/lib/twilio/server';
import { ZMessageData } from '@/schema/zod';
import { ZodError } from 'zod';

export async function sendMessage(
  imageUrl: string | null,
  formData: ZMessageData
): Promise<{ message: string } | undefined> {
  const supabase = getSupabaseServerClient();
  const twilio = getTwilioServerClient();

  const { text } = formData;

  try {
    // Fetch contacts
    const { data: contacts, error: contactsError } = await supabase
      .from('contacts')
      .select('phone_number');

    if (contactsError) {
      throw new TLSupabaseClientError(contactsError);
    }

    // Send messages to each contact
    const promises = contacts.map(async (contact: { phone_number: string }) => {
      try {
        await twilio.messages.create({
          body: text,
          from: env.NEXT_PUBLIC_TWILIO_PHONE_NUMBER,
          to: contact.phone_number,
          mediaUrl: imageUrl ? [imageUrl] : undefined,
        });
        return { status: 'fulfilled', contact: contact.phone_number };
      } catch (error) {
        console.error(
          `Error sending message to ${contact.phone_number}:`,
          error
        );
        return { status: 'rejected', contact: contact.phone_number, error };
      }
    });

    const results = await Promise.allSettled(promises);

    // Optional: log or handle results
    const failedMessages = results
      .filter((result) => result.status === 'rejected')
      .map((result) => (result as PromiseRejectedResult).reason);

    if (failedMessages.length > 0) {
      console.warn('Some messages failed to send:', failedMessages);
    }

    return;
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        message: error.errors.map((err) => err.message).join('\n'),
      };
    } else if (error instanceof TLSupabaseClientError) {
      console.error('Error during profile setup:', error);
      return {
        message: `Error while inserting Profile: ${error.message}`,
      };
    } else {
      console.error('Unexpected error:', error);
      return {
        message: 'An unexpected error occurred.',
      };
    }
  }
}

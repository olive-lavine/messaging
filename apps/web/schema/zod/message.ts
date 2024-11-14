import { z } from 'zod';

export const zMessageData = z.object({
  text: z.string().min(1, 'Text is required'),
});

export type ZMessageData = z.infer<typeof zMessageData>;

import { z } from 'zod';

export const zMessageData = z.object({
  text: z.string().optional(),
});

export type ZMessageData = z.infer<typeof zMessageData>;

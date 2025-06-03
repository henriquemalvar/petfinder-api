import { z } from 'zod';

export const registerTokenSchema = z.object({
  body: z.object({
    token: z.string().min(10)
  })
});

export const notifyNearbySchema = z.object({
  body: z.object({
    postId: z.string().uuid()
  })
});

export type RegisterTokenInput = z.infer<typeof registerTokenSchema>['body'];
export type NotifyNearbyInput = z.infer<typeof notifyNearbySchema>['body'];

import * as z from 'zod';

export const schemaAuth = z.object({
    email: z.string().email({message: 'Email must be a valid email address'}),
    password: z.string().min(6, {message: 'Password must be at least 6 characters'}),
  });
import { z } from 'zod';

export const LoginFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name is required' })
    .superRefine((value, ctx) => {
      if (value.length >= 7) {
        ctx.addIssue({
          code: 'custom',
          message: 'The name is too long',
        });
      }
    }),
  password: z
    .string({
      error: (issue) =>
        issue.input === undefined ? 'This field is required' : 'Not a string',
    })
    .min(6, { message: 'Message must be at least 6 characters.' }),
});

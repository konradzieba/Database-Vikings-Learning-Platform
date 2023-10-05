import z from 'zod';

export const paramsWithIdSchema = z.object({
  id: z.number().int('Id must be an integer.'),
});

export type ParamsWithId = z.infer<typeof paramsWithIdSchema>;

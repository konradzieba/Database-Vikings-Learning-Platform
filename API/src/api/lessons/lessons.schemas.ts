import z from 'zod';

export const createLessonSchema = z.object({
  number: z
    .number({ required_error: 'Lesson number must be provided' })
    .int('Lesson number must be integer'),
  image: z.optional(z.string()),
  groupId: z.number().int('groupId must be an integer.'),
});

export type LessonInput = z.infer<typeof createLessonSchema>;

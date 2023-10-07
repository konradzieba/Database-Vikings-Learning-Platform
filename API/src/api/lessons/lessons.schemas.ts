import z from 'zod';

export const createLessonSchema = z.object({
  number: z
    .number({ required_error: 'Lesson number must be provided' })
    .int('Lesson number must be integer'),
  image: z.optional(z.string()),
  groupId: z.number().int('groupId must be an integer.'),
});

export const updateLessonSchema = createLessonSchema.omit({
  groupId: true,
}).partial();

export type LessonInput = z.infer<typeof createLessonSchema>;

export type UpdateLessonInput = z.infer<typeof updateLessonSchema>;

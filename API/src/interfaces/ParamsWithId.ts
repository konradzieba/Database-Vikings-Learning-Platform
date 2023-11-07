import z from 'zod';

export const paramsWithIdSchema = z.object({
  id: z.string().min(1, 'Invalid id'),
});

export const paramsWithLessonIdSchema = z.object({
  id: z.string().min(1, 'Invalid id'),
  lessonId: z.string().min(1, 'Invalid lessonId'),
});

export type ParamsWithId = z.infer<typeof paramsWithIdSchema>;
export type ParamsWithLessonId = z.infer<typeof paramsWithLessonIdSchema>;

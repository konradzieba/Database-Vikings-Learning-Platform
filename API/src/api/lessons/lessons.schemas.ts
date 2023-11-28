import { taskFromArraySchema } from '../../api/tasks/tasks.schemas';
import z from 'zod';

export const createLessonSchema = z.object({
  number: z
    .number({ required_error: 'Lesson number must be provided' })
    .int('Lesson number must be integer'),
  image: z.optional(z.string()),
  groupId: z.number().int('groupId must be an integer.'),
  absentStudents: z.array(z.number().int()),
  isFrequencyChecked: z.boolean(),
  tasks: z.array(taskFromArraySchema),
});

export const updateLessonSchema = createLessonSchema
  .omit({
    groupId: true,
    isFrequencyChecked: true,
  })
  .partial();

export const reorderLessonSchema = z.object({
  newLessonsOrder: z.array(
    z.object({
      lessonId: z.number().int(),
      newLessonNumber: z.number().int(),
    })
  ),
});

export type LessonInput = z.infer<typeof createLessonSchema>;
export type UpdateLessonInput = z.infer<typeof updateLessonSchema>;
export type ReorderLessonInput = z.infer<typeof reorderLessonSchema>;

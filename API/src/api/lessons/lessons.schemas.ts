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

export type LessonInput = z.infer<typeof createLessonSchema>;

export type UpdateLessonInput = z.infer<typeof updateLessonSchema>;

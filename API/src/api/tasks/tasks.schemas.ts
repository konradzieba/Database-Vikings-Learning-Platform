import z from 'zod';
import dayjs from 'dayjs';

export const taskSchema = z.object({
  number: z
    .number({ required_error: 'Task number must be provided' })
    .int('Task number must be integer'),
  question: z.string({ required_error: 'Task question must be provided' }),
  closeDate: z.coerce
    .date({
      required_error: 'Task closeDate must be provided',
    })
    .refine(
      (closeDate) => {
        return dayjs(closeDate).isAfter(dayjs());
      },
      {
        message: 'closeDate must be after today',
        path: ['closeDate'],
      }
    ),
  isExtra: z.boolean({ required_error: 'Task isExtra must be provided' }),
  lessonId: z.number().int('lessonId must be an integer.'),
  isMarkdown: z.boolean({ required_error: 'Task isMarkdown must be provided' }),
});

export const updateTaskSchema = taskSchema.pick({
  question: true,
  closeDate: true,
  isMarkdown: true,
});

export const getStudentTasksSchema = z.object({
  groupId: z.number().int('groupId must be an integer.'),
});

export type TaskInput = z.infer<typeof taskSchema>;

export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
export type GetStudentTasksInput = z.infer<typeof getStudentTasksSchema>;

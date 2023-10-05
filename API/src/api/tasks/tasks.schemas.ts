import z from 'zod';
import dayjs from 'dayjs';

export const taskSchema = z.object({
  number: z
    .number({ required_error: 'Task number must be provided' })
    .int('Task number must be integer'),
  question: z.string({ required_error: 'Task question must be provided' }),
  openDate: z.date({ required_error: 'Task openDate must be provided' }),
  closeDate: z
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
});

export type TaskInput = z.infer<typeof taskSchema>;

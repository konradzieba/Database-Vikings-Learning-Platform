import z from 'zod';
import { ReplyStatus } from '@prisma/client';

const answerSchema = z.object({
  solution: z.string({ required_error: 'Solution is required' }),
  taskId: z.number().int('taskId must be an integer.'),
  studentId: z.number().int('studentId must be an integer.'),
  replyStatus: z
    .nativeEnum(ReplyStatus)
    .refine((status) => status !== ReplyStatus.PENDING, {
      message: 'Reply status cannot be PENDING',
    }),
  replyDate: z.coerce.date({ required_error: 'Reply date is required' }),
  replyDesc: z.string(),
  grantedScore: z
    .number({ required_error: 'Granted score is required' })
    .int('Granted score must be an integer.')
    .min(0, 'Score must be greater or equal 0')
    .max(100, 'Score must be less or equal 100'),
});

export const answerInputSchema = answerSchema.omit({
  replyStatus: true,
  replyDate: true,
  replyDesc: true,
  grantedScore: true,
});

export const answerReplySchema = answerSchema
  .partial({ replyDesc: true })
  .omit({
    solution: true,
    taskId: true,
    studentId: true,
  });

export const answerUpdateSchema = answerReplySchema
  .partial({ replyDesc: true, grantedScore: true })
  .omit({
    replyStatus: true,
    replyDate: true,
  });

export type AnswerInput = z.infer<typeof answerInputSchema>;

export type AnswerReply = z.infer<typeof answerReplySchema>;

export type AnswerUpdate = z.infer<typeof answerUpdateSchema>;

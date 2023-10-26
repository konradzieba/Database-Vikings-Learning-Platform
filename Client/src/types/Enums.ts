import z from 'zod';

export const UserRoleEnum = z.enum(['STUDENT', 'LECTURER', 'SUPERUSER']);

export const AnswerReplyStatusEnum = z.enum([
	'PENDING',
	'PARTLY_CORRECT',
	'INCORRECT',
	'CORRECT',
]);

export type UserRole = z.infer<typeof UserRoleEnum>;
export type AnswerReplyStatus = z.infer<typeof AnswerReplyStatusEnum>;

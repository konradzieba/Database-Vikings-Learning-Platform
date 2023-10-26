import { z } from 'zod';
import { UserRoleEnum } from './Enums';

const UserRequestSchema = z.object({
	email: z.string().email(),
	password: z.string(),
	firstName: z.string(),
	lastName: z.string(),
	role: UserRoleEnum,
});

const TLoginRequest = UserRequestSchema.pick({ email: true, password: true });

const SendAnswerRequestSchema = z.object({
	solution: z.string().min(1),
	taskId: z.number().int(),
	studentId: z.number().int(),
});

export type TUserRequest = z.infer<typeof UserRequestSchema>;
export type TLoginRequest = z.infer<typeof TLoginRequest>;
export type TSendAnswerRequest = z.infer<typeof SendAnswerRequestSchema>;

import z from 'zod';
import { UserRoleEnum } from './Enums';

const MessageResponseSchema = z.object({
	message: z.string(),
});

const LoginResponseSchema = z
	.object({
		role: UserRoleEnum,
	})
	.merge(MessageResponseSchema);

const LecturerInfoSchema = z.object({
	lecturerId: z.number(),
	isAdmin: z.boolean(),
	idCheck: z.number(),
});

const StudentInfoSchema = z.object({
	studentId: z.number(),
	indexNumber: z.number(),
	score: z.number(),
	health: z.number().int().min(0).max(3),
	rank: z.number().int(),
	idCheck: z.number(),
});

const MeResponseSchema = z
	.object({
		id: z.number(),
		email: z.string(),
		firstName: z.string(),
		lastName: z.string(),
		role: UserRoleEnum,
	})
	.and(
		z.union([
			z.object({ lecturerInfos: LecturerInfoSchema }),
			z.object({ studentInfos: StudentInfoSchema }),
		])
	);

export type TMessageResponse = z.infer<typeof MessageResponseSchema>;
export type TLoginResponse = z.infer<typeof LoginResponseSchema>;
export type TLecturerInfo = z.infer<typeof LecturerInfoSchema>;
export type TStudentInfo = z.infer<typeof StudentInfoSchema>;
export type TMeResponse = z.infer<typeof MeResponseSchema>;

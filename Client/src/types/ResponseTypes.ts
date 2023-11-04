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
	firstName: z.string(),
	lastName: z.string(),
	studentId: z.number(),
	indexNumber: z.number(),
	score: z.number(),
	health: z.number().int().min(0).max(3),
	rank: z.number().int(),
	isPasswordChanged: z.boolean(),
	idCheck: z.number(),
	groupId: z.number(),
	answersId: z.array(z.number()),
});

const MeResponseSchema = z.object({
	id: z.number(),
	email: z.string(),
	firstName: z.string(),
	lastName: z.string(),
	role: UserRoleEnum,
	lecturerInfos: LecturerInfoSchema.nullable(),
	studentInfos: StudentInfoSchema.nullable(),
});

export type TMessageResponse = z.infer<typeof MessageResponseSchema>;
export type TLoginResponse = z.infer<typeof LoginResponseSchema>;
export type TLecturerInfo = z.infer<typeof LecturerInfoSchema>;
export type TStudentInfo = z.infer<typeof StudentInfoSchema>;
export type TMeResponse = z.infer<typeof MeResponseSchema>;

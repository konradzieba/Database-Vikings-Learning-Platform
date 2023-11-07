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

const GetGroupsByLecturerIdSchema = z.object({
	message: z.string(),
	groups: z.array(
		z.object({
			groupId: z.number().int(),
			groupName: z.string(),
			lessonsCount: z.number().int(),
			studentsCount: z.number().int(),
		})
	),
});

const GetStudentsFromGroupSchema = z.object({
	message: z.string(),
	students: z.array(
		z.object({
			id: z.number().int(),
			indexNumber: z.number().int(),
			score: z.number().int(),
			health: z.number().int(),
			lastLogin: z.string(),
			userId: z.number().int(),
			groupId: z.number().int(),
			firstName: z.string(),
			lastName: z.string(),
		})
	),
});

const GetLessonsByGroupIdSchema = z.object({
	message: z.string(),
	lessons: z.array(
		z.object({
			id: z.number().int(),
			number: z.number().int(),
			image: z.string(),
			isFrequencyChecked: z.boolean(),
			taskAmount: z.number().int(),
			groupId: z.number().int(),
		})
	),
});

/*
{
    lessonNumber: number;
    tasks: {
        taskNumber: number;
        endDate: string;
        studentsWithoutAnswer: {
            indexNumber: number;
            User: {
                firstName: string;
                lastName: string;
            };
        }[];
        answers: {
            firstName: string;
            lastName: string;
            index: number;
            answer: string;
            sendDate: string;
        }[];
    }[];
}
*/

const getLessonInfoByGroupAndLessonIdSchema = z.object({
	message: z.string(),
	lessonInfo: z.object({
		lessonNumber: z.number().int(),
		tasks: z.array(
			z.object({
				taskNumber: z.number().int(),
				endDate: z.string(),
				studentsWithoutAnswer: z.array(
					z.object({
						indexNumber: z.number().int(),
						User: z.object({
							firstName: z.string(),
							lastName: z.string(),
						}),
					})
				),
				answers: z.array(
					z.object({
						firstName: z.string(),
						lastName: z.string(),
						index: z.number().int(),
						answer: z.string(),
						sendDate: z.string(),
					})
				),
			})
		),
	}),
});

export type TMessageResponse = z.infer<typeof MessageResponseSchema>;
export type TLoginResponse = z.infer<typeof LoginResponseSchema>;
export type TLecturerInfo = z.infer<typeof LecturerInfoSchema>;
export type TStudentInfo = z.infer<typeof StudentInfoSchema>;
export type TMeResponse = z.infer<typeof MeResponseSchema>;
export type TGetGroupsByLecturerId = z.infer<
	typeof GetGroupsByLecturerIdSchema
>;
export type TGetStudentsFromGroup = z.infer<typeof GetStudentsFromGroupSchema>;
export type TGetLessonsByGroupId = z.infer<typeof GetLessonsByGroupIdSchema>;
export type TGetLessonInfoByGroupAndLessonId = z.infer<
	typeof getLessonInfoByGroupAndLessonIdSchema
>;

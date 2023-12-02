import z from 'zod';
import { AnswerReplyStatusEnum, UserRoleEnum } from './Enums';

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

const RegisterManyStudentsSchema = z.object({
	message: z.string(),
	existingStudents: z.array(z.number()),
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
	aggregatedSendTime: z.number(),
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

const getLessonInfoByGroupAndLessonIdSchema = z.object({
	message: z.string().min(1),
	lessonInfo: z.object({
		lessonNumber: z.number().int(),
		tasks: z.array(
			z.object({
				taskId: z.number().int(),
				taskNumber: z.number().int(),
				endDate: z.string(),
				studentsWithoutAnswer: z.array(
					z.object({
						User: z.object({
							firstName: z.string().min(1),
							lastName: z.string().min(1),
						}),
						indexNumber: z.number().int(),
					})
				),
				answers: z.array(
					z.object({
						studentId: z.number().int(),
						answerId: z.number().int(),
						firstName: z.string().min(1),
						lastName: z.string().min(1),
						index: z.number().int(),
						answer: z.string().min(1),
						sendDate: z.string(),
						grantedScore: z.string().nullable(),
					})
				),
			})
		),
	}),
});

const getStudentLessonsInfoSchema = z.object({
	message: z.string(),
	lessons: z.array(
		z.object({
			id: z.number().int(),
			number: z.number().int(),
			image: z.string(),
			tasksDone: z.number().int(),
			tasksAmount: z.number().int(),
			groupId: z.number().int(),
		})
	),
});

const getTasksByLessonIdSchema = z.object({
	message: z.string(),
	lessonNumber: z.number().int(),
	lessonId: z.number().int(),
	tasks: z.array(
		z.object({
			id: z.number().int(),
			number: z.number().int(),
			question: z.string(),
			closeDate: z.string(),
			answerSend: z.boolean(),
			isMarkdown: z.boolean(),
		})
	),
});

const getLessonTaskByIdSchema = z.object({
	message: z.string(),
	lessonNumber: z.number().int(),
	taskInfo: z.object({
		id: z.number().int(),
		number: z.number().int(),
		question: z.string(),
		openDate: z.string(),
		closeDate: z.string(),
		lessonId: z.number().int(),
		isMarkdown: z.boolean(),
	}),
	answer: z.object({
		id: z.number().int(),
		solution: z.string(),
		replyStatus: AnswerReplyStatusEnum,
		sendDate: z.string(),
		replyDesc: z.string().nullable(),
		replyDate: z.string().nullable(),
		grantedScore: z.string().nullable(),
		taskId: z.number().int(),
		studentId: z.number().int(),
	}),
});

export const getStudentTasksSchema = z.object({
	message: z.string(),
	tasks: z.array(
		z.object({
			lessonNumber: z.number().int(),
			tasks: z.array(
				z.object({
					taskNumber: z.number().int(),
					taskQuestion: z.string(),
					replyStatus: AnswerReplyStatusEnum,
					replyDesc: z.string(),
					solution: z.string(),
					grantedScore: z.number(),
					sendDate: z.string(),
					replyDate: z.string(),
				})
			),
		})
	),
});

const getTaskInfoByIdSchema = z.object({
	message: z.string(),
	taskInfo: z.object({
		id: z.number().int(),
		number: z.number().int(),
		question: z.string(),
		openDate: z.string(),
		closeDate: z.string(),
		lessonId: z.number().int(),
		isMarkdown: z.boolean(),
	}),
});

const getScoreBoardSchema = z.object({
	message: z.string(),
	scoreBoard: z.array(
		z.object({
			id: z.number().int(),
			indexNumber: z.number().int(),
			score: z.number().int(),
			health: z.number().int(),
			groupId: z.number().int(),
			aggregatedSendTime: z.number().int(),
			Group: z.object({
				lecturerId: z.number().int(),
				name: z.string(),
			}),
			User: z.object({
				firstName: z.string(),
				lastName: z.string(),
			}),
		})
	),
});

const getStudentDefaultPasswordStateSchema = z.object({
	message: z.string(),
	isDefaultPasswordChanged: z.boolean(),
});

const getPreviousLessonsImagesSchema = z.object({
	message: z.string(),
	previousLessonsImages: z.array(
		z.object({ number: z.number().int(), image: z.string() })
	),
});

const getPreDeleteGroupInfoSchema = z.object({
	message: z.string(),
	groupInfo: z.object({
		lessonsAmount: z.number().int(),
		assignedStudentsAmount: z.number().int(),
	}),
});

const getPreDeleteLessonInfoSchema = z.object({
	message: z.string(),
	lessonInfo: z.object({
		lessonNumber: z.number().int(),
		taskAmount: z.number().int(),
		sendAnswersAmount: z.number().int(),
		studentsWithAnswers: z.array(
			z.object({
				studentId: z.number().int(),
				firstName: z.string(),
				lastName: z.string(),
			})
		),
	}),
});

const getAbsentStudentsSchema = z.object({
	id: z.number().int(),
	number: z.number().int(),
	absentStudents: z.array(z.number().int()),
	isFrequencyChecked: z.boolean(),
});

const getGroupInfoSchema = z.object({
	message: z.string(),
	group: z.object({
		id: z.number().int(),
		name: z.string(),
	}),
});

export type TMessageResponse = z.infer<typeof MessageResponseSchema>;
export type TLoginResponse = z.infer<typeof LoginResponseSchema>;
export type TRegisterManyStudents = z.infer<typeof RegisterManyStudentsSchema>;
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
export type TGetStudentLessonsInfo = z.infer<
	typeof getStudentLessonsInfoSchema
>;
export type TGetTasksByLessonId = z.infer<typeof getTasksByLessonIdSchema>;
export type TGetLessonTaskById = z.infer<typeof getLessonTaskByIdSchema>;

export type TGetStudentTasks = z.infer<typeof getStudentTasksSchema>;
export type TGetStudentDefaultPasswordState = z.infer<
	typeof getStudentDefaultPasswordStateSchema
>;
export type TGetTaskInfoById = z.infer<typeof getTaskInfoByIdSchema>;
export type TGetScoreBoard = z.infer<typeof getScoreBoardSchema>;

export type TGetAbsentStudents = z.infer<typeof getAbsentStudentsSchema>;

export type TGetPreviousLessonsImages = z.infer<
	typeof getPreviousLessonsImagesSchema
>;
export type TGetPreDeleteGroupInfo = z.infer<
	typeof getPreDeleteGroupInfoSchema
>;
export type TGetPreDeleteLessonInfo = z.infer<
	typeof getPreDeleteLessonInfoSchema
>;
export type TGetGroupInfo = z.infer<typeof getGroupInfoSchema>;

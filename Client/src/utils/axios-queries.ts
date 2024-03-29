import { AnswerReplyStatus } from '@/types/Enums';
import {
	TAddStudentToGroupRequest,
	TCreateLessonRequest,
	TCreateTaskRequest,
	TLoginRequest,
	TRegisterManyStudentsRequest,
	TReorderLessonRequest,
	TReplyAnswerRequest,
	TSendAnswerRequest,
	TUpdateAnswerReplyRequest,
	TUpdateStudentRequest,
	TUpdateTaskInfoRequest,
} from '@/types/RequestTypes';
import {
	TGetAbsentStudents,
	TGetEditAnswerReply,
	TGetGroupInfo,
	TGetGroupsByLecturerId,
	TGetLessonInfoByGroupAndLessonId,
	TGetLessonTaskById,
	TGetLessonsByGroupId,
	TGetPreDeleteGroupInfo,
	TGetPreDeleteLessonInfo,
	TGetPreviousLessonsImages,
	TGetScoreBoard,
	TGetSpecialTaskById,
	TGetSpecialTaskDetailsById,
	TGetSpecialTasks,
	TGetSpecialTasksToEvaluate,
	TGetStudentDefaultPasswordState,
	TGetStudentLessonsInfo,
	TGetStudentPreviewData,
	TGetStudentSpecialTaskAnswers,
	TGetStudentTasks,
	TGetStudentsFromGroup,
	TGetTaskInfoById,
	TGetTasksByLessonId,
	TLoginResponse,
	TMeResponse,
	TMessageResponse,
	TRegisterManyStudents,
} from '@/types/ResponseTypes';
import axios from '@/utils/axios';
import { func } from 'prop-types';

export const meQueryFn = async () => {
	const { data } = await axios.get<TMeResponse>('/users/me');
	return data;
};

export const refreshTokenQueryFn = async () => {
	const { data } = await axios.post<TMessageResponse>('/auth/refreshToken');
	return data;
};

export const loginMutationFn = async (loginRequest: TLoginRequest) => {
	const { data } = await axios.post<TLoginResponse>('/auth/login', loginRequest);
	return data;
};

export const logoutMutationFn = async () => {
	const { data } = await axios.post<TMessageResponse>('/auth/logout');
	return data;
};

export const sendAnswerMutationFn = async (sendAnswerRequest: TSendAnswerRequest) => {
	const { data } = await axios.post<TMessageResponse>('/answers/createAnswer', sendAnswerRequest);
	return data;
};

export const changeDefaultPasswordMutationFn = async (newPassword: Pick<TLoginRequest, 'password'>) => {
	const { data } = await axios.patch<TMessageResponse>('/users/changeDefaultPassword', newPassword);
	return data;
};

export const getGroupsByLecturerIdQueryFn = async (lecturerId: number) => {
	const { data } = await axios.get<TGetGroupsByLecturerId>(`/groups/getGroupsByLecturerId/${lecturerId}`);
	return data;
};

export const getStudentsFromGroupQueryFn = async (groupId: number) => {
	const { data } = await axios.get<TGetStudentsFromGroup>(`/groups/getStudentsFromGroup/${groupId}`);
	return data;
};

export const getLessonsByGroupIdQueryFn = async (groupId: number) => {
	const { data } = await axios.get<TGetLessonsByGroupId>(`/lessons/getLessonsByGroupId/${groupId}`);
	return data;
};

export const getLessonInfoByGroupAndLessonIdQueryFn = async (groupId: number, lessonId: number) => {
	const { data } = await axios.get<TGetLessonInfoByGroupAndLessonId>(
		`/lessons/getLessonInfoByGroupAndLessonId/${groupId}/${lessonId}`
	);
	return data;
};

export const getStudentLessonsInfoQueryFn = async () => {
	const { data } = await axios.get<TGetStudentLessonsInfo>('/lessons/getStudentLessonsInfo');
	return data;
};

export const getTaskInfoByIdQueryFn = async (taskId: number) => {
	const { data } = await axios.get<TGetTaskInfoById>(`/tasks/getTaskInfoById/${taskId}`);
	return data;
};

export const getTasksByLessonIdQueryFn = async (lessonId: number) => {
	const { data } = await axios.get<TGetTasksByLessonId>(`/lessons/getTasksByLessonId/${lessonId}`);
	return data;
};

export const getLessonTaskByIdQueryFn = async (lessonId: number, taskId: number) => {
	const { data } = await axios.get<TGetLessonTaskById>(`tasks/getLessonTaskById/${lessonId}/${taskId}`);
	return data;
};

export const getScoreBoardQueryFn = async () => {
	const { data } = await axios.get<TGetScoreBoard>('/users/getScoreBoard');
	return data;
};

export const changeStudentGroupMutationFn = async (studentId: number, groupId: number) => {
	const { data } = await axios.patch<TMessageResponse>(`/groups/changeStudentGroup/${studentId}`, {
		groupId,
	});
	return data;
};

export const deleteUserMutationFn = async (userId: number) => {
	const { data } = await axios.delete<TMessageResponse>(`/users/deleteUser/${userId}`);
	return data;
};

export const updateStudentMutationFn = async (studentId: number, studentInfo: TUpdateStudentRequest) => {
	const { data } = await axios.patch<TMessageResponse>(`/users/updateStudent/${studentId}`, studentInfo);
	return data;
};

export const updateTaskInfoMutationFn = async (taskData: TUpdateTaskInfoRequest) => {
	const { data } = await axios.patch<TMessageResponse>(`/tasks/updateTask/${taskData.taskId}`, taskData.taskInfo);
	return data;
};

export const restoreDefaultPasswordMutationFn = async (studentId: number) => {
	const { data } = await axios.patch<TMessageResponse>(`/users/restoreDefaultPassword/${studentId}`);
	return data;
};

export const getStudentDefaultPasswordStateQueryFn = async () => {
	const { data } = await axios.get<TGetStudentDefaultPasswordState>('/users/getStudentDefaultPasswordState');

	return data;
};

export const getStudentTasksQueryFn = async (groupId: number) => {
	const { data } = await axios.get<TGetStudentTasks>(`/tasks/getStudentTasks/${groupId}`);
	return data;
};

export const replyAnswerMutationFn = async (answerId: number, reply: TReplyAnswerRequest) => {
	const { data } = await axios.patch<TMessageResponse>(`/answers/answerReply/${answerId}`, reply);
	return data;
};

export const specialTaskAnswerReplyMutationFn = async (answerId: number, reply: TReplyAnswerRequest) => {
	const { data } = await axios.patch<TMessageResponse>(`/answers/specialTaskAnswerReply/${answerId}`, reply);
	return data;
};

export const createLessonMutationFn = async (createLessonRequest: TCreateLessonRequest) => {
	const { data } = await axios.post<TMessageResponse>('/lessons/createLesson', createLessonRequest);

	return data;
};

export const getPreviousLessonsImagesQueryFn = async (groupId: number) => {
	const { data } = await axios.get<TGetPreviousLessonsImages>(`/lessons/getPreviousLessonsImages/${groupId}`);
	return data;
};

export const deleteTaskMutationFn = async (taskId: number) => {
	const { data } = await axios.delete<TMessageResponse>(`/tasks/deleteTask/${taskId}`);
	return data;
};

export const getPreDeleteLessonInfoQueryFn = async (lessonId: number) => {
	const { data } = await axios.get<TGetPreDeleteLessonInfo>(`/lessons/getPreDeleteLessonInfo/${lessonId}`);
	return data;
};

export const deleteLessonMutationFn = async (lessonId: number) => {
	const { data } = await axios.delete<TMessageResponse>(`/lessons/deleteLesson/${lessonId}`);
	return data;
};

export const registerManyStudentsMutationFn = async (registerManyStudentsRequest: TRegisterManyStudentsRequest) => {
	const { data } = await axios.post<TMessageResponse | TRegisterManyStudents>(
		'/auth/registerManyStudents',
		registerManyStudentsRequest
	);
	return data;
};

export const addStudentToGroupMutationFn = async (studentData: TAddStudentToGroupRequest) => {
	const { data } = await axios.post<TMessageResponse>('/auth/register', {
		groupId: studentData.groupId,
		...studentData.studentData,
	});
	return data;
};

export const getAbsentStudentsQueryFn = async (lessonId: number) => {
	const { data } = await axios.get<TGetAbsentStudents>(`/lessons/getAbsentStudents/${lessonId}`);
	return data;
};

export const reorderLessonsMutationFn = async (groupId: number, newLessonsOrder: TReorderLessonRequest) => {
	const { data } = await axios.patch<TMessageResponse>(`/lessons/reorderLessons/${groupId}`, {
		newLessonsOrder,
	});
	return data;
};

export const renameGroupMutationFn = async (groupId: number, newName: string) => {
	const { data } = await axios.patch<TMessageResponse>(`/groups/renameGroup/${groupId}`, {
		name: newName,
	});
	return data;
};

export const correctLessonFrequencyListMutationFn = async (lessonId: number, newAbsentStudentList: number[]) => {
	const { data } = await axios.patch<TMessageResponse>(`/lessons/correctLessonFrequency/${lessonId}`, {
		newStudentFrequencyList: newAbsentStudentList,
	});
	return data;
};

export const getPreDeleteGroupInfoQueryFn = async (groupId: number) => {
	const { data } = await axios.get<TGetPreDeleteGroupInfo>(`/groups/getPreDeleteGroupInfo/${groupId}`);
	return data;
};

export const deleteGroupMutationFn = async (groupId: number) => {
	const { data } = await axios.delete<TMessageResponse>(`/groups/deleteGroup/${groupId}`);
	return data;
};

export const getGroupInfoQueryFn = async (groupId: number) => {
	const { data } = await axios.get<TGetGroupInfo>(`/groups/getGroupInfo/${groupId}`);
	return data;
};

export const getStudentPreviewDataQueryFn = async (studentId: number) => {
	const { data } = await axios.get<TGetStudentPreviewData>(`/users/getStudentPreviewData/${studentId}`);

	return data;
};

export const getEditSpecialTaskAnswerReplyQueryFn = async (answerId: number) => {
	const { data } = await axios.get<TGetEditAnswerReply>(`/answers/getEditSpecialTaskAnswerData/${answerId}`);

	return data;
};

export const getEditAnswerReplyQueryFn = async (answerId: number) => {
	const { data } = await axios.get<TGetEditAnswerReply>(`/answers/getEditReplyAnswerData/${answerId}`);

	return data;
};

export const updateSpecialTaskAnswerReplyMutationFn = async (
	answerId: number,
	answerReply: TUpdateAnswerReplyRequest
) => {
	const { data } = await axios.patch<TMessageResponse>(`/answers/updateSpecialTaskAnswerReply/${answerId}`, answerReply);

	return data;
};

export const updateAnswerReplyMutationFn = async (answerId: number, answerReply: TUpdateAnswerReplyRequest) => {
	const { data } = await axios.patch<TMessageResponse>(`/answers/updateAnswerReply/${answerId}`, answerReply);

	return data;
};

export const createTaskMutationFn = async (taskData: TCreateTaskRequest) => {
	const { data } = await axios.post<TMessageResponse>(`/tasks/createTask`, taskData);

	return data;
};

export const getSpecialTasksQueryFn = async (lecturerId: number) => {
	const { data } = await axios.get<TGetSpecialTasks>(`/tasks/getSpecialTasks/${lecturerId}`);

	return data;
};

export const getSpecialTaskByIdQueryFn = async (specialTaskId: number) => {
	const { data } = await axios.get<TGetSpecialTaskById>(`/tasks/getSpecialTaskInfoById/${specialTaskId}`);

	return data;
};

export const getStudentSpecialTaskAnswersQueryFn = async () => {
	const { data } = await axios.get<TGetStudentSpecialTaskAnswers>(`/tasks/getStudentSpecialTaskAnswers`);

	return data;
};

export const getSpecialTasksToEvaluateQueryFn = async () => {
	const { data } = await axios.get<TGetSpecialTasksToEvaluate>(`/tasks/getSpecialTasksToEvaluate`);

	return data;
};

export const getSpecialTaskDetailsByIdQueryFn = async (specialTaskId: number) => {
	const { data } = await axios.get<TGetSpecialTaskDetailsById>(`/tasks/getSpecialTaskDetailsById/${specialTaskId}`);

	return data;
};

import { TLoginRequest, TSendAnswerRequest } from '@/types/RequestTypes';
import {
	TGetGroupsByLecturerId,
	TGetLessonInfoByGroupAndLessonId,
	TGetLessonTaskById,
	TGetLessonsByGroupId,
	TGetStudentLessonsInfo,
	TGetStudentsFromGroup,
	TGetTasksByLessonId,
	TLoginResponse,
	TMeResponse,
	TMessageResponse,
} from '@/types/ResponseTypes';
import axios from '@/utils/axios';

export const meQueryFn = async () => {
	const { data } = await axios.get<TMeResponse>('/users/me');
	return data;
};

export const refreshTokenQueryFn = async () => {
	const { data } = await axios.post<TMessageResponse>('/auth/refreshToken');
	return data;
};

export const loginMutationFn = async (loginRequest: TLoginRequest) => {
	const { data } = await axios.post<TLoginResponse>(
		'/auth/login',
		loginRequest
	);
	return data;
};

export const logoutMutationFn = async () => {
	const { data } = await axios.post<TMessageResponse>('/auth/logout');
	return data;
};

export const sendAnswerMutationFn = async (
	sendAnswerRequest: TSendAnswerRequest
) => {
	const { data } = await axios.post<TMessageResponse>(
		'/answers/createAnswer',
		sendAnswerRequest
	);
	return data;
};

export const changeDefaultPasswordMutationFn = async (
	newPassword: Pick<TLoginRequest, 'password'>
) => {
	const { data } = await axios.patch<TMessageResponse>(
		'/users/changeDefaultPassword',
		newPassword
	);
	return data;
};

export const getGroupsByLecturerIdQueryFn = async (lecturerId: number) => {
	const { data } = await axios.get<TGetGroupsByLecturerId>(
		`/groups/getGroupsByLecturerId/${lecturerId}`
	);
	return data;
};

export const getStudentsFromGroupQueryFn = async (groupId: number) => {
	const { data } = await axios.get<TGetStudentsFromGroup>(
		`/groups/getStudentsFromGroup/${groupId}`
	);
	return data;
};

export const getLessonsByGroupIdQueryFn = async (groupId: number) => {
	const { data } = await axios.get<TGetLessonsByGroupId>(
		`/lessons/getLessonsByGroupId/${groupId}`
	);
	return data;
};

export const getLessonInfoByGroupAndLessonIdQueryFn = async (
	groupId: number,
	lessonId: number
) => {
	const { data } = await axios.get<TGetLessonInfoByGroupAndLessonId>(
		`/lessons/getLessonInfoByGroupAndLessonId/${groupId}/${lessonId}`
	);
	return data;
};

export const getStudentLessonsInfoQueryFn = async () => {
	const { data } = await axios.get<TGetStudentLessonsInfo>(
		'/lessons/getStudentLessonsInfo'
	);
	return data;
};

export const getTasksByLessonIdQueryFn = async (lessonId: number) => {
	const { data } = await axios.get<TGetTasksByLessonId>(
		`/lessons/getTasksByLessonId/${lessonId}`
	);
	return data;
};

export const getLessonTaskByIdQueryFn = async (
	lessonId: number,
	taskId: number
) => {
	const { data } = await axios.get<TGetLessonTaskById>(
		`tasks/getLessonTaskById/${lessonId}/${taskId}`
	);
	return data;
};

export const changeStudentGroupMutationFn = async (
	studentId: number,
	groupId: number
) => {
	const { data } = await axios.patch<TMessageResponse>(
		`/students/changeStudentGroup/${studentId}`,
		{
			groupId,
		}
	);
	return data;
};

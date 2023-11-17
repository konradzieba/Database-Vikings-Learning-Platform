import { ICreateLessonStore } from '@/types/StoreTypes';
import { create } from 'zustand';

export const useCreateLessonStore = create<ICreateLessonStore>(set => ({
	createdLessonsArray: [],
	addLesson: lesson => set(state => ({ createdLessonsArray: [...state.createdLessonsArray, lesson] })),
	removeLesson: groupId =>
		set(state => ({
			createdLessonsArray: state.createdLessonsArray.filter(lesson => lesson.groupId !== groupId),
		})),
	updateLesson: (groupId, updatedLesson) =>
		set(state => ({
			createdLessonsArray: state.createdLessonsArray.map(lesson =>
				lesson.groupId === groupId ? updatedLesson : lesson
			),
		})),
}));

import { IStudentStoreStore } from '@/types/StoreTypes';
import { create } from 'zustand';

const initialStudentStoreValues = {
	studentData: {
		indexNumber: null,
		health: null,
		score: null,
		rank: null,
		isPasswordChanged: null,
		studentId: null,
		groupId: null,
		answersIds: null,
	},
};

export const useStudentStore = create<IStudentStoreStore>(set => ({
	studentData: {
		indexNumber: null,
		health: null,
		score: null,
		rank: null,
		isPasswordChanged: null,
		studentId: null,
		groupId: null,
		answersIds: null,
	},
	setStudentData: studentData => set({ studentData }),
	clearStudentStoreData: () => set(initialStudentStoreValues),
}));

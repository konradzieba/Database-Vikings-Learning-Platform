import { ILecturerStore } from '@/types/StoreTypes';
import { create } from 'zustand';

const initialLecturerStoreValues = {
	lecturerData: {
		lecturerId: null,
		isAdmin: null,
		idCheck: null,
	},
};

export const useLecturerStore = create<ILecturerStore>(set => ({
	lecturerData: {
		lecturerId: null,
		isAdmin: null,
		idCheck: null,
	},
	setLecturerData: lecturerData => set({ lecturerData }),
	clearLecturerStoreData: () => set(initialLecturerStoreValues),
}));

import { ILecturerStore } from '@/types/StoreTypes';
import { create } from 'zustand';

const initialLecturerStoreValues = {
	lecturerData: {
		lecturerId: null,
		isAdmin: null,
		idCheck: null,
	},
	groups: null,
};

export const useLecturerStore = create<ILecturerStore>(set => ({
	lecturerData: {
		lecturerId: null,
		isAdmin: null,
		idCheck: null,
	},
	groups: null,
	setLecturerData: lecturerData => set({ lecturerData }),
	setGroups: groups => set({ groups }),
	clearLecturerStoreData: () => set(initialLecturerStoreValues),
}));

import { UserRole } from '@/types/Enums';
import { create } from 'zustand';

interface IUserStoreStore {
	role: UserRole | null;
	userData: {
		firstName: string | null;
		lastName: string | null;
		email: string | null;
		userId: number | null;
	};
	setRole: (role: UserRole) => void;
	setUserData: (userData: IUserStoreStore['userData']) => void;
}

interface IStudentStoreStore {
	studentData: {
		indexNumber: number | null;
		health: number | null;
		score: number | null;
		rank: number | null;
		// lastLogin: null,
		studentId: number | null;
		groupId: number | null;
		answersIds: number[] | null;
	};
	setStudentData: (studentData: IStudentStoreStore['studentData']) => void;
}

export const useUserStore = create<IUserStoreStore>((set) => ({
	role: null,
	userData: {
		firstName: null,
		lastName: null,
		email: null,
		userId: null,
	},
	setRole: (role: UserRole) => set({ role }),
	setUserData: (userData) => set({ userData }),
}));

export const useStudentStore = create<IStudentStoreStore>((set) => ({
	studentData: {
		indexNumber: null,
		health: null,
		score: null,
		rank: null,
		// lastLogin: null,
		studentId: null,
		groupId: null,
		answersIds: null,
	},
	setStudentData: (studentData) => set({ studentData }),
}));

interface ILecturerStore {
	lecturerData: {
		lecturerId: number | null;
		isAdmin: boolean | null;
		idCheck: number | null;
	};
	setLecturerData: (lecturerData: ILecturerStore['lecturerData']) => void;
}
export const useLecturerStore = create<ILecturerStore>((set) => ({
	lecturerData: {
		lecturerId: null,
		isAdmin: null,
		idCheck: null,
	},
	setLecturerData: (lecturerData) => set({ lecturerData }),
}));

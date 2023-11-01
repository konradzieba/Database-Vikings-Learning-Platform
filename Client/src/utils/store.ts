import { UserRole } from '@/types/Enums';
import { create } from 'zustand';

interface IUserStoreStore {
	role: UserRole | null;
	setRole: (role: UserRole) => void;
}

interface IStudentStoreStore {
	studentData: {
		indexNumber: number | null;
		firstName: string | null;
		lastName: string | null;
		health: number | null;
		score: number | null;
		rank: number | null;
		email: string | null;
		// lastLogin: null,
		userId: number | null;
		studentId: number | null;
		// groupId: number | null;
		// answersIds: number[] | null;
	};
	setStudentData: (studentData: IStudentStoreStore['studentData']) => void;
}

export const useUserStore = create<IUserStoreStore>((set) => ({
	role: null,
	setRole: (role: UserRole) => set({ role }),
}));

export const useStudentStore = create<IStudentStoreStore>((set) => ({
	studentData: {
		indexNumber: null,
		firstName: null,
		lastName: null,
		health: null,
		score: null,
		rank: null,
		email: null,
		// lastLogin: null,
		userId: null,
		studentId: null,
		// groupId: null,
		// answersIds: null,
	},
	setStudentData: (studentData) => set({ studentData }),
}));

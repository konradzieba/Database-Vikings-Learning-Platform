import { UserRole } from '@/types/Enums';
import { TGetGroupsByLecturerId } from '@/types/ResponseTypes';
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
	clearUserStoreData: () => void;
}

interface IStudentStoreStore {
	studentData: {
		indexNumber: number | null;
		health: number | null;
		score: number | null;
		rank: number | null;
		isPasswordChanged: boolean | null;
		// lastLogin: null,
		studentId: number | null;
		groupId: number | null;
		answersIds: number[] | null;
	};
	setStudentData: (studentData: IStudentStoreStore['studentData']) => void;
	clearStudentStoreData: () => void;
}

interface ILecturerStore {
	lecturerData: {
		lecturerId: number | null;
		isAdmin: boolean | null;
		idCheck: number | null;
	};
	groups: TGetGroupsByLecturerId['groups'] | null;
	setLecturerData: (lecturerData: ILecturerStore['lecturerData']) => void;
	setGroups: (groups: ILecturerStore['groups']) => void;
	clearLecturerStoreData: () => void;
}

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

const initialLecturerStoreValues = {
	lecturerData: {
		lecturerId: null,
		isAdmin: null,
		idCheck: null,
	},
	groups: null,
};
const initialUserStoreValues = {
	role: null,
	userData: {
		firstName: null,
		lastName: null,
		email: null,
		userId: null,
	},
};

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
	clearUserStoreData: () => set(initialUserStoreValues),
}));

export const useStudentStore = create<IStudentStoreStore>((set) => ({
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
	setStudentData: (studentData) => set({ studentData }),
	clearStudentStoreData: () => set(initialStudentStoreValues),
}));

export const useLecturerStore = create<ILecturerStore>((set) => ({
	lecturerData: {
		lecturerId: null,
		isAdmin: null,
		idCheck: null,
	},
	groups: null,
	setLecturerData: (lecturerData) => set({ lecturerData }),
	setGroups: (groups) => set({ groups }),
	clearLecturerStoreData: () => set(initialLecturerStoreValues),
}));

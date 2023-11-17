import { UserRole } from '@/types/Enums';
import { IUserStoreStore } from '@/types/StoreTypes';
import { create } from 'zustand';

const initialUserStoreValues = {
	role: null,
	userData: {
		firstName: null,
		lastName: null,
		email: null,
		userId: null,
	},
};

export const useUserStore = create<IUserStoreStore>(set => ({
	role: null,
	userData: {
		firstName: null,
		lastName: null,
		email: null,
		userId: null,
	},
	setRole: (role: UserRole) => set({ role }),
	setUserData: userData => set({ userData }),
	clearUserStoreData: () => set(initialUserStoreValues),
}));

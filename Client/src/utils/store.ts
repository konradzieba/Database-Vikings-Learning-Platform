import { UserRole } from '@/types/Enums';
import { create } from 'zustand';

interface IStore {
	role: UserRole | null;
	setRole: (role: UserRole) => void;
}

export const useStore = create<IStore>((set) => ({
	role: null,
	setRole: (role: UserRole) => set({ role }),
}));

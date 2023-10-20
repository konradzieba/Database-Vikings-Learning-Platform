import { UserRole } from '@/types/Enums';
import { create } from 'zustand';

const useStore = create(set => ({
	role: '',
	setRole: () => set((state: UserRole) => ({ role: state })),
}));

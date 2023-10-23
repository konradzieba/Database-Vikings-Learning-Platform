import { redirect } from 'react-router-dom';
import axios from './axios';
import { TMeResponse } from '@/types/ResponseTypes';
import { UserRole } from '@/types/Enums';

export async function studentLayoutLoaderFn() {
	try {
		const { data } = await axios.post<Pick<TMeResponse, 'role'>>('/auth/checkRole');

		if (data.role === UserRole.LECTURER || data.role === UserRole.SUPERUSER) {
			return redirect('/dashboard');
		} else {
			return null;
		}
	} catch {
		redirect('/login');
	}
}

export async function lecturerLayoutLoaderFn() {
	try {
		const { data } = await axios.post<Pick<TMeResponse, 'role'>>('/auth/checkRole');

		if (data.role === UserRole.LECTURER || data.role === UserRole.SUPERUSER) {
			return null;
		} else {
			return redirect('/not-found');
		}
	} catch {
		redirect('/login');
	}
}

export async function loginLoaderFn() {
	try {
		const { data } = await axios.post<Pick<TMeResponse, 'role'>>('/auth/checkRole');

		if (data.role === UserRole.LECTURER || data.role === UserRole.SUPERUSER) {
			return redirect('/dashboard');
		} else if (data.role === UserRole.STUDENT) {
			return redirect('/');
		} else {
			return null;
		}
	} catch {
		return null;
	}
}

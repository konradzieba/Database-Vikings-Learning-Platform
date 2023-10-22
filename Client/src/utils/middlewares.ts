import { redirect } from 'react-router-dom';
import axios from './axios';
import { TMeResponse } from '@/types/ResponseTypes';
import { UserRole } from '@/types/Enums';
import { AxiosError, AxiosRequestConfig } from 'axios';

export async function loginMiddleware() {
	try {
		const meResponse = await axios.get<TMeResponse>('/users/me');
		if (!meResponse.data) {
			return redirect('/login');
		} else {
			const role = meResponse.data.role;
			if (role === UserRole.STUDENT) {
				return redirect('/');
			} else if (role === UserRole.LECTURER || role === UserRole.SUPERUSER) {
				return redirect('/dashboard');
			}
		}
	} catch {
		return redirect('/login');
	}
}


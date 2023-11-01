import { redirect } from 'react-router-dom';
import axios from './axios';
import { TMeResponse } from '@/types/ResponseTypes';
import { UserRoleEnum } from '@/types/Enums';

export async function studentLayoutLoaderFn() {
	try {
		const { data } = await axios.post<Pick<TMeResponse, 'role'>>(
			'/auth/checkRole'
		);

		if (
			data.role === UserRoleEnum.Enum.LECTURER ||
			data.role === UserRoleEnum.Enum.SUPERUSER
		) {
			return redirect('/dashboard');
		} else {
			return null;
		}
	} catch {
		return redirect('/login');
	}
}

export async function lecturerLayoutLoaderFn() {
	try {
		const { data } = await axios.post<Pick<TMeResponse, 'role'>>(
			'/auth/checkRole'
		);

		if (
			data.role === UserRoleEnum.Enum.LECTURER ||
			data.role === UserRoleEnum.Enum.SUPERUSER
		) {
			return null;
		} else {
			return redirect('/not-found');
		}
	} catch {
		return redirect('/login');
	}
}

export async function loginLoaderFn() {
	try {
		const { data } = await axios.post<Pick<TMeResponse, 'role'>>(
			'/auth/checkRole'
		);

		if (
			data.role === UserRoleEnum.Enum.LECTURER ||
			data.role === UserRoleEnum.Enum.SUPERUSER
		) {
			return redirect('/dashboard');
		} else if (data.role === UserRoleEnum.Enum.STUDENT) {
			return redirect('/');
		} else {
			return null;
		}
	} catch {
		return null;
	}
}

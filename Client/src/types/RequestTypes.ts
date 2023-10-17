interface UserRequest {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	role: UserRole;
}

export type TLoginRequest = Pick<UserRequest, 'email' | 'password'>;

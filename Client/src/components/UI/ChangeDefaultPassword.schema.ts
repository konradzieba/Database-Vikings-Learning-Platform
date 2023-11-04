import z from 'zod';

export const changeDefaultPasswordSchema = z.object({
	password: z
		.string()
		.trim()
		.min(8, 'Hasło musi zawierać co najmniej 8 znaków')
		.regex(/[0-9]/, 'Musi zawierać cyfrę')
		.regex(/[a-z]/, 'Musi zawierać małą literę')
		.regex(/[A-Z]/, 'Musi zawierać dużą literę')
		.regex(/[$&+,:;=?@#|'<>.^*()%!-]/, 'Musi zawierać znak specjalny'),
});

import z from 'zod';

export const loginSchema = z.object({
	email: z
		.string({ required_error: 'Email jest wymagany' })
		.email('Podany email jest niepoprawny')
		.min(5, 'Podany email jest za krótki'),
	password: z.string().min(1, 'Hasło jest wymagane'),
});

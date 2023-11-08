import z from 'zod';

const onlyLettersRegex = /^[a-zA-Z]+$/;

export const EditStudentInfoSchema = z
	.object({
		firstName: z
			.string()
			.trim()
			.min(1, 'Imię nie może być puste')
			.max(100, 'Imię jest za długie'),
		lastName: z
			.string()
			.trim()
			.min(1, 'Nazwisko nie może być puste')
			.max(100, 'Nazwisko jest za długie'),
		indexNumber: z
			.string()
			.min(1, 'Numer indeksu nie może być pusty')
			.or(z.number().int('Numer indeksu musi być liczbą całkowitą')),
		score: z
			.string()
			.min(1, 'Wynik nie może być pusty')
			.or(z.number().int().min(0, 'Punkty nie mogą być ujemne')),
		health: z
			.string()
			.min(1, 'Ilość żyć nie może być pusta')
			.or(
				z
					.number()
					.int()
					.min(0, 'Życia muszą być w przedziale 0-3')
					.max(3, 'Życia muszą być w przedziale 0-3')
			),
	})
	.refine((data) => {
		if (!onlyLettersRegex.test(data.firstName)) {
			return {
				message: 'Polę musi zawierać tylko litery',
				path: ['firstName', 'lastName'],
			};
		}
		return true;
	});

import z from 'zod';

export const EditStudentInfoSchema = z.object({
	firstName: z
		.string()
		.trim()
		.min(1, 'Imię nie może być puste')
		.max(100, 'Imię jest za długie'),
	lastName: z
		.string()
		.trim()
		.min(1, 'Nazwisko nie może być puste')
		.max(100, 'Nazwisko jest za długie')
		.regex(/^[a-zA-Z]/, 'Nazwisko zawiera niedozwolone znaki'),
	indexNumber: z.number().int('Numer indeksu musi być liczbą całkowitą'),
	score: z.number().int().min(0, 'Punkty nie mogą być ujemne'),
	health: z
		.number()
		.int()
		.min(0, 'Życia muszą być w przedziale 0-3')
		.max(3, 'Życia muszą być w przedziale 0-3'),
});

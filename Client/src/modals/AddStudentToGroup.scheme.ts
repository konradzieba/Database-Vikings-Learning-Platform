import { z } from 'zod';

export const addStudentToGroupSchema = z.object({
	firstName: z
		.string()
		.min(2, 'Imię jest za krótkie')
		.refine((value) => /^[a-zA-ZęóąśłżźćńĘÓĄŚŁŻŹĆŃ\s-]+$/.test(value), {
			message: 'Imię nie może zawierać cyfr i znaków specjalnych',
		}),
	lastName: z
		.string()
		.min(2, 'Nazwisko jest za krótkie')
		.refine((value) => /^[a-zA-ZęóąśłżźćńĘÓĄŚŁŻŹĆŃ\s-]+$/.test(value), {
			message: 'Nazwisko nie może zawierać cyfr i znaków specjalnych',
		}),
	indexNumber: z
		.string()
		.min(6, 'Numer indeksu jest za krótki')
		.max(6, 'Numer indeksu jest za długi')
		.refine((value) => /^[0-9]+$/.test(value), {
			message: 'Numer indeksu może zawierać tylko cyfry',
		}),
});

import z from 'zod';
import { AnswerReplyStatusEnum } from '@/types/Enums';

export const answerReplySchema = z.object({
	replyStatus: AnswerReplyStatusEnum,
	replyDesc: z.string(),
	grantedScore: z
		.string()
		.min(1, 'Wynik nie może być pusty')
		.or(z.number().int().min(0, 'Punkty nie mogą być ujemne')),
});

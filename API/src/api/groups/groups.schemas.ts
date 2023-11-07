import z from 'zod';

export const groupSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .min(3, 'Group name must be at least 3 characters long')
    .max(25, 'Group name must be at most 25 characters long'),
  lecturerId: z.number({ required_error: 'Lecturer ID is required' }),
});

export const renameGroupInput = groupSchema.omit({
  lecturerId: true,
});

export const changeStudentGroupInput = z.object({
  groupId: z
    .number({ required_error: 'Group ID is required' })
    .int('Group ID must be an integer'),
});

export type GroupInput = z.infer<typeof groupSchema>;

export type RenameGroupInput = z.infer<typeof renameGroupInput>;

export type ChangeStudentGroupInput = z.infer<typeof changeStudentGroupInput>;

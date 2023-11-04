import z, { ZodError } from 'zod';
import { registerSchema } from '../auth/auth.schemas';

const passwordRequirements = [
  {
    re: /[0-9]/,
    label: 'Password must include a number',
  },
  {
    re: /[a-z]/,
    label: 'Password must include a lowercase letter',
  },
  {
    re: /[A-Z]/,
    label: 'Password must include an uppercase letter',
  },
  {
    re: /[$&+,:;=?@#|'<>.^*()%!-]/,
    label: 'Password must include a special character',
  },
];

const isPasswordValid = (password: string) => {
  if (password.length < 8) {
    return 'Password must include at least 8 characters';
  }

  for (const requirement of passwordRequirements) {
    if (!requirement.re.test(password)) {
      return requirement.label;
    }
  }

  return null; // valid
};

// to consider
export const updateUserSchema = registerSchema
  .omit({
    indexNumber: true,
    isAdmin: true,
    email: true,
  })
  .partial();

export const changePasswordSchema = z.object({
  password: z
    .string()
    .trim()
    .min(1, 'Password can not be empty')
    .max(100, 'Password is too long')
    .refine(
      (password) => {
        const validationResult = isPasswordValid(password);
        if (validationResult) {
          throw new ZodError([
            {
              code: 'custom',
              message: validationResult,
              path: ['password'],
            },
          ]);
        }
        return true;
      },
      {
        message: 'Invalid password',
      }
    ),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;

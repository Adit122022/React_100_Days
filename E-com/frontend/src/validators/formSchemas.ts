// validators/formSchemas.ts
import { z } from "zod";

export const createFormSchema = (options: {
  username?: boolean;
  email?: boolean;
  password?: boolean;
}) => {
  return z.object({
    username: options.username
      ? z.string()
          .min(3, 'Username must be at least 3 characters')
          .max(20, 'Username cannot exceed 20 characters')
      : z.string().optional(),

    email: options.email
      ? z.string().email("Please enter a valid email")
      : z.string().optional(),

    password: options.password
      ? z.string()
          .min(6, 'Password must be at least 6 characters')
          .max(8, 'Password too long')
          .regex(/[A-Z]/, "Password must contain at least one UpperCase letter")
          .regex(/[a-z]/, "Password must contain at least one lowerCase letter")
          .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character")
          .regex(/[0-9]/, "Password must contain at least one number")
      : z.string().optional(),
  });
};

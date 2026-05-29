import { z } from "zod";

export const CreateUserSchema = z
  .object({
    name: z
      .string()
      .min(2, "Username must be at least 2 characters")
      .max(20, "Username must be less than 20 characters"),
    email: z.email(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(40, "Password must be less than 40 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one lowercase letter, one uppercase letter, and one number",
      ),
    confirmPassword: z.string(),
    type: z.enum(["Admin", "User"]).default("User"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type CreateUserDto = z.infer<typeof CreateUserSchema>;

export const LoginSchema = z.object({
  email: z.email().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

export type LoginDto = z.infer<typeof LoginSchema>;

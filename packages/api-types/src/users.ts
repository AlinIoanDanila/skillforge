import { z } from "zod";

export const CreateUserSchema = z.object({
  name: z.string().min(2).max(30),
  email: z.email(),
  password: z.string(),
  type: z.enum(["Admin", "User"]).default("User"),
});

export const LoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
export type LoginDto = z.infer<typeof LoginSchema>;

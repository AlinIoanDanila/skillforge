import { z } from "zod";

export const TaskCreateSchema = z.object({
  task: z.object({
    title: z.string().min(5, "Title must be at least 5 characters"),
    content: z.string().default("Empty description"),
  }),
});

export const TaskUpdateSchema = z.object({
  task: z
    .object({
      title: z.string().trim().min(1).max(50).optional(),
      content: z.string().trim().min(1).max(500).optional(),
      isDone: z.boolean().optional(),
    })
    .refine((data) => data.title !== undefined || data.isDone !== undefined || data.content !== undefined, {
      message: "At least one field (title/content/isDone) must be provided",
    }),
});

export type TaskCreateDto = z.infer<typeof TaskCreateSchema>;
export type TaskUpdateDto = z.infer<typeof TaskUpdateSchema>;

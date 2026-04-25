import { z } from "zod";

export const CreateProjectSchema = z.object({
  project: z.object({
    title: z.string().trim().min(1).max(100),
    content: z.string().trim().min(1).max(5000),
  }),
});

export const UpdateProjectSchema = z.object({
  project: z
    .object({
      title: z.string().trim().min(1).max(100).optional(),
      content: z.string().trim().min(1).max(5000).optional(),
    })
    .refine((data) => data.title !== undefined || data.content !== undefined, {
      message: "At least one field (title or content) must be provided",
    }),
});

export type CreateProjectDto = z.infer<typeof CreateProjectSchema>;
export type UpdateProjectDto = z.infer<typeof UpdateProjectSchema>;

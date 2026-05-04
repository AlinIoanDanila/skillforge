import { z } from "zod";

export const ProjectCreateSchema = z.object({
  project: z.object({
    title: z.string().trim().min(1).max(100),
    content: z.string().trim().min(1).max(5000),
  }),
});

export type ProjectCreateDto = z.infer<typeof ProjectCreateSchema>;

export const ProjectUpdateSchema = z.object({
  project: z
    .object({
      title: z.string().trim().min(1).max(100).optional(),
      content: z.string().trim().min(1).max(5000).optional(),
    })
    .refine((data) => data.title !== undefined || data.content !== undefined, {
      message: "At least one field (title or content) must be provided",
    }),
});

export type ProjectUpdateDto = z.infer<typeof ProjectUpdateSchema>;

export const ProjectIdParamsSchema = z.object({
  id: z.uuid(),
});

export type ProjectIdParamsDto = z.infer<typeof ProjectIdParamsSchema>;

export const ProjectTaskParamsSchema = z.object({
  id: z.uuid(),
});

export type ProjectTaskParamsDto = z.infer<typeof ProjectTaskParamsSchema>;

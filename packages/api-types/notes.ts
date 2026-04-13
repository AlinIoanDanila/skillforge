import { z } from "zod";

export const CreateNoteSchema = z.object({
  title: z.string().min(10).max(30),
  content: z.string().max(100),
});

export type CreateNoteDto = z.infer<typeof CreateNoteSchema>;

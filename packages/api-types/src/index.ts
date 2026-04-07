import { z } from "zod";

export const CreateNoteSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export type CreateNoteDto = z.infer<typeof CreateNoteSchema>;

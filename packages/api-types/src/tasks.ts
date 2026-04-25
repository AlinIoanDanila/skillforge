import { z } from "zod";

export const CreateTaskSchema = z.object({
  task: z.object({}),
});

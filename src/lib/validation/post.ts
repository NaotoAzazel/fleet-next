import * as z from "zod"

export const postPatchSchema = z.object({
  name: z.string().min(1).max(64),
  colorId: z.number(),
  categoryId: z.number(),
  plate: z.string().min(1).max(16),
  image: z.string()
});
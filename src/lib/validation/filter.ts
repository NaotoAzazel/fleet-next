import * as z from "zod";

export const filterUpdateSchema = z.object({
  name: z.string().min(1, {
    message: "Имя должно содержать минимум 1 символ"
  })
  .max(30, {
    message: "Имя не может содержать больше 30 символов"
  })
});

export const filterCreateSchema = filterUpdateSchema;
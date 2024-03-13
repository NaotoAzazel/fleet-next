import * as z from "zod"

export const postPatchSchema = z.object({
  name: z.string().min(1).max(64),
  colorId: z.number(),
  categoryId: z.number(),
  plate: z.string().min(1).max(16),
  image: z.string()
});

export const postUpdateSchema = z.object({
  name: z.string()
    .min(1, {
      message: "Имя должно содержать минимум 1 символ"
    })
    .max(64, {
      message: "Имя не может содержать больше 64 символов"
    }),
  plate: z.string()
    .min(1, { 
      message: "Номер должен содержать минимум 1 символ" 
    })
    .max(16, {
      message: "Номер не может содержать больше 16 символов"
    }),
});

export const postCreateSchema = z.object({
  name: z.string()
    .min(1, {
      message: "Имя должно содержать минимум 1 символ"
    })
    .max(64, {
      message: "Имя не может содержать больше 64 символов"
    }),
  plate: z.string()
    .min(1, { 
      message: "Номер должен содержать минимум 1 символ" 
    })
    .max(16, {
      message: "Номер не может содержать больше 16 символов"
    }),
  colorId: z.number().min(1),
  categoryId: z.number().min(1),
  image: z.string()
})
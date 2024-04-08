import * as z from "zod"

const MAX_FILE_SIZE = 5000000; // 5 Mb
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const postCreateSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Имя должно содержать минимум 1 символ"
    })
    .max(64, {
      message: "Имя не может содержать больше 64 символов"
    }),
  plate: z
    .string()
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "Номера должны содерать только цифры и буквы"
    })
    .min(1, { 
      message: "Номер должен содержать минимум 1 символ" 
    })
    .max(16, {
      message: "Номер не может содержать больше 16 символов"
    }),
  color: z.string().optional(),
  category: z.string().optional(),
  colorId: z
    .number()
    .min(1),
  categoryId: z
    .number()
    .min(1),
  image: z
    .instanceof(File)
    .refine(
      (file: File) => file.size <= MAX_FILE_SIZE, 
      "Максимальный размер файла 5Mb" 
    )
    .refine(
      (file: File) => ACCEPTED_IMAGE_TYPES.includes(file.type), 
      "Недопустимое расширение файла"
    )
});

export const postUpdateSchema = postCreateSchema.extend({
  image: z
    .union([
      z.instanceof(File).refine(
        (file: File) => file.size <= MAX_FILE_SIZE,
        "Максимальный размер файла 5Mb"
      ).refine(
        (file: File) => ACCEPTED_IMAGE_TYPES.includes(file.type),
        "Недопустимое расширение файла"
      ),
      z.string()
    ])
});

export const postCreateRoute = z.object({
  name: z.string(),
  plate: z.string(),
  colorId: z.number(),
  categoryId: z.number(),
  image: z.string()
});

export const postUpdateRoute = z.object({
  name: z.string().optional(),
  plate: z.string().optional(),
  colorId: z.number().optional(),
  categoryId: z.number().optional(),
  image: z.string().optional(),
  takeBy: z.string()
});
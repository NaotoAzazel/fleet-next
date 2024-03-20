import * as z from "zod";

const allowedValues = {
  status: ["all", "avai", "unavai"],
  sort: ["asc", "desc"]
} as const;

export const transportPageSchema = z.object({
  search: z.string().catch(""),
  status: z.enum(allowedValues.status).catch(allowedValues.status[0]),
  sort: z.enum(allowedValues.sort).catch(allowedValues.sort[0])
});

export type TransportPageSchema = z.infer<typeof transportPageSchema>;

export const authPageSchema = z.object({
  "auth-required": z.coerce.boolean().optional()
});

export type AuthPageParams = z.infer<typeof authPageSchema>;
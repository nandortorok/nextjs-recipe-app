import { z } from "zod";

export const schema = z.object({
  sections: z
    .object({
      title: z.string().min(3).max(32),
      ingredients: z
        .object({
          amount: z
            .number()
            .min(0.1, "Amount must be greater than or equal to 1")
            .max(999, "Amount must be less than or equal to 999"),
          unit: z.string().optional(),
          name: z
            .string()
            .min(3, "Name must contain at least 3 character")
            .max(32, "Name must contain at most 32 character")
            .regex(/^[a-z\s]+$/i, "Name must contain only letters"),
        })
        .array()
        .min(1),
      directions: z
        .object({
          direction: z.string(),
        })
        .array(),
    })
    .array()
    .min(1),
});

export type schemaT = z.infer<typeof schema>;

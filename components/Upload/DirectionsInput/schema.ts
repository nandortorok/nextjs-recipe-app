import { z } from "zod";

export const schema = z.object({
  sections: z
    .object({
      title: z.string().min(3).max(64),
      ingredients: z
        .object({
          amount: z.number(),
          unit: z.string(),
          name: z.string(),
        })
        .array(),
      directions: z
        .object({
          direction: z
            .string()
            .min(8, "Direction must contain at least 8 character")
            .max(1024, "String must contain at most 1024 character"),
        })
        .array()
        .min(1),
    })
    .array()
    .min(1),
});

export type schemaT = z.infer<typeof schema>;

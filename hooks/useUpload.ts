import { useState } from "react";
import { z } from "zod";

const formStateInit = {
  title: "",
  image: null,
  servings: 0,
  prepTime: 0,
  prepTimeUnit: 1,
  cookTime: 0,
  cookTimeUnit: 1,
  sections: [
    {
      title: "Main",
      ingredients: [{ amount: 0, unit: "", name: "" }],
      directions: [{ direction: "" }],
    },
  ],
};

export const formSchema = z.object({
  title: z.string().min(3).max(64),
  image: z.any(),
  servings: z.number().int().min(1).max(64),
  prepTime: z.number().int().min(1).max(60),
  cookTime: z.number().int().min(1).max(60),
  prepTimeUnit: z.number().int().min(1).max(60),
  cookTimeUnit: z.number().int().min(1).max(60),
  sections: z
    .object({
      title: z.string().min(3).max(64).optional(),
      ingredients: z
        .object({
          amount: z.number().min(1).max(999),
          unit: z.string().max(16).optional(),
          name: z.string().min(3).max(32),
        })
        .array()
        .min(1),
      directions: z
        .object({
          direction: z.string().min(8).max(256),
        })
        .array()
        .min(1),
    })
    .array()
    .min(1),
});

const useUpload = () => {
  const [page, setPage] = useState(1);
  const [formValue, setFormValue] = useState<FormStateProps>(formStateInit);
  const [preview, setPreview] = useState<any>();

  const resetFormState = () => {
    setPage(1);
    setFormValue(formStateInit);
  };

  return {
    page,
    setPage,
    formValue,
    setFormValue,
    resetFormState,
    preview,
    setPreview,
  };
};

export type FormStateProps = z.infer<typeof formSchema>;
export type UploadContextProps = ReturnType<typeof useUpload>;

export default useUpload;

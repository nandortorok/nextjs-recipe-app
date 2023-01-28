import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { SubmitHandler, useFormContext } from "react-hook-form";

import { FormStateProps } from "hooks/useUpload";
import { UploadContext } from "lib/contexts";
import supabase from "lib/supabaseClient";
import { ButtonGroup } from "./Elements";

type FormProps = {
  children: JSX.Element;
};

const uploadImage = async ({ image }: FormStateProps) => {
  const recipeImage = image[0];

  if (process.env.NODE_ENV !== "production") {
    const body = new FormData();
    body.append("file", recipeImage);

    const res = await fetch("/api/upload-image", {
      method: "POST",
      body,
    });

    const { data } = await res.json();
    return await data[0].newFilename;
  }

  const { data, error } = await supabase.storage
    .from("recipe-images")
    .upload(`${Date.now()}-${recipeImage.name}`, recipeImage);

  if (!data) return "";
  return data.path;
};

const uploadRecipe = async (data: FormStateProps, imageName: string) => {
  const res = await fetch("/api/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data, imageName }),
  });

  return await res.json();
};

export const Form = ({ children }: FormProps) => {
  const { page, setPage, formValue, resetFormState } =
    useContext(UploadContext);
  const { handleSubmit } = useFormContext();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<Partial<FormStateProps>> = async () => {
    if (page < 4) return setPage(page + 1);

    setIsLoading(true);
    const imageName = await uploadImage(formValue);
    const { recipeId } = await uploadRecipe(formValue, imageName);

    router.push(`/recipe/${recipeId}`).then(() => {
      setIsLoading(false);
      resetFormState();
    });
  };

  return (
    <form
      className="flex flex-1 flex-col px-5 pb-10 transition-opacity sm:px-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="mb-5 pt-5 text-center font-bold">Upload recipe</h1>

      {children}
      <ButtonGroup isLoading={isLoading} />
    </form>
  );
};

export default Form;

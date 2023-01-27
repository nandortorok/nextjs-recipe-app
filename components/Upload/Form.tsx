import { useRouter } from "next/router";
import { useContext } from "react";
import { SubmitHandler, useFormContext } from "react-hook-form";

import { FormStateProps } from "hooks/useUpload";
import { UploadContext } from "lib/contexts";
import supabase from "lib/supabaseClient";

type FormProps = {
  children: JSX.Element;
};

const uploadImage = async ({ image }: FormStateProps) => {
  const recipeImage = image[0];

  if (process.env.NODE_ENV === "production") {
    const { data, error } = await supabase.storage
      .from("recipe-images")
      .upload(`src/${recipeImage.name}`, recipeImage);

    if (!data) return "";

    return data.path;
  }

  const body = new FormData();
  body.append("file", recipeImage);

  const res = await fetch("/api/upload-image", {
    method: "POST",
    body,
  });

  const { data } = await res.json();
  return await data[0].newFilename;
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

  const onSubmit: SubmitHandler<Partial<FormStateProps>> = async () => {
    if (page < 4) {
      setPage(page + 1);
    } else {
      const imageName = await uploadImage(formValue);
      const { recipeId } = await uploadRecipe(formValue, imageName);
      router.push(`/recipe/${recipeId}`);
      // .then(() => resetFormState());
    }
  };

  const handleBack = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <form
      className="flex flex-1 flex-col px-5 pb-10 transition-opacity sm:px-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="mb-5 pt-5 text-center font-bold">Upload recipe</h1>

      {children}
      <section className="mt-auto flex justify-between px-5 pt-5">
        <button
          className="rounded-md bg-white py-2 px-5 text-blue-500 transition ease-in-out hover:bg-blue-50 active:ring disabled:invisible"
          type="button"
          disabled={page > 1 ? false : true}
          onClick={handleBack}
        >
          Back
        </button>
        <button
          className="rounded-md bg-blue-500 py-2 px-5 text-white transition ease-in-out hover:bg-blue-600 active:ring"
          type="submit"
        >
          {page < 4 ? "Next" : "Submit"}
        </button>
      </section>
    </form>
  );
};

export default Form;

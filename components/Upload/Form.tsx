import { useRouter } from "next/router";
import { useContext } from "react";
import { SubmitHandler, useFormContext } from "react-hook-form";

import { FormStateProps } from "hooks/useUpload";
import { UploadContext } from "lib/contexts";

type FormProps = {
  children: JSX.Element;
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
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValue),
      });

      const data = await res.json();
      router.push(`/recipe/${data.recipeId}`);
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

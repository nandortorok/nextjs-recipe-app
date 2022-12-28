import { useState } from "react";

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
      ingredients: [],
      directions: [],
    },
  ],
};

const useUpload = () => {
  const [page, setPage] = useState(1);
  const [formValue, setFormValue] = useState(formStateInit);

  return {
    page,
    setPage,
    formValue,
    setFormValue,
  };
};

export type FormStateProps = typeof formStateInit;
export type UploadContextProps = ReturnType<typeof useUpload>;

export default useUpload;

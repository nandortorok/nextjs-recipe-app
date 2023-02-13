import { useContext } from "react";

import { useFormContext } from "react-hook-form";

import { UploadContext } from "lib/contexts";

import { schemaT } from "../IngredientsInput/schema";

type TextAreaProps = {
  sectionIndex: number;
  idx: number;
};

export const TextArea = ({ sectionIndex, idx }: TextAreaProps) => {
  const { formValue, setFormValue } = useContext(UploadContext);
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<schemaT>();

  const showError = (number: number) => {
    if (
      errors.sections &&
      errors.sections.at &&
      errors.sections.at(sectionIndex) &&
      errors.sections.at(sectionIndex)?.directions?.at &&
      errors.sections.at(sectionIndex)?.directions?.[number]
    )
      return errors.sections.at(sectionIndex)?.directions?.[number];
  };

  return (
    <textarea
      className="w-full resize-none border-0 bg-transparent py-3 outline-none transition-all ease-in-out placeholder:text-sm placeholder:leading-6 placeholder:text-red-500/80 focus:ring-0"
      placeholder={showError(idx)?.direction?.message}
      {...register(`sections.${sectionIndex}.directions.${idx}.direction`, {
        onBlur: () =>
          setFormValue({
            ...formValue,
            sections: [...watch().sections],
          }),
      })}
    />
  );
};

export default TextArea;

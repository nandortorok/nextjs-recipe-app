import { useContext } from "react";

import {
  UseFieldArrayRemove,
  FieldArrayWithId,
  useFormContext,
} from "react-hook-form";

import { UploadContext } from "lib/contexts";

import { schemaT } from "./schema";
import { XButton, ErrorMessage } from "../Elements";

type HeadProps = {
  idx: number;
  fields: FieldArrayWithId<schemaT, "sections">[];
  remove: UseFieldArrayRemove;
};

const TableHead = ({ idx, fields, remove }: HeadProps) => {
  const { formValue, setFormValue } = useContext(UploadContext);
  const {
    register,
    formState: { errors },
    watch,
    clearErrors,
  } = useFormContext<schemaT>();

  return (
    <caption className="border-b px-3 py-4 text-left text-lg font-medium dark:border-black/20">
      <div className="flex justify-between pr-3">
        <input
          className={
            fields.length > 1
              ? "border-0 align-middle text-lg focus:ring-0 dark:bg-zinc-800"
              : "invisible border-0 align-middle text-lg focus:ring-0 dark:bg-zinc-800"
          }
          type="text"
          placeholder="Title name"
          {...register(`sections.${idx}.title`, {
            onBlur: () => {
              clearErrors(`sections.${idx}.title`);
              setFormValue({
                ...formValue,
                sections: [...watch().sections],
              });
            },
          })}
        />
        <XButton
          onClick={() => {
            remove(idx);
            setFormValue({
              ...formValue,
              sections: [...watch().sections],
            });
          }}
        />
      </div>
      {errors.sections && (
        <ErrorMessage error={errors.sections[idx]?.title?.message} />
      )}
    </caption>
  );
};
export default TableHead;

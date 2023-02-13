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
  } = useFormContext<schemaT>();

  return (
    <>
      <caption className="px-3 py-4 text-left text-lg font-medium">
        <div className="flex justify-between pr-3">
          <input
            className={
              fields.length > 1
                ? "border-0 align-middle text-lg transition ease-in-out focus:ring-0 dark:bg-zinc-800"
                : "invisible border-0 align-middle text-lg transition ease-in-out focus:ring-0 dark:bg-zinc-800"
            }
            type="text"
            placeholder="Title name"
            autoComplete="off"
            {...register(`sections.${idx}.title`, {
              onChange: () =>
                setFormValue({
                  ...formValue,
                  sections: [...watch().sections],
                }),
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
      <thead className="bg-gray-100 text-sm uppercase text-gray-700 dark:bg-zinc-900/50 dark:text-white">
        <tr>
          <th className="w-1/6 py-3 pl-3 md:pl-6">Amount*</th>
          <th className="w-2/5 py-3 pl-2 md:w-1/4 md:pl-3">Unit</th>
          <th className="w-1/2 py-3 pl-2 md:pl-3">Name*</th>
          <th className="py-3"></th>
        </tr>
      </thead>
    </>
  );
};
export default TableHead;

import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { UploadContext } from "lib/contexts";
import { useContext } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";

import { TextArea } from "./TextArea";
import { XButton } from "../Elements";
import { schemaT } from "../IngredientsInput/schema";

const DirectionRow = ({ sectionIndex }: { sectionIndex: number }) => {
  const { formValue, setFormValue } = useContext(UploadContext);
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext<schemaT>();
  const { remove, fields } = useFieldArray({
    control,
    name: `sections.${sectionIndex}.directions`,
  });

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
    <>
      {fields.map((field, idx) => (
        <tr className="border-b transition-all ease-in-out dark:border-black/20" key={field.id}>
          <td>
            <div className="flex px-2">
              <div className="my-auto">
                {showError(idx) ? (
                  <div className="border-l border-transparent ">
                    <ExclamationTriangleIcon className=" ml-1 h-5 w-5 text-red-500" />
                  </div>
                ) : (
                  <p className="px-2 text-gray-700">{idx + 1}</p>
                )}
              </div>
              <TextArea sectionIndex={sectionIndex} idx={idx} />
            </div>
          </td>
          <td className="w-3 py-3 px-6 text-right">
            <XButton
              onClick={() => {
                remove(idx);
                setFormValue({
                  ...formValue,
                  sections: [...watch().sections],
                });
              }}
            />
          </td>
        </tr>
      ))}
    </>
  );
};

export default DirectionRow;

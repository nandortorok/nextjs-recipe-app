import { useContext, useState, Fragment } from "react";

import { Combobox, Transition } from "@headlessui/react";
import { Unit } from "@prisma/client";
import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import useSWR from "swr";

import { UploadContext } from "lib/contexts";
import fetcher from "lib/fetcher";

import { schemaT } from "./schema";
import { XButton } from "../Elements";

const IngredientRow = ({ sectionIndex }: { sectionIndex: number }) => {
  const { formValue, setFormValue } = useContext(UploadContext);
  const {
    register,
    control,
    formState: { errors },
    watch,
  } = useFormContext<schemaT>();
  const { remove, fields } = useFieldArray({
    control,
    name: `sections.${sectionIndex}.ingredients`,
  });

  const { data, error, isLoading } = useSWR<Unit[], Error>(
    "/api/units",
    fetcher
  );
  const [query, setQuery] = useState("");
  const filteredList = () => {
    if (!data) return [] as Unit[];

    if (query === "") return data;

    const filteredList = data.filter((unit) =>
      unit.name.includes(query.toLowerCase())
    );

    if (filteredList.length < 1)
      return data.filter(
        (unit) => unit.short && unit.short.includes(query.toLowerCase())
      );

    return filteredList;
  };

  const showError = (number: number) => {
    if (
      errors.sections &&
      errors.sections.at &&
      errors.sections.at(sectionIndex) &&
      errors.sections.at(sectionIndex)?.ingredients?.at &&
      errors.sections.at(sectionIndex)?.ingredients?.[number]
    )
      return errors.sections.at(sectionIndex)?.ingredients?.[number];
  };

  return (
    <>
      {fields.map((field, idx) => (
        <tr className="border-b dark:border-black/20" key={field.id}>
          <td className="pl-3">
            <input
              className={
                showError(idx)?.amount
                  ? "w-full border-red-500 align-middle focus:border-red-500 focus:ring-red-500 dark:bg-zinc-800"
                  : "w-full border-0 align-middle focus:ring-0 dark:bg-zinc-800"
              }
              type="number"
              step={0.1}
              autoComplete="off"
              {...register(
                `sections.${sectionIndex}.ingredients.${idx}.amount`,
                {
                  valueAsNumber: true,
                  onChange: () => {
                    setFormValue({
                      ...formValue,
                      sections: [...watch().sections],
                    });
                  },
                }
              )}
            />
          </td>
          <td>
            <Controller
              control={control}
              name={`sections.${sectionIndex}.ingredients.${idx}.unit`}
              render={({ field: { onChange, value } }) => (
                <Combobox
                  value={value}
                  onChange={(e) => {
                    onChange(e);
                    setFormValue({
                      ...formValue,
                      sections: [...watch().sections],
                    });
                  }}
                >
                  <div className="relative w-full">
                    <Combobox.Input
                      className="w-full border-none focus:ring-0 dark:bg-zinc-800"
                      onChange={(e) => setQuery(e.target.value)}
                    />
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                      afterLeave={() => setQuery("")}
                    >
                      <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-44 overflow-auto rounded-md bg-gray-100 py-1 shadow-md dark:bg-zinc-800 md:w-full">
                        {filteredList().length === 0 && query !== "" ? (
                          <div className="px-4 py-1 text-gray-500">
                            Nothing found
                          </div>
                        ) : (
                          <>
                            {filteredList().map((unit, unitIdx) => (
                              <Combobox.Option
                                className={({ active }) =>
                                  active
                                    ? "relative max-h-60 cursor-pointer overflow-auto bg-blue-500 px-4 py-1 text-white active:bg-blue-600"
                                    : "relative max-h-60 cursor-pointer overflow-auto px-4 py-1 hover:bg-blue-500 hover:text-white active:bg-blue-600"
                                }
                                key={unit.id}
                                value={unit.name}
                              >
                                {unit.name + " "}
                                <span className="text-xs">{unit.short}</span>
                              </Combobox.Option>
                            ))}
                          </>
                        )}
                      </Combobox.Options>
                    </Transition>
                  </div>
                </Combobox>
              )}
            />
          </td>
          <td>
            <input
              className={
                showError(idx)?.name
                  ? "w-full border-red-500 align-middle focus:border-red-500 focus:ring-red-500 dark:bg-zinc-800"
                  : "w-full border-0 align-middle focus:ring-0 dark:bg-zinc-800"
              }
              type="text"
              autoComplete="off"
              {...register(`sections.${sectionIndex}.ingredients.${idx}.name`, {
                onBlur: () => {
                  setFormValue({
                    ...formValue,
                    sections: [...watch().sections],
                  });
                },
              })}
            />
          </td>
          <td className="py-3 pr-2 text-right transition-colors ease-in-out md:pr-6">
            <XButton onClick={() => remove(idx)} />
          </td>
        </tr>
      ))}
    </>
  );
};
export default IngredientRow;

import { Fragment, useContext, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadContext } from "lib/contexts";
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import { z } from "zod";
import { Combobox, Transition } from "@headlessui/react";
import useSWR from "swr";
import { Unit } from "@prisma/client";

import Form from "./Form";
import { ErrorMessage, XButton } from "./Elements";

const schema = z.object({
  sections: z
    .object({
      title: z.string().min(3).max(64),
      ingredients: z
        .object({
          amount: z.number().min(1).max(999),
          unit: z.string().optional(),
          name: z.string().min(3).max(32),
        })
        .array()
        .min(1),
      directions: z
        .object({
          direction: z.string(),
        })
        .array(),
    })
    .array()
    .min(1),
});

type schemaT = z.infer<typeof schema>;

const IngredientsInput = () => {
  const { formValue, setFormValue } = useContext(UploadContext);
  const methods = useForm<schemaT>({
    resolver: zodResolver(schema),
    defaultValues: {
      sections: formValue.sections,
    },
  });

  const {
    control,
    register,
    formState: { errors },
    watch,
    clearErrors,
  } = methods;
  const { fields, append, update, remove } = useFieldArray({
    control,
    name: "sections",
  });

  return (
    <FormProvider {...methods}>
      <Form>
        <section className="space-y-5">
          <label className="text-md font-bold">Ingredients</label>
          {fields.map((field, idx) => (
            <div className="rounded-md border border-gray-300" key={field.id}>
              <table className="w-full text-left">
                <caption className="px-3 py-4 text-left text-lg font-bold">
                  <div className="flex justify-between pr-3">
                    <input
                      className={
                        fields.length > 1
                          ? "border-0 align-middle text-lg transition ease-in-out focus:ring-0"
                          : "invisible border-0 align-middle text-lg transition ease-in-out focus:ring-0"
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
                    <ErrorMessage
                      error={errors.sections[idx]?.title?.message}
                    />
                  )}
                </caption>
                <thead className="bg-gray-100 text-sm uppercase text-gray-700">
                  <tr>
                    <th className="w-1/3 py-3 pl-6">Amount*</th>
                    <th className="w-1/3 py-3 pl-3">Unit</th>
                    <th className="w-1/3 py-3 pl-3">Name*</th>
                    <th className="py-3 pl-10">
                      <span className="invisible">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <Ingredient sectionIndex={idx} />
                  <tr>
                    <td colSpan={4} className="p-3 text-center">
                      {errors.sections && (
                        <ErrorMessage
                          error={errors.sections[idx]?.ingredients?.message}
                        />
                      )}
                      <button
                        className="align-middle text-sm font-bold uppercase hover:text-blue-700"
                        type="button"
                        onClick={() => {
                          clearErrors(`sections.${idx}.ingredients`);

                          update(idx, {
                            title: watch().sections[idx].title,
                            ingredients: [
                              ...watch().sections[idx].ingredients,
                              { amount: 0, unit: "", name: "" },
                            ],
                            directions: [{ direction: "" }],
                          });

                          setFormValue({
                            ...formValue,
                            sections: [...watch().sections],
                          });
                        }}
                      >
                        Add ingredient
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}

          <div className="flex justify-center">
            <button
              className="rounded-md bg-blue-500 py-3 px-5 text-sm font-bold uppercase text-white transition ease-in-out hover:bg-blue-600 active:ring"
              type="button"
              onClick={() => {
                clearErrors(`sections`);

                append({
                  title: "",
                  ingredients: [{ amount: 0, unit: "", name: "" }],
                  directions: [{ direction: "" }],
                });
                setFormValue({
                  ...formValue,
                  sections: [...watch().sections],
                });
              }}
            >
              Add section
            </button>
          </div>
          {errors.sections && <ErrorMessage error={errors.sections.message} />}
          {errors?.sections &&
            errors?.sections?.map &&
            errors?.sections?.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                {section?.ingredients &&
                  section?.ingredients.map &&
                  section?.ingredients.map((ing, ingIdx) => (
                    <div key={ingIdx}>
                      <ErrorMessage error={ing?.amount?.message} />
                      <ErrorMessage error={ing?.unit?.message} />
                      <ErrorMessage error={ing?.name?.message} />
                    </div>
                  ))}
              </div>
            ))}
        </section>
      </Form>
    </FormProvider>
  );
};

const fetcher = (args: string) => fetch(args).then((res) => res.json());

const Ingredient = ({ sectionIndex }: { sectionIndex: number }) => {
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
  const filteredList =
    query === ""
      ? data
      : data?.filter((unit) => unit.name.includes(query.toLowerCase()));

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
        <tr className="border-b" key={field.id}>
          <td className="pl-3">
            <input
              className={
                showError(idx)?.amount
                  ? "w-full border-red-500 align-middle focus:border-red-500 focus:ring-red-500"
                  : "w-full border-0 align-middle focus:ring-0"
              }
              type="number"
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
                      className="w-full border-none focus:ring-0"
                      onChange={(e) => setQuery(e.target.value)}
                    />
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                      afterLeave={() => setQuery("")}
                    >
                      <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-44 overflow-auto rounded-md bg-gray-100 py-1 shadow-md md:w-full">
                        {filteredList?.length === 0 && query !== "" ? (
                          <div className="px-4 py-1 text-gray-500">
                            Nothing found
                          </div>
                        ) : (
                          <>
                            {filteredList?.map((unit, unitIdx) => (
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
                  ? "w-full border-red-500 align-middle focus:border-red-500 focus:ring-red-500"
                  : "w-full border-0 align-middle focus:ring-0"
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
          <td className="py-3 px-6 text-right transition-colors ease-in-out hover:text-red-500">
            <XButton onClick={() => remove(idx)} />
          </td>
        </tr>
      ))}
    </>
  );
};

export default IngredientsInput;

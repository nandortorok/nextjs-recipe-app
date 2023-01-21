import { zodResolver } from "@hookform/resolvers/zod";
import { UploadContext } from "lib/contexts";
import { useContext } from "react";
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import { z } from "zod";

import { ErrorMessage, XButton } from "./Elements";
import Form from "./Form";

const schema = z.object({
  sections: z
    .object({
      title: z.string().min(3).max(64),
      ingredients: z
        .object({
          amount: z.number(),
          unit: z.string(),
          name: z.string(),
        })
        .array(),
      directions: z
        .object({
          direction: z
            .string()
            .min(8, "Direction must contain at least 8 character")
            .max(1024, "String must contain at most 1024 character"),
        })
        .array()
        .min(1),
    })
    .array()
    .min(1),
});

type schemaT = z.infer<typeof schema>;

const DirectionsInput = () => {
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
  const { fields, update, remove } = useFieldArray({
    control,
    name: "sections",
  });

  return (
    <FormProvider {...methods}>
      <Form>
        <section className="space-y-5">
          <label className="text-md font-medium">Directions</label>
          {fields.map((field, idx) => (
            <div key={field.id} className="rounded-md border border-gray-300">
              <table className="w-full text-left">
                <caption className="border-b px-3 py-4 text-left text-lg font-medium">
                  <div className="flex justify-between pr-3">
                    <input
                      className={
                        fields.length > 1
                          ? "border-0 align-middle text-lg focus:ring-0"
                          : "invisible border-0 align-middle text-lg focus:ring-0"
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
                    <ErrorMessage
                      error={errors.sections[idx]?.title?.message}
                    />
                  )}
                </caption>
                <tbody>
                  <Direction sectionIndex={idx} />
                  <tr>
                    <td colSpan={4} className="p-3 text-center ">
                      <button
                        className="align-middle text-sm font-medium uppercase hover:text-blue-700"
                        type="button"
                        onClick={() => {
                          clearErrors(`sections.${idx}.directions`);
                          update(idx, {
                            ...watch().sections[idx],
                            directions: [
                              ...watch().sections[idx].directions,
                              { direction: "" },
                            ],
                          });
                          setFormValue({
                            ...formValue,
                            sections: [...watch().sections],
                          });
                        }}
                      >
                        Add direction
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}

          {errors?.sections && <ErrorMessage error={errors.sections.message} />}
        </section>
      </Form>
    </FormProvider>
  );
};

const Direction = ({ sectionIndex }: { sectionIndex: number }) => {
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
        <tr className="border-b transition-all ease-in-out" key={field.id}>
          <td>
            <div className="flex">
              <p className="pt-2 pl-6 text-gray-700">{idx + 1}</p>
              <textarea
                className="w-full resize-none border-0 bg-transparent transition-all ease-in-out placeholder:text-sm placeholder:leading-6 placeholder:text-red-500/80 focus:ring-0"
                placeholder={showError(idx)?.direction?.message}
                autoComplete="off"
                {...register(
                  `sections.${sectionIndex}.directions.${idx}.direction`,
                  {
                    onBlur: () =>
                      setFormValue({
                        ...formValue,
                        sections: [...watch().sections],
                      }),
                  }
                )}
              />
            </div>
          </td>
          <td className="py-3 px-6 text-right">
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

export default DirectionsInput;

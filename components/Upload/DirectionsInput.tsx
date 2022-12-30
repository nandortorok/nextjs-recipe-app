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
          direction: z.string().min(8).max(256),
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
          <label className="text-md font-bold">Directions</label>
          {fields.map((field, idx) => (
            <div key={field.id} className="rounded-md border border-gray-300">
              <table className="w-full text-left">
                <caption className="border-b px-3 py-4 text-left text-lg font-bold">
                  <div className="flex justify-between pr-3">
                    <input
                      className="border-0 align-middle text-lg focus:ring-0"
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
                        className="align-middle text-sm font-bold uppercase hover:text-blue-700"
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
          {errors?.sections &&
            errors?.sections?.map &&
            errors?.sections?.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <ErrorMessage error={section?.message} />
                <ErrorMessage error={section?.directions?.message} />
                {section?.directions?.map &&
                  section?.directions?.map((dic, dicIdx) => (
                    <div key={dicIdx}>
                      <ErrorMessage error={dic?.message} />
                      <ErrorMessage error={dic?.direction?.message} />
                    </div>
                  ))}
              </div>
            ))}
        </section>
      </Form>
    </FormProvider>
  );
};

const Direction = ({ sectionIndex }: { sectionIndex: number }) => {
  const { formValue, setFormValue } = useContext(UploadContext);
  const { register, control, watch } = useFormContext();
  const { remove, fields } = useFieldArray({
    control,
    name: `sections.${sectionIndex}.directions`,
  });

  return (
    <>
      {fields.map((field, idx) => (
        <tr className="border-b" key={field.id}>
          <td>
            <div className="flex">
              <p className="my-auto pl-6 text-gray-700">{idx + 1}</p>
              <input
                className="w-full border-0 focus:ring-0"
                type="text"
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
